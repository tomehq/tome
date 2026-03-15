(function(){const T=document.createElement("link").relList;if(T&&T.supports&&T.supports("modulepreload"))return;for(const _ of document.querySelectorAll('link[rel="modulepreload"]'))s(_);new MutationObserver(_=>{for(const D of _)if(D.type==="childList")for(const R of D.addedNodes)R.tagName==="LINK"&&R.rel==="modulepreload"&&s(R)}).observe(document,{childList:!0,subtree:!0});function h(_){const D={};return _.integrity&&(D.integrity=_.integrity),_.referrerPolicy&&(D.referrerPolicy=_.referrerPolicy),_.crossOrigin==="use-credentials"?D.credentials="include":_.crossOrigin==="anonymous"?D.credentials="omit":D.credentials="same-origin",D}function s(_){if(_.ep)return;_.ep=!0;const D=h(_);fetch(_.href,D)}})();function Th(d){return d&&d.__esModule&&Object.prototype.hasOwnProperty.call(d,"default")?d.default:d}var qu={exports:{}},li={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Nf;function _h(){if(Nf)return li;Nf=1;var d=Symbol.for("react.transitional.element"),T=Symbol.for("react.fragment");function h(s,_,D){var R=null;if(D!==void 0&&(R=""+D),_.key!==void 0&&(R=""+_.key),"key"in _){D={};for(var L in _)L!=="key"&&(D[L]=_[L])}else D=_;return _=D.ref,{$$typeof:d,type:s,key:R,ref:_!==void 0?_:null,props:D}}return li.Fragment=T,li.jsx=h,li.jsxs=h,li}var Gf;function Eh(){return Gf||(Gf=1,qu.exports=_h()),qu.exports}var u=Eh(),Nu={exports:{}},te={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Vf;function Ah(){if(Vf)return te;Vf=1;var d=Symbol.for("react.transitional.element"),T=Symbol.for("react.portal"),h=Symbol.for("react.fragment"),s=Symbol.for("react.strict_mode"),_=Symbol.for("react.profiler"),D=Symbol.for("react.consumer"),R=Symbol.for("react.context"),L=Symbol.for("react.forward_ref"),O=Symbol.for("react.suspense"),x=Symbol.for("react.memo"),Z=Symbol.for("react.lazy"),w=Symbol.for("react.activity"),W=Symbol.iterator;function P(m){return m===null||typeof m!="object"?null:(m=W&&m[W]||m["@@iterator"],typeof m=="function"?m:null)}var ye={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},ne=Object.assign,oe={};function j(m,C,q){this.props=m,this.context=C,this.refs=oe,this.updater=q||ye}j.prototype.isReactComponent={},j.prototype.setState=function(m,C){if(typeof m!="object"&&typeof m!="function"&&m!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,m,C,"setState")},j.prototype.forceUpdate=function(m){this.updater.enqueueForceUpdate(this,m,"forceUpdate")};function V(){}V.prototype=j.prototype;function K(m,C,q){this.props=m,this.context=C,this.refs=oe,this.updater=q||ye}var G=K.prototype=new V;G.constructor=K,ne(G,j.prototype),G.isPureReactComponent=!0;var he=Array.isArray;function Te(){}var B={H:null,A:null,T:null,S:null},Oe=Object.prototype.hasOwnProperty;function Je(m,C,q){var Y=q.ref;return{$$typeof:d,type:m,key:C,ref:Y!==void 0?Y:null,props:q}}function Me(m,C){return Je(m.type,C,m.props)}function Pe(m){return typeof m=="object"&&m!==null&&m.$$typeof===d}function Ue(m){var C={"=":"=0",":":"=2"};return"$"+m.replace(/[=:]/g,function(q){return C[q]})}var Ct=/\/+/g;function re(m,C){return typeof m=="object"&&m!==null&&m.key!=null?Ue(""+m.key):C.toString(36)}function yt(m){switch(m.status){case"fulfilled":return m.value;case"rejected":throw m.reason;default:switch(typeof m.status=="string"?m.then(Te,Te):(m.status="pending",m.then(function(C){m.status==="pending"&&(m.status="fulfilled",m.value=C)},function(C){m.status==="pending"&&(m.status="rejected",m.reason=C)})),m.status){case"fulfilled":return m.value;case"rejected":throw m.reason}}throw m}function E(m,C,q,Y,$){var ie=typeof m;(ie==="undefined"||ie==="boolean")&&(m=null);var ge=!1;if(m===null)ge=!0;else switch(ie){case"bigint":case"string":case"number":ge=!0;break;case"object":switch(m.$$typeof){case d:case T:ge=!0;break;case Z:return ge=m._init,E(ge(m._payload),C,q,Y,$)}}if(ge)return $=$(m),ge=Y===""?"."+re(m,0):Y,he($)?(q="",ge!=null&&(q=ge.replace(Ct,"$&/")+"/"),E($,C,q,"",function(Zn){return Zn})):$!=null&&(Pe($)&&($=Me($,q+($.key==null||m&&m.key===$.key?"":(""+$.key).replace(Ct,"$&/")+"/")+ge)),C.push($)),1;ge=0;var We=Y===""?".":Y+":";if(he(m))for(var Le=0;Le<m.length;Le++)Y=m[Le],ie=We+re(Y,Le),ge+=E(Y,C,q,ie,$);else if(Le=P(m),typeof Le=="function")for(m=Le.call(m),Le=0;!(Y=m.next()).done;)Y=Y.value,ie=We+re(Y,Le++),ge+=E(Y,C,q,ie,$);else if(ie==="object"){if(typeof m.then=="function")return E(yt(m),C,q,Y,$);throw C=String(m),Error("Objects are not valid as a React child (found: "+(C==="[object Object]"?"object with keys {"+Object.keys(m).join(", ")+"}":C)+"). If you meant to render a collection of children, use an array instead.")}return ge}function k(m,C,q){if(m==null)return m;var Y=[],$=0;return E(m,Y,"","",function(ie){return C.call(q,ie,$++)}),Y}function F(m){if(m._status===-1){var C=m._result;C=C(),C.then(function(q){(m._status===0||m._status===-1)&&(m._status=1,m._result=q)},function(q){(m._status===0||m._status===-1)&&(m._status=2,m._result=q)}),m._status===-1&&(m._status=0,m._result=C)}if(m._status===1)return m._result.default;throw m._result}var ue=typeof reportError=="function"?reportError:function(m){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var C=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof m=="object"&&m!==null&&typeof m.message=="string"?String(m.message):String(m),error:m});if(!window.dispatchEvent(C))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",m);return}console.error(m)},_e={map:k,forEach:function(m,C,q){k(m,function(){C.apply(this,arguments)},q)},count:function(m){var C=0;return k(m,function(){C++}),C},toArray:function(m){return k(m,function(C){return C})||[]},only:function(m){if(!Pe(m))throw Error("React.Children.only expected to receive a single React element child.");return m}};return te.Activity=w,te.Children=_e,te.Component=j,te.Fragment=h,te.Profiler=_,te.PureComponent=K,te.StrictMode=s,te.Suspense=O,te.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=B,te.__COMPILER_RUNTIME={__proto__:null,c:function(m){return B.H.useMemoCache(m)}},te.cache=function(m){return function(){return m.apply(null,arguments)}},te.cacheSignal=function(){return null},te.cloneElement=function(m,C,q){if(m==null)throw Error("The argument must be a React element, but you passed "+m+".");var Y=ne({},m.props),$=m.key;if(C!=null)for(ie in C.key!==void 0&&($=""+C.key),C)!Oe.call(C,ie)||ie==="key"||ie==="__self"||ie==="__source"||ie==="ref"&&C.ref===void 0||(Y[ie]=C[ie]);var ie=arguments.length-2;if(ie===1)Y.children=q;else if(1<ie){for(var ge=Array(ie),We=0;We<ie;We++)ge[We]=arguments[We+2];Y.children=ge}return Je(m.type,$,Y)},te.createContext=function(m){return m={$$typeof:R,_currentValue:m,_currentValue2:m,_threadCount:0,Provider:null,Consumer:null},m.Provider=m,m.Consumer={$$typeof:D,_context:m},m},te.createElement=function(m,C,q){var Y,$={},ie=null;if(C!=null)for(Y in C.key!==void 0&&(ie=""+C.key),C)Oe.call(C,Y)&&Y!=="key"&&Y!=="__self"&&Y!=="__source"&&($[Y]=C[Y]);var ge=arguments.length-2;if(ge===1)$.children=q;else if(1<ge){for(var We=Array(ge),Le=0;Le<ge;Le++)We[Le]=arguments[Le+2];$.children=We}if(m&&m.defaultProps)for(Y in ge=m.defaultProps,ge)$[Y]===void 0&&($[Y]=ge[Y]);return Je(m,ie,$)},te.createRef=function(){return{current:null}},te.forwardRef=function(m){return{$$typeof:L,render:m}},te.isValidElement=Pe,te.lazy=function(m){return{$$typeof:Z,_payload:{_status:-1,_result:m},_init:F}},te.memo=function(m,C){return{$$typeof:x,type:m,compare:C===void 0?null:C}},te.startTransition=function(m){var C=B.T,q={};B.T=q;try{var Y=m(),$=B.S;$!==null&&$(q,Y),typeof Y=="object"&&Y!==null&&typeof Y.then=="function"&&Y.then(Te,ue)}catch(ie){ue(ie)}finally{C!==null&&q.types!==null&&(C.types=q.types),B.T=C}},te.unstable_useCacheRefresh=function(){return B.H.useCacheRefresh()},te.use=function(m){return B.H.use(m)},te.useActionState=function(m,C,q){return B.H.useActionState(m,C,q)},te.useCallback=function(m,C){return B.H.useCallback(m,C)},te.useContext=function(m){return B.H.useContext(m)},te.useDebugValue=function(){},te.useDeferredValue=function(m,C){return B.H.useDeferredValue(m,C)},te.useEffect=function(m,C){return B.H.useEffect(m,C)},te.useEffectEvent=function(m){return B.H.useEffectEvent(m)},te.useId=function(){return B.H.useId()},te.useImperativeHandle=function(m,C,q){return B.H.useImperativeHandle(m,C,q)},te.useInsertionEffect=function(m,C){return B.H.useInsertionEffect(m,C)},te.useLayoutEffect=function(m,C){return B.H.useLayoutEffect(m,C)},te.useMemo=function(m,C){return B.H.useMemo(m,C)},te.useOptimistic=function(m,C){return B.H.useOptimistic(m,C)},te.useReducer=function(m,C,q){return B.H.useReducer(m,C,q)},te.useRef=function(m){return B.H.useRef(m)},te.useState=function(m){return B.H.useState(m)},te.useSyncExternalStore=function(m,C,q){return B.H.useSyncExternalStore(m,C,q)},te.useTransition=function(){return B.H.useTransition()},te.version="19.2.4",te}var Yf;function Ju(){return Yf||(Yf=1,Nu.exports=Ah()),Nu.exports}var H=Ju();const om=Th(H);var Gu={exports:{}},ii={},Vu={exports:{}},Yu={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Xf;function Mh(){return Xf||(Xf=1,(function(d){function T(E,k){var F=E.length;E.push(k);e:for(;0<F;){var ue=F-1>>>1,_e=E[ue];if(0<_(_e,k))E[ue]=k,E[F]=_e,F=ue;else break e}}function h(E){return E.length===0?null:E[0]}function s(E){if(E.length===0)return null;var k=E[0],F=E.pop();if(F!==k){E[0]=F;e:for(var ue=0,_e=E.length,m=_e>>>1;ue<m;){var C=2*(ue+1)-1,q=E[C],Y=C+1,$=E[Y];if(0>_(q,F))Y<_e&&0>_($,q)?(E[ue]=$,E[Y]=F,ue=Y):(E[ue]=q,E[C]=F,ue=C);else if(Y<_e&&0>_($,F))E[ue]=$,E[Y]=F,ue=Y;else break e}}return k}function _(E,k){var F=E.sortIndex-k.sortIndex;return F!==0?F:E.id-k.id}if(d.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var D=performance;d.unstable_now=function(){return D.now()}}else{var R=Date,L=R.now();d.unstable_now=function(){return R.now()-L}}var O=[],x=[],Z=1,w=null,W=3,P=!1,ye=!1,ne=!1,oe=!1,j=typeof setTimeout=="function"?setTimeout:null,V=typeof clearTimeout=="function"?clearTimeout:null,K=typeof setImmediate<"u"?setImmediate:null;function G(E){for(var k=h(x);k!==null;){if(k.callback===null)s(x);else if(k.startTime<=E)s(x),k.sortIndex=k.expirationTime,T(O,k);else break;k=h(x)}}function he(E){if(ne=!1,G(E),!ye)if(h(O)!==null)ye=!0,Te||(Te=!0,Ue());else{var k=h(x);k!==null&&yt(he,k.startTime-E)}}var Te=!1,B=-1,Oe=5,Je=-1;function Me(){return oe?!0:!(d.unstable_now()-Je<Oe)}function Pe(){if(oe=!1,Te){var E=d.unstable_now();Je=E;var k=!0;try{e:{ye=!1,ne&&(ne=!1,V(B),B=-1),P=!0;var F=W;try{t:{for(G(E),w=h(O);w!==null&&!(w.expirationTime>E&&Me());){var ue=w.callback;if(typeof ue=="function"){w.callback=null,W=w.priorityLevel;var _e=ue(w.expirationTime<=E);if(E=d.unstable_now(),typeof _e=="function"){w.callback=_e,G(E),k=!0;break t}w===h(O)&&s(O),G(E)}else s(O);w=h(O)}if(w!==null)k=!0;else{var m=h(x);m!==null&&yt(he,m.startTime-E),k=!1}}break e}finally{w=null,W=F,P=!1}k=void 0}}finally{k?Ue():Te=!1}}}var Ue;if(typeof K=="function")Ue=function(){K(Pe)};else if(typeof MessageChannel<"u"){var Ct=new MessageChannel,re=Ct.port2;Ct.port1.onmessage=Pe,Ue=function(){re.postMessage(null)}}else Ue=function(){j(Pe,0)};function yt(E,k){B=j(function(){E(d.unstable_now())},k)}d.unstable_IdlePriority=5,d.unstable_ImmediatePriority=1,d.unstable_LowPriority=4,d.unstable_NormalPriority=3,d.unstable_Profiling=null,d.unstable_UserBlockingPriority=2,d.unstable_cancelCallback=function(E){E.callback=null},d.unstable_forceFrameRate=function(E){0>E||125<E?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):Oe=0<E?Math.floor(1e3/E):5},d.unstable_getCurrentPriorityLevel=function(){return W},d.unstable_next=function(E){switch(W){case 1:case 2:case 3:var k=3;break;default:k=W}var F=W;W=k;try{return E()}finally{W=F}},d.unstable_requestPaint=function(){oe=!0},d.unstable_runWithPriority=function(E,k){switch(E){case 1:case 2:case 3:case 4:case 5:break;default:E=3}var F=W;W=E;try{return k()}finally{W=F}},d.unstable_scheduleCallback=function(E,k,F){var ue=d.unstable_now();switch(typeof F=="object"&&F!==null?(F=F.delay,F=typeof F=="number"&&0<F?ue+F:ue):F=ue,E){case 1:var _e=-1;break;case 2:_e=250;break;case 5:_e=1073741823;break;case 4:_e=1e4;break;default:_e=5e3}return _e=F+_e,E={id:Z++,callback:k,priorityLevel:E,startTime:F,expirationTime:_e,sortIndex:-1},F>ue?(E.sortIndex=F,T(x,E),h(O)===null&&E===h(x)&&(ne?(V(B),B=-1):ne=!0,yt(he,F-ue))):(E.sortIndex=_e,T(O,E),ye||P||(ye=!0,Te||(Te=!0,Ue()))),E},d.unstable_shouldYield=Me,d.unstable_wrapCallback=function(E){var k=W;return function(){var F=W;W=k;try{return E.apply(this,arguments)}finally{W=F}}}})(Yu)),Yu}var Qf;function zh(){return Qf||(Qf=1,Vu.exports=Mh()),Vu.exports}var Xu={exports:{}},st={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Zf;function Ch(){if(Zf)return st;Zf=1;var d=Ju();function T(O){var x="https://react.dev/errors/"+O;if(1<arguments.length){x+="?args[]="+encodeURIComponent(arguments[1]);for(var Z=2;Z<arguments.length;Z++)x+="&args[]="+encodeURIComponent(arguments[Z])}return"Minified React error #"+O+"; visit "+x+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function h(){}var s={d:{f:h,r:function(){throw Error(T(522))},D:h,C:h,L:h,m:h,X:h,S:h,M:h},p:0,findDOMNode:null},_=Symbol.for("react.portal");function D(O,x,Z){var w=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:_,key:w==null?null:""+w,children:O,containerInfo:x,implementation:Z}}var R=d.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function L(O,x){if(O==="font")return"";if(typeof x=="string")return x==="use-credentials"?x:""}return st.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=s,st.createPortal=function(O,x){var Z=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!x||x.nodeType!==1&&x.nodeType!==9&&x.nodeType!==11)throw Error(T(299));return D(O,x,null,Z)},st.flushSync=function(O){var x=R.T,Z=s.p;try{if(R.T=null,s.p=2,O)return O()}finally{R.T=x,s.p=Z,s.d.f()}},st.preconnect=function(O,x){typeof O=="string"&&(x?(x=x.crossOrigin,x=typeof x=="string"?x==="use-credentials"?x:"":void 0):x=null,s.d.C(O,x))},st.prefetchDNS=function(O){typeof O=="string"&&s.d.D(O)},st.preinit=function(O,x){if(typeof O=="string"&&x&&typeof x.as=="string"){var Z=x.as,w=L(Z,x.crossOrigin),W=typeof x.integrity=="string"?x.integrity:void 0,P=typeof x.fetchPriority=="string"?x.fetchPriority:void 0;Z==="style"?s.d.S(O,typeof x.precedence=="string"?x.precedence:void 0,{crossOrigin:w,integrity:W,fetchPriority:P}):Z==="script"&&s.d.X(O,{crossOrigin:w,integrity:W,fetchPriority:P,nonce:typeof x.nonce=="string"?x.nonce:void 0})}},st.preinitModule=function(O,x){if(typeof O=="string")if(typeof x=="object"&&x!==null){if(x.as==null||x.as==="script"){var Z=L(x.as,x.crossOrigin);s.d.M(O,{crossOrigin:Z,integrity:typeof x.integrity=="string"?x.integrity:void 0,nonce:typeof x.nonce=="string"?x.nonce:void 0})}}else x==null&&s.d.M(O)},st.preload=function(O,x){if(typeof O=="string"&&typeof x=="object"&&x!==null&&typeof x.as=="string"){var Z=x.as,w=L(Z,x.crossOrigin);s.d.L(O,Z,{crossOrigin:w,integrity:typeof x.integrity=="string"?x.integrity:void 0,nonce:typeof x.nonce=="string"?x.nonce:void 0,type:typeof x.type=="string"?x.type:void 0,fetchPriority:typeof x.fetchPriority=="string"?x.fetchPriority:void 0,referrerPolicy:typeof x.referrerPolicy=="string"?x.referrerPolicy:void 0,imageSrcSet:typeof x.imageSrcSet=="string"?x.imageSrcSet:void 0,imageSizes:typeof x.imageSizes=="string"?x.imageSizes:void 0,media:typeof x.media=="string"?x.media:void 0})}},st.preloadModule=function(O,x){if(typeof O=="string")if(x){var Z=L(x.as,x.crossOrigin);s.d.m(O,{as:typeof x.as=="string"&&x.as!=="script"?x.as:void 0,crossOrigin:Z,integrity:typeof x.integrity=="string"?x.integrity:void 0})}else s.d.m(O)},st.requestFormReset=function(O){s.d.r(O)},st.unstable_batchedUpdates=function(O,x){return O(x)},st.useFormState=function(O,x,Z){return R.H.useFormState(O,x,Z)},st.useFormStatus=function(){return R.H.useHostTransitionStatus()},st.version="19.2.4",st}var Kf;function Dh(){if(Kf)return Xu.exports;Kf=1;function d(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(d)}catch(T){console.error(T)}}return d(),Xu.exports=Ch(),Xu.exports}/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Jf;function jh(){if(Jf)return ii;Jf=1;var d=zh(),T=Ju(),h=Dh();function s(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function _(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function D(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,(t.flags&4098)!==0&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function R(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function L(e){if(e.tag===31){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function O(e){if(D(e)!==e)throw Error(s(188))}function x(e){var t=e.alternate;if(!t){if(t=D(e),t===null)throw Error(s(188));return t!==e?null:e}for(var n=e,a=t;;){var l=n.return;if(l===null)break;var i=l.alternate;if(i===null){if(a=l.return,a!==null){n=a;continue}break}if(l.child===i.child){for(i=l.child;i;){if(i===n)return O(l),e;if(i===a)return O(l),t;i=i.sibling}throw Error(s(188))}if(n.return!==a.return)n=l,a=i;else{for(var o=!1,r=l.child;r;){if(r===n){o=!0,n=l,a=i;break}if(r===a){o=!0,a=l,n=i;break}r=r.sibling}if(!o){for(r=i.child;r;){if(r===n){o=!0,n=i,a=l;break}if(r===a){o=!0,a=i,n=l;break}r=r.sibling}if(!o)throw Error(s(189))}}if(n.alternate!==a)throw Error(s(190))}if(n.tag!==3)throw Error(s(188));return n.stateNode.current===n?e:t}function Z(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=Z(e),t!==null)return t;e=e.sibling}return null}var w=Object.assign,W=Symbol.for("react.element"),P=Symbol.for("react.transitional.element"),ye=Symbol.for("react.portal"),ne=Symbol.for("react.fragment"),oe=Symbol.for("react.strict_mode"),j=Symbol.for("react.profiler"),V=Symbol.for("react.consumer"),K=Symbol.for("react.context"),G=Symbol.for("react.forward_ref"),he=Symbol.for("react.suspense"),Te=Symbol.for("react.suspense_list"),B=Symbol.for("react.memo"),Oe=Symbol.for("react.lazy"),Je=Symbol.for("react.activity"),Me=Symbol.for("react.memo_cache_sentinel"),Pe=Symbol.iterator;function Ue(e){return e===null||typeof e!="object"?null:(e=Pe&&e[Pe]||e["@@iterator"],typeof e=="function"?e:null)}var Ct=Symbol.for("react.client.reference");function re(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===Ct?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case ne:return"Fragment";case j:return"Profiler";case oe:return"StrictMode";case he:return"Suspense";case Te:return"SuspenseList";case Je:return"Activity"}if(typeof e=="object")switch(e.$$typeof){case ye:return"Portal";case K:return e.displayName||"Context";case V:return(e._context.displayName||"Context")+".Consumer";case G:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case B:return t=e.displayName||null,t!==null?t:re(e.type)||"Memo";case Oe:t=e._payload,e=e._init;try{return re(e(t))}catch{}}return null}var yt=Array.isArray,E=T.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,k=h.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,F={pending:!1,data:null,method:null,action:null},ue=[],_e=-1;function m(e){return{current:e}}function C(e){0>_e||(e.current=ue[_e],ue[_e]=null,_e--)}function q(e,t){_e++,ue[_e]=e.current,e.current=t}var Y=m(null),$=m(null),ie=m(null),ge=m(null);function We(e,t){switch(q(ie,t),q($,e),q(Y,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?sf(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=sf(t),e=cf(t,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}C(Y),q(Y,e)}function Le(){C(Y),C($),C(ie)}function Zn(e){e.memoizedState!==null&&q(ge,e);var t=Y.current,n=cf(t,e.type);t!==n&&(q($,e),q(Y,n))}function Kn(e){$.current===e&&(C(Y),C($)),ge.current===e&&(C(ge),ei._currentValue=F)}var il,It;function Nt(e){if(il===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);il=t&&t[1]||"",It=-1<n.stack.indexOf(`
    at`)?" (<anonymous>)":-1<n.stack.indexOf("@")?"@unknown:0:0":""}return`
`+il+e+It}var pa=!1;function ha(e,t){if(!e||pa)return"";pa=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var a={DetermineComponentFrameRoot:function(){try{if(t){var z=function(){throw Error()};if(Object.defineProperty(z.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(z,[])}catch(S){var b=S}Reflect.construct(e,[],z)}else{try{z.call()}catch(S){b=S}e.call(z.prototype)}}else{try{throw Error()}catch(S){b=S}(z=e())&&typeof z.catch=="function"&&z.catch(function(){})}}catch(S){if(S&&b&&typeof S.stack=="string")return[S.stack,b.stack]}return[null,null]}};a.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var l=Object.getOwnPropertyDescriptor(a.DetermineComponentFrameRoot,"name");l&&l.configurable&&Object.defineProperty(a.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var i=a.DetermineComponentFrameRoot(),o=i[0],r=i[1];if(o&&r){var c=o.split(`
`),y=r.split(`
`);for(l=a=0;a<c.length&&!c[a].includes("DetermineComponentFrameRoot");)a++;for(;l<y.length&&!y[l].includes("DetermineComponentFrameRoot");)l++;if(a===c.length||l===y.length)for(a=c.length-1,l=y.length-1;1<=a&&0<=l&&c[a]!==y[l];)l--;for(;1<=a&&0<=l;a--,l--)if(c[a]!==y[l]){if(a!==1||l!==1)do if(a--,l--,0>l||c[a]!==y[l]){var A=`
`+c[a].replace(" at new "," at ");return e.displayName&&A.includes("<anonymous>")&&(A=A.replace("<anonymous>",e.displayName)),A}while(1<=a&&0<=l);break}}}finally{pa=!1,Error.prepareStackTrace=n}return(n=e?e.displayName||e.name:"")?Nt(n):""}function zo(e,t){switch(e.tag){case 26:case 27:case 5:return Nt(e.type);case 16:return Nt("Lazy");case 13:return e.child!==t&&t!==null?Nt("Suspense Fallback"):Nt("Suspense");case 19:return Nt("SuspenseList");case 0:case 15:return ha(e.type,!1);case 11:return ha(e.type.render,!1);case 1:return ha(e.type,!0);case 31:return Nt("Activity");default:return""}}function ol(e){try{var t="",n=null;do t+=zo(e,n),n=e,e=e.return;while(e);return t}catch(a){return`
Error generating stack: `+a.message+`
`+a.stack}}var ga=Object.prototype.hasOwnProperty,va=d.unstable_scheduleCallback,$e=d.unstable_cancelCallback,rl=d.unstable_shouldYield,ul=d.unstable_requestPaint,Ge=d.unstable_now,Co=d.unstable_getCurrentPriorityLevel,Do=d.unstable_ImmediatePriority,Jn=d.unstable_UserBlockingPriority,Dt=d.unstable_NormalPriority,ri=d.unstable_LowPriority,ya=d.unstable_IdlePriority,sl=d.log,ui=d.unstable_setDisableYieldValue,Qt=null,et=null;function bt(e){if(typeof sl=="function"&&ui(e),et&&typeof et.setStrictMode=="function")try{et.setStrictMode(Qt,e)}catch{}}var tt=Math.clz32?Math.clz32:Oo,ba=Math.log,jo=Math.LN2;function Oo(e){return e>>>=0,e===0?32:31-(ba(e)/jo|0)|0}var Pn=256,dt=262144,yn=4194304;function Zt(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function Fn(e,t,n){var a=e.pendingLanes;if(a===0)return 0;var l=0,i=e.suspendedLanes,o=e.pingedLanes;e=e.warmLanes;var r=a&134217727;return r!==0?(a=r&~i,a!==0?l=Zt(a):(o&=r,o!==0?l=Zt(o):n||(n=r&~e,n!==0&&(l=Zt(n))))):(r=a&~i,r!==0?l=Zt(r):o!==0?l=Zt(o):n||(n=a&~e,n!==0&&(l=Zt(n)))),l===0?0:t!==0&&t!==l&&(t&i)===0&&(i=l&-l,n=t&-t,i>=n||i===32&&(n&4194048)!==0)?t:l}function bn(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function si(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function cl(){var e=yn;return yn<<=1,(yn&62914560)===0&&(yn=4194304),e}function xa(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function xn(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function ci(e,t,n,a,l,i){var o=e.pendingLanes;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=n,e.entangledLanes&=n,e.errorRecoveryDisabledLanes&=n,e.shellSuspendCounter=0;var r=e.entanglements,c=e.expirationTimes,y=e.hiddenUpdates;for(n=o&~n;0<n;){var A=31-tt(n),z=1<<A;r[A]=0,c[A]=-1;var b=y[A];if(b!==null)for(y[A]=null,A=0;A<b.length;A++){var S=b[A];S!==null&&(S.lane&=-536870913)}n&=~z}a!==0&&dl(e,a,0),i!==0&&l===0&&e.tag!==0&&(e.suspendedLanes|=i&~(o&~t))}function dl(e,t,n){e.pendingLanes|=t,e.suspendedLanes&=~t;var a=31-tt(t);e.entangledLanes|=t,e.entanglements[a]=e.entanglements[a]|1073741824|n&261930}function fl(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var a=31-tt(n),l=1<<a;l&t|e[a]&t&&(e[a]|=t),n&=~l}}function ml(e,t){var n=t&-t;return n=(n&42)!==0?1:Sa(n),(n&(e.suspendedLanes|t))!==0?0:n}function Sa(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function Ta(e){return e&=-e,2<e?8<e?(e&134217727)!==0?32:268435456:8:2}function pl(){var e=k.p;return e!==0?e:(e=window.event,e===void 0?32:Rf(e.type))}function hl(e,t){var n=k.p;try{return k.p=e,t()}finally{k.p=n}}var Gt=Math.random().toString(36).slice(2),Ve="__reactFiber$"+Gt,lt="__reactProps$"+Gt,Wt="__reactContainer$"+Gt,g="__reactEvents$"+Gt,N="__reactListeners$"+Gt,ee="__reactHandles$"+Gt,me="__reactResources$"+Gt,ve="__reactMarker$"+Gt;function Ye(e){delete e[Ve],delete e[lt],delete e[g],delete e[N],delete e[ee]}function Fe(e){var t=e[Ve];if(t)return t;for(var n=e.parentNode;n;){if(t=n[Wt]||n[Ve]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=vf(e);e!==null;){if(n=e[Ve])return n;e=vf(e)}return t}e=n,n=e.parentNode}return null}function Sn(e){if(e=e[Ve]||e[Wt]){var t=e.tag;if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return e}return null}function gl(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(s(33))}function _a(e){var t=e[me];return t||(t=e[me]={hoistableStyles:new Map,hoistableScripts:new Map}),t}function nt(e){e[ve]=!0}var Fu=new Set,Iu={};function In(e,t){Ea(e,t),Ea(e+"Capture",t)}function Ea(e,t){for(Iu[e]=t,e=0;e<t.length;e++)Fu.add(t[e])}var mm=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),Wu={},$u={};function pm(e){return ga.call($u,e)?!0:ga.call(Wu,e)?!1:mm.test(e)?$u[e]=!0:(Wu[e]=!0,!1)}function di(e,t,n){if(pm(t))if(n===null)e.removeAttribute(t);else{switch(typeof n){case"undefined":case"function":case"symbol":e.removeAttribute(t);return;case"boolean":var a=t.toLowerCase().slice(0,5);if(a!=="data-"&&a!=="aria-"){e.removeAttribute(t);return}}e.setAttribute(t,""+n)}}function fi(e,t,n){if(n===null)e.removeAttribute(t);else{switch(typeof n){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(t);return}e.setAttribute(t,""+n)}}function $t(e,t,n,a){if(a===null)e.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(n);return}e.setAttributeNS(t,n,""+a)}}function jt(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function es(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function hm(e,t,n){var a=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&typeof a<"u"&&typeof a.get=="function"&&typeof a.set=="function"){var l=a.get,i=a.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return l.call(this)},set:function(o){n=""+o,i.call(this,o)}}),Object.defineProperty(e,t,{enumerable:a.enumerable}),{getValue:function(){return n},setValue:function(o){n=""+o},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function wo(e){if(!e._valueTracker){var t=es(e)?"checked":"value";e._valueTracker=hm(e,t,""+e[t])}}function ts(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),a="";return e&&(a=es(e)?e.checked?"true":"false":e.value),e=a,e!==n?(t.setValue(e),!0):!1}function mi(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}var gm=/[\n"\\]/g;function Ot(e){return e.replace(gm,function(t){return"\\"+t.charCodeAt(0).toString(16)+" "})}function Ro(e,t,n,a,l,i,o,r){e.name="",o!=null&&typeof o!="function"&&typeof o!="symbol"&&typeof o!="boolean"?e.type=o:e.removeAttribute("type"),t!=null?o==="number"?(t===0&&e.value===""||e.value!=t)&&(e.value=""+jt(t)):e.value!==""+jt(t)&&(e.value=""+jt(t)):o!=="submit"&&o!=="reset"||e.removeAttribute("value"),t!=null?Uo(e,o,jt(t)):n!=null?Uo(e,o,jt(n)):a!=null&&e.removeAttribute("value"),l==null&&i!=null&&(e.defaultChecked=!!i),l!=null&&(e.checked=l&&typeof l!="function"&&typeof l!="symbol"),r!=null&&typeof r!="function"&&typeof r!="symbol"&&typeof r!="boolean"?e.name=""+jt(r):e.removeAttribute("name")}function ns(e,t,n,a,l,i,o,r){if(i!=null&&typeof i!="function"&&typeof i!="symbol"&&typeof i!="boolean"&&(e.type=i),t!=null||n!=null){if(!(i!=="submit"&&i!=="reset"||t!=null)){wo(e);return}n=n!=null?""+jt(n):"",t=t!=null?""+jt(t):n,r||t===e.value||(e.value=t),e.defaultValue=t}a=a??l,a=typeof a!="function"&&typeof a!="symbol"&&!!a,e.checked=r?e.checked:!!a,e.defaultChecked=!!a,o!=null&&typeof o!="function"&&typeof o!="symbol"&&typeof o!="boolean"&&(e.name=o),wo(e)}function Uo(e,t,n){t==="number"&&mi(e.ownerDocument)===e||e.defaultValue===""+n||(e.defaultValue=""+n)}function Aa(e,t,n,a){if(e=e.options,t){t={};for(var l=0;l<n.length;l++)t["$"+n[l]]=!0;for(n=0;n<e.length;n++)l=t.hasOwnProperty("$"+e[n].value),e[n].selected!==l&&(e[n].selected=l),l&&a&&(e[n].defaultSelected=!0)}else{for(n=""+jt(n),t=null,l=0;l<e.length;l++){if(e[l].value===n){e[l].selected=!0,a&&(e[l].defaultSelected=!0);return}t!==null||e[l].disabled||(t=e[l])}t!==null&&(t.selected=!0)}}function as(e,t,n){if(t!=null&&(t=""+jt(t),t!==e.value&&(e.value=t),n==null)){e.defaultValue!==t&&(e.defaultValue=t);return}e.defaultValue=n!=null?""+jt(n):""}function ls(e,t,n,a){if(t==null){if(a!=null){if(n!=null)throw Error(s(92));if(yt(a)){if(1<a.length)throw Error(s(93));a=a[0]}n=a}n==null&&(n=""),t=n}n=jt(t),e.defaultValue=n,a=e.textContent,a===n&&a!==""&&a!==null&&(e.value=a),wo(e)}function Ma(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var vm=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function is(e,t,n){var a=t.indexOf("--")===0;n==null||typeof n=="boolean"||n===""?a?e.setProperty(t,""):t==="float"?e.cssFloat="":e[t]="":a?e.setProperty(t,n):typeof n!="number"||n===0||vm.has(t)?t==="float"?e.cssFloat=n:e[t]=(""+n).trim():e[t]=n+"px"}function os(e,t,n){if(t!=null&&typeof t!="object")throw Error(s(62));if(e=e.style,n!=null){for(var a in n)!n.hasOwnProperty(a)||t!=null&&t.hasOwnProperty(a)||(a.indexOf("--")===0?e.setProperty(a,""):a==="float"?e.cssFloat="":e[a]="");for(var l in t)a=t[l],t.hasOwnProperty(l)&&n[l]!==a&&is(e,l,a)}else for(var i in t)t.hasOwnProperty(i)&&is(e,i,t[i])}function ko(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var ym=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),bm=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function pi(e){return bm.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function en(){}var Lo=null;function Ho(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var za=null,Ca=null;function rs(e){var t=Sn(e);if(t&&(e=t.stateNode)){var n=e[lt]||null;e:switch(e=t.stateNode,t.type){case"input":if(Ro(e,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll('input[name="'+Ot(""+t)+'"][type="radio"]'),t=0;t<n.length;t++){var a=n[t];if(a!==e&&a.form===e.form){var l=a[lt]||null;if(!l)throw Error(s(90));Ro(a,l.value,l.defaultValue,l.defaultValue,l.checked,l.defaultChecked,l.type,l.name)}}for(t=0;t<n.length;t++)a=n[t],a.form===e.form&&ts(a)}break e;case"textarea":as(e,n.value,n.defaultValue);break e;case"select":t=n.value,t!=null&&Aa(e,!!n.multiple,t,!1)}}}var Bo=!1;function us(e,t,n){if(Bo)return e(t,n);Bo=!0;try{var a=e(t);return a}finally{if(Bo=!1,(za!==null||Ca!==null)&&(to(),za&&(t=za,e=Ca,Ca=za=null,rs(t),e)))for(t=0;t<e.length;t++)rs(e[t])}}function vl(e,t){var n=e.stateNode;if(n===null)return null;var a=n[lt]||null;if(a===null)return null;n=a[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(a=!a.disabled)||(e=e.type,a=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!a;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(s(231,t,typeof n));return n}var tn=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),qo=!1;if(tn)try{var yl={};Object.defineProperty(yl,"passive",{get:function(){qo=!0}}),window.addEventListener("test",yl,yl),window.removeEventListener("test",yl,yl)}catch{qo=!1}var Tn=null,No=null,hi=null;function ss(){if(hi)return hi;var e,t=No,n=t.length,a,l="value"in Tn?Tn.value:Tn.textContent,i=l.length;for(e=0;e<n&&t[e]===l[e];e++);var o=n-e;for(a=1;a<=o&&t[n-a]===l[i-a];a++);return hi=l.slice(e,1<a?1-a:void 0)}function gi(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function vi(){return!0}function cs(){return!1}function ft(e){function t(n,a,l,i,o){this._reactName=n,this._targetInst=l,this.type=a,this.nativeEvent=i,this.target=o,this.currentTarget=null;for(var r in e)e.hasOwnProperty(r)&&(n=e[r],this[r]=n?n(i):i[r]);return this.isDefaultPrevented=(i.defaultPrevented!=null?i.defaultPrevented:i.returnValue===!1)?vi:cs,this.isPropagationStopped=cs,this}return w(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=vi)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=vi)},persist:function(){},isPersistent:vi}),t}var Wn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},yi=ft(Wn),bl=w({},Wn,{view:0,detail:0}),xm=ft(bl),Go,Vo,xl,bi=w({},bl,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Xo,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==xl&&(xl&&e.type==="mousemove"?(Go=e.screenX-xl.screenX,Vo=e.screenY-xl.screenY):Vo=Go=0,xl=e),Go)},movementY:function(e){return"movementY"in e?e.movementY:Vo}}),ds=ft(bi),Sm=w({},bi,{dataTransfer:0}),Tm=ft(Sm),_m=w({},bl,{relatedTarget:0}),Yo=ft(_m),Em=w({},Wn,{animationName:0,elapsedTime:0,pseudoElement:0}),Am=ft(Em),Mm=w({},Wn,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),zm=ft(Mm),Cm=w({},Wn,{data:0}),fs=ft(Cm),Dm={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},jm={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Om={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function wm(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=Om[e])?!!t[e]:!1}function Xo(){return wm}var Rm=w({},bl,{key:function(e){if(e.key){var t=Dm[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=gi(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?jm[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Xo,charCode:function(e){return e.type==="keypress"?gi(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?gi(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),Um=ft(Rm),km=w({},bi,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),ms=ft(km),Lm=w({},bl,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Xo}),Hm=ft(Lm),Bm=w({},Wn,{propertyName:0,elapsedTime:0,pseudoElement:0}),qm=ft(Bm),Nm=w({},bi,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Gm=ft(Nm),Vm=w({},Wn,{newState:0,oldState:0}),Ym=ft(Vm),Xm=[9,13,27,32],Qo=tn&&"CompositionEvent"in window,Sl=null;tn&&"documentMode"in document&&(Sl=document.documentMode);var Qm=tn&&"TextEvent"in window&&!Sl,ps=tn&&(!Qo||Sl&&8<Sl&&11>=Sl),hs=" ",gs=!1;function vs(e,t){switch(e){case"keyup":return Xm.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function ys(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Da=!1;function Zm(e,t){switch(e){case"compositionend":return ys(t);case"keypress":return t.which!==32?null:(gs=!0,hs);case"textInput":return e=t.data,e===hs&&gs?null:e;default:return null}}function Km(e,t){if(Da)return e==="compositionend"||!Qo&&vs(e,t)?(e=ss(),hi=No=Tn=null,Da=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return ps&&t.locale!=="ko"?null:t.data;default:return null}}var Jm={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function bs(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!Jm[e.type]:t==="textarea"}function xs(e,t,n,a){za?Ca?Ca.push(a):Ca=[a]:za=a,t=uo(t,"onChange"),0<t.length&&(n=new yi("onChange","change",null,n,a),e.push({event:n,listeners:t}))}var Tl=null,_l=null;function Pm(e){nf(e,0)}function xi(e){var t=gl(e);if(ts(t))return e}function Ss(e,t){if(e==="change")return t}var Ts=!1;if(tn){var Zo;if(tn){var Ko="oninput"in document;if(!Ko){var _s=document.createElement("div");_s.setAttribute("oninput","return;"),Ko=typeof _s.oninput=="function"}Zo=Ko}else Zo=!1;Ts=Zo&&(!document.documentMode||9<document.documentMode)}function Es(){Tl&&(Tl.detachEvent("onpropertychange",As),_l=Tl=null)}function As(e){if(e.propertyName==="value"&&xi(_l)){var t=[];xs(t,_l,e,Ho(e)),us(Pm,t)}}function Fm(e,t,n){e==="focusin"?(Es(),Tl=t,_l=n,Tl.attachEvent("onpropertychange",As)):e==="focusout"&&Es()}function Im(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return xi(_l)}function Wm(e,t){if(e==="click")return xi(t)}function $m(e,t){if(e==="input"||e==="change")return xi(t)}function ep(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var xt=typeof Object.is=="function"?Object.is:ep;function El(e,t){if(xt(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),a=Object.keys(t);if(n.length!==a.length)return!1;for(a=0;a<n.length;a++){var l=n[a];if(!ga.call(t,l)||!xt(e[l],t[l]))return!1}return!0}function Ms(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function zs(e,t){var n=Ms(e);e=0;for(var a;n;){if(n.nodeType===3){if(a=e+n.textContent.length,e<=t&&a>=t)return{node:n,offset:t-e};e=a}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=Ms(n)}}function Cs(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Cs(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Ds(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=mi(e.document);t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=mi(e.document)}return t}function Jo(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}var tp=tn&&"documentMode"in document&&11>=document.documentMode,ja=null,Po=null,Al=null,Fo=!1;function js(e,t,n){var a=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Fo||ja==null||ja!==mi(a)||(a=ja,"selectionStart"in a&&Jo(a)?a={start:a.selectionStart,end:a.selectionEnd}:(a=(a.ownerDocument&&a.ownerDocument.defaultView||window).getSelection(),a={anchorNode:a.anchorNode,anchorOffset:a.anchorOffset,focusNode:a.focusNode,focusOffset:a.focusOffset}),Al&&El(Al,a)||(Al=a,a=uo(Po,"onSelect"),0<a.length&&(t=new yi("onSelect","select",null,t,n),e.push({event:t,listeners:a}),t.target=ja)))}function $n(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var Oa={animationend:$n("Animation","AnimationEnd"),animationiteration:$n("Animation","AnimationIteration"),animationstart:$n("Animation","AnimationStart"),transitionrun:$n("Transition","TransitionRun"),transitionstart:$n("Transition","TransitionStart"),transitioncancel:$n("Transition","TransitionCancel"),transitionend:$n("Transition","TransitionEnd")},Io={},Os={};tn&&(Os=document.createElement("div").style,"AnimationEvent"in window||(delete Oa.animationend.animation,delete Oa.animationiteration.animation,delete Oa.animationstart.animation),"TransitionEvent"in window||delete Oa.transitionend.transition);function ea(e){if(Io[e])return Io[e];if(!Oa[e])return e;var t=Oa[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in Os)return Io[e]=t[n];return e}var ws=ea("animationend"),Rs=ea("animationiteration"),Us=ea("animationstart"),np=ea("transitionrun"),ap=ea("transitionstart"),lp=ea("transitioncancel"),ks=ea("transitionend"),Ls=new Map,Wo="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");Wo.push("scrollEnd");function Vt(e,t){Ls.set(e,t),In(t,[e])}var Si=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},wt=[],wa=0,$o=0;function Ti(){for(var e=wa,t=$o=wa=0;t<e;){var n=wt[t];wt[t++]=null;var a=wt[t];wt[t++]=null;var l=wt[t];wt[t++]=null;var i=wt[t];if(wt[t++]=null,a!==null&&l!==null){var o=a.pending;o===null?l.next=l:(l.next=o.next,o.next=l),a.pending=l}i!==0&&Hs(n,l,i)}}function _i(e,t,n,a){wt[wa++]=e,wt[wa++]=t,wt[wa++]=n,wt[wa++]=a,$o|=a,e.lanes|=a,e=e.alternate,e!==null&&(e.lanes|=a)}function er(e,t,n,a){return _i(e,t,n,a),Ei(e)}function ta(e,t){return _i(e,null,null,t),Ei(e)}function Hs(e,t,n){e.lanes|=n;var a=e.alternate;a!==null&&(a.lanes|=n);for(var l=!1,i=e.return;i!==null;)i.childLanes|=n,a=i.alternate,a!==null&&(a.childLanes|=n),i.tag===22&&(e=i.stateNode,e===null||e._visibility&1||(l=!0)),e=i,i=i.return;return e.tag===3?(i=e.stateNode,l&&t!==null&&(l=31-tt(n),e=i.hiddenUpdates,a=e[l],a===null?e[l]=[t]:a.push(t),t.lane=n|536870912),i):null}function Ei(e){if(50<Kl)throw Kl=0,su=null,Error(s(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var Ra={};function ip(e,t,n,a){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=a,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function St(e,t,n,a){return new ip(e,t,n,a)}function tr(e){return e=e.prototype,!(!e||!e.isReactComponent)}function nn(e,t){var n=e.alternate;return n===null?(n=St(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&65011712,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n.refCleanup=e.refCleanup,n}function Bs(e,t){e.flags&=65011714;var n=e.alternate;return n===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=n.childLanes,e.lanes=n.lanes,e.child=n.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=n.memoizedProps,e.memoizedState=n.memoizedState,e.updateQueue=n.updateQueue,e.type=n.type,t=n.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function Ai(e,t,n,a,l,i){var o=0;if(a=e,typeof e=="function")tr(e)&&(o=1);else if(typeof e=="string")o=ch(e,n,Y.current)?26:e==="html"||e==="head"||e==="body"?27:5;else e:switch(e){case Je:return e=St(31,n,t,l),e.elementType=Je,e.lanes=i,e;case ne:return na(n.children,l,i,t);case oe:o=8,l|=24;break;case j:return e=St(12,n,t,l|2),e.elementType=j,e.lanes=i,e;case he:return e=St(13,n,t,l),e.elementType=he,e.lanes=i,e;case Te:return e=St(19,n,t,l),e.elementType=Te,e.lanes=i,e;default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case K:o=10;break e;case V:o=9;break e;case G:o=11;break e;case B:o=14;break e;case Oe:o=16,a=null;break e}o=29,n=Error(s(130,e===null?"null":typeof e,"")),a=null}return t=St(o,n,t,l),t.elementType=e,t.type=a,t.lanes=i,t}function na(e,t,n,a){return e=St(7,e,a,t),e.lanes=n,e}function nr(e,t,n){return e=St(6,e,null,t),e.lanes=n,e}function qs(e){var t=St(18,null,null,0);return t.stateNode=e,t}function ar(e,t,n){return t=St(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var Ns=new WeakMap;function Rt(e,t){if(typeof e=="object"&&e!==null){var n=Ns.get(e);return n!==void 0?n:(t={value:e,source:t,stack:ol(t)},Ns.set(e,t),t)}return{value:e,source:t,stack:ol(t)}}var Ua=[],ka=0,Mi=null,Ml=0,Ut=[],kt=0,_n=null,Kt=1,Jt="";function an(e,t){Ua[ka++]=Ml,Ua[ka++]=Mi,Mi=e,Ml=t}function Gs(e,t,n){Ut[kt++]=Kt,Ut[kt++]=Jt,Ut[kt++]=_n,_n=e;var a=Kt;e=Jt;var l=32-tt(a)-1;a&=~(1<<l),n+=1;var i=32-tt(t)+l;if(30<i){var o=l-l%5;i=(a&(1<<o)-1).toString(32),a>>=o,l-=o,Kt=1<<32-tt(t)+l|n<<l|a,Jt=i+e}else Kt=1<<i|n<<l|a,Jt=e}function lr(e){e.return!==null&&(an(e,1),Gs(e,1,0))}function ir(e){for(;e===Mi;)Mi=Ua[--ka],Ua[ka]=null,Ml=Ua[--ka],Ua[ka]=null;for(;e===_n;)_n=Ut[--kt],Ut[kt]=null,Jt=Ut[--kt],Ut[kt]=null,Kt=Ut[--kt],Ut[kt]=null}function Vs(e,t){Ut[kt++]=Kt,Ut[kt++]=Jt,Ut[kt++]=_n,Kt=t.id,Jt=t.overflow,_n=e}var it=null,we=null,pe=!1,En=null,Lt=!1,or=Error(s(519));function An(e){var t=Error(s(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw zl(Rt(t,e)),or}function Ys(e){var t=e.stateNode,n=e.type,a=e.memoizedProps;switch(t[Ve]=e,t[lt]=a,n){case"dialog":ce("cancel",t),ce("close",t);break;case"iframe":case"object":case"embed":ce("load",t);break;case"video":case"audio":for(n=0;n<Pl.length;n++)ce(Pl[n],t);break;case"source":ce("error",t);break;case"img":case"image":case"link":ce("error",t),ce("load",t);break;case"details":ce("toggle",t);break;case"input":ce("invalid",t),ns(t,a.value,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name,!0);break;case"select":ce("invalid",t);break;case"textarea":ce("invalid",t),ls(t,a.value,a.defaultValue,a.children)}n=a.children,typeof n!="string"&&typeof n!="number"&&typeof n!="bigint"||t.textContent===""+n||a.suppressHydrationWarning===!0||rf(t.textContent,n)?(a.popover!=null&&(ce("beforetoggle",t),ce("toggle",t)),a.onScroll!=null&&ce("scroll",t),a.onScrollEnd!=null&&ce("scrollend",t),a.onClick!=null&&(t.onclick=en),t=!0):t=!1,t||An(e,!0)}function Xs(e){for(it=e.return;it;)switch(it.tag){case 5:case 31:case 13:Lt=!1;return;case 27:case 3:Lt=!0;return;default:it=it.return}}function La(e){if(e!==it)return!1;if(!pe)return Xs(e),pe=!0,!1;var t=e.tag,n;if((n=t!==3&&t!==27)&&((n=t===5)&&(n=e.type,n=!(n!=="form"&&n!=="button")||Eu(e.type,e.memoizedProps)),n=!n),n&&we&&An(e),Xs(e),t===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(s(317));we=gf(e)}else if(t===31){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(s(317));we=gf(e)}else t===27?(t=we,qn(e.type)?(e=Du,Du=null,we=e):we=t):we=it?Bt(e.stateNode.nextSibling):null;return!0}function aa(){we=it=null,pe=!1}function rr(){var e=En;return e!==null&&(gt===null?gt=e:gt.push.apply(gt,e),En=null),e}function zl(e){En===null?En=[e]:En.push(e)}var ur=m(null),la=null,ln=null;function Mn(e,t,n){q(ur,t._currentValue),t._currentValue=n}function on(e){e._currentValue=ur.current,C(ur)}function sr(e,t,n){for(;e!==null;){var a=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,a!==null&&(a.childLanes|=t)):a!==null&&(a.childLanes&t)!==t&&(a.childLanes|=t),e===n)break;e=e.return}}function cr(e,t,n,a){var l=e.child;for(l!==null&&(l.return=e);l!==null;){var i=l.dependencies;if(i!==null){var o=l.child;i=i.firstContext;e:for(;i!==null;){var r=i;i=l;for(var c=0;c<t.length;c++)if(r.context===t[c]){i.lanes|=n,r=i.alternate,r!==null&&(r.lanes|=n),sr(i.return,n,e),a||(o=null);break e}i=r.next}}else if(l.tag===18){if(o=l.return,o===null)throw Error(s(341));o.lanes|=n,i=o.alternate,i!==null&&(i.lanes|=n),sr(o,n,e),o=null}else o=l.child;if(o!==null)o.return=l;else for(o=l;o!==null;){if(o===e){o=null;break}if(l=o.sibling,l!==null){l.return=o.return,o=l;break}o=o.return}l=o}}function Ha(e,t,n,a){e=null;for(var l=t,i=!1;l!==null;){if(!i){if((l.flags&524288)!==0)i=!0;else if((l.flags&262144)!==0)break}if(l.tag===10){var o=l.alternate;if(o===null)throw Error(s(387));if(o=o.memoizedProps,o!==null){var r=l.type;xt(l.pendingProps.value,o.value)||(e!==null?e.push(r):e=[r])}}else if(l===ge.current){if(o=l.alternate,o===null)throw Error(s(387));o.memoizedState.memoizedState!==l.memoizedState.memoizedState&&(e!==null?e.push(ei):e=[ei])}l=l.return}e!==null&&cr(t,e,n,a),t.flags|=262144}function zi(e){for(e=e.firstContext;e!==null;){if(!xt(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function ia(e){la=e,ln=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function ot(e){return Qs(la,e)}function Ci(e,t){return la===null&&ia(e),Qs(e,t)}function Qs(e,t){var n=t._currentValue;if(t={context:t,memoizedValue:n,next:null},ln===null){if(e===null)throw Error(s(308));ln=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else ln=ln.next=t;return n}var op=typeof AbortController<"u"?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(n,a){e.push(a)}};this.abort=function(){t.aborted=!0,e.forEach(function(n){return n()})}},rp=d.unstable_scheduleCallback,up=d.unstable_NormalPriority,Xe={$$typeof:K,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function dr(){return{controller:new op,data:new Map,refCount:0}}function Cl(e){e.refCount--,e.refCount===0&&rp(up,function(){e.controller.abort()})}var Dl=null,fr=0,Ba=0,qa=null;function sp(e,t){if(Dl===null){var n=Dl=[];fr=0,Ba=hu(),qa={status:"pending",value:void 0,then:function(a){n.push(a)}}}return fr++,t.then(Zs,Zs),t}function Zs(){if(--fr===0&&Dl!==null){qa!==null&&(qa.status="fulfilled");var e=Dl;Dl=null,Ba=0,qa=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function cp(e,t){var n=[],a={status:"pending",value:null,reason:null,then:function(l){n.push(l)}};return e.then(function(){a.status="fulfilled",a.value=t;for(var l=0;l<n.length;l++)(0,n[l])(t)},function(l){for(a.status="rejected",a.reason=l,l=0;l<n.length;l++)(0,n[l])(void 0)}),a}var Ks=E.S;E.S=function(e,t){jd=Ge(),typeof t=="object"&&t!==null&&typeof t.then=="function"&&sp(e,t),Ks!==null&&Ks(e,t)};var oa=m(null);function mr(){var e=oa.current;return e!==null?e:je.pooledCache}function Di(e,t){t===null?q(oa,oa.current):q(oa,t.pool)}function Js(){var e=mr();return e===null?null:{parent:Xe._currentValue,pool:e}}var Na=Error(s(460)),pr=Error(s(474)),ji=Error(s(542)),Oi={then:function(){}};function Ps(e){return e=e.status,e==="fulfilled"||e==="rejected"}function Fs(e,t,n){switch(n=e[n],n===void 0?e.push(t):n!==t&&(t.then(en,en),t=n),t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,Ws(e),e;default:if(typeof t.status=="string")t.then(en,en);else{if(e=je,e!==null&&100<e.shellSuspendCounter)throw Error(s(482));e=t,e.status="pending",e.then(function(a){if(t.status==="pending"){var l=t;l.status="fulfilled",l.value=a}},function(a){if(t.status==="pending"){var l=t;l.status="rejected",l.reason=a}})}switch(t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,Ws(e),e}throw ua=t,Na}}function ra(e){try{var t=e._init;return t(e._payload)}catch(n){throw n!==null&&typeof n=="object"&&typeof n.then=="function"?(ua=n,Na):n}}var ua=null;function Is(){if(ua===null)throw Error(s(459));var e=ua;return ua=null,e}function Ws(e){if(e===Na||e===ji)throw Error(s(483))}var Ga=null,jl=0;function wi(e){var t=jl;return jl+=1,Ga===null&&(Ga=[]),Fs(Ga,e,t)}function Ol(e,t){t=t.props.ref,e.ref=t!==void 0?t:null}function Ri(e,t){throw t.$$typeof===W?Error(s(525)):(e=Object.prototype.toString.call(t),Error(s(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)))}function $s(e){function t(p,f){if(e){var v=p.deletions;v===null?(p.deletions=[f],p.flags|=16):v.push(f)}}function n(p,f){if(!e)return null;for(;f!==null;)t(p,f),f=f.sibling;return null}function a(p){for(var f=new Map;p!==null;)p.key!==null?f.set(p.key,p):f.set(p.index,p),p=p.sibling;return f}function l(p,f){return p=nn(p,f),p.index=0,p.sibling=null,p}function i(p,f,v){return p.index=v,e?(v=p.alternate,v!==null?(v=v.index,v<f?(p.flags|=67108866,f):v):(p.flags|=67108866,f)):(p.flags|=1048576,f)}function o(p){return e&&p.alternate===null&&(p.flags|=67108866),p}function r(p,f,v,M){return f===null||f.tag!==6?(f=nr(v,p.mode,M),f.return=p,f):(f=l(f,v),f.return=p,f)}function c(p,f,v,M){var J=v.type;return J===ne?A(p,f,v.props.children,M,v.key):f!==null&&(f.elementType===J||typeof J=="object"&&J!==null&&J.$$typeof===Oe&&ra(J)===f.type)?(f=l(f,v.props),Ol(f,v),f.return=p,f):(f=Ai(v.type,v.key,v.props,null,p.mode,M),Ol(f,v),f.return=p,f)}function y(p,f,v,M){return f===null||f.tag!==4||f.stateNode.containerInfo!==v.containerInfo||f.stateNode.implementation!==v.implementation?(f=ar(v,p.mode,M),f.return=p,f):(f=l(f,v.children||[]),f.return=p,f)}function A(p,f,v,M,J){return f===null||f.tag!==7?(f=na(v,p.mode,M,J),f.return=p,f):(f=l(f,v),f.return=p,f)}function z(p,f,v){if(typeof f=="string"&&f!==""||typeof f=="number"||typeof f=="bigint")return f=nr(""+f,p.mode,v),f.return=p,f;if(typeof f=="object"&&f!==null){switch(f.$$typeof){case P:return v=Ai(f.type,f.key,f.props,null,p.mode,v),Ol(v,f),v.return=p,v;case ye:return f=ar(f,p.mode,v),f.return=p,f;case Oe:return f=ra(f),z(p,f,v)}if(yt(f)||Ue(f))return f=na(f,p.mode,v,null),f.return=p,f;if(typeof f.then=="function")return z(p,wi(f),v);if(f.$$typeof===K)return z(p,Ci(p,f),v);Ri(p,f)}return null}function b(p,f,v,M){var J=f!==null?f.key:null;if(typeof v=="string"&&v!==""||typeof v=="number"||typeof v=="bigint")return J!==null?null:r(p,f,""+v,M);if(typeof v=="object"&&v!==null){switch(v.$$typeof){case P:return v.key===J?c(p,f,v,M):null;case ye:return v.key===J?y(p,f,v,M):null;case Oe:return v=ra(v),b(p,f,v,M)}if(yt(v)||Ue(v))return J!==null?null:A(p,f,v,M,null);if(typeof v.then=="function")return b(p,f,wi(v),M);if(v.$$typeof===K)return b(p,f,Ci(p,v),M);Ri(p,v)}return null}function S(p,f,v,M,J){if(typeof M=="string"&&M!==""||typeof M=="number"||typeof M=="bigint")return p=p.get(v)||null,r(f,p,""+M,J);if(typeof M=="object"&&M!==null){switch(M.$$typeof){case P:return p=p.get(M.key===null?v:M.key)||null,c(f,p,M,J);case ye:return p=p.get(M.key===null?v:M.key)||null,y(f,p,M,J);case Oe:return M=ra(M),S(p,f,v,M,J)}if(yt(M)||Ue(M))return p=p.get(v)||null,A(f,p,M,J,null);if(typeof M.then=="function")return S(p,f,v,wi(M),J);if(M.$$typeof===K)return S(p,f,v,Ci(f,M),J);Ri(f,M)}return null}function X(p,f,v,M){for(var J=null,be=null,Q=f,le=f=0,fe=null;Q!==null&&le<v.length;le++){Q.index>le?(fe=Q,Q=null):fe=Q.sibling;var xe=b(p,Q,v[le],M);if(xe===null){Q===null&&(Q=fe);break}e&&Q&&xe.alternate===null&&t(p,Q),f=i(xe,f,le),be===null?J=xe:be.sibling=xe,be=xe,Q=fe}if(le===v.length)return n(p,Q),pe&&an(p,le),J;if(Q===null){for(;le<v.length;le++)Q=z(p,v[le],M),Q!==null&&(f=i(Q,f,le),be===null?J=Q:be.sibling=Q,be=Q);return pe&&an(p,le),J}for(Q=a(Q);le<v.length;le++)fe=S(Q,p,le,v[le],M),fe!==null&&(e&&fe.alternate!==null&&Q.delete(fe.key===null?le:fe.key),f=i(fe,f,le),be===null?J=fe:be.sibling=fe,be=fe);return e&&Q.forEach(function(Xn){return t(p,Xn)}),pe&&an(p,le),J}function I(p,f,v,M){if(v==null)throw Error(s(151));for(var J=null,be=null,Q=f,le=f=0,fe=null,xe=v.next();Q!==null&&!xe.done;le++,xe=v.next()){Q.index>le?(fe=Q,Q=null):fe=Q.sibling;var Xn=b(p,Q,xe.value,M);if(Xn===null){Q===null&&(Q=fe);break}e&&Q&&Xn.alternate===null&&t(p,Q),f=i(Xn,f,le),be===null?J=Xn:be.sibling=Xn,be=Xn,Q=fe}if(xe.done)return n(p,Q),pe&&an(p,le),J;if(Q===null){for(;!xe.done;le++,xe=v.next())xe=z(p,xe.value,M),xe!==null&&(f=i(xe,f,le),be===null?J=xe:be.sibling=xe,be=xe);return pe&&an(p,le),J}for(Q=a(Q);!xe.done;le++,xe=v.next())xe=S(Q,p,le,xe.value,M),xe!==null&&(e&&xe.alternate!==null&&Q.delete(xe.key===null?le:xe.key),f=i(xe,f,le),be===null?J=xe:be.sibling=xe,be=xe);return e&&Q.forEach(function(Sh){return t(p,Sh)}),pe&&an(p,le),J}function De(p,f,v,M){if(typeof v=="object"&&v!==null&&v.type===ne&&v.key===null&&(v=v.props.children),typeof v=="object"&&v!==null){switch(v.$$typeof){case P:e:{for(var J=v.key;f!==null;){if(f.key===J){if(J=v.type,J===ne){if(f.tag===7){n(p,f.sibling),M=l(f,v.props.children),M.return=p,p=M;break e}}else if(f.elementType===J||typeof J=="object"&&J!==null&&J.$$typeof===Oe&&ra(J)===f.type){n(p,f.sibling),M=l(f,v.props),Ol(M,v),M.return=p,p=M;break e}n(p,f);break}else t(p,f);f=f.sibling}v.type===ne?(M=na(v.props.children,p.mode,M,v.key),M.return=p,p=M):(M=Ai(v.type,v.key,v.props,null,p.mode,M),Ol(M,v),M.return=p,p=M)}return o(p);case ye:e:{for(J=v.key;f!==null;){if(f.key===J)if(f.tag===4&&f.stateNode.containerInfo===v.containerInfo&&f.stateNode.implementation===v.implementation){n(p,f.sibling),M=l(f,v.children||[]),M.return=p,p=M;break e}else{n(p,f);break}else t(p,f);f=f.sibling}M=ar(v,p.mode,M),M.return=p,p=M}return o(p);case Oe:return v=ra(v),De(p,f,v,M)}if(yt(v))return X(p,f,v,M);if(Ue(v)){if(J=Ue(v),typeof J!="function")throw Error(s(150));return v=J.call(v),I(p,f,v,M)}if(typeof v.then=="function")return De(p,f,wi(v),M);if(v.$$typeof===K)return De(p,f,Ci(p,v),M);Ri(p,v)}return typeof v=="string"&&v!==""||typeof v=="number"||typeof v=="bigint"?(v=""+v,f!==null&&f.tag===6?(n(p,f.sibling),M=l(f,v),M.return=p,p=M):(n(p,f),M=nr(v,p.mode,M),M.return=p,p=M),o(p)):n(p,f)}return function(p,f,v,M){try{jl=0;var J=De(p,f,v,M);return Ga=null,J}catch(Q){if(Q===Na||Q===ji)throw Q;var be=St(29,Q,null,p.mode);return be.lanes=M,be.return=p,be}finally{}}}var sa=$s(!0),ec=$s(!1),zn=!1;function hr(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function gr(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function Cn(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function Dn(e,t,n){var a=e.updateQueue;if(a===null)return null;if(a=a.shared,(Se&2)!==0){var l=a.pending;return l===null?t.next=t:(t.next=l.next,l.next=t),a.pending=t,t=Ei(e),Hs(e,null,n),t}return _i(e,a,t,n),Ei(e)}function wl(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194048)!==0)){var a=t.lanes;a&=e.pendingLanes,n|=a,t.lanes=n,fl(e,n)}}function vr(e,t){var n=e.updateQueue,a=e.alternate;if(a!==null&&(a=a.updateQueue,n===a)){var l=null,i=null;if(n=n.firstBaseUpdate,n!==null){do{var o={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};i===null?l=i=o:i=i.next=o,n=n.next}while(n!==null);i===null?l=i=t:i=i.next=t}else l=i=t;n={baseState:a.baseState,firstBaseUpdate:l,lastBaseUpdate:i,shared:a.shared,callbacks:a.callbacks},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}var yr=!1;function Rl(){if(yr){var e=qa;if(e!==null)throw e}}function Ul(e,t,n,a){yr=!1;var l=e.updateQueue;zn=!1;var i=l.firstBaseUpdate,o=l.lastBaseUpdate,r=l.shared.pending;if(r!==null){l.shared.pending=null;var c=r,y=c.next;c.next=null,o===null?i=y:o.next=y,o=c;var A=e.alternate;A!==null&&(A=A.updateQueue,r=A.lastBaseUpdate,r!==o&&(r===null?A.firstBaseUpdate=y:r.next=y,A.lastBaseUpdate=c))}if(i!==null){var z=l.baseState;o=0,A=y=c=null,r=i;do{var b=r.lane&-536870913,S=b!==r.lane;if(S?(de&b)===b:(a&b)===b){b!==0&&b===Ba&&(yr=!0),A!==null&&(A=A.next={lane:0,tag:r.tag,payload:r.payload,callback:null,next:null});e:{var X=e,I=r;b=t;var De=n;switch(I.tag){case 1:if(X=I.payload,typeof X=="function"){z=X.call(De,z,b);break e}z=X;break e;case 3:X.flags=X.flags&-65537|128;case 0:if(X=I.payload,b=typeof X=="function"?X.call(De,z,b):X,b==null)break e;z=w({},z,b);break e;case 2:zn=!0}}b=r.callback,b!==null&&(e.flags|=64,S&&(e.flags|=8192),S=l.callbacks,S===null?l.callbacks=[b]:S.push(b))}else S={lane:b,tag:r.tag,payload:r.payload,callback:r.callback,next:null},A===null?(y=A=S,c=z):A=A.next=S,o|=b;if(r=r.next,r===null){if(r=l.shared.pending,r===null)break;S=r,r=S.next,S.next=null,l.lastBaseUpdate=S,l.shared.pending=null}}while(!0);A===null&&(c=z),l.baseState=c,l.firstBaseUpdate=y,l.lastBaseUpdate=A,i===null&&(l.shared.lanes=0),Un|=o,e.lanes=o,e.memoizedState=z}}function tc(e,t){if(typeof e!="function")throw Error(s(191,e));e.call(t)}function nc(e,t){var n=e.callbacks;if(n!==null)for(e.callbacks=null,e=0;e<n.length;e++)tc(n[e],t)}var Va=m(null),Ui=m(0);function ac(e,t){e=hn,q(Ui,e),q(Va,t),hn=e|t.baseLanes}function br(){q(Ui,hn),q(Va,Va.current)}function xr(){hn=Ui.current,C(Va),C(Ui)}var Tt=m(null),Ht=null;function jn(e){var t=e.alternate;q(qe,qe.current&1),q(Tt,e),Ht===null&&(t===null||Va.current!==null||t.memoizedState!==null)&&(Ht=e)}function Sr(e){q(qe,qe.current),q(Tt,e),Ht===null&&(Ht=e)}function lc(e){e.tag===22?(q(qe,qe.current),q(Tt,e),Ht===null&&(Ht=e)):On()}function On(){q(qe,qe.current),q(Tt,Tt.current)}function _t(e){C(Tt),Ht===e&&(Ht=null),C(qe)}var qe=m(0);function ki(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||zu(n)||Cu(n)))return t}else if(t.tag===19&&(t.memoizedProps.revealOrder==="forwards"||t.memoizedProps.revealOrder==="backwards"||t.memoizedProps.revealOrder==="unstable_legacy-backwards"||t.memoizedProps.revealOrder==="together")){if((t.flags&128)!==0)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var rn=0,ae=null,ze=null,Qe=null,Li=!1,Ya=!1,ca=!1,Hi=0,kl=0,Xa=null,dp=0;function He(){throw Error(s(321))}function Tr(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!xt(e[n],t[n]))return!1;return!0}function _r(e,t,n,a,l,i){return rn=i,ae=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,E.H=e===null||e.memoizedState===null?Gc:Br,ca=!1,i=n(a,l),ca=!1,Ya&&(i=oc(t,n,a,l)),ic(e),i}function ic(e){E.H=Bl;var t=ze!==null&&ze.next!==null;if(rn=0,Qe=ze=ae=null,Li=!1,kl=0,Xa=null,t)throw Error(s(300));e===null||Ze||(e=e.dependencies,e!==null&&zi(e)&&(Ze=!0))}function oc(e,t,n,a){ae=e;var l=0;do{if(Ya&&(Xa=null),kl=0,Ya=!1,25<=l)throw Error(s(301));if(l+=1,Qe=ze=null,e.updateQueue!=null){var i=e.updateQueue;i.lastEffect=null,i.events=null,i.stores=null,i.memoCache!=null&&(i.memoCache.index=0)}E.H=Vc,i=t(n,a)}while(Ya);return i}function fp(){var e=E.H,t=e.useState()[0];return t=typeof t.then=="function"?Ll(t):t,e=e.useState()[0],(ze!==null?ze.memoizedState:null)!==e&&(ae.flags|=1024),t}function Er(){var e=Hi!==0;return Hi=0,e}function Ar(e,t,n){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~n}function Mr(e){if(Li){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}Li=!1}rn=0,Qe=ze=ae=null,Ya=!1,kl=Hi=0,Xa=null}function ct(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Qe===null?ae.memoizedState=Qe=e:Qe=Qe.next=e,Qe}function Ne(){if(ze===null){var e=ae.alternate;e=e!==null?e.memoizedState:null}else e=ze.next;var t=Qe===null?ae.memoizedState:Qe.next;if(t!==null)Qe=t,ze=e;else{if(e===null)throw ae.alternate===null?Error(s(467)):Error(s(310));ze=e,e={memoizedState:ze.memoizedState,baseState:ze.baseState,baseQueue:ze.baseQueue,queue:ze.queue,next:null},Qe===null?ae.memoizedState=Qe=e:Qe=Qe.next=e}return Qe}function Bi(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function Ll(e){var t=kl;return kl+=1,Xa===null&&(Xa=[]),e=Fs(Xa,e,t),t=ae,(Qe===null?t.memoizedState:Qe.next)===null&&(t=t.alternate,E.H=t===null||t.memoizedState===null?Gc:Br),e}function qi(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return Ll(e);if(e.$$typeof===K)return ot(e)}throw Error(s(438,String(e)))}function zr(e){var t=null,n=ae.updateQueue;if(n!==null&&(t=n.memoCache),t==null){var a=ae.alternate;a!==null&&(a=a.updateQueue,a!==null&&(a=a.memoCache,a!=null&&(t={data:a.data.map(function(l){return l.slice()}),index:0})))}if(t==null&&(t={data:[],index:0}),n===null&&(n=Bi(),ae.updateQueue=n),n.memoCache=t,n=t.data[t.index],n===void 0)for(n=t.data[t.index]=Array(e),a=0;a<e;a++)n[a]=Me;return t.index++,n}function un(e,t){return typeof t=="function"?t(e):t}function Ni(e){var t=Ne();return Cr(t,ze,e)}function Cr(e,t,n){var a=e.queue;if(a===null)throw Error(s(311));a.lastRenderedReducer=n;var l=e.baseQueue,i=a.pending;if(i!==null){if(l!==null){var o=l.next;l.next=i.next,i.next=o}t.baseQueue=l=i,a.pending=null}if(i=e.baseState,l===null)e.memoizedState=i;else{t=l.next;var r=o=null,c=null,y=t,A=!1;do{var z=y.lane&-536870913;if(z!==y.lane?(de&z)===z:(rn&z)===z){var b=y.revertLane;if(b===0)c!==null&&(c=c.next={lane:0,revertLane:0,gesture:null,action:y.action,hasEagerState:y.hasEagerState,eagerState:y.eagerState,next:null}),z===Ba&&(A=!0);else if((rn&b)===b){y=y.next,b===Ba&&(A=!0);continue}else z={lane:0,revertLane:y.revertLane,gesture:null,action:y.action,hasEagerState:y.hasEagerState,eagerState:y.eagerState,next:null},c===null?(r=c=z,o=i):c=c.next=z,ae.lanes|=b,Un|=b;z=y.action,ca&&n(i,z),i=y.hasEagerState?y.eagerState:n(i,z)}else b={lane:z,revertLane:y.revertLane,gesture:y.gesture,action:y.action,hasEagerState:y.hasEagerState,eagerState:y.eagerState,next:null},c===null?(r=c=b,o=i):c=c.next=b,ae.lanes|=z,Un|=z;y=y.next}while(y!==null&&y!==t);if(c===null?o=i:c.next=r,!xt(i,e.memoizedState)&&(Ze=!0,A&&(n=qa,n!==null)))throw n;e.memoizedState=i,e.baseState=o,e.baseQueue=c,a.lastRenderedState=i}return l===null&&(a.lanes=0),[e.memoizedState,a.dispatch]}function Dr(e){var t=Ne(),n=t.queue;if(n===null)throw Error(s(311));n.lastRenderedReducer=e;var a=n.dispatch,l=n.pending,i=t.memoizedState;if(l!==null){n.pending=null;var o=l=l.next;do i=e(i,o.action),o=o.next;while(o!==l);xt(i,t.memoizedState)||(Ze=!0),t.memoizedState=i,t.baseQueue===null&&(t.baseState=i),n.lastRenderedState=i}return[i,a]}function rc(e,t,n){var a=ae,l=Ne(),i=pe;if(i){if(n===void 0)throw Error(s(407));n=n()}else n=t();var o=!xt((ze||l).memoizedState,n);if(o&&(l.memoizedState=n,Ze=!0),l=l.queue,wr(cc.bind(null,a,l,e),[e]),l.getSnapshot!==t||o||Qe!==null&&Qe.memoizedState.tag&1){if(a.flags|=2048,Qa(9,{destroy:void 0},sc.bind(null,a,l,n,t),null),je===null)throw Error(s(349));i||(rn&127)!==0||uc(a,t,n)}return n}function uc(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=ae.updateQueue,t===null?(t=Bi(),ae.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function sc(e,t,n,a){t.value=n,t.getSnapshot=a,dc(t)&&fc(e)}function cc(e,t,n){return n(function(){dc(t)&&fc(e)})}function dc(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!xt(e,n)}catch{return!0}}function fc(e){var t=ta(e,2);t!==null&&vt(t,e,2)}function jr(e){var t=ct();if(typeof e=="function"){var n=e;if(e=n(),ca){bt(!0);try{n()}finally{bt(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:un,lastRenderedState:e},t}function mc(e,t,n,a){return e.baseState=n,Cr(e,ze,typeof a=="function"?a:un)}function mp(e,t,n,a,l){if(Yi(e))throw Error(s(485));if(e=t.action,e!==null){var i={payload:l,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(o){i.listeners.push(o)}};E.T!==null?n(!0):i.isTransition=!1,a(i),n=t.pending,n===null?(i.next=t.pending=i,pc(t,i)):(i.next=n.next,t.pending=n.next=i)}}function pc(e,t){var n=t.action,a=t.payload,l=e.state;if(t.isTransition){var i=E.T,o={};E.T=o;try{var r=n(l,a),c=E.S;c!==null&&c(o,r),hc(e,t,r)}catch(y){Or(e,t,y)}finally{i!==null&&o.types!==null&&(i.types=o.types),E.T=i}}else try{i=n(l,a),hc(e,t,i)}catch(y){Or(e,t,y)}}function hc(e,t,n){n!==null&&typeof n=="object"&&typeof n.then=="function"?n.then(function(a){gc(e,t,a)},function(a){return Or(e,t,a)}):gc(e,t,n)}function gc(e,t,n){t.status="fulfilled",t.value=n,vc(t),e.state=n,t=e.pending,t!==null&&(n=t.next,n===t?e.pending=null:(n=n.next,t.next=n,pc(e,n)))}function Or(e,t,n){var a=e.pending;if(e.pending=null,a!==null){a=a.next;do t.status="rejected",t.reason=n,vc(t),t=t.next;while(t!==a)}e.action=null}function vc(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function yc(e,t){return t}function bc(e,t){if(pe){var n=je.formState;if(n!==null){e:{var a=ae;if(pe){if(we){t:{for(var l=we,i=Lt;l.nodeType!==8;){if(!i){l=null;break t}if(l=Bt(l.nextSibling),l===null){l=null;break t}}i=l.data,l=i==="F!"||i==="F"?l:null}if(l){we=Bt(l.nextSibling),a=l.data==="F!";break e}}An(a)}a=!1}a&&(t=n[0])}}return n=ct(),n.memoizedState=n.baseState=t,a={pending:null,lanes:0,dispatch:null,lastRenderedReducer:yc,lastRenderedState:t},n.queue=a,n=Bc.bind(null,ae,a),a.dispatch=n,a=jr(!1),i=Hr.bind(null,ae,!1,a.queue),a=ct(),l={state:t,dispatch:null,action:e,pending:null},a.queue=l,n=mp.bind(null,ae,l,i,n),l.dispatch=n,a.memoizedState=e,[t,n,!1]}function xc(e){var t=Ne();return Sc(t,ze,e)}function Sc(e,t,n){if(t=Cr(e,t,yc)[0],e=Ni(un)[0],typeof t=="object"&&t!==null&&typeof t.then=="function")try{var a=Ll(t)}catch(o){throw o===Na?ji:o}else a=t;t=Ne();var l=t.queue,i=l.dispatch;return n!==t.memoizedState&&(ae.flags|=2048,Qa(9,{destroy:void 0},pp.bind(null,l,n),null)),[a,i,e]}function pp(e,t){e.action=t}function Tc(e){var t=Ne(),n=ze;if(n!==null)return Sc(t,n,e);Ne(),t=t.memoizedState,n=Ne();var a=n.queue.dispatch;return n.memoizedState=e,[t,a,!1]}function Qa(e,t,n,a){return e={tag:e,create:n,deps:a,inst:t,next:null},t=ae.updateQueue,t===null&&(t=Bi(),ae.updateQueue=t),n=t.lastEffect,n===null?t.lastEffect=e.next=e:(a=n.next,n.next=e,e.next=a,t.lastEffect=e),e}function _c(){return Ne().memoizedState}function Gi(e,t,n,a){var l=ct();ae.flags|=e,l.memoizedState=Qa(1|t,{destroy:void 0},n,a===void 0?null:a)}function Vi(e,t,n,a){var l=Ne();a=a===void 0?null:a;var i=l.memoizedState.inst;ze!==null&&a!==null&&Tr(a,ze.memoizedState.deps)?l.memoizedState=Qa(t,i,n,a):(ae.flags|=e,l.memoizedState=Qa(1|t,i,n,a))}function Ec(e,t){Gi(8390656,8,e,t)}function wr(e,t){Vi(2048,8,e,t)}function hp(e){ae.flags|=4;var t=ae.updateQueue;if(t===null)t=Bi(),ae.updateQueue=t,t.events=[e];else{var n=t.events;n===null?t.events=[e]:n.push(e)}}function Ac(e){var t=Ne().memoizedState;return hp({ref:t,nextImpl:e}),function(){if((Se&2)!==0)throw Error(s(440));return t.impl.apply(void 0,arguments)}}function Mc(e,t){return Vi(4,2,e,t)}function zc(e,t){return Vi(4,4,e,t)}function Cc(e,t){if(typeof t=="function"){e=e();var n=t(e);return function(){typeof n=="function"?n():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Dc(e,t,n){n=n!=null?n.concat([e]):null,Vi(4,4,Cc.bind(null,t,e),n)}function Rr(){}function jc(e,t){var n=Ne();t=t===void 0?null:t;var a=n.memoizedState;return t!==null&&Tr(t,a[1])?a[0]:(n.memoizedState=[e,t],e)}function Oc(e,t){var n=Ne();t=t===void 0?null:t;var a=n.memoizedState;if(t!==null&&Tr(t,a[1]))return a[0];if(a=e(),ca){bt(!0);try{e()}finally{bt(!1)}}return n.memoizedState=[a,t],a}function Ur(e,t,n){return n===void 0||(rn&1073741824)!==0&&(de&261930)===0?e.memoizedState=t:(e.memoizedState=n,e=wd(),ae.lanes|=e,Un|=e,n)}function wc(e,t,n,a){return xt(n,t)?n:Va.current!==null?(e=Ur(e,n,a),xt(e,t)||(Ze=!0),e):(rn&42)===0||(rn&1073741824)!==0&&(de&261930)===0?(Ze=!0,e.memoizedState=n):(e=wd(),ae.lanes|=e,Un|=e,t)}function Rc(e,t,n,a,l){var i=k.p;k.p=i!==0&&8>i?i:8;var o=E.T,r={};E.T=r,Hr(e,!1,t,n);try{var c=l(),y=E.S;if(y!==null&&y(r,c),c!==null&&typeof c=="object"&&typeof c.then=="function"){var A=cp(c,a);Hl(e,t,A,Mt(e))}else Hl(e,t,a,Mt(e))}catch(z){Hl(e,t,{then:function(){},status:"rejected",reason:z},Mt())}finally{k.p=i,o!==null&&r.types!==null&&(o.types=r.types),E.T=o}}function gp(){}function kr(e,t,n,a){if(e.tag!==5)throw Error(s(476));var l=Uc(e).queue;Rc(e,l,t,F,n===null?gp:function(){return kc(e),n(a)})}function Uc(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:F,baseState:F,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:un,lastRenderedState:F},next:null};var n={};return t.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:un,lastRenderedState:n},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function kc(e){var t=Uc(e);t.next===null&&(t=e.alternate.memoizedState),Hl(e,t.next.queue,{},Mt())}function Lr(){return ot(ei)}function Lc(){return Ne().memoizedState}function Hc(){return Ne().memoizedState}function vp(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var n=Mt();e=Cn(n);var a=Dn(t,e,n);a!==null&&(vt(a,t,n),wl(a,t,n)),t={cache:dr()},e.payload=t;return}t=t.return}}function yp(e,t,n){var a=Mt();n={lane:a,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},Yi(e)?qc(t,n):(n=er(e,t,n,a),n!==null&&(vt(n,e,a),Nc(n,t,a)))}function Bc(e,t,n){var a=Mt();Hl(e,t,n,a)}function Hl(e,t,n,a){var l={lane:a,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(Yi(e))qc(t,l);else{var i=e.alternate;if(e.lanes===0&&(i===null||i.lanes===0)&&(i=t.lastRenderedReducer,i!==null))try{var o=t.lastRenderedState,r=i(o,n);if(l.hasEagerState=!0,l.eagerState=r,xt(r,o))return _i(e,t,l,0),je===null&&Ti(),!1}catch{}finally{}if(n=er(e,t,l,a),n!==null)return vt(n,e,a),Nc(n,t,a),!0}return!1}function Hr(e,t,n,a){if(a={lane:2,revertLane:hu(),gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null},Yi(e)){if(t)throw Error(s(479))}else t=er(e,n,a,2),t!==null&&vt(t,e,2)}function Yi(e){var t=e.alternate;return e===ae||t!==null&&t===ae}function qc(e,t){Ya=Li=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Nc(e,t,n){if((n&4194048)!==0){var a=t.lanes;a&=e.pendingLanes,n|=a,t.lanes=n,fl(e,n)}}var Bl={readContext:ot,use:qi,useCallback:He,useContext:He,useEffect:He,useImperativeHandle:He,useLayoutEffect:He,useInsertionEffect:He,useMemo:He,useReducer:He,useRef:He,useState:He,useDebugValue:He,useDeferredValue:He,useTransition:He,useSyncExternalStore:He,useId:He,useHostTransitionStatus:He,useFormState:He,useActionState:He,useOptimistic:He,useMemoCache:He,useCacheRefresh:He};Bl.useEffectEvent=He;var Gc={readContext:ot,use:qi,useCallback:function(e,t){return ct().memoizedState=[e,t===void 0?null:t],e},useContext:ot,useEffect:Ec,useImperativeHandle:function(e,t,n){n=n!=null?n.concat([e]):null,Gi(4194308,4,Cc.bind(null,t,e),n)},useLayoutEffect:function(e,t){return Gi(4194308,4,e,t)},useInsertionEffect:function(e,t){Gi(4,2,e,t)},useMemo:function(e,t){var n=ct();t=t===void 0?null:t;var a=e();if(ca){bt(!0);try{e()}finally{bt(!1)}}return n.memoizedState=[a,t],a},useReducer:function(e,t,n){var a=ct();if(n!==void 0){var l=n(t);if(ca){bt(!0);try{n(t)}finally{bt(!1)}}}else l=t;return a.memoizedState=a.baseState=l,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:l},a.queue=e,e=e.dispatch=yp.bind(null,ae,e),[a.memoizedState,e]},useRef:function(e){var t=ct();return e={current:e},t.memoizedState=e},useState:function(e){e=jr(e);var t=e.queue,n=Bc.bind(null,ae,t);return t.dispatch=n,[e.memoizedState,n]},useDebugValue:Rr,useDeferredValue:function(e,t){var n=ct();return Ur(n,e,t)},useTransition:function(){var e=jr(!1);return e=Rc.bind(null,ae,e.queue,!0,!1),ct().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,n){var a=ae,l=ct();if(pe){if(n===void 0)throw Error(s(407));n=n()}else{if(n=t(),je===null)throw Error(s(349));(de&127)!==0||uc(a,t,n)}l.memoizedState=n;var i={value:n,getSnapshot:t};return l.queue=i,Ec(cc.bind(null,a,i,e),[e]),a.flags|=2048,Qa(9,{destroy:void 0},sc.bind(null,a,i,n,t),null),n},useId:function(){var e=ct(),t=je.identifierPrefix;if(pe){var n=Jt,a=Kt;n=(a&~(1<<32-tt(a)-1)).toString(32)+n,t="_"+t+"R_"+n,n=Hi++,0<n&&(t+="H"+n.toString(32)),t+="_"}else n=dp++,t="_"+t+"r_"+n.toString(32)+"_";return e.memoizedState=t},useHostTransitionStatus:Lr,useFormState:bc,useActionState:bc,useOptimistic:function(e){var t=ct();t.memoizedState=t.baseState=e;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=n,t=Hr.bind(null,ae,!0,n),n.dispatch=t,[e,t]},useMemoCache:zr,useCacheRefresh:function(){return ct().memoizedState=vp.bind(null,ae)},useEffectEvent:function(e){var t=ct(),n={impl:e};return t.memoizedState=n,function(){if((Se&2)!==0)throw Error(s(440));return n.impl.apply(void 0,arguments)}}},Br={readContext:ot,use:qi,useCallback:jc,useContext:ot,useEffect:wr,useImperativeHandle:Dc,useInsertionEffect:Mc,useLayoutEffect:zc,useMemo:Oc,useReducer:Ni,useRef:_c,useState:function(){return Ni(un)},useDebugValue:Rr,useDeferredValue:function(e,t){var n=Ne();return wc(n,ze.memoizedState,e,t)},useTransition:function(){var e=Ni(un)[0],t=Ne().memoizedState;return[typeof e=="boolean"?e:Ll(e),t]},useSyncExternalStore:rc,useId:Lc,useHostTransitionStatus:Lr,useFormState:xc,useActionState:xc,useOptimistic:function(e,t){var n=Ne();return mc(n,ze,e,t)},useMemoCache:zr,useCacheRefresh:Hc};Br.useEffectEvent=Ac;var Vc={readContext:ot,use:qi,useCallback:jc,useContext:ot,useEffect:wr,useImperativeHandle:Dc,useInsertionEffect:Mc,useLayoutEffect:zc,useMemo:Oc,useReducer:Dr,useRef:_c,useState:function(){return Dr(un)},useDebugValue:Rr,useDeferredValue:function(e,t){var n=Ne();return ze===null?Ur(n,e,t):wc(n,ze.memoizedState,e,t)},useTransition:function(){var e=Dr(un)[0],t=Ne().memoizedState;return[typeof e=="boolean"?e:Ll(e),t]},useSyncExternalStore:rc,useId:Lc,useHostTransitionStatus:Lr,useFormState:Tc,useActionState:Tc,useOptimistic:function(e,t){var n=Ne();return ze!==null?mc(n,ze,e,t):(n.baseState=e,[e,n.queue.dispatch])},useMemoCache:zr,useCacheRefresh:Hc};Vc.useEffectEvent=Ac;function qr(e,t,n,a){t=e.memoizedState,n=n(a,t),n=n==null?t:w({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var Nr={enqueueSetState:function(e,t,n){e=e._reactInternals;var a=Mt(),l=Cn(a);l.payload=t,n!=null&&(l.callback=n),t=Dn(e,l,a),t!==null&&(vt(t,e,a),wl(t,e,a))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var a=Mt(),l=Cn(a);l.tag=1,l.payload=t,n!=null&&(l.callback=n),t=Dn(e,l,a),t!==null&&(vt(t,e,a),wl(t,e,a))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=Mt(),a=Cn(n);a.tag=2,t!=null&&(a.callback=t),t=Dn(e,a,n),t!==null&&(vt(t,e,n),wl(t,e,n))}};function Yc(e,t,n,a,l,i,o){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(a,i,o):t.prototype&&t.prototype.isPureReactComponent?!El(n,a)||!El(l,i):!0}function Xc(e,t,n,a){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,a),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,a),t.state!==e&&Nr.enqueueReplaceState(t,t.state,null)}function da(e,t){var n=t;if("ref"in t){n={};for(var a in t)a!=="ref"&&(n[a]=t[a])}if(e=e.defaultProps){n===t&&(n=w({},n));for(var l in e)n[l]===void 0&&(n[l]=e[l])}return n}function Qc(e){Si(e)}function Zc(e){console.error(e)}function Kc(e){Si(e)}function Xi(e,t){try{var n=e.onUncaughtError;n(t.value,{componentStack:t.stack})}catch(a){setTimeout(function(){throw a})}}function Jc(e,t,n){try{var a=e.onCaughtError;a(n.value,{componentStack:n.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(l){setTimeout(function(){throw l})}}function Gr(e,t,n){return n=Cn(n),n.tag=3,n.payload={element:null},n.callback=function(){Xi(e,t)},n}function Pc(e){return e=Cn(e),e.tag=3,e}function Fc(e,t,n,a){var l=n.type.getDerivedStateFromError;if(typeof l=="function"){var i=a.value;e.payload=function(){return l(i)},e.callback=function(){Jc(t,n,a)}}var o=n.stateNode;o!==null&&typeof o.componentDidCatch=="function"&&(e.callback=function(){Jc(t,n,a),typeof l!="function"&&(kn===null?kn=new Set([this]):kn.add(this));var r=a.stack;this.componentDidCatch(a.value,{componentStack:r!==null?r:""})})}function bp(e,t,n,a,l){if(n.flags|=32768,a!==null&&typeof a=="object"&&typeof a.then=="function"){if(t=n.alternate,t!==null&&Ha(t,n,l,!0),n=Tt.current,n!==null){switch(n.tag){case 31:case 13:return Ht===null?no():n.alternate===null&&Be===0&&(Be=3),n.flags&=-257,n.flags|=65536,n.lanes=l,a===Oi?n.flags|=16384:(t=n.updateQueue,t===null?n.updateQueue=new Set([a]):t.add(a),fu(e,a,l)),!1;case 22:return n.flags|=65536,a===Oi?n.flags|=16384:(t=n.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([a])},n.updateQueue=t):(n=t.retryQueue,n===null?t.retryQueue=new Set([a]):n.add(a)),fu(e,a,l)),!1}throw Error(s(435,n.tag))}return fu(e,a,l),no(),!1}if(pe)return t=Tt.current,t!==null?((t.flags&65536)===0&&(t.flags|=256),t.flags|=65536,t.lanes=l,a!==or&&(e=Error(s(422),{cause:a}),zl(Rt(e,n)))):(a!==or&&(t=Error(s(423),{cause:a}),zl(Rt(t,n))),e=e.current.alternate,e.flags|=65536,l&=-l,e.lanes|=l,a=Rt(a,n),l=Gr(e.stateNode,a,l),vr(e,l),Be!==4&&(Be=2)),!1;var i=Error(s(520),{cause:a});if(i=Rt(i,n),Zl===null?Zl=[i]:Zl.push(i),Be!==4&&(Be=2),t===null)return!0;a=Rt(a,n),n=t;do{switch(n.tag){case 3:return n.flags|=65536,e=l&-l,n.lanes|=e,e=Gr(n.stateNode,a,e),vr(n,e),!1;case 1:if(t=n.type,i=n.stateNode,(n.flags&128)===0&&(typeof t.getDerivedStateFromError=="function"||i!==null&&typeof i.componentDidCatch=="function"&&(kn===null||!kn.has(i))))return n.flags|=65536,l&=-l,n.lanes|=l,l=Pc(l),Fc(l,e,n,a),vr(n,l),!1}n=n.return}while(n!==null);return!1}var Vr=Error(s(461)),Ze=!1;function rt(e,t,n,a){t.child=e===null?ec(t,null,n,a):sa(t,e.child,n,a)}function Ic(e,t,n,a,l){n=n.render;var i=t.ref;if("ref"in a){var o={};for(var r in a)r!=="ref"&&(o[r]=a[r])}else o=a;return ia(t),a=_r(e,t,n,o,i,l),r=Er(),e!==null&&!Ze?(Ar(e,t,l),sn(e,t,l)):(pe&&r&&lr(t),t.flags|=1,rt(e,t,a,l),t.child)}function Wc(e,t,n,a,l){if(e===null){var i=n.type;return typeof i=="function"&&!tr(i)&&i.defaultProps===void 0&&n.compare===null?(t.tag=15,t.type=i,$c(e,t,i,a,l)):(e=Ai(n.type,null,a,t,t.mode,l),e.ref=t.ref,e.return=t,t.child=e)}if(i=e.child,!Fr(e,l)){var o=i.memoizedProps;if(n=n.compare,n=n!==null?n:El,n(o,a)&&e.ref===t.ref)return sn(e,t,l)}return t.flags|=1,e=nn(i,a),e.ref=t.ref,e.return=t,t.child=e}function $c(e,t,n,a,l){if(e!==null){var i=e.memoizedProps;if(El(i,a)&&e.ref===t.ref)if(Ze=!1,t.pendingProps=a=i,Fr(e,l))(e.flags&131072)!==0&&(Ze=!0);else return t.lanes=e.lanes,sn(e,t,l)}return Yr(e,t,n,a,l)}function ed(e,t,n,a){var l=a.children,i=e!==null?e.memoizedState:null;if(e===null&&t.stateNode===null&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),a.mode==="hidden"){if((t.flags&128)!==0){if(i=i!==null?i.baseLanes|n:n,e!==null){for(a=t.child=e.child,l=0;a!==null;)l=l|a.lanes|a.childLanes,a=a.sibling;a=l&~i}else a=0,t.child=null;return td(e,t,i,n,a)}if((n&536870912)!==0)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&Di(t,i!==null?i.cachePool:null),i!==null?ac(t,i):br(),lc(t);else return a=t.lanes=536870912,td(e,t,i!==null?i.baseLanes|n:n,n,a)}else i!==null?(Di(t,i.cachePool),ac(t,i),On(),t.memoizedState=null):(e!==null&&Di(t,null),br(),On());return rt(e,t,l,n),t.child}function ql(e,t){return e!==null&&e.tag===22||t.stateNode!==null||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function td(e,t,n,a,l){var i=mr();return i=i===null?null:{parent:Xe._currentValue,pool:i},t.memoizedState={baseLanes:n,cachePool:i},e!==null&&Di(t,null),br(),lc(t),e!==null&&Ha(e,t,a,!0),t.childLanes=l,null}function Qi(e,t){return t=Ki({mode:t.mode,children:t.children},e.mode),t.ref=e.ref,e.child=t,t.return=e,t}function nd(e,t,n){return sa(t,e.child,null,n),e=Qi(t,t.pendingProps),e.flags|=2,_t(t),t.memoizedState=null,e}function xp(e,t,n){var a=t.pendingProps,l=(t.flags&128)!==0;if(t.flags&=-129,e===null){if(pe){if(a.mode==="hidden")return e=Qi(t,a),t.lanes=536870912,ql(null,e);if(Sr(t),(e=we)?(e=hf(e,Lt),e=e!==null&&e.data==="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:_n!==null?{id:Kt,overflow:Jt}:null,retryLane:536870912,hydrationErrors:null},n=qs(e),n.return=t,t.child=n,it=t,we=null)):e=null,e===null)throw An(t);return t.lanes=536870912,null}return Qi(t,a)}var i=e.memoizedState;if(i!==null){var o=i.dehydrated;if(Sr(t),l)if(t.flags&256)t.flags&=-257,t=nd(e,t,n);else if(t.memoizedState!==null)t.child=e.child,t.flags|=128,t=null;else throw Error(s(558));else if(Ze||Ha(e,t,n,!1),l=(n&e.childLanes)!==0,Ze||l){if(a=je,a!==null&&(o=ml(a,n),o!==0&&o!==i.retryLane))throw i.retryLane=o,ta(e,o),vt(a,e,o),Vr;no(),t=nd(e,t,n)}else e=i.treeContext,we=Bt(o.nextSibling),it=t,pe=!0,En=null,Lt=!1,e!==null&&Vs(t,e),t=Qi(t,a),t.flags|=4096;return t}return e=nn(e.child,{mode:a.mode,children:a.children}),e.ref=t.ref,t.child=e,e.return=t,e}function Zi(e,t){var n=t.ref;if(n===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof n!="function"&&typeof n!="object")throw Error(s(284));(e===null||e.ref!==n)&&(t.flags|=4194816)}}function Yr(e,t,n,a,l){return ia(t),n=_r(e,t,n,a,void 0,l),a=Er(),e!==null&&!Ze?(Ar(e,t,l),sn(e,t,l)):(pe&&a&&lr(t),t.flags|=1,rt(e,t,n,l),t.child)}function ad(e,t,n,a,l,i){return ia(t),t.updateQueue=null,n=oc(t,a,n,l),ic(e),a=Er(),e!==null&&!Ze?(Ar(e,t,i),sn(e,t,i)):(pe&&a&&lr(t),t.flags|=1,rt(e,t,n,i),t.child)}function ld(e,t,n,a,l){if(ia(t),t.stateNode===null){var i=Ra,o=n.contextType;typeof o=="object"&&o!==null&&(i=ot(o)),i=new n(a,i),t.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,i.updater=Nr,t.stateNode=i,i._reactInternals=t,i=t.stateNode,i.props=a,i.state=t.memoizedState,i.refs={},hr(t),o=n.contextType,i.context=typeof o=="object"&&o!==null?ot(o):Ra,i.state=t.memoizedState,o=n.getDerivedStateFromProps,typeof o=="function"&&(qr(t,n,o,a),i.state=t.memoizedState),typeof n.getDerivedStateFromProps=="function"||typeof i.getSnapshotBeforeUpdate=="function"||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(o=i.state,typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount(),o!==i.state&&Nr.enqueueReplaceState(i,i.state,null),Ul(t,a,i,l),Rl(),i.state=t.memoizedState),typeof i.componentDidMount=="function"&&(t.flags|=4194308),a=!0}else if(e===null){i=t.stateNode;var r=t.memoizedProps,c=da(n,r);i.props=c;var y=i.context,A=n.contextType;o=Ra,typeof A=="object"&&A!==null&&(o=ot(A));var z=n.getDerivedStateFromProps;A=typeof z=="function"||typeof i.getSnapshotBeforeUpdate=="function",r=t.pendingProps!==r,A||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(r||y!==o)&&Xc(t,i,a,o),zn=!1;var b=t.memoizedState;i.state=b,Ul(t,a,i,l),Rl(),y=t.memoizedState,r||b!==y||zn?(typeof z=="function"&&(qr(t,n,z,a),y=t.memoizedState),(c=zn||Yc(t,n,c,a,b,y,o))?(A||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount()),typeof i.componentDidMount=="function"&&(t.flags|=4194308)):(typeof i.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=a,t.memoizedState=y),i.props=a,i.state=y,i.context=o,a=c):(typeof i.componentDidMount=="function"&&(t.flags|=4194308),a=!1)}else{i=t.stateNode,gr(e,t),o=t.memoizedProps,A=da(n,o),i.props=A,z=t.pendingProps,b=i.context,y=n.contextType,c=Ra,typeof y=="object"&&y!==null&&(c=ot(y)),r=n.getDerivedStateFromProps,(y=typeof r=="function"||typeof i.getSnapshotBeforeUpdate=="function")||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(o!==z||b!==c)&&Xc(t,i,a,c),zn=!1,b=t.memoizedState,i.state=b,Ul(t,a,i,l),Rl();var S=t.memoizedState;o!==z||b!==S||zn||e!==null&&e.dependencies!==null&&zi(e.dependencies)?(typeof r=="function"&&(qr(t,n,r,a),S=t.memoizedState),(A=zn||Yc(t,n,A,a,b,S,c)||e!==null&&e.dependencies!==null&&zi(e.dependencies))?(y||typeof i.UNSAFE_componentWillUpdate!="function"&&typeof i.componentWillUpdate!="function"||(typeof i.componentWillUpdate=="function"&&i.componentWillUpdate(a,S,c),typeof i.UNSAFE_componentWillUpdate=="function"&&i.UNSAFE_componentWillUpdate(a,S,c)),typeof i.componentDidUpdate=="function"&&(t.flags|=4),typeof i.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof i.componentDidUpdate!="function"||o===e.memoizedProps&&b===e.memoizedState||(t.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||o===e.memoizedProps&&b===e.memoizedState||(t.flags|=1024),t.memoizedProps=a,t.memoizedState=S),i.props=a,i.state=S,i.context=c,a=A):(typeof i.componentDidUpdate!="function"||o===e.memoizedProps&&b===e.memoizedState||(t.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||o===e.memoizedProps&&b===e.memoizedState||(t.flags|=1024),a=!1)}return i=a,Zi(e,t),a=(t.flags&128)!==0,i||a?(i=t.stateNode,n=a&&typeof n.getDerivedStateFromError!="function"?null:i.render(),t.flags|=1,e!==null&&a?(t.child=sa(t,e.child,null,l),t.child=sa(t,null,n,l)):rt(e,t,n,l),t.memoizedState=i.state,e=t.child):e=sn(e,t,l),e}function id(e,t,n,a){return aa(),t.flags|=256,rt(e,t,n,a),t.child}var Xr={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Qr(e){return{baseLanes:e,cachePool:Js()}}function Zr(e,t,n){return e=e!==null?e.childLanes&~n:0,t&&(e|=At),e}function od(e,t,n){var a=t.pendingProps,l=!1,i=(t.flags&128)!==0,o;if((o=i)||(o=e!==null&&e.memoizedState===null?!1:(qe.current&2)!==0),o&&(l=!0,t.flags&=-129),o=(t.flags&32)!==0,t.flags&=-33,e===null){if(pe){if(l?jn(t):On(),(e=we)?(e=hf(e,Lt),e=e!==null&&e.data!=="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:_n!==null?{id:Kt,overflow:Jt}:null,retryLane:536870912,hydrationErrors:null},n=qs(e),n.return=t,t.child=n,it=t,we=null)):e=null,e===null)throw An(t);return Cu(e)?t.lanes=32:t.lanes=536870912,null}var r=a.children;return a=a.fallback,l?(On(),l=t.mode,r=Ki({mode:"hidden",children:r},l),a=na(a,l,n,null),r.return=t,a.return=t,r.sibling=a,t.child=r,a=t.child,a.memoizedState=Qr(n),a.childLanes=Zr(e,o,n),t.memoizedState=Xr,ql(null,a)):(jn(t),Kr(t,r))}var c=e.memoizedState;if(c!==null&&(r=c.dehydrated,r!==null)){if(i)t.flags&256?(jn(t),t.flags&=-257,t=Jr(e,t,n)):t.memoizedState!==null?(On(),t.child=e.child,t.flags|=128,t=null):(On(),r=a.fallback,l=t.mode,a=Ki({mode:"visible",children:a.children},l),r=na(r,l,n,null),r.flags|=2,a.return=t,r.return=t,a.sibling=r,t.child=a,sa(t,e.child,null,n),a=t.child,a.memoizedState=Qr(n),a.childLanes=Zr(e,o,n),t.memoizedState=Xr,t=ql(null,a));else if(jn(t),Cu(r)){if(o=r.nextSibling&&r.nextSibling.dataset,o)var y=o.dgst;o=y,a=Error(s(419)),a.stack="",a.digest=o,zl({value:a,source:null,stack:null}),t=Jr(e,t,n)}else if(Ze||Ha(e,t,n,!1),o=(n&e.childLanes)!==0,Ze||o){if(o=je,o!==null&&(a=ml(o,n),a!==0&&a!==c.retryLane))throw c.retryLane=a,ta(e,a),vt(o,e,a),Vr;zu(r)||no(),t=Jr(e,t,n)}else zu(r)?(t.flags|=192,t.child=e.child,t=null):(e=c.treeContext,we=Bt(r.nextSibling),it=t,pe=!0,En=null,Lt=!1,e!==null&&Vs(t,e),t=Kr(t,a.children),t.flags|=4096);return t}return l?(On(),r=a.fallback,l=t.mode,c=e.child,y=c.sibling,a=nn(c,{mode:"hidden",children:a.children}),a.subtreeFlags=c.subtreeFlags&65011712,y!==null?r=nn(y,r):(r=na(r,l,n,null),r.flags|=2),r.return=t,a.return=t,a.sibling=r,t.child=a,ql(null,a),a=t.child,r=e.child.memoizedState,r===null?r=Qr(n):(l=r.cachePool,l!==null?(c=Xe._currentValue,l=l.parent!==c?{parent:c,pool:c}:l):l=Js(),r={baseLanes:r.baseLanes|n,cachePool:l}),a.memoizedState=r,a.childLanes=Zr(e,o,n),t.memoizedState=Xr,ql(e.child,a)):(jn(t),n=e.child,e=n.sibling,n=nn(n,{mode:"visible",children:a.children}),n.return=t,n.sibling=null,e!==null&&(o=t.deletions,o===null?(t.deletions=[e],t.flags|=16):o.push(e)),t.child=n,t.memoizedState=null,n)}function Kr(e,t){return t=Ki({mode:"visible",children:t},e.mode),t.return=e,e.child=t}function Ki(e,t){return e=St(22,e,null,t),e.lanes=0,e}function Jr(e,t,n){return sa(t,e.child,null,n),e=Kr(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function rd(e,t,n){e.lanes|=t;var a=e.alternate;a!==null&&(a.lanes|=t),sr(e.return,t,n)}function Pr(e,t,n,a,l,i){var o=e.memoizedState;o===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:a,tail:n,tailMode:l,treeForkCount:i}:(o.isBackwards=t,o.rendering=null,o.renderingStartTime=0,o.last=a,o.tail=n,o.tailMode=l,o.treeForkCount=i)}function ud(e,t,n){var a=t.pendingProps,l=a.revealOrder,i=a.tail;a=a.children;var o=qe.current,r=(o&2)!==0;if(r?(o=o&1|2,t.flags|=128):o&=1,q(qe,o),rt(e,t,a,n),a=pe?Ml:0,!r&&e!==null&&(e.flags&128)!==0)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&rd(e,n,t);else if(e.tag===19)rd(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(l){case"forwards":for(n=t.child,l=null;n!==null;)e=n.alternate,e!==null&&ki(e)===null&&(l=n),n=n.sibling;n=l,n===null?(l=t.child,t.child=null):(l=n.sibling,n.sibling=null),Pr(t,!1,l,n,i,a);break;case"backwards":case"unstable_legacy-backwards":for(n=null,l=t.child,t.child=null;l!==null;){if(e=l.alternate,e!==null&&ki(e)===null){t.child=l;break}e=l.sibling,l.sibling=n,n=l,l=e}Pr(t,!0,n,null,i,a);break;case"together":Pr(t,!1,null,null,void 0,a);break;default:t.memoizedState=null}return t.child}function sn(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),Un|=t.lanes,(n&t.childLanes)===0)if(e!==null){if(Ha(e,t,n,!1),(n&t.childLanes)===0)return null}else return null;if(e!==null&&t.child!==e.child)throw Error(s(153));if(t.child!==null){for(e=t.child,n=nn(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=nn(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function Fr(e,t){return(e.lanes&t)!==0?!0:(e=e.dependencies,!!(e!==null&&zi(e)))}function Sp(e,t,n){switch(t.tag){case 3:We(t,t.stateNode.containerInfo),Mn(t,Xe,e.memoizedState.cache),aa();break;case 27:case 5:Zn(t);break;case 4:We(t,t.stateNode.containerInfo);break;case 10:Mn(t,t.type,t.memoizedProps.value);break;case 31:if(t.memoizedState!==null)return t.flags|=128,Sr(t),null;break;case 13:var a=t.memoizedState;if(a!==null)return a.dehydrated!==null?(jn(t),t.flags|=128,null):(n&t.child.childLanes)!==0?od(e,t,n):(jn(t),e=sn(e,t,n),e!==null?e.sibling:null);jn(t);break;case 19:var l=(e.flags&128)!==0;if(a=(n&t.childLanes)!==0,a||(Ha(e,t,n,!1),a=(n&t.childLanes)!==0),l){if(a)return ud(e,t,n);t.flags|=128}if(l=t.memoizedState,l!==null&&(l.rendering=null,l.tail=null,l.lastEffect=null),q(qe,qe.current),a)break;return null;case 22:return t.lanes=0,ed(e,t,n,t.pendingProps);case 24:Mn(t,Xe,e.memoizedState.cache)}return sn(e,t,n)}function sd(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps)Ze=!0;else{if(!Fr(e,n)&&(t.flags&128)===0)return Ze=!1,Sp(e,t,n);Ze=(e.flags&131072)!==0}else Ze=!1,pe&&(t.flags&1048576)!==0&&Gs(t,Ml,t.index);switch(t.lanes=0,t.tag){case 16:e:{var a=t.pendingProps;if(e=ra(t.elementType),t.type=e,typeof e=="function")tr(e)?(a=da(e,a),t.tag=1,t=ld(null,t,e,a,n)):(t.tag=0,t=Yr(null,t,e,a,n));else{if(e!=null){var l=e.$$typeof;if(l===G){t.tag=11,t=Ic(null,t,e,a,n);break e}else if(l===B){t.tag=14,t=Wc(null,t,e,a,n);break e}}throw t=re(e)||e,Error(s(306,t,""))}}return t;case 0:return Yr(e,t,t.type,t.pendingProps,n);case 1:return a=t.type,l=da(a,t.pendingProps),ld(e,t,a,l,n);case 3:e:{if(We(t,t.stateNode.containerInfo),e===null)throw Error(s(387));a=t.pendingProps;var i=t.memoizedState;l=i.element,gr(e,t),Ul(t,a,null,n);var o=t.memoizedState;if(a=o.cache,Mn(t,Xe,a),a!==i.cache&&cr(t,[Xe],n,!0),Rl(),a=o.element,i.isDehydrated)if(i={element:a,isDehydrated:!1,cache:o.cache},t.updateQueue.baseState=i,t.memoizedState=i,t.flags&256){t=id(e,t,a,n);break e}else if(a!==l){l=Rt(Error(s(424)),t),zl(l),t=id(e,t,a,n);break e}else{switch(e=t.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName==="HTML"?e.ownerDocument.body:e}for(we=Bt(e.firstChild),it=t,pe=!0,En=null,Lt=!0,n=ec(t,null,a,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling}else{if(aa(),a===l){t=sn(e,t,n);break e}rt(e,t,a,n)}t=t.child}return t;case 26:return Zi(e,t),e===null?(n=Sf(t.type,null,t.pendingProps,null))?t.memoizedState=n:pe||(n=t.type,e=t.pendingProps,a=so(ie.current).createElement(n),a[Ve]=t,a[lt]=e,ut(a,n,e),nt(a),t.stateNode=a):t.memoizedState=Sf(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return Zn(t),e===null&&pe&&(a=t.stateNode=yf(t.type,t.pendingProps,ie.current),it=t,Lt=!0,l=we,qn(t.type)?(Du=l,we=Bt(a.firstChild)):we=l),rt(e,t,t.pendingProps.children,n),Zi(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&pe&&((l=a=we)&&(a=Ip(a,t.type,t.pendingProps,Lt),a!==null?(t.stateNode=a,it=t,we=Bt(a.firstChild),Lt=!1,l=!0):l=!1),l||An(t)),Zn(t),l=t.type,i=t.pendingProps,o=e!==null?e.memoizedProps:null,a=i.children,Eu(l,i)?a=null:o!==null&&Eu(l,o)&&(t.flags|=32),t.memoizedState!==null&&(l=_r(e,t,fp,null,null,n),ei._currentValue=l),Zi(e,t),rt(e,t,a,n),t.child;case 6:return e===null&&pe&&((e=n=we)&&(n=Wp(n,t.pendingProps,Lt),n!==null?(t.stateNode=n,it=t,we=null,e=!0):e=!1),e||An(t)),null;case 13:return od(e,t,n);case 4:return We(t,t.stateNode.containerInfo),a=t.pendingProps,e===null?t.child=sa(t,null,a,n):rt(e,t,a,n),t.child;case 11:return Ic(e,t,t.type,t.pendingProps,n);case 7:return rt(e,t,t.pendingProps,n),t.child;case 8:return rt(e,t,t.pendingProps.children,n),t.child;case 12:return rt(e,t,t.pendingProps.children,n),t.child;case 10:return a=t.pendingProps,Mn(t,t.type,a.value),rt(e,t,a.children,n),t.child;case 9:return l=t.type._context,a=t.pendingProps.children,ia(t),l=ot(l),a=a(l),t.flags|=1,rt(e,t,a,n),t.child;case 14:return Wc(e,t,t.type,t.pendingProps,n);case 15:return $c(e,t,t.type,t.pendingProps,n);case 19:return ud(e,t,n);case 31:return xp(e,t,n);case 22:return ed(e,t,n,t.pendingProps);case 24:return ia(t),a=ot(Xe),e===null?(l=mr(),l===null&&(l=je,i=dr(),l.pooledCache=i,i.refCount++,i!==null&&(l.pooledCacheLanes|=n),l=i),t.memoizedState={parent:a,cache:l},hr(t),Mn(t,Xe,l)):((e.lanes&n)!==0&&(gr(e,t),Ul(t,null,null,n),Rl()),l=e.memoizedState,i=t.memoizedState,l.parent!==a?(l={parent:a,cache:a},t.memoizedState=l,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=l),Mn(t,Xe,a)):(a=i.cache,Mn(t,Xe,a),a!==l.cache&&cr(t,[Xe],n,!0))),rt(e,t,t.pendingProps.children,n),t.child;case 29:throw t.pendingProps}throw Error(s(156,t.tag))}function cn(e){e.flags|=4}function Ir(e,t,n,a,l){if((t=(e.mode&32)!==0)&&(t=!1),t){if(e.flags|=16777216,(l&335544128)===l)if(e.stateNode.complete)e.flags|=8192;else if(Ld())e.flags|=8192;else throw ua=Oi,pr}else e.flags&=-16777217}function cd(e,t){if(t.type!=="stylesheet"||(t.state.loading&4)!==0)e.flags&=-16777217;else if(e.flags|=16777216,!Mf(t))if(Ld())e.flags|=8192;else throw ua=Oi,pr}function Ji(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag!==22?cl():536870912,e.lanes|=t,Pa|=t)}function Nl(e,t){if(!pe)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var a=null;n!==null;)n.alternate!==null&&(a=n),n=n.sibling;a===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:a.sibling=null}}function Re(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,a=0;if(t)for(var l=e.child;l!==null;)n|=l.lanes|l.childLanes,a|=l.subtreeFlags&65011712,a|=l.flags&65011712,l.return=e,l=l.sibling;else for(l=e.child;l!==null;)n|=l.lanes|l.childLanes,a|=l.subtreeFlags,a|=l.flags,l.return=e,l=l.sibling;return e.subtreeFlags|=a,e.childLanes=n,t}function Tp(e,t,n){var a=t.pendingProps;switch(ir(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Re(t),null;case 1:return Re(t),null;case 3:return n=t.stateNode,a=null,e!==null&&(a=e.memoizedState.cache),t.memoizedState.cache!==a&&(t.flags|=2048),on(Xe),Le(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(e===null||e.child===null)&&(La(t)?cn(t):e===null||e.memoizedState.isDehydrated&&(t.flags&256)===0||(t.flags|=1024,rr())),Re(t),null;case 26:var l=t.type,i=t.memoizedState;return e===null?(cn(t),i!==null?(Re(t),cd(t,i)):(Re(t),Ir(t,l,null,a,n))):i?i!==e.memoizedState?(cn(t),Re(t),cd(t,i)):(Re(t),t.flags&=-16777217):(e=e.memoizedProps,e!==a&&cn(t),Re(t),Ir(t,l,e,a,n)),null;case 27:if(Kn(t),n=ie.current,l=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==a&&cn(t);else{if(!a){if(t.stateNode===null)throw Error(s(166));return Re(t),null}e=Y.current,La(t)?Ys(t):(e=yf(l,a,n),t.stateNode=e,cn(t))}return Re(t),null;case 5:if(Kn(t),l=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==a&&cn(t);else{if(!a){if(t.stateNode===null)throw Error(s(166));return Re(t),null}if(i=Y.current,La(t))Ys(t);else{var o=so(ie.current);switch(i){case 1:i=o.createElementNS("http://www.w3.org/2000/svg",l);break;case 2:i=o.createElementNS("http://www.w3.org/1998/Math/MathML",l);break;default:switch(l){case"svg":i=o.createElementNS("http://www.w3.org/2000/svg",l);break;case"math":i=o.createElementNS("http://www.w3.org/1998/Math/MathML",l);break;case"script":i=o.createElement("div"),i.innerHTML="<script><\/script>",i=i.removeChild(i.firstChild);break;case"select":i=typeof a.is=="string"?o.createElement("select",{is:a.is}):o.createElement("select"),a.multiple?i.multiple=!0:a.size&&(i.size=a.size);break;default:i=typeof a.is=="string"?o.createElement(l,{is:a.is}):o.createElement(l)}}i[Ve]=t,i[lt]=a;e:for(o=t.child;o!==null;){if(o.tag===5||o.tag===6)i.appendChild(o.stateNode);else if(o.tag!==4&&o.tag!==27&&o.child!==null){o.child.return=o,o=o.child;continue}if(o===t)break e;for(;o.sibling===null;){if(o.return===null||o.return===t)break e;o=o.return}o.sibling.return=o.return,o=o.sibling}t.stateNode=i;e:switch(ut(i,l,a),l){case"button":case"input":case"select":case"textarea":a=!!a.autoFocus;break e;case"img":a=!0;break e;default:a=!1}a&&cn(t)}}return Re(t),Ir(t,t.type,e===null?null:e.memoizedProps,t.pendingProps,n),null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==a&&cn(t);else{if(typeof a!="string"&&t.stateNode===null)throw Error(s(166));if(e=ie.current,La(t)){if(e=t.stateNode,n=t.memoizedProps,a=null,l=it,l!==null)switch(l.tag){case 27:case 5:a=l.memoizedProps}e[Ve]=t,e=!!(e.nodeValue===n||a!==null&&a.suppressHydrationWarning===!0||rf(e.nodeValue,n)),e||An(t,!0)}else e=so(e).createTextNode(a),e[Ve]=t,t.stateNode=e}return Re(t),null;case 31:if(n=t.memoizedState,e===null||e.memoizedState!==null){if(a=La(t),n!==null){if(e===null){if(!a)throw Error(s(318));if(e=t.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(s(557));e[Ve]=t}else aa(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;Re(t),e=!1}else n=rr(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=n),e=!0;if(!e)return t.flags&256?(_t(t),t):(_t(t),null);if((t.flags&128)!==0)throw Error(s(558))}return Re(t),null;case 13:if(a=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(l=La(t),a!==null&&a.dehydrated!==null){if(e===null){if(!l)throw Error(s(318));if(l=t.memoizedState,l=l!==null?l.dehydrated:null,!l)throw Error(s(317));l[Ve]=t}else aa(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;Re(t),l=!1}else l=rr(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=l),l=!0;if(!l)return t.flags&256?(_t(t),t):(_t(t),null)}return _t(t),(t.flags&128)!==0?(t.lanes=n,t):(n=a!==null,e=e!==null&&e.memoizedState!==null,n&&(a=t.child,l=null,a.alternate!==null&&a.alternate.memoizedState!==null&&a.alternate.memoizedState.cachePool!==null&&(l=a.alternate.memoizedState.cachePool.pool),i=null,a.memoizedState!==null&&a.memoizedState.cachePool!==null&&(i=a.memoizedState.cachePool.pool),i!==l&&(a.flags|=2048)),n!==e&&n&&(t.child.flags|=8192),Ji(t,t.updateQueue),Re(t),null);case 4:return Le(),e===null&&bu(t.stateNode.containerInfo),Re(t),null;case 10:return on(t.type),Re(t),null;case 19:if(C(qe),a=t.memoizedState,a===null)return Re(t),null;if(l=(t.flags&128)!==0,i=a.rendering,i===null)if(l)Nl(a,!1);else{if(Be!==0||e!==null&&(e.flags&128)!==0)for(e=t.child;e!==null;){if(i=ki(e),i!==null){for(t.flags|=128,Nl(a,!1),e=i.updateQueue,t.updateQueue=e,Ji(t,e),t.subtreeFlags=0,e=n,n=t.child;n!==null;)Bs(n,e),n=n.sibling;return q(qe,qe.current&1|2),pe&&an(t,a.treeForkCount),t.child}e=e.sibling}a.tail!==null&&Ge()>$i&&(t.flags|=128,l=!0,Nl(a,!1),t.lanes=4194304)}else{if(!l)if(e=ki(i),e!==null){if(t.flags|=128,l=!0,e=e.updateQueue,t.updateQueue=e,Ji(t,e),Nl(a,!0),a.tail===null&&a.tailMode==="hidden"&&!i.alternate&&!pe)return Re(t),null}else 2*Ge()-a.renderingStartTime>$i&&n!==536870912&&(t.flags|=128,l=!0,Nl(a,!1),t.lanes=4194304);a.isBackwards?(i.sibling=t.child,t.child=i):(e=a.last,e!==null?e.sibling=i:t.child=i,a.last=i)}return a.tail!==null?(e=a.tail,a.rendering=e,a.tail=e.sibling,a.renderingStartTime=Ge(),e.sibling=null,n=qe.current,q(qe,l?n&1|2:n&1),pe&&an(t,a.treeForkCount),e):(Re(t),null);case 22:case 23:return _t(t),xr(),a=t.memoizedState!==null,e!==null?e.memoizedState!==null!==a&&(t.flags|=8192):a&&(t.flags|=8192),a?(n&536870912)!==0&&(t.flags&128)===0&&(Re(t),t.subtreeFlags&6&&(t.flags|=8192)):Re(t),n=t.updateQueue,n!==null&&Ji(t,n.retryQueue),n=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),a=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(a=t.memoizedState.cachePool.pool),a!==n&&(t.flags|=2048),e!==null&&C(oa),null;case 24:return n=null,e!==null&&(n=e.memoizedState.cache),t.memoizedState.cache!==n&&(t.flags|=2048),on(Xe),Re(t),null;case 25:return null;case 30:return null}throw Error(s(156,t.tag))}function _p(e,t){switch(ir(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return on(Xe),Le(),e=t.flags,(e&65536)!==0&&(e&128)===0?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return Kn(t),null;case 31:if(t.memoizedState!==null){if(_t(t),t.alternate===null)throw Error(s(340));aa()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 13:if(_t(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(s(340));aa()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return C(qe),null;case 4:return Le(),null;case 10:return on(t.type),null;case 22:case 23:return _t(t),xr(),e!==null&&C(oa),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return on(Xe),null;case 25:return null;default:return null}}function dd(e,t){switch(ir(t),t.tag){case 3:on(Xe),Le();break;case 26:case 27:case 5:Kn(t);break;case 4:Le();break;case 31:t.memoizedState!==null&&_t(t);break;case 13:_t(t);break;case 19:C(qe);break;case 10:on(t.type);break;case 22:case 23:_t(t),xr(),e!==null&&C(oa);break;case 24:on(Xe)}}function Gl(e,t){try{var n=t.updateQueue,a=n!==null?n.lastEffect:null;if(a!==null){var l=a.next;n=l;do{if((n.tag&e)===e){a=void 0;var i=n.create,o=n.inst;a=i(),o.destroy=a}n=n.next}while(n!==l)}}catch(r){Ae(t,t.return,r)}}function wn(e,t,n){try{var a=t.updateQueue,l=a!==null?a.lastEffect:null;if(l!==null){var i=l.next;a=i;do{if((a.tag&e)===e){var o=a.inst,r=o.destroy;if(r!==void 0){o.destroy=void 0,l=t;var c=n,y=r;try{y()}catch(A){Ae(l,c,A)}}}a=a.next}while(a!==i)}}catch(A){Ae(t,t.return,A)}}function fd(e){var t=e.updateQueue;if(t!==null){var n=e.stateNode;try{nc(t,n)}catch(a){Ae(e,e.return,a)}}}function md(e,t,n){n.props=da(e.type,e.memoizedProps),n.state=e.memoizedState;try{n.componentWillUnmount()}catch(a){Ae(e,t,a)}}function Vl(e,t){try{var n=e.ref;if(n!==null){switch(e.tag){case 26:case 27:case 5:var a=e.stateNode;break;case 30:a=e.stateNode;break;default:a=e.stateNode}typeof n=="function"?e.refCleanup=n(a):n.current=a}}catch(l){Ae(e,t,l)}}function Pt(e,t){var n=e.ref,a=e.refCleanup;if(n!==null)if(typeof a=="function")try{a()}catch(l){Ae(e,t,l)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof n=="function")try{n(null)}catch(l){Ae(e,t,l)}else n.current=null}function pd(e){var t=e.type,n=e.memoizedProps,a=e.stateNode;try{e:switch(t){case"button":case"input":case"select":case"textarea":n.autoFocus&&a.focus();break e;case"img":n.src?a.src=n.src:n.srcSet&&(a.srcset=n.srcSet)}}catch(l){Ae(e,e.return,l)}}function Wr(e,t,n){try{var a=e.stateNode;Qp(a,e.type,n,t),a[lt]=t}catch(l){Ae(e,e.return,l)}}function hd(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&qn(e.type)||e.tag===4}function $r(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||hd(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&qn(e.type)||e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function eu(e,t,n){var a=e.tag;if(a===5||a===6)e=e.stateNode,t?(n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n).insertBefore(e,t):(t=n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n,t.appendChild(e),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=en));else if(a!==4&&(a===27&&qn(e.type)&&(n=e.stateNode,t=null),e=e.child,e!==null))for(eu(e,t,n),e=e.sibling;e!==null;)eu(e,t,n),e=e.sibling}function Pi(e,t,n){var a=e.tag;if(a===5||a===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(a!==4&&(a===27&&qn(e.type)&&(n=e.stateNode),e=e.child,e!==null))for(Pi(e,t,n),e=e.sibling;e!==null;)Pi(e,t,n),e=e.sibling}function gd(e){var t=e.stateNode,n=e.memoizedProps;try{for(var a=e.type,l=t.attributes;l.length;)t.removeAttributeNode(l[0]);ut(t,a,n),t[Ve]=e,t[lt]=n}catch(i){Ae(e,e.return,i)}}var dn=!1,Ke=!1,tu=!1,vd=typeof WeakSet=="function"?WeakSet:Set,at=null;function Ep(e,t){if(e=e.containerInfo,Tu=vo,e=Ds(e),Jo(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var a=n.getSelection&&n.getSelection();if(a&&a.rangeCount!==0){n=a.anchorNode;var l=a.anchorOffset,i=a.focusNode;a=a.focusOffset;try{n.nodeType,i.nodeType}catch{n=null;break e}var o=0,r=-1,c=-1,y=0,A=0,z=e,b=null;t:for(;;){for(var S;z!==n||l!==0&&z.nodeType!==3||(r=o+l),z!==i||a!==0&&z.nodeType!==3||(c=o+a),z.nodeType===3&&(o+=z.nodeValue.length),(S=z.firstChild)!==null;)b=z,z=S;for(;;){if(z===e)break t;if(b===n&&++y===l&&(r=o),b===i&&++A===a&&(c=o),(S=z.nextSibling)!==null)break;z=b,b=z.parentNode}z=S}n=r===-1||c===-1?null:{start:r,end:c}}else n=null}n=n||{start:0,end:0}}else n=null;for(_u={focusedElem:e,selectionRange:n},vo=!1,at=t;at!==null;)if(t=at,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,at=e;else for(;at!==null;){switch(t=at,i=t.alternate,e=t.flags,t.tag){case 0:if((e&4)!==0&&(e=t.updateQueue,e=e!==null?e.events:null,e!==null))for(n=0;n<e.length;n++)l=e[n],l.ref.impl=l.nextImpl;break;case 11:case 15:break;case 1:if((e&1024)!==0&&i!==null){e=void 0,n=t,l=i.memoizedProps,i=i.memoizedState,a=n.stateNode;try{var X=da(n.type,l);e=a.getSnapshotBeforeUpdate(X,i),a.__reactInternalSnapshotBeforeUpdate=e}catch(I){Ae(n,n.return,I)}}break;case 3:if((e&1024)!==0){if(e=t.stateNode.containerInfo,n=e.nodeType,n===9)Mu(e);else if(n===1)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":Mu(e);break;default:e.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((e&1024)!==0)throw Error(s(163))}if(e=t.sibling,e!==null){e.return=t.return,at=e;break}at=t.return}}function yd(e,t,n){var a=n.flags;switch(n.tag){case 0:case 11:case 15:mn(e,n),a&4&&Gl(5,n);break;case 1:if(mn(e,n),a&4)if(e=n.stateNode,t===null)try{e.componentDidMount()}catch(o){Ae(n,n.return,o)}else{var l=da(n.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(l,t,e.__reactInternalSnapshotBeforeUpdate)}catch(o){Ae(n,n.return,o)}}a&64&&fd(n),a&512&&Vl(n,n.return);break;case 3:if(mn(e,n),a&64&&(e=n.updateQueue,e!==null)){if(t=null,n.child!==null)switch(n.child.tag){case 27:case 5:t=n.child.stateNode;break;case 1:t=n.child.stateNode}try{nc(e,t)}catch(o){Ae(n,n.return,o)}}break;case 27:t===null&&a&4&&gd(n);case 26:case 5:mn(e,n),t===null&&a&4&&pd(n),a&512&&Vl(n,n.return);break;case 12:mn(e,n);break;case 31:mn(e,n),a&4&&Sd(e,n);break;case 13:mn(e,n),a&4&&Td(e,n),a&64&&(e=n.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(n=Rp.bind(null,n),$p(e,n))));break;case 22:if(a=n.memoizedState!==null||dn,!a){t=t!==null&&t.memoizedState!==null||Ke,l=dn;var i=Ke;dn=a,(Ke=t)&&!i?pn(e,n,(n.subtreeFlags&8772)!==0):mn(e,n),dn=l,Ke=i}break;case 30:break;default:mn(e,n)}}function bd(e){var t=e.alternate;t!==null&&(e.alternate=null,bd(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&Ye(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var ke=null,mt=!1;function fn(e,t,n){for(n=n.child;n!==null;)xd(e,t,n),n=n.sibling}function xd(e,t,n){if(et&&typeof et.onCommitFiberUnmount=="function")try{et.onCommitFiberUnmount(Qt,n)}catch{}switch(n.tag){case 26:Ke||Pt(n,t),fn(e,t,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:Ke||Pt(n,t);var a=ke,l=mt;qn(n.type)&&(ke=n.stateNode,mt=!1),fn(e,t,n),Il(n.stateNode),ke=a,mt=l;break;case 5:Ke||Pt(n,t);case 6:if(a=ke,l=mt,ke=null,fn(e,t,n),ke=a,mt=l,ke!==null)if(mt)try{(ke.nodeType===9?ke.body:ke.nodeName==="HTML"?ke.ownerDocument.body:ke).removeChild(n.stateNode)}catch(i){Ae(n,t,i)}else try{ke.removeChild(n.stateNode)}catch(i){Ae(n,t,i)}break;case 18:ke!==null&&(mt?(e=ke,mf(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,n.stateNode),al(e)):mf(ke,n.stateNode));break;case 4:a=ke,l=mt,ke=n.stateNode.containerInfo,mt=!0,fn(e,t,n),ke=a,mt=l;break;case 0:case 11:case 14:case 15:wn(2,n,t),Ke||wn(4,n,t),fn(e,t,n);break;case 1:Ke||(Pt(n,t),a=n.stateNode,typeof a.componentWillUnmount=="function"&&md(n,t,a)),fn(e,t,n);break;case 21:fn(e,t,n);break;case 22:Ke=(a=Ke)||n.memoizedState!==null,fn(e,t,n),Ke=a;break;default:fn(e,t,n)}}function Sd(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{al(e)}catch(n){Ae(t,t.return,n)}}}function Td(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{al(e)}catch(n){Ae(t,t.return,n)}}function Ap(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new vd),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new vd),t;default:throw Error(s(435,e.tag))}}function Fi(e,t){var n=Ap(e);t.forEach(function(a){if(!n.has(a)){n.add(a);var l=Up.bind(null,e,a);a.then(l,l)}})}function pt(e,t){var n=t.deletions;if(n!==null)for(var a=0;a<n.length;a++){var l=n[a],i=e,o=t,r=o;e:for(;r!==null;){switch(r.tag){case 27:if(qn(r.type)){ke=r.stateNode,mt=!1;break e}break;case 5:ke=r.stateNode,mt=!1;break e;case 3:case 4:ke=r.stateNode.containerInfo,mt=!0;break e}r=r.return}if(ke===null)throw Error(s(160));xd(i,o,l),ke=null,mt=!1,i=l.alternate,i!==null&&(i.return=null),l.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)_d(t,e),t=t.sibling}var Yt=null;function _d(e,t){var n=e.alternate,a=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:pt(t,e),ht(e),a&4&&(wn(3,e,e.return),Gl(3,e),wn(5,e,e.return));break;case 1:pt(t,e),ht(e),a&512&&(Ke||n===null||Pt(n,n.return)),a&64&&dn&&(e=e.updateQueue,e!==null&&(a=e.callbacks,a!==null&&(n=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=n===null?a:n.concat(a))));break;case 26:var l=Yt;if(pt(t,e),ht(e),a&512&&(Ke||n===null||Pt(n,n.return)),a&4){var i=n!==null?n.memoizedState:null;if(a=e.memoizedState,n===null)if(a===null)if(e.stateNode===null){e:{a=e.type,n=e.memoizedProps,l=l.ownerDocument||l;t:switch(a){case"title":i=l.getElementsByTagName("title")[0],(!i||i[ve]||i[Ve]||i.namespaceURI==="http://www.w3.org/2000/svg"||i.hasAttribute("itemprop"))&&(i=l.createElement(a),l.head.insertBefore(i,l.querySelector("head > title"))),ut(i,a,n),i[Ve]=e,nt(i),a=i;break e;case"link":var o=Ef("link","href",l).get(a+(n.href||""));if(o){for(var r=0;r<o.length;r++)if(i=o[r],i.getAttribute("href")===(n.href==null||n.href===""?null:n.href)&&i.getAttribute("rel")===(n.rel==null?null:n.rel)&&i.getAttribute("title")===(n.title==null?null:n.title)&&i.getAttribute("crossorigin")===(n.crossOrigin==null?null:n.crossOrigin)){o.splice(r,1);break t}}i=l.createElement(a),ut(i,a,n),l.head.appendChild(i);break;case"meta":if(o=Ef("meta","content",l).get(a+(n.content||""))){for(r=0;r<o.length;r++)if(i=o[r],i.getAttribute("content")===(n.content==null?null:""+n.content)&&i.getAttribute("name")===(n.name==null?null:n.name)&&i.getAttribute("property")===(n.property==null?null:n.property)&&i.getAttribute("http-equiv")===(n.httpEquiv==null?null:n.httpEquiv)&&i.getAttribute("charset")===(n.charSet==null?null:n.charSet)){o.splice(r,1);break t}}i=l.createElement(a),ut(i,a,n),l.head.appendChild(i);break;default:throw Error(s(468,a))}i[Ve]=e,nt(i),a=i}e.stateNode=a}else Af(l,e.type,e.stateNode);else e.stateNode=_f(l,a,e.memoizedProps);else i!==a?(i===null?n.stateNode!==null&&(n=n.stateNode,n.parentNode.removeChild(n)):i.count--,a===null?Af(l,e.type,e.stateNode):_f(l,a,e.memoizedProps)):a===null&&e.stateNode!==null&&Wr(e,e.memoizedProps,n.memoizedProps)}break;case 27:pt(t,e),ht(e),a&512&&(Ke||n===null||Pt(n,n.return)),n!==null&&a&4&&Wr(e,e.memoizedProps,n.memoizedProps);break;case 5:if(pt(t,e),ht(e),a&512&&(Ke||n===null||Pt(n,n.return)),e.flags&32){l=e.stateNode;try{Ma(l,"")}catch(X){Ae(e,e.return,X)}}a&4&&e.stateNode!=null&&(l=e.memoizedProps,Wr(e,l,n!==null?n.memoizedProps:l)),a&1024&&(tu=!0);break;case 6:if(pt(t,e),ht(e),a&4){if(e.stateNode===null)throw Error(s(162));a=e.memoizedProps,n=e.stateNode;try{n.nodeValue=a}catch(X){Ae(e,e.return,X)}}break;case 3:if(mo=null,l=Yt,Yt=co(t.containerInfo),pt(t,e),Yt=l,ht(e),a&4&&n!==null&&n.memoizedState.isDehydrated)try{al(t.containerInfo)}catch(X){Ae(e,e.return,X)}tu&&(tu=!1,Ed(e));break;case 4:a=Yt,Yt=co(e.stateNode.containerInfo),pt(t,e),ht(e),Yt=a;break;case 12:pt(t,e),ht(e);break;case 31:pt(t,e),ht(e),a&4&&(a=e.updateQueue,a!==null&&(e.updateQueue=null,Fi(e,a)));break;case 13:pt(t,e),ht(e),e.child.flags&8192&&e.memoizedState!==null!=(n!==null&&n.memoizedState!==null)&&(Wi=Ge()),a&4&&(a=e.updateQueue,a!==null&&(e.updateQueue=null,Fi(e,a)));break;case 22:l=e.memoizedState!==null;var c=n!==null&&n.memoizedState!==null,y=dn,A=Ke;if(dn=y||l,Ke=A||c,pt(t,e),Ke=A,dn=y,ht(e),a&8192)e:for(t=e.stateNode,t._visibility=l?t._visibility&-2:t._visibility|1,l&&(n===null||c||dn||Ke||fa(e)),n=null,t=e;;){if(t.tag===5||t.tag===26){if(n===null){c=n=t;try{if(i=c.stateNode,l)o=i.style,typeof o.setProperty=="function"?o.setProperty("display","none","important"):o.display="none";else{r=c.stateNode;var z=c.memoizedProps.style,b=z!=null&&z.hasOwnProperty("display")?z.display:null;r.style.display=b==null||typeof b=="boolean"?"":(""+b).trim()}}catch(X){Ae(c,c.return,X)}}}else if(t.tag===6){if(n===null){c=t;try{c.stateNode.nodeValue=l?"":c.memoizedProps}catch(X){Ae(c,c.return,X)}}}else if(t.tag===18){if(n===null){c=t;try{var S=c.stateNode;l?pf(S,!0):pf(c.stateNode,!1)}catch(X){Ae(c,c.return,X)}}}else if((t.tag!==22&&t.tag!==23||t.memoizedState===null||t===e)&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;n===t&&(n=null),t=t.return}n===t&&(n=null),t.sibling.return=t.return,t=t.sibling}a&4&&(a=e.updateQueue,a!==null&&(n=a.retryQueue,n!==null&&(a.retryQueue=null,Fi(e,n))));break;case 19:pt(t,e),ht(e),a&4&&(a=e.updateQueue,a!==null&&(e.updateQueue=null,Fi(e,a)));break;case 30:break;case 21:break;default:pt(t,e),ht(e)}}function ht(e){var t=e.flags;if(t&2){try{for(var n,a=e.return;a!==null;){if(hd(a)){n=a;break}a=a.return}if(n==null)throw Error(s(160));switch(n.tag){case 27:var l=n.stateNode,i=$r(e);Pi(e,i,l);break;case 5:var o=n.stateNode;n.flags&32&&(Ma(o,""),n.flags&=-33);var r=$r(e);Pi(e,r,o);break;case 3:case 4:var c=n.stateNode.containerInfo,y=$r(e);eu(e,y,c);break;default:throw Error(s(161))}}catch(A){Ae(e,e.return,A)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function Ed(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;Ed(t),t.tag===5&&t.flags&1024&&t.stateNode.reset(),e=e.sibling}}function mn(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)yd(e,t.alternate,t),t=t.sibling}function fa(e){for(e=e.child;e!==null;){var t=e;switch(t.tag){case 0:case 11:case 14:case 15:wn(4,t,t.return),fa(t);break;case 1:Pt(t,t.return);var n=t.stateNode;typeof n.componentWillUnmount=="function"&&md(t,t.return,n),fa(t);break;case 27:Il(t.stateNode);case 26:case 5:Pt(t,t.return),fa(t);break;case 22:t.memoizedState===null&&fa(t);break;case 30:fa(t);break;default:fa(t)}e=e.sibling}}function pn(e,t,n){for(n=n&&(t.subtreeFlags&8772)!==0,t=t.child;t!==null;){var a=t.alternate,l=e,i=t,o=i.flags;switch(i.tag){case 0:case 11:case 15:pn(l,i,n),Gl(4,i);break;case 1:if(pn(l,i,n),a=i,l=a.stateNode,typeof l.componentDidMount=="function")try{l.componentDidMount()}catch(y){Ae(a,a.return,y)}if(a=i,l=a.updateQueue,l!==null){var r=a.stateNode;try{var c=l.shared.hiddenCallbacks;if(c!==null)for(l.shared.hiddenCallbacks=null,l=0;l<c.length;l++)tc(c[l],r)}catch(y){Ae(a,a.return,y)}}n&&o&64&&fd(i),Vl(i,i.return);break;case 27:gd(i);case 26:case 5:pn(l,i,n),n&&a===null&&o&4&&pd(i),Vl(i,i.return);break;case 12:pn(l,i,n);break;case 31:pn(l,i,n),n&&o&4&&Sd(l,i);break;case 13:pn(l,i,n),n&&o&4&&Td(l,i);break;case 22:i.memoizedState===null&&pn(l,i,n),Vl(i,i.return);break;case 30:break;default:pn(l,i,n)}t=t.sibling}}function nu(e,t){var n=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==n&&(e!=null&&e.refCount++,n!=null&&Cl(n))}function au(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&Cl(e))}function Xt(e,t,n,a){if(t.subtreeFlags&10256)for(t=t.child;t!==null;)Ad(e,t,n,a),t=t.sibling}function Ad(e,t,n,a){var l=t.flags;switch(t.tag){case 0:case 11:case 15:Xt(e,t,n,a),l&2048&&Gl(9,t);break;case 1:Xt(e,t,n,a);break;case 3:Xt(e,t,n,a),l&2048&&(e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&Cl(e)));break;case 12:if(l&2048){Xt(e,t,n,a),e=t.stateNode;try{var i=t.memoizedProps,o=i.id,r=i.onPostCommit;typeof r=="function"&&r(o,t.alternate===null?"mount":"update",e.passiveEffectDuration,-0)}catch(c){Ae(t,t.return,c)}}else Xt(e,t,n,a);break;case 31:Xt(e,t,n,a);break;case 13:Xt(e,t,n,a);break;case 23:break;case 22:i=t.stateNode,o=t.alternate,t.memoizedState!==null?i._visibility&2?Xt(e,t,n,a):Yl(e,t):i._visibility&2?Xt(e,t,n,a):(i._visibility|=2,Za(e,t,n,a,(t.subtreeFlags&10256)!==0||!1)),l&2048&&nu(o,t);break;case 24:Xt(e,t,n,a),l&2048&&au(t.alternate,t);break;default:Xt(e,t,n,a)}}function Za(e,t,n,a,l){for(l=l&&((t.subtreeFlags&10256)!==0||!1),t=t.child;t!==null;){var i=e,o=t,r=n,c=a,y=o.flags;switch(o.tag){case 0:case 11:case 15:Za(i,o,r,c,l),Gl(8,o);break;case 23:break;case 22:var A=o.stateNode;o.memoizedState!==null?A._visibility&2?Za(i,o,r,c,l):Yl(i,o):(A._visibility|=2,Za(i,o,r,c,l)),l&&y&2048&&nu(o.alternate,o);break;case 24:Za(i,o,r,c,l),l&&y&2048&&au(o.alternate,o);break;default:Za(i,o,r,c,l)}t=t.sibling}}function Yl(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var n=e,a=t,l=a.flags;switch(a.tag){case 22:Yl(n,a),l&2048&&nu(a.alternate,a);break;case 24:Yl(n,a),l&2048&&au(a.alternate,a);break;default:Yl(n,a)}t=t.sibling}}var Xl=8192;function Ka(e,t,n){if(e.subtreeFlags&Xl)for(e=e.child;e!==null;)Md(e,t,n),e=e.sibling}function Md(e,t,n){switch(e.tag){case 26:Ka(e,t,n),e.flags&Xl&&e.memoizedState!==null&&dh(n,Yt,e.memoizedState,e.memoizedProps);break;case 5:Ka(e,t,n);break;case 3:case 4:var a=Yt;Yt=co(e.stateNode.containerInfo),Ka(e,t,n),Yt=a;break;case 22:e.memoizedState===null&&(a=e.alternate,a!==null&&a.memoizedState!==null?(a=Xl,Xl=16777216,Ka(e,t,n),Xl=a):Ka(e,t,n));break;default:Ka(e,t,n)}}function zd(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function Ql(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var n=0;n<t.length;n++){var a=t[n];at=a,Dd(a,e)}zd(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)Cd(e),e=e.sibling}function Cd(e){switch(e.tag){case 0:case 11:case 15:Ql(e),e.flags&2048&&wn(9,e,e.return);break;case 3:Ql(e);break;case 12:Ql(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,Ii(e)):Ql(e);break;default:Ql(e)}}function Ii(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var n=0;n<t.length;n++){var a=t[n];at=a,Dd(a,e)}zd(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:wn(8,t,t.return),Ii(t);break;case 22:n=t.stateNode,n._visibility&2&&(n._visibility&=-3,Ii(t));break;default:Ii(t)}e=e.sibling}}function Dd(e,t){for(;at!==null;){var n=at;switch(n.tag){case 0:case 11:case 15:wn(8,n,t);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var a=n.memoizedState.cachePool.pool;a!=null&&a.refCount++}break;case 24:Cl(n.memoizedState.cache)}if(a=n.child,a!==null)a.return=n,at=a;else e:for(n=e;at!==null;){a=at;var l=a.sibling,i=a.return;if(bd(a),a===n){at=null;break e}if(l!==null){l.return=i,at=l;break e}at=i}}}var Mp={getCacheForType:function(e){var t=ot(Xe),n=t.data.get(e);return n===void 0&&(n=e(),t.data.set(e,n)),n},cacheSignal:function(){return ot(Xe).controller.signal}},zp=typeof WeakMap=="function"?WeakMap:Map,Se=0,je=null,se=null,de=0,Ee=0,Et=null,Rn=!1,Ja=!1,lu=!1,hn=0,Be=0,Un=0,ma=0,iu=0,At=0,Pa=0,Zl=null,gt=null,ou=!1,Wi=0,jd=0,$i=1/0,eo=null,kn=null,Ie=0,Ln=null,Fa=null,gn=0,ru=0,uu=null,Od=null,Kl=0,su=null;function Mt(){return(Se&2)!==0&&de!==0?de&-de:E.T!==null?hu():pl()}function wd(){if(At===0)if((de&536870912)===0||pe){var e=dt;dt<<=1,(dt&3932160)===0&&(dt=262144),At=e}else At=536870912;return e=Tt.current,e!==null&&(e.flags|=32),At}function vt(e,t,n){(e===je&&(Ee===2||Ee===9)||e.cancelPendingCommit!==null)&&(Ia(e,0),Hn(e,de,At,!1)),xn(e,n),((Se&2)===0||e!==je)&&(e===je&&((Se&2)===0&&(ma|=n),Be===4&&Hn(e,de,At,!1)),Ft(e))}function Rd(e,t,n){if((Se&6)!==0)throw Error(s(327));var a=!n&&(t&127)===0&&(t&e.expiredLanes)===0||bn(e,t),l=a?jp(e,t):du(e,t,!0),i=a;do{if(l===0){Ja&&!a&&Hn(e,t,0,!1);break}else{if(n=e.current.alternate,i&&!Cp(n)){l=du(e,t,!1),i=!1;continue}if(l===2){if(i=t,e.errorRecoveryDisabledLanes&i)var o=0;else o=e.pendingLanes&-536870913,o=o!==0?o:o&536870912?536870912:0;if(o!==0){t=o;e:{var r=e;l=Zl;var c=r.current.memoizedState.isDehydrated;if(c&&(Ia(r,o).flags|=256),o=du(r,o,!1),o!==2){if(lu&&!c){r.errorRecoveryDisabledLanes|=i,ma|=i,l=4;break e}i=gt,gt=l,i!==null&&(gt===null?gt=i:gt.push.apply(gt,i))}l=o}if(i=!1,l!==2)continue}}if(l===1){Ia(e,0),Hn(e,t,0,!0);break}e:{switch(a=e,i=l,i){case 0:case 1:throw Error(s(345));case 4:if((t&4194048)!==t)break;case 6:Hn(a,t,At,!Rn);break e;case 2:gt=null;break;case 3:case 5:break;default:throw Error(s(329))}if((t&62914560)===t&&(l=Wi+300-Ge(),10<l)){if(Hn(a,t,At,!Rn),Fn(a,0,!0)!==0)break e;gn=t,a.timeoutHandle=df(Ud.bind(null,a,n,gt,eo,ou,t,At,ma,Pa,Rn,i,"Throttled",-0,0),l);break e}Ud(a,n,gt,eo,ou,t,At,ma,Pa,Rn,i,null,-0,0)}}break}while(!0);Ft(e)}function Ud(e,t,n,a,l,i,o,r,c,y,A,z,b,S){if(e.timeoutHandle=-1,z=t.subtreeFlags,z&8192||(z&16785408)===16785408){z={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:en},Md(t,i,z);var X=(i&62914560)===i?Wi-Ge():(i&4194048)===i?jd-Ge():0;if(X=fh(z,X),X!==null){gn=i,e.cancelPendingCommit=X(Vd.bind(null,e,t,i,n,a,l,o,r,c,A,z,null,b,S)),Hn(e,i,o,!y);return}}Vd(e,t,i,n,a,l,o,r,c)}function Cp(e){for(var t=e;;){var n=t.tag;if((n===0||n===11||n===15)&&t.flags&16384&&(n=t.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var a=0;a<n.length;a++){var l=n[a],i=l.getSnapshot;l=l.value;try{if(!xt(i(),l))return!1}catch{return!1}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function Hn(e,t,n,a){t&=~iu,t&=~ma,e.suspendedLanes|=t,e.pingedLanes&=~t,a&&(e.warmLanes|=t),a=e.expirationTimes;for(var l=t;0<l;){var i=31-tt(l),o=1<<i;a[i]=-1,l&=~o}n!==0&&dl(e,n,t)}function to(){return(Se&6)===0?(Jl(0),!1):!0}function cu(){if(se!==null){if(Ee===0)var e=se.return;else e=se,ln=la=null,Mr(e),Ga=null,jl=0,e=se;for(;e!==null;)dd(e.alternate,e),e=e.return;se=null}}function Ia(e,t){var n=e.timeoutHandle;n!==-1&&(e.timeoutHandle=-1,Jp(n)),n=e.cancelPendingCommit,n!==null&&(e.cancelPendingCommit=null,n()),gn=0,cu(),je=e,se=n=nn(e.current,null),de=t,Ee=0,Et=null,Rn=!1,Ja=bn(e,t),lu=!1,Pa=At=iu=ma=Un=Be=0,gt=Zl=null,ou=!1,(t&8)!==0&&(t|=t&32);var a=e.entangledLanes;if(a!==0)for(e=e.entanglements,a&=t;0<a;){var l=31-tt(a),i=1<<l;t|=e[l],a&=~i}return hn=t,Ti(),n}function kd(e,t){ae=null,E.H=Bl,t===Na||t===ji?(t=Is(),Ee=3):t===pr?(t=Is(),Ee=4):Ee=t===Vr?8:t!==null&&typeof t=="object"&&typeof t.then=="function"?6:1,Et=t,se===null&&(Be=1,Xi(e,Rt(t,e.current)))}function Ld(){var e=Tt.current;return e===null?!0:(de&4194048)===de?Ht===null:(de&62914560)===de||(de&536870912)!==0?e===Ht:!1}function Hd(){var e=E.H;return E.H=Bl,e===null?Bl:e}function Bd(){var e=E.A;return E.A=Mp,e}function no(){Be=4,Rn||(de&4194048)!==de&&Tt.current!==null||(Ja=!0),(Un&134217727)===0&&(ma&134217727)===0||je===null||Hn(je,de,At,!1)}function du(e,t,n){var a=Se;Se|=2;var l=Hd(),i=Bd();(je!==e||de!==t)&&(eo=null,Ia(e,t)),t=!1;var o=Be;e:do try{if(Ee!==0&&se!==null){var r=se,c=Et;switch(Ee){case 8:cu(),o=6;break e;case 3:case 2:case 9:case 6:Tt.current===null&&(t=!0);var y=Ee;if(Ee=0,Et=null,Wa(e,r,c,y),n&&Ja){o=0;break e}break;default:y=Ee,Ee=0,Et=null,Wa(e,r,c,y)}}Dp(),o=Be;break}catch(A){kd(e,A)}while(!0);return t&&e.shellSuspendCounter++,ln=la=null,Se=a,E.H=l,E.A=i,se===null&&(je=null,de=0,Ti()),o}function Dp(){for(;se!==null;)qd(se)}function jp(e,t){var n=Se;Se|=2;var a=Hd(),l=Bd();je!==e||de!==t?(eo=null,$i=Ge()+500,Ia(e,t)):Ja=bn(e,t);e:do try{if(Ee!==0&&se!==null){t=se;var i=Et;t:switch(Ee){case 1:Ee=0,Et=null,Wa(e,t,i,1);break;case 2:case 9:if(Ps(i)){Ee=0,Et=null,Nd(t);break}t=function(){Ee!==2&&Ee!==9||je!==e||(Ee=7),Ft(e)},i.then(t,t);break e;case 3:Ee=7;break e;case 4:Ee=5;break e;case 7:Ps(i)?(Ee=0,Et=null,Nd(t)):(Ee=0,Et=null,Wa(e,t,i,7));break;case 5:var o=null;switch(se.tag){case 26:o=se.memoizedState;case 5:case 27:var r=se;if(o?Mf(o):r.stateNode.complete){Ee=0,Et=null;var c=r.sibling;if(c!==null)se=c;else{var y=r.return;y!==null?(se=y,ao(y)):se=null}break t}}Ee=0,Et=null,Wa(e,t,i,5);break;case 6:Ee=0,Et=null,Wa(e,t,i,6);break;case 8:cu(),Be=6;break e;default:throw Error(s(462))}}Op();break}catch(A){kd(e,A)}while(!0);return ln=la=null,E.H=a,E.A=l,Se=n,se!==null?0:(je=null,de=0,Ti(),Be)}function Op(){for(;se!==null&&!rl();)qd(se)}function qd(e){var t=sd(e.alternate,e,hn);e.memoizedProps=e.pendingProps,t===null?ao(e):se=t}function Nd(e){var t=e,n=t.alternate;switch(t.tag){case 15:case 0:t=ad(n,t,t.pendingProps,t.type,void 0,de);break;case 11:t=ad(n,t,t.pendingProps,t.type.render,t.ref,de);break;case 5:Mr(t);default:dd(n,t),t=se=Bs(t,hn),t=sd(n,t,hn)}e.memoizedProps=e.pendingProps,t===null?ao(e):se=t}function Wa(e,t,n,a){ln=la=null,Mr(t),Ga=null,jl=0;var l=t.return;try{if(bp(e,l,t,n,de)){Be=1,Xi(e,Rt(n,e.current)),se=null;return}}catch(i){if(l!==null)throw se=l,i;Be=1,Xi(e,Rt(n,e.current)),se=null;return}t.flags&32768?(pe||a===1?e=!0:Ja||(de&536870912)!==0?e=!1:(Rn=e=!0,(a===2||a===9||a===3||a===6)&&(a=Tt.current,a!==null&&a.tag===13&&(a.flags|=16384))),Gd(t,e)):ao(t)}function ao(e){var t=e;do{if((t.flags&32768)!==0){Gd(t,Rn);return}e=t.return;var n=Tp(t.alternate,t,hn);if(n!==null){se=n;return}if(t=t.sibling,t!==null){se=t;return}se=t=e}while(t!==null);Be===0&&(Be=5)}function Gd(e,t){do{var n=_p(e.alternate,e);if(n!==null){n.flags&=32767,se=n;return}if(n=e.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!t&&(e=e.sibling,e!==null)){se=e;return}se=e=n}while(e!==null);Be=6,se=null}function Vd(e,t,n,a,l,i,o,r,c){e.cancelPendingCommit=null;do lo();while(Ie!==0);if((Se&6)!==0)throw Error(s(327));if(t!==null){if(t===e.current)throw Error(s(177));if(i=t.lanes|t.childLanes,i|=$o,ci(e,n,i,o,r,c),e===je&&(se=je=null,de=0),Fa=t,Ln=e,gn=n,ru=i,uu=l,Od=a,(t.subtreeFlags&10256)!==0||(t.flags&10256)!==0?(e.callbackNode=null,e.callbackPriority=0,kp(Dt,function(){return Kd(),null})):(e.callbackNode=null,e.callbackPriority=0),a=(t.flags&13878)!==0,(t.subtreeFlags&13878)!==0||a){a=E.T,E.T=null,l=k.p,k.p=2,o=Se,Se|=4;try{Ep(e,t,n)}finally{Se=o,k.p=l,E.T=a}}Ie=1,Yd(),Xd(),Qd()}}function Yd(){if(Ie===1){Ie=0;var e=Ln,t=Fa,n=(t.flags&13878)!==0;if((t.subtreeFlags&13878)!==0||n){n=E.T,E.T=null;var a=k.p;k.p=2;var l=Se;Se|=4;try{_d(t,e);var i=_u,o=Ds(e.containerInfo),r=i.focusedElem,c=i.selectionRange;if(o!==r&&r&&r.ownerDocument&&Cs(r.ownerDocument.documentElement,r)){if(c!==null&&Jo(r)){var y=c.start,A=c.end;if(A===void 0&&(A=y),"selectionStart"in r)r.selectionStart=y,r.selectionEnd=Math.min(A,r.value.length);else{var z=r.ownerDocument||document,b=z&&z.defaultView||window;if(b.getSelection){var S=b.getSelection(),X=r.textContent.length,I=Math.min(c.start,X),De=c.end===void 0?I:Math.min(c.end,X);!S.extend&&I>De&&(o=De,De=I,I=o);var p=zs(r,I),f=zs(r,De);if(p&&f&&(S.rangeCount!==1||S.anchorNode!==p.node||S.anchorOffset!==p.offset||S.focusNode!==f.node||S.focusOffset!==f.offset)){var v=z.createRange();v.setStart(p.node,p.offset),S.removeAllRanges(),I>De?(S.addRange(v),S.extend(f.node,f.offset)):(v.setEnd(f.node,f.offset),S.addRange(v))}}}}for(z=[],S=r;S=S.parentNode;)S.nodeType===1&&z.push({element:S,left:S.scrollLeft,top:S.scrollTop});for(typeof r.focus=="function"&&r.focus(),r=0;r<z.length;r++){var M=z[r];M.element.scrollLeft=M.left,M.element.scrollTop=M.top}}vo=!!Tu,_u=Tu=null}finally{Se=l,k.p=a,E.T=n}}e.current=t,Ie=2}}function Xd(){if(Ie===2){Ie=0;var e=Ln,t=Fa,n=(t.flags&8772)!==0;if((t.subtreeFlags&8772)!==0||n){n=E.T,E.T=null;var a=k.p;k.p=2;var l=Se;Se|=4;try{yd(e,t.alternate,t)}finally{Se=l,k.p=a,E.T=n}}Ie=3}}function Qd(){if(Ie===4||Ie===3){Ie=0,ul();var e=Ln,t=Fa,n=gn,a=Od;(t.subtreeFlags&10256)!==0||(t.flags&10256)!==0?Ie=5:(Ie=0,Fa=Ln=null,Zd(e,e.pendingLanes));var l=e.pendingLanes;if(l===0&&(kn=null),Ta(n),t=t.stateNode,et&&typeof et.onCommitFiberRoot=="function")try{et.onCommitFiberRoot(Qt,t,void 0,(t.current.flags&128)===128)}catch{}if(a!==null){t=E.T,l=k.p,k.p=2,E.T=null;try{for(var i=e.onRecoverableError,o=0;o<a.length;o++){var r=a[o];i(r.value,{componentStack:r.stack})}}finally{E.T=t,k.p=l}}(gn&3)!==0&&lo(),Ft(e),l=e.pendingLanes,(n&261930)!==0&&(l&42)!==0?e===su?Kl++:(Kl=0,su=e):Kl=0,Jl(0)}}function Zd(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,Cl(t)))}function lo(){return Yd(),Xd(),Qd(),Kd()}function Kd(){if(Ie!==5)return!1;var e=Ln,t=ru;ru=0;var n=Ta(gn),a=E.T,l=k.p;try{k.p=32>n?32:n,E.T=null,n=uu,uu=null;var i=Ln,o=gn;if(Ie=0,Fa=Ln=null,gn=0,(Se&6)!==0)throw Error(s(331));var r=Se;if(Se|=4,Cd(i.current),Ad(i,i.current,o,n),Se=r,Jl(0,!1),et&&typeof et.onPostCommitFiberRoot=="function")try{et.onPostCommitFiberRoot(Qt,i)}catch{}return!0}finally{k.p=l,E.T=a,Zd(e,t)}}function Jd(e,t,n){t=Rt(n,t),t=Gr(e.stateNode,t,2),e=Dn(e,t,2),e!==null&&(xn(e,2),Ft(e))}function Ae(e,t,n){if(e.tag===3)Jd(e,e,n);else for(;t!==null;){if(t.tag===3){Jd(t,e,n);break}else if(t.tag===1){var a=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof a.componentDidCatch=="function"&&(kn===null||!kn.has(a))){e=Rt(n,e),n=Pc(2),a=Dn(t,n,2),a!==null&&(Fc(n,a,t,e),xn(a,2),Ft(a));break}}t=t.return}}function fu(e,t,n){var a=e.pingCache;if(a===null){a=e.pingCache=new zp;var l=new Set;a.set(t,l)}else l=a.get(t),l===void 0&&(l=new Set,a.set(t,l));l.has(n)||(lu=!0,l.add(n),e=wp.bind(null,e,t,n),t.then(e,e))}function wp(e,t,n){var a=e.pingCache;a!==null&&a.delete(t),e.pingedLanes|=e.suspendedLanes&n,e.warmLanes&=~n,je===e&&(de&n)===n&&(Be===4||Be===3&&(de&62914560)===de&&300>Ge()-Wi?(Se&2)===0&&Ia(e,0):iu|=n,Pa===de&&(Pa=0)),Ft(e)}function Pd(e,t){t===0&&(t=cl()),e=ta(e,t),e!==null&&(xn(e,t),Ft(e))}function Rp(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),Pd(e,n)}function Up(e,t){var n=0;switch(e.tag){case 31:case 13:var a=e.stateNode,l=e.memoizedState;l!==null&&(n=l.retryLane);break;case 19:a=e.stateNode;break;case 22:a=e.stateNode._retryCache;break;default:throw Error(s(314))}a!==null&&a.delete(t),Pd(e,n)}function kp(e,t){return va(e,t)}var io=null,$a=null,mu=!1,oo=!1,pu=!1,Bn=0;function Ft(e){e!==$a&&e.next===null&&($a===null?io=$a=e:$a=$a.next=e),oo=!0,mu||(mu=!0,Hp())}function Jl(e,t){if(!pu&&oo){pu=!0;do for(var n=!1,a=io;a!==null;){if(e!==0){var l=a.pendingLanes;if(l===0)var i=0;else{var o=a.suspendedLanes,r=a.pingedLanes;i=(1<<31-tt(42|e)+1)-1,i&=l&~(o&~r),i=i&201326741?i&201326741|1:i?i|2:0}i!==0&&(n=!0,$d(a,i))}else i=de,i=Fn(a,a===je?i:0,a.cancelPendingCommit!==null||a.timeoutHandle!==-1),(i&3)===0||bn(a,i)||(n=!0,$d(a,i));a=a.next}while(n);pu=!1}}function Lp(){Fd()}function Fd(){oo=mu=!1;var e=0;Bn!==0&&Kp()&&(e=Bn);for(var t=Ge(),n=null,a=io;a!==null;){var l=a.next,i=Id(a,t);i===0?(a.next=null,n===null?io=l:n.next=l,l===null&&($a=n)):(n=a,(e!==0||(i&3)!==0)&&(oo=!0)),a=l}Ie!==0&&Ie!==5||Jl(e),Bn!==0&&(Bn=0)}function Id(e,t){for(var n=e.suspendedLanes,a=e.pingedLanes,l=e.expirationTimes,i=e.pendingLanes&-62914561;0<i;){var o=31-tt(i),r=1<<o,c=l[o];c===-1?((r&n)===0||(r&a)!==0)&&(l[o]=si(r,t)):c<=t&&(e.expiredLanes|=r),i&=~r}if(t=je,n=de,n=Fn(e,e===t?n:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),a=e.callbackNode,n===0||e===t&&(Ee===2||Ee===9)||e.cancelPendingCommit!==null)return a!==null&&a!==null&&$e(a),e.callbackNode=null,e.callbackPriority=0;if((n&3)===0||bn(e,n)){if(t=n&-n,t===e.callbackPriority)return t;switch(a!==null&&$e(a),Ta(n)){case 2:case 8:n=Jn;break;case 32:n=Dt;break;case 268435456:n=ya;break;default:n=Dt}return a=Wd.bind(null,e),n=va(n,a),e.callbackPriority=t,e.callbackNode=n,t}return a!==null&&a!==null&&$e(a),e.callbackPriority=2,e.callbackNode=null,2}function Wd(e,t){if(Ie!==0&&Ie!==5)return e.callbackNode=null,e.callbackPriority=0,null;var n=e.callbackNode;if(lo()&&e.callbackNode!==n)return null;var a=de;return a=Fn(e,e===je?a:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),a===0?null:(Rd(e,a,t),Id(e,Ge()),e.callbackNode!=null&&e.callbackNode===n?Wd.bind(null,e):null)}function $d(e,t){if(lo())return null;Rd(e,t,!0)}function Hp(){Pp(function(){(Se&6)!==0?va(Do,Lp):Fd()})}function hu(){if(Bn===0){var e=Ba;e===0&&(e=Pn,Pn<<=1,(Pn&261888)===0&&(Pn=256)),Bn=e}return Bn}function ef(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:pi(""+e)}function tf(e,t){var n=t.ownerDocument.createElement("input");return n.name=t.name,n.value=t.value,e.id&&n.setAttribute("form",e.id),t.parentNode.insertBefore(n,t),e=new FormData(e),n.parentNode.removeChild(n),e}function Bp(e,t,n,a,l){if(t==="submit"&&n&&n.stateNode===l){var i=ef((l[lt]||null).action),o=a.submitter;o&&(t=(t=o[lt]||null)?ef(t.formAction):o.getAttribute("formAction"),t!==null&&(i=t,o=null));var r=new yi("action","action",null,a,l);e.push({event:r,listeners:[{instance:null,listener:function(){if(a.defaultPrevented){if(Bn!==0){var c=o?tf(l,o):new FormData(l);kr(n,{pending:!0,data:c,method:l.method,action:i},null,c)}}else typeof i=="function"&&(r.preventDefault(),c=o?tf(l,o):new FormData(l),kr(n,{pending:!0,data:c,method:l.method,action:i},i,c))},currentTarget:l}]})}}for(var gu=0;gu<Wo.length;gu++){var vu=Wo[gu],qp=vu.toLowerCase(),Np=vu[0].toUpperCase()+vu.slice(1);Vt(qp,"on"+Np)}Vt(ws,"onAnimationEnd"),Vt(Rs,"onAnimationIteration"),Vt(Us,"onAnimationStart"),Vt("dblclick","onDoubleClick"),Vt("focusin","onFocus"),Vt("focusout","onBlur"),Vt(np,"onTransitionRun"),Vt(ap,"onTransitionStart"),Vt(lp,"onTransitionCancel"),Vt(ks,"onTransitionEnd"),Ea("onMouseEnter",["mouseout","mouseover"]),Ea("onMouseLeave",["mouseout","mouseover"]),Ea("onPointerEnter",["pointerout","pointerover"]),Ea("onPointerLeave",["pointerout","pointerover"]),In("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),In("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),In("onBeforeInput",["compositionend","keypress","textInput","paste"]),In("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),In("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),In("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Pl="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Gp=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Pl));function nf(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var a=e[n],l=a.event;a=a.listeners;e:{var i=void 0;if(t)for(var o=a.length-1;0<=o;o--){var r=a[o],c=r.instance,y=r.currentTarget;if(r=r.listener,c!==i&&l.isPropagationStopped())break e;i=r,l.currentTarget=y;try{i(l)}catch(A){Si(A)}l.currentTarget=null,i=c}else for(o=0;o<a.length;o++){if(r=a[o],c=r.instance,y=r.currentTarget,r=r.listener,c!==i&&l.isPropagationStopped())break e;i=r,l.currentTarget=y;try{i(l)}catch(A){Si(A)}l.currentTarget=null,i=c}}}}function ce(e,t){var n=t[g];n===void 0&&(n=t[g]=new Set);var a=e+"__bubble";n.has(a)||(af(t,e,2,!1),n.add(a))}function yu(e,t,n){var a=0;t&&(a|=4),af(n,e,a,t)}var ro="_reactListening"+Math.random().toString(36).slice(2);function bu(e){if(!e[ro]){e[ro]=!0,Fu.forEach(function(n){n!=="selectionchange"&&(Gp.has(n)||yu(n,!1,e),yu(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[ro]||(t[ro]=!0,yu("selectionchange",!1,t))}}function af(e,t,n,a){switch(Rf(t)){case 2:var l=hh;break;case 8:l=gh;break;default:l=Uu}n=l.bind(null,t,n,e),l=void 0,!qo||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(l=!0),a?l!==void 0?e.addEventListener(t,n,{capture:!0,passive:l}):e.addEventListener(t,n,!0):l!==void 0?e.addEventListener(t,n,{passive:l}):e.addEventListener(t,n,!1)}function xu(e,t,n,a,l){var i=a;if((t&1)===0&&(t&2)===0&&a!==null)e:for(;;){if(a===null)return;var o=a.tag;if(o===3||o===4){var r=a.stateNode.containerInfo;if(r===l)break;if(o===4)for(o=a.return;o!==null;){var c=o.tag;if((c===3||c===4)&&o.stateNode.containerInfo===l)return;o=o.return}for(;r!==null;){if(o=Fe(r),o===null)return;if(c=o.tag,c===5||c===6||c===26||c===27){a=i=o;continue e}r=r.parentNode}}a=a.return}us(function(){var y=i,A=Ho(n),z=[];e:{var b=Ls.get(e);if(b!==void 0){var S=yi,X=e;switch(e){case"keypress":if(gi(n)===0)break e;case"keydown":case"keyup":S=Um;break;case"focusin":X="focus",S=Yo;break;case"focusout":X="blur",S=Yo;break;case"beforeblur":case"afterblur":S=Yo;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":S=ds;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":S=Tm;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":S=Hm;break;case ws:case Rs:case Us:S=Am;break;case ks:S=qm;break;case"scroll":case"scrollend":S=xm;break;case"wheel":S=Gm;break;case"copy":case"cut":case"paste":S=zm;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":S=ms;break;case"toggle":case"beforetoggle":S=Ym}var I=(t&4)!==0,De=!I&&(e==="scroll"||e==="scrollend"),p=I?b!==null?b+"Capture":null:b;I=[];for(var f=y,v;f!==null;){var M=f;if(v=M.stateNode,M=M.tag,M!==5&&M!==26&&M!==27||v===null||p===null||(M=vl(f,p),M!=null&&I.push(Fl(f,M,v))),De)break;f=f.return}0<I.length&&(b=new S(b,X,null,n,A),z.push({event:b,listeners:I}))}}if((t&7)===0){e:{if(b=e==="mouseover"||e==="pointerover",S=e==="mouseout"||e==="pointerout",b&&n!==Lo&&(X=n.relatedTarget||n.fromElement)&&(Fe(X)||X[Wt]))break e;if((S||b)&&(b=A.window===A?A:(b=A.ownerDocument)?b.defaultView||b.parentWindow:window,S?(X=n.relatedTarget||n.toElement,S=y,X=X?Fe(X):null,X!==null&&(De=D(X),I=X.tag,X!==De||I!==5&&I!==27&&I!==6)&&(X=null)):(S=null,X=y),S!==X)){if(I=ds,M="onMouseLeave",p="onMouseEnter",f="mouse",(e==="pointerout"||e==="pointerover")&&(I=ms,M="onPointerLeave",p="onPointerEnter",f="pointer"),De=S==null?b:gl(S),v=X==null?b:gl(X),b=new I(M,f+"leave",S,n,A),b.target=De,b.relatedTarget=v,M=null,Fe(A)===y&&(I=new I(p,f+"enter",X,n,A),I.target=v,I.relatedTarget=De,M=I),De=M,S&&X)t:{for(I=Vp,p=S,f=X,v=0,M=p;M;M=I(M))v++;M=0;for(var J=f;J;J=I(J))M++;for(;0<v-M;)p=I(p),v--;for(;0<M-v;)f=I(f),M--;for(;v--;){if(p===f||f!==null&&p===f.alternate){I=p;break t}p=I(p),f=I(f)}I=null}else I=null;S!==null&&lf(z,b,S,I,!1),X!==null&&De!==null&&lf(z,De,X,I,!0)}}e:{if(b=y?gl(y):window,S=b.nodeName&&b.nodeName.toLowerCase(),S==="select"||S==="input"&&b.type==="file")var be=Ss;else if(bs(b))if(Ts)be=$m;else{be=Im;var Q=Fm}else S=b.nodeName,!S||S.toLowerCase()!=="input"||b.type!=="checkbox"&&b.type!=="radio"?y&&ko(y.elementType)&&(be=Ss):be=Wm;if(be&&(be=be(e,y))){xs(z,be,n,A);break e}Q&&Q(e,b,y),e==="focusout"&&y&&b.type==="number"&&y.memoizedProps.value!=null&&Uo(b,"number",b.value)}switch(Q=y?gl(y):window,e){case"focusin":(bs(Q)||Q.contentEditable==="true")&&(ja=Q,Po=y,Al=null);break;case"focusout":Al=Po=ja=null;break;case"mousedown":Fo=!0;break;case"contextmenu":case"mouseup":case"dragend":Fo=!1,js(z,n,A);break;case"selectionchange":if(tp)break;case"keydown":case"keyup":js(z,n,A)}var le;if(Qo)e:{switch(e){case"compositionstart":var fe="onCompositionStart";break e;case"compositionend":fe="onCompositionEnd";break e;case"compositionupdate":fe="onCompositionUpdate";break e}fe=void 0}else Da?vs(e,n)&&(fe="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(fe="onCompositionStart");fe&&(ps&&n.locale!=="ko"&&(Da||fe!=="onCompositionStart"?fe==="onCompositionEnd"&&Da&&(le=ss()):(Tn=A,No="value"in Tn?Tn.value:Tn.textContent,Da=!0)),Q=uo(y,fe),0<Q.length&&(fe=new fs(fe,e,null,n,A),z.push({event:fe,listeners:Q}),le?fe.data=le:(le=ys(n),le!==null&&(fe.data=le)))),(le=Qm?Zm(e,n):Km(e,n))&&(fe=uo(y,"onBeforeInput"),0<fe.length&&(Q=new fs("onBeforeInput","beforeinput",null,n,A),z.push({event:Q,listeners:fe}),Q.data=le)),Bp(z,e,y,n,A)}nf(z,t)})}function Fl(e,t,n){return{instance:e,listener:t,currentTarget:n}}function uo(e,t){for(var n=t+"Capture",a=[];e!==null;){var l=e,i=l.stateNode;if(l=l.tag,l!==5&&l!==26&&l!==27||i===null||(l=vl(e,n),l!=null&&a.unshift(Fl(e,l,i)),l=vl(e,t),l!=null&&a.push(Fl(e,l,i))),e.tag===3)return a;e=e.return}return[]}function Vp(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function lf(e,t,n,a,l){for(var i=t._reactName,o=[];n!==null&&n!==a;){var r=n,c=r.alternate,y=r.stateNode;if(r=r.tag,c!==null&&c===a)break;r!==5&&r!==26&&r!==27||y===null||(c=y,l?(y=vl(n,i),y!=null&&o.unshift(Fl(n,y,c))):l||(y=vl(n,i),y!=null&&o.push(Fl(n,y,c)))),n=n.return}o.length!==0&&e.push({event:t,listeners:o})}var Yp=/\r\n?/g,Xp=/\u0000|\uFFFD/g;function of(e){return(typeof e=="string"?e:""+e).replace(Yp,`
`).replace(Xp,"")}function rf(e,t){return t=of(t),of(e)===t}function Ce(e,t,n,a,l,i){switch(n){case"children":typeof a=="string"?t==="body"||t==="textarea"&&a===""||Ma(e,a):(typeof a=="number"||typeof a=="bigint")&&t!=="body"&&Ma(e,""+a);break;case"className":fi(e,"class",a);break;case"tabIndex":fi(e,"tabindex",a);break;case"dir":case"role":case"viewBox":case"width":case"height":fi(e,n,a);break;case"style":os(e,a,i);break;case"data":if(t!=="object"){fi(e,"data",a);break}case"src":case"href":if(a===""&&(t!=="a"||n!=="href")){e.removeAttribute(n);break}if(a==null||typeof a=="function"||typeof a=="symbol"||typeof a=="boolean"){e.removeAttribute(n);break}a=pi(""+a),e.setAttribute(n,a);break;case"action":case"formAction":if(typeof a=="function"){e.setAttribute(n,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof i=="function"&&(n==="formAction"?(t!=="input"&&Ce(e,t,"name",l.name,l,null),Ce(e,t,"formEncType",l.formEncType,l,null),Ce(e,t,"formMethod",l.formMethod,l,null),Ce(e,t,"formTarget",l.formTarget,l,null)):(Ce(e,t,"encType",l.encType,l,null),Ce(e,t,"method",l.method,l,null),Ce(e,t,"target",l.target,l,null)));if(a==null||typeof a=="symbol"||typeof a=="boolean"){e.removeAttribute(n);break}a=pi(""+a),e.setAttribute(n,a);break;case"onClick":a!=null&&(e.onclick=en);break;case"onScroll":a!=null&&ce("scroll",e);break;case"onScrollEnd":a!=null&&ce("scrollend",e);break;case"dangerouslySetInnerHTML":if(a!=null){if(typeof a!="object"||!("__html"in a))throw Error(s(61));if(n=a.__html,n!=null){if(l.children!=null)throw Error(s(60));e.innerHTML=n}}break;case"multiple":e.multiple=a&&typeof a!="function"&&typeof a!="symbol";break;case"muted":e.muted=a&&typeof a!="function"&&typeof a!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(a==null||typeof a=="function"||typeof a=="boolean"||typeof a=="symbol"){e.removeAttribute("xlink:href");break}n=pi(""+a),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",n);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":a!=null&&typeof a!="function"&&typeof a!="symbol"?e.setAttribute(n,""+a):e.removeAttribute(n);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":a&&typeof a!="function"&&typeof a!="symbol"?e.setAttribute(n,""):e.removeAttribute(n);break;case"capture":case"download":a===!0?e.setAttribute(n,""):a!==!1&&a!=null&&typeof a!="function"&&typeof a!="symbol"?e.setAttribute(n,a):e.removeAttribute(n);break;case"cols":case"rows":case"size":case"span":a!=null&&typeof a!="function"&&typeof a!="symbol"&&!isNaN(a)&&1<=a?e.setAttribute(n,a):e.removeAttribute(n);break;case"rowSpan":case"start":a==null||typeof a=="function"||typeof a=="symbol"||isNaN(a)?e.removeAttribute(n):e.setAttribute(n,a);break;case"popover":ce("beforetoggle",e),ce("toggle",e),di(e,"popover",a);break;case"xlinkActuate":$t(e,"http://www.w3.org/1999/xlink","xlink:actuate",a);break;case"xlinkArcrole":$t(e,"http://www.w3.org/1999/xlink","xlink:arcrole",a);break;case"xlinkRole":$t(e,"http://www.w3.org/1999/xlink","xlink:role",a);break;case"xlinkShow":$t(e,"http://www.w3.org/1999/xlink","xlink:show",a);break;case"xlinkTitle":$t(e,"http://www.w3.org/1999/xlink","xlink:title",a);break;case"xlinkType":$t(e,"http://www.w3.org/1999/xlink","xlink:type",a);break;case"xmlBase":$t(e,"http://www.w3.org/XML/1998/namespace","xml:base",a);break;case"xmlLang":$t(e,"http://www.w3.org/XML/1998/namespace","xml:lang",a);break;case"xmlSpace":$t(e,"http://www.w3.org/XML/1998/namespace","xml:space",a);break;case"is":di(e,"is",a);break;case"innerText":case"textContent":break;default:(!(2<n.length)||n[0]!=="o"&&n[0]!=="O"||n[1]!=="n"&&n[1]!=="N")&&(n=ym.get(n)||n,di(e,n,a))}}function Su(e,t,n,a,l,i){switch(n){case"style":os(e,a,i);break;case"dangerouslySetInnerHTML":if(a!=null){if(typeof a!="object"||!("__html"in a))throw Error(s(61));if(n=a.__html,n!=null){if(l.children!=null)throw Error(s(60));e.innerHTML=n}}break;case"children":typeof a=="string"?Ma(e,a):(typeof a=="number"||typeof a=="bigint")&&Ma(e,""+a);break;case"onScroll":a!=null&&ce("scroll",e);break;case"onScrollEnd":a!=null&&ce("scrollend",e);break;case"onClick":a!=null&&(e.onclick=en);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!Iu.hasOwnProperty(n))e:{if(n[0]==="o"&&n[1]==="n"&&(l=n.endsWith("Capture"),t=n.slice(2,l?n.length-7:void 0),i=e[lt]||null,i=i!=null?i[n]:null,typeof i=="function"&&e.removeEventListener(t,i,l),typeof a=="function")){typeof i!="function"&&i!==null&&(n in e?e[n]=null:e.hasAttribute(n)&&e.removeAttribute(n)),e.addEventListener(t,a,l);break e}n in e?e[n]=a:a===!0?e.setAttribute(n,""):di(e,n,a)}}}function ut(e,t,n){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":ce("error",e),ce("load",e);var a=!1,l=!1,i;for(i in n)if(n.hasOwnProperty(i)){var o=n[i];if(o!=null)switch(i){case"src":a=!0;break;case"srcSet":l=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(s(137,t));default:Ce(e,t,i,o,n,null)}}l&&Ce(e,t,"srcSet",n.srcSet,n,null),a&&Ce(e,t,"src",n.src,n,null);return;case"input":ce("invalid",e);var r=i=o=l=null,c=null,y=null;for(a in n)if(n.hasOwnProperty(a)){var A=n[a];if(A!=null)switch(a){case"name":l=A;break;case"type":o=A;break;case"checked":c=A;break;case"defaultChecked":y=A;break;case"value":i=A;break;case"defaultValue":r=A;break;case"children":case"dangerouslySetInnerHTML":if(A!=null)throw Error(s(137,t));break;default:Ce(e,t,a,A,n,null)}}ns(e,i,r,c,y,o,l,!1);return;case"select":ce("invalid",e),a=o=i=null;for(l in n)if(n.hasOwnProperty(l)&&(r=n[l],r!=null))switch(l){case"value":i=r;break;case"defaultValue":o=r;break;case"multiple":a=r;default:Ce(e,t,l,r,n,null)}t=i,n=o,e.multiple=!!a,t!=null?Aa(e,!!a,t,!1):n!=null&&Aa(e,!!a,n,!0);return;case"textarea":ce("invalid",e),i=l=a=null;for(o in n)if(n.hasOwnProperty(o)&&(r=n[o],r!=null))switch(o){case"value":a=r;break;case"defaultValue":l=r;break;case"children":i=r;break;case"dangerouslySetInnerHTML":if(r!=null)throw Error(s(91));break;default:Ce(e,t,o,r,n,null)}ls(e,a,l,i);return;case"option":for(c in n)if(n.hasOwnProperty(c)&&(a=n[c],a!=null))switch(c){case"selected":e.selected=a&&typeof a!="function"&&typeof a!="symbol";break;default:Ce(e,t,c,a,n,null)}return;case"dialog":ce("beforetoggle",e),ce("toggle",e),ce("cancel",e),ce("close",e);break;case"iframe":case"object":ce("load",e);break;case"video":case"audio":for(a=0;a<Pl.length;a++)ce(Pl[a],e);break;case"image":ce("error",e),ce("load",e);break;case"details":ce("toggle",e);break;case"embed":case"source":case"link":ce("error",e),ce("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(y in n)if(n.hasOwnProperty(y)&&(a=n[y],a!=null))switch(y){case"children":case"dangerouslySetInnerHTML":throw Error(s(137,t));default:Ce(e,t,y,a,n,null)}return;default:if(ko(t)){for(A in n)n.hasOwnProperty(A)&&(a=n[A],a!==void 0&&Su(e,t,A,a,n,void 0));return}}for(r in n)n.hasOwnProperty(r)&&(a=n[r],a!=null&&Ce(e,t,r,a,n,null))}function Qp(e,t,n,a){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var l=null,i=null,o=null,r=null,c=null,y=null,A=null;for(S in n){var z=n[S];if(n.hasOwnProperty(S)&&z!=null)switch(S){case"checked":break;case"value":break;case"defaultValue":c=z;default:a.hasOwnProperty(S)||Ce(e,t,S,null,a,z)}}for(var b in a){var S=a[b];if(z=n[b],a.hasOwnProperty(b)&&(S!=null||z!=null))switch(b){case"type":i=S;break;case"name":l=S;break;case"checked":y=S;break;case"defaultChecked":A=S;break;case"value":o=S;break;case"defaultValue":r=S;break;case"children":case"dangerouslySetInnerHTML":if(S!=null)throw Error(s(137,t));break;default:S!==z&&Ce(e,t,b,S,a,z)}}Ro(e,o,r,c,y,A,i,l);return;case"select":S=o=r=b=null;for(i in n)if(c=n[i],n.hasOwnProperty(i)&&c!=null)switch(i){case"value":break;case"multiple":S=c;default:a.hasOwnProperty(i)||Ce(e,t,i,null,a,c)}for(l in a)if(i=a[l],c=n[l],a.hasOwnProperty(l)&&(i!=null||c!=null))switch(l){case"value":b=i;break;case"defaultValue":r=i;break;case"multiple":o=i;default:i!==c&&Ce(e,t,l,i,a,c)}t=r,n=o,a=S,b!=null?Aa(e,!!n,b,!1):!!a!=!!n&&(t!=null?Aa(e,!!n,t,!0):Aa(e,!!n,n?[]:"",!1));return;case"textarea":S=b=null;for(r in n)if(l=n[r],n.hasOwnProperty(r)&&l!=null&&!a.hasOwnProperty(r))switch(r){case"value":break;case"children":break;default:Ce(e,t,r,null,a,l)}for(o in a)if(l=a[o],i=n[o],a.hasOwnProperty(o)&&(l!=null||i!=null))switch(o){case"value":b=l;break;case"defaultValue":S=l;break;case"children":break;case"dangerouslySetInnerHTML":if(l!=null)throw Error(s(91));break;default:l!==i&&Ce(e,t,o,l,a,i)}as(e,b,S);return;case"option":for(var X in n)if(b=n[X],n.hasOwnProperty(X)&&b!=null&&!a.hasOwnProperty(X))switch(X){case"selected":e.selected=!1;break;default:Ce(e,t,X,null,a,b)}for(c in a)if(b=a[c],S=n[c],a.hasOwnProperty(c)&&b!==S&&(b!=null||S!=null))switch(c){case"selected":e.selected=b&&typeof b!="function"&&typeof b!="symbol";break;default:Ce(e,t,c,b,a,S)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var I in n)b=n[I],n.hasOwnProperty(I)&&b!=null&&!a.hasOwnProperty(I)&&Ce(e,t,I,null,a,b);for(y in a)if(b=a[y],S=n[y],a.hasOwnProperty(y)&&b!==S&&(b!=null||S!=null))switch(y){case"children":case"dangerouslySetInnerHTML":if(b!=null)throw Error(s(137,t));break;default:Ce(e,t,y,b,a,S)}return;default:if(ko(t)){for(var De in n)b=n[De],n.hasOwnProperty(De)&&b!==void 0&&!a.hasOwnProperty(De)&&Su(e,t,De,void 0,a,b);for(A in a)b=a[A],S=n[A],!a.hasOwnProperty(A)||b===S||b===void 0&&S===void 0||Su(e,t,A,b,a,S);return}}for(var p in n)b=n[p],n.hasOwnProperty(p)&&b!=null&&!a.hasOwnProperty(p)&&Ce(e,t,p,null,a,b);for(z in a)b=a[z],S=n[z],!a.hasOwnProperty(z)||b===S||b==null&&S==null||Ce(e,t,z,b,a,S)}function uf(e){switch(e){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function Zp(){if(typeof performance.getEntriesByType=="function"){for(var e=0,t=0,n=performance.getEntriesByType("resource"),a=0;a<n.length;a++){var l=n[a],i=l.transferSize,o=l.initiatorType,r=l.duration;if(i&&r&&uf(o)){for(o=0,r=l.responseEnd,a+=1;a<n.length;a++){var c=n[a],y=c.startTime;if(y>r)break;var A=c.transferSize,z=c.initiatorType;A&&uf(z)&&(c=c.responseEnd,o+=A*(c<r?1:(r-y)/(c-y)))}if(--a,t+=8*(i+o)/(l.duration/1e3),e++,10<e)break}}if(0<e)return t/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e=="number")?e:5}var Tu=null,_u=null;function so(e){return e.nodeType===9?e:e.ownerDocument}function sf(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function cf(e,t){if(e===0)switch(t){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&t==="foreignObject"?0:e}function Eu(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.children=="bigint"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Au=null;function Kp(){var e=window.event;return e&&e.type==="popstate"?e===Au?!1:(Au=e,!0):(Au=null,!1)}var df=typeof setTimeout=="function"?setTimeout:void 0,Jp=typeof clearTimeout=="function"?clearTimeout:void 0,ff=typeof Promise=="function"?Promise:void 0,Pp=typeof queueMicrotask=="function"?queueMicrotask:typeof ff<"u"?function(e){return ff.resolve(null).then(e).catch(Fp)}:df;function Fp(e){setTimeout(function(){throw e})}function qn(e){return e==="head"}function mf(e,t){var n=t,a=0;do{var l=n.nextSibling;if(e.removeChild(n),l&&l.nodeType===8)if(n=l.data,n==="/$"||n==="/&"){if(a===0){e.removeChild(l),al(t);return}a--}else if(n==="$"||n==="$?"||n==="$~"||n==="$!"||n==="&")a++;else if(n==="html")Il(e.ownerDocument.documentElement);else if(n==="head"){n=e.ownerDocument.head,Il(n);for(var i=n.firstChild;i;){var o=i.nextSibling,r=i.nodeName;i[ve]||r==="SCRIPT"||r==="STYLE"||r==="LINK"&&i.rel.toLowerCase()==="stylesheet"||n.removeChild(i),i=o}}else n==="body"&&Il(e.ownerDocument.body);n=l}while(n);al(t)}function pf(e,t){var n=e;e=0;do{var a=n.nextSibling;if(n.nodeType===1?t?(n._stashedDisplay=n.style.display,n.style.display="none"):(n.style.display=n._stashedDisplay||"",n.getAttribute("style")===""&&n.removeAttribute("style")):n.nodeType===3&&(t?(n._stashedText=n.nodeValue,n.nodeValue=""):n.nodeValue=n._stashedText||""),a&&a.nodeType===8)if(n=a.data,n==="/$"){if(e===0)break;e--}else n!=="$"&&n!=="$?"&&n!=="$~"&&n!=="$!"||e++;n=a}while(n)}function Mu(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var n=t;switch(t=t.nextSibling,n.nodeName){case"HTML":case"HEAD":case"BODY":Mu(n),Ye(n);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(n.rel.toLowerCase()==="stylesheet")continue}e.removeChild(n)}}function Ip(e,t,n,a){for(;e.nodeType===1;){var l=n;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!a&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(a){if(!e[ve])switch(t){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(i=e.getAttribute("rel"),i==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(i!==l.rel||e.getAttribute("href")!==(l.href==null||l.href===""?null:l.href)||e.getAttribute("crossorigin")!==(l.crossOrigin==null?null:l.crossOrigin)||e.getAttribute("title")!==(l.title==null?null:l.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(i=e.getAttribute("src"),(i!==(l.src==null?null:l.src)||e.getAttribute("type")!==(l.type==null?null:l.type)||e.getAttribute("crossorigin")!==(l.crossOrigin==null?null:l.crossOrigin))&&i&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(t==="input"&&e.type==="hidden"){var i=l.name==null?null:""+l.name;if(l.type==="hidden"&&e.getAttribute("name")===i)return e}else return e;if(e=Bt(e.nextSibling),e===null)break}return null}function Wp(e,t,n){if(t==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!n||(e=Bt(e.nextSibling),e===null))return null;return e}function hf(e,t){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!t||(e=Bt(e.nextSibling),e===null))return null;return e}function zu(e){return e.data==="$?"||e.data==="$~"}function Cu(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState!=="loading"}function $p(e,t){var n=e.ownerDocument;if(e.data==="$~")e._reactRetry=t;else if(e.data!=="$?"||n.readyState!=="loading")t();else{var a=function(){t(),n.removeEventListener("DOMContentLoaded",a)};n.addEventListener("DOMContentLoaded",a),e._reactRetry=a}}function Bt(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?"||t==="$~"||t==="&"||t==="F!"||t==="F")break;if(t==="/$"||t==="/&")return null}}return e}var Du=null;function gf(e){e=e.nextSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"||n==="/&"){if(t===0)return Bt(e.nextSibling);t--}else n!=="$"&&n!=="$!"&&n!=="$?"&&n!=="$~"&&n!=="&"||t++}e=e.nextSibling}return null}function vf(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"){if(t===0)return e;t--}else n!=="/$"&&n!=="/&"||t++}e=e.previousSibling}return null}function yf(e,t,n){switch(t=so(n),e){case"html":if(e=t.documentElement,!e)throw Error(s(452));return e;case"head":if(e=t.head,!e)throw Error(s(453));return e;case"body":if(e=t.body,!e)throw Error(s(454));return e;default:throw Error(s(451))}}function Il(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);Ye(e)}var qt=new Map,bf=new Set;function co(e){return typeof e.getRootNode=="function"?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var vn=k.d;k.d={f:eh,r:th,D:nh,C:ah,L:lh,m:ih,X:rh,S:oh,M:uh};function eh(){var e=vn.f(),t=to();return e||t}function th(e){var t=Sn(e);t!==null&&t.tag===5&&t.type==="form"?kc(t):vn.r(e)}var el=typeof document>"u"?null:document;function xf(e,t,n){var a=el;if(a&&typeof t=="string"&&t){var l=Ot(t);l='link[rel="'+e+'"][href="'+l+'"]',typeof n=="string"&&(l+='[crossorigin="'+n+'"]'),bf.has(l)||(bf.add(l),e={rel:e,crossOrigin:n,href:t},a.querySelector(l)===null&&(t=a.createElement("link"),ut(t,"link",e),nt(t),a.head.appendChild(t)))}}function nh(e){vn.D(e),xf("dns-prefetch",e,null)}function ah(e,t){vn.C(e,t),xf("preconnect",e,t)}function lh(e,t,n){vn.L(e,t,n);var a=el;if(a&&e&&t){var l='link[rel="preload"][as="'+Ot(t)+'"]';t==="image"&&n&&n.imageSrcSet?(l+='[imagesrcset="'+Ot(n.imageSrcSet)+'"]',typeof n.imageSizes=="string"&&(l+='[imagesizes="'+Ot(n.imageSizes)+'"]')):l+='[href="'+Ot(e)+'"]';var i=l;switch(t){case"style":i=tl(e);break;case"script":i=nl(e)}qt.has(i)||(e=w({rel:"preload",href:t==="image"&&n&&n.imageSrcSet?void 0:e,as:t},n),qt.set(i,e),a.querySelector(l)!==null||t==="style"&&a.querySelector(Wl(i))||t==="script"&&a.querySelector($l(i))||(t=a.createElement("link"),ut(t,"link",e),nt(t),a.head.appendChild(t)))}}function ih(e,t){vn.m(e,t);var n=el;if(n&&e){var a=t&&typeof t.as=="string"?t.as:"script",l='link[rel="modulepreload"][as="'+Ot(a)+'"][href="'+Ot(e)+'"]',i=l;switch(a){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":i=nl(e)}if(!qt.has(i)&&(e=w({rel:"modulepreload",href:e},t),qt.set(i,e),n.querySelector(l)===null)){switch(a){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(n.querySelector($l(i)))return}a=n.createElement("link"),ut(a,"link",e),nt(a),n.head.appendChild(a)}}}function oh(e,t,n){vn.S(e,t,n);var a=el;if(a&&e){var l=_a(a).hoistableStyles,i=tl(e);t=t||"default";var o=l.get(i);if(!o){var r={loading:0,preload:null};if(o=a.querySelector(Wl(i)))r.loading=5;else{e=w({rel:"stylesheet",href:e,"data-precedence":t},n),(n=qt.get(i))&&ju(e,n);var c=o=a.createElement("link");nt(c),ut(c,"link",e),c._p=new Promise(function(y,A){c.onload=y,c.onerror=A}),c.addEventListener("load",function(){r.loading|=1}),c.addEventListener("error",function(){r.loading|=2}),r.loading|=4,fo(o,t,a)}o={type:"stylesheet",instance:o,count:1,state:r},l.set(i,o)}}}function rh(e,t){vn.X(e,t);var n=el;if(n&&e){var a=_a(n).hoistableScripts,l=nl(e),i=a.get(l);i||(i=n.querySelector($l(l)),i||(e=w({src:e,async:!0},t),(t=qt.get(l))&&Ou(e,t),i=n.createElement("script"),nt(i),ut(i,"link",e),n.head.appendChild(i)),i={type:"script",instance:i,count:1,state:null},a.set(l,i))}}function uh(e,t){vn.M(e,t);var n=el;if(n&&e){var a=_a(n).hoistableScripts,l=nl(e),i=a.get(l);i||(i=n.querySelector($l(l)),i||(e=w({src:e,async:!0,type:"module"},t),(t=qt.get(l))&&Ou(e,t),i=n.createElement("script"),nt(i),ut(i,"link",e),n.head.appendChild(i)),i={type:"script",instance:i,count:1,state:null},a.set(l,i))}}function Sf(e,t,n,a){var l=(l=ie.current)?co(l):null;if(!l)throw Error(s(446));switch(e){case"meta":case"title":return null;case"style":return typeof n.precedence=="string"&&typeof n.href=="string"?(t=tl(n.href),n=_a(l).hoistableStyles,a=n.get(t),a||(a={type:"style",instance:null,count:0,state:null},n.set(t,a)),a):{type:"void",instance:null,count:0,state:null};case"link":if(n.rel==="stylesheet"&&typeof n.href=="string"&&typeof n.precedence=="string"){e=tl(n.href);var i=_a(l).hoistableStyles,o=i.get(e);if(o||(l=l.ownerDocument||l,o={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},i.set(e,o),(i=l.querySelector(Wl(e)))&&!i._p&&(o.instance=i,o.state.loading=5),qt.has(e)||(n={rel:"preload",as:"style",href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},qt.set(e,n),i||sh(l,e,n,o.state))),t&&a===null)throw Error(s(528,""));return o}if(t&&a!==null)throw Error(s(529,""));return null;case"script":return t=n.async,n=n.src,typeof n=="string"&&t&&typeof t!="function"&&typeof t!="symbol"?(t=nl(n),n=_a(l).hoistableScripts,a=n.get(t),a||(a={type:"script",instance:null,count:0,state:null},n.set(t,a)),a):{type:"void",instance:null,count:0,state:null};default:throw Error(s(444,e))}}function tl(e){return'href="'+Ot(e)+'"'}function Wl(e){return'link[rel="stylesheet"]['+e+"]"}function Tf(e){return w({},e,{"data-precedence":e.precedence,precedence:null})}function sh(e,t,n,a){e.querySelector('link[rel="preload"][as="style"]['+t+"]")?a.loading=1:(t=e.createElement("link"),a.preload=t,t.addEventListener("load",function(){return a.loading|=1}),t.addEventListener("error",function(){return a.loading|=2}),ut(t,"link",n),nt(t),e.head.appendChild(t))}function nl(e){return'[src="'+Ot(e)+'"]'}function $l(e){return"script[async]"+e}function _f(e,t,n){if(t.count++,t.instance===null)switch(t.type){case"style":var a=e.querySelector('style[data-href~="'+Ot(n.href)+'"]');if(a)return t.instance=a,nt(a),a;var l=w({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return a=(e.ownerDocument||e).createElement("style"),nt(a),ut(a,"style",l),fo(a,n.precedence,e),t.instance=a;case"stylesheet":l=tl(n.href);var i=e.querySelector(Wl(l));if(i)return t.state.loading|=4,t.instance=i,nt(i),i;a=Tf(n),(l=qt.get(l))&&ju(a,l),i=(e.ownerDocument||e).createElement("link"),nt(i);var o=i;return o._p=new Promise(function(r,c){o.onload=r,o.onerror=c}),ut(i,"link",a),t.state.loading|=4,fo(i,n.precedence,e),t.instance=i;case"script":return i=nl(n.src),(l=e.querySelector($l(i)))?(t.instance=l,nt(l),l):(a=n,(l=qt.get(i))&&(a=w({},n),Ou(a,l)),e=e.ownerDocument||e,l=e.createElement("script"),nt(l),ut(l,"link",a),e.head.appendChild(l),t.instance=l);case"void":return null;default:throw Error(s(443,t.type))}else t.type==="stylesheet"&&(t.state.loading&4)===0&&(a=t.instance,t.state.loading|=4,fo(a,n.precedence,e));return t.instance}function fo(e,t,n){for(var a=n.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),l=a.length?a[a.length-1]:null,i=l,o=0;o<a.length;o++){var r=a[o];if(r.dataset.precedence===t)i=r;else if(i!==l)break}i?i.parentNode.insertBefore(e,i.nextSibling):(t=n.nodeType===9?n.head:n,t.insertBefore(e,t.firstChild))}function ju(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.title==null&&(e.title=t.title)}function Ou(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.integrity==null&&(e.integrity=t.integrity)}var mo=null;function Ef(e,t,n){if(mo===null){var a=new Map,l=mo=new Map;l.set(n,a)}else l=mo,a=l.get(n),a||(a=new Map,l.set(n,a));if(a.has(e))return a;for(a.set(e,null),n=n.getElementsByTagName(e),l=0;l<n.length;l++){var i=n[l];if(!(i[ve]||i[Ve]||e==="link"&&i.getAttribute("rel")==="stylesheet")&&i.namespaceURI!=="http://www.w3.org/2000/svg"){var o=i.getAttribute(t)||"";o=e+o;var r=a.get(o);r?r.push(i):a.set(o,[i])}}return a}function Af(e,t,n){e=e.ownerDocument||e,e.head.insertBefore(n,t==="title"?e.querySelector("head > title"):null)}function ch(e,t,n){if(n===1||t.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof t.precedence!="string"||typeof t.href!="string"||t.href==="")break;return!0;case"link":if(typeof t.rel!="string"||typeof t.href!="string"||t.href===""||t.onLoad||t.onError)break;switch(t.rel){case"stylesheet":return e=t.disabled,typeof t.precedence=="string"&&e==null;default:return!0}case"script":if(t.async&&typeof t.async!="function"&&typeof t.async!="symbol"&&!t.onLoad&&!t.onError&&t.src&&typeof t.src=="string")return!0}return!1}function Mf(e){return!(e.type==="stylesheet"&&(e.state.loading&3)===0)}function dh(e,t,n,a){if(n.type==="stylesheet"&&(typeof a.media!="string"||matchMedia(a.media).matches!==!1)&&(n.state.loading&4)===0){if(n.instance===null){var l=tl(a.href),i=t.querySelector(Wl(l));if(i){t=i._p,t!==null&&typeof t=="object"&&typeof t.then=="function"&&(e.count++,e=po.bind(e),t.then(e,e)),n.state.loading|=4,n.instance=i,nt(i);return}i=t.ownerDocument||t,a=Tf(a),(l=qt.get(l))&&ju(a,l),i=i.createElement("link"),nt(i);var o=i;o._p=new Promise(function(r,c){o.onload=r,o.onerror=c}),ut(i,"link",a),n.instance=i}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(n,t),(t=n.state.preload)&&(n.state.loading&3)===0&&(e.count++,n=po.bind(e),t.addEventListener("load",n),t.addEventListener("error",n))}}var wu=0;function fh(e,t){return e.stylesheets&&e.count===0&&go(e,e.stylesheets),0<e.count||0<e.imgCount?function(n){var a=setTimeout(function(){if(e.stylesheets&&go(e,e.stylesheets),e.unsuspend){var i=e.unsuspend;e.unsuspend=null,i()}},6e4+t);0<e.imgBytes&&wu===0&&(wu=62500*Zp());var l=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&go(e,e.stylesheets),e.unsuspend)){var i=e.unsuspend;e.unsuspend=null,i()}},(e.imgBytes>wu?50:800)+t);return e.unsuspend=n,function(){e.unsuspend=null,clearTimeout(a),clearTimeout(l)}}:null}function po(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)go(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var ho=null;function go(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,ho=new Map,t.forEach(mh,e),ho=null,po.call(e))}function mh(e,t){if(!(t.state.loading&4)){var n=ho.get(e);if(n)var a=n.get(null);else{n=new Map,ho.set(e,n);for(var l=e.querySelectorAll("link[data-precedence],style[data-precedence]"),i=0;i<l.length;i++){var o=l[i];(o.nodeName==="LINK"||o.getAttribute("media")!=="not all")&&(n.set(o.dataset.precedence,o),a=o)}a&&n.set(null,a)}l=t.instance,o=l.getAttribute("data-precedence"),i=n.get(o)||a,i===a&&n.set(null,l),n.set(o,l),this.count++,a=po.bind(this),l.addEventListener("load",a),l.addEventListener("error",a),i?i.parentNode.insertBefore(l,i.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(l,e.firstChild)),t.state.loading|=4}}var ei={$$typeof:K,Provider:null,Consumer:null,_currentValue:F,_currentValue2:F,_threadCount:0};function ph(e,t,n,a,l,i,o,r,c){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=xa(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=xa(0),this.hiddenUpdates=xa(null),this.identifierPrefix=a,this.onUncaughtError=l,this.onCaughtError=i,this.onRecoverableError=o,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=c,this.incompleteTransitions=new Map}function zf(e,t,n,a,l,i,o,r,c,y,A,z){return e=new ph(e,t,n,o,c,y,A,z,r),t=1,i===!0&&(t|=24),i=St(3,null,null,t),e.current=i,i.stateNode=e,t=dr(),t.refCount++,e.pooledCache=t,t.refCount++,i.memoizedState={element:a,isDehydrated:n,cache:t},hr(i),e}function Cf(e){return e?(e=Ra,e):Ra}function Df(e,t,n,a,l,i){l=Cf(l),a.context===null?a.context=l:a.pendingContext=l,a=Cn(t),a.payload={element:n},i=i===void 0?null:i,i!==null&&(a.callback=i),n=Dn(e,a,t),n!==null&&(vt(n,e,t),wl(n,e,t))}function jf(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function Ru(e,t){jf(e,t),(e=e.alternate)&&jf(e,t)}function Of(e){if(e.tag===13||e.tag===31){var t=ta(e,67108864);t!==null&&vt(t,e,67108864),Ru(e,67108864)}}function wf(e){if(e.tag===13||e.tag===31){var t=Mt();t=Sa(t);var n=ta(e,t);n!==null&&vt(n,e,t),Ru(e,t)}}var vo=!0;function hh(e,t,n,a){var l=E.T;E.T=null;var i=k.p;try{k.p=2,Uu(e,t,n,a)}finally{k.p=i,E.T=l}}function gh(e,t,n,a){var l=E.T;E.T=null;var i=k.p;try{k.p=8,Uu(e,t,n,a)}finally{k.p=i,E.T=l}}function Uu(e,t,n,a){if(vo){var l=ku(a);if(l===null)xu(e,t,a,yo,n),Uf(e,a);else if(yh(l,e,t,n,a))a.stopPropagation();else if(Uf(e,a),t&4&&-1<vh.indexOf(e)){for(;l!==null;){var i=Sn(l);if(i!==null)switch(i.tag){case 3:if(i=i.stateNode,i.current.memoizedState.isDehydrated){var o=Zt(i.pendingLanes);if(o!==0){var r=i;for(r.pendingLanes|=2,r.entangledLanes|=2;o;){var c=1<<31-tt(o);r.entanglements[1]|=c,o&=~c}Ft(i),(Se&6)===0&&($i=Ge()+500,Jl(0))}}break;case 31:case 13:r=ta(i,2),r!==null&&vt(r,i,2),to(),Ru(i,2)}if(i=ku(a),i===null&&xu(e,t,a,yo,n),i===l)break;l=i}l!==null&&a.stopPropagation()}else xu(e,t,a,null,n)}}function ku(e){return e=Ho(e),Lu(e)}var yo=null;function Lu(e){if(yo=null,e=Fe(e),e!==null){var t=D(e);if(t===null)e=null;else{var n=t.tag;if(n===13){if(e=R(t),e!==null)return e;e=null}else if(n===31){if(e=L(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return yo=e,null}function Rf(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(Co()){case Do:return 2;case Jn:return 8;case Dt:case ri:return 32;case ya:return 268435456;default:return 32}default:return 32}}var Hu=!1,Nn=null,Gn=null,Vn=null,ti=new Map,ni=new Map,Yn=[],vh="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function Uf(e,t){switch(e){case"focusin":case"focusout":Nn=null;break;case"dragenter":case"dragleave":Gn=null;break;case"mouseover":case"mouseout":Vn=null;break;case"pointerover":case"pointerout":ti.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":ni.delete(t.pointerId)}}function ai(e,t,n,a,l,i){return e===null||e.nativeEvent!==i?(e={blockedOn:t,domEventName:n,eventSystemFlags:a,nativeEvent:i,targetContainers:[l]},t!==null&&(t=Sn(t),t!==null&&Of(t)),e):(e.eventSystemFlags|=a,t=e.targetContainers,l!==null&&t.indexOf(l)===-1&&t.push(l),e)}function yh(e,t,n,a,l){switch(t){case"focusin":return Nn=ai(Nn,e,t,n,a,l),!0;case"dragenter":return Gn=ai(Gn,e,t,n,a,l),!0;case"mouseover":return Vn=ai(Vn,e,t,n,a,l),!0;case"pointerover":var i=l.pointerId;return ti.set(i,ai(ti.get(i)||null,e,t,n,a,l)),!0;case"gotpointercapture":return i=l.pointerId,ni.set(i,ai(ni.get(i)||null,e,t,n,a,l)),!0}return!1}function kf(e){var t=Fe(e.target);if(t!==null){var n=D(t);if(n!==null){if(t=n.tag,t===13){if(t=R(n),t!==null){e.blockedOn=t,hl(e.priority,function(){wf(n)});return}}else if(t===31){if(t=L(n),t!==null){e.blockedOn=t,hl(e.priority,function(){wf(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function bo(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=ku(e.nativeEvent);if(n===null){n=e.nativeEvent;var a=new n.constructor(n.type,n);Lo=a,n.target.dispatchEvent(a),Lo=null}else return t=Sn(n),t!==null&&Of(t),e.blockedOn=n,!1;t.shift()}return!0}function Lf(e,t,n){bo(e)&&n.delete(t)}function bh(){Hu=!1,Nn!==null&&bo(Nn)&&(Nn=null),Gn!==null&&bo(Gn)&&(Gn=null),Vn!==null&&bo(Vn)&&(Vn=null),ti.forEach(Lf),ni.forEach(Lf)}function xo(e,t){e.blockedOn===t&&(e.blockedOn=null,Hu||(Hu=!0,d.unstable_scheduleCallback(d.unstable_NormalPriority,bh)))}var So=null;function Hf(e){So!==e&&(So=e,d.unstable_scheduleCallback(d.unstable_NormalPriority,function(){So===e&&(So=null);for(var t=0;t<e.length;t+=3){var n=e[t],a=e[t+1],l=e[t+2];if(typeof a!="function"){if(Lu(a||n)===null)continue;break}var i=Sn(n);i!==null&&(e.splice(t,3),t-=3,kr(i,{pending:!0,data:l,method:n.method,action:a},a,l))}}))}function al(e){function t(c){return xo(c,e)}Nn!==null&&xo(Nn,e),Gn!==null&&xo(Gn,e),Vn!==null&&xo(Vn,e),ti.forEach(t),ni.forEach(t);for(var n=0;n<Yn.length;n++){var a=Yn[n];a.blockedOn===e&&(a.blockedOn=null)}for(;0<Yn.length&&(n=Yn[0],n.blockedOn===null);)kf(n),n.blockedOn===null&&Yn.shift();if(n=(e.ownerDocument||e).$$reactFormReplay,n!=null)for(a=0;a<n.length;a+=3){var l=n[a],i=n[a+1],o=l[lt]||null;if(typeof i=="function")o||Hf(n);else if(o){var r=null;if(i&&i.hasAttribute("formAction")){if(l=i,o=i[lt]||null)r=o.formAction;else if(Lu(l)!==null)continue}else r=o.action;typeof r=="function"?n[a+1]=r:(n.splice(a,3),a-=3),Hf(n)}}}function Bf(){function e(i){i.canIntercept&&i.info==="react-transition"&&i.intercept({handler:function(){return new Promise(function(o){return l=o})},focusReset:"manual",scroll:"manual"})}function t(){l!==null&&(l(),l=null),a||setTimeout(n,20)}function n(){if(!a&&!navigation.transition){var i=navigation.currentEntry;i&&i.url!=null&&navigation.navigate(i.url,{state:i.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var a=!1,l=null;return navigation.addEventListener("navigate",e),navigation.addEventListener("navigatesuccess",t),navigation.addEventListener("navigateerror",t),setTimeout(n,100),function(){a=!0,navigation.removeEventListener("navigate",e),navigation.removeEventListener("navigatesuccess",t),navigation.removeEventListener("navigateerror",t),l!==null&&(l(),l=null)}}}function Bu(e){this._internalRoot=e}To.prototype.render=Bu.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(s(409));var n=t.current,a=Mt();Df(n,a,e,t,null,null)},To.prototype.unmount=Bu.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;Df(e.current,2,null,e,null,null),to(),t[Wt]=null}};function To(e){this._internalRoot=e}To.prototype.unstable_scheduleHydration=function(e){if(e){var t=pl();e={blockedOn:null,target:e,priority:t};for(var n=0;n<Yn.length&&t!==0&&t<Yn[n].priority;n++);Yn.splice(n,0,e),n===0&&kf(e)}};var qf=T.version;if(qf!=="19.2.4")throw Error(s(527,qf,"19.2.4"));k.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(s(188)):(e=Object.keys(e).join(","),Error(s(268,e)));return e=x(t),e=e!==null?Z(e):null,e=e===null?null:e.stateNode,e};var xh={bundleType:0,version:"19.2.4",rendererPackageName:"react-dom",currentDispatcherRef:E,reconcilerVersion:"19.2.4"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var _o=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!_o.isDisabled&&_o.supportsFiber)try{Qt=_o.inject(xh),et=_o}catch{}}return ii.createRoot=function(e,t){if(!_(e))throw Error(s(299));var n=!1,a="",l=Qc,i=Zc,o=Kc;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(a=t.identifierPrefix),t.onUncaughtError!==void 0&&(l=t.onUncaughtError),t.onCaughtError!==void 0&&(i=t.onCaughtError),t.onRecoverableError!==void 0&&(o=t.onRecoverableError)),t=zf(e,1,!1,null,null,n,a,null,l,i,o,Bf),e[Wt]=t.current,bu(e),new Bu(t)},ii.hydrateRoot=function(e,t,n){if(!_(e))throw Error(s(299));var a=!1,l="",i=Qc,o=Zc,r=Kc,c=null;return n!=null&&(n.unstable_strictMode===!0&&(a=!0),n.identifierPrefix!==void 0&&(l=n.identifierPrefix),n.onUncaughtError!==void 0&&(i=n.onUncaughtError),n.onCaughtError!==void 0&&(o=n.onCaughtError),n.onRecoverableError!==void 0&&(r=n.onRecoverableError),n.formState!==void 0&&(c=n.formState)),t=zf(e,1,!0,t,n??null,a,l,c,i,o,r,Bf),t.context=Cf(null),n=t.current,a=Mt(),a=Sa(a),l=Cn(a),l.callback=null,Dn(n,l,a),n=a,t.current.lanes=n,xn(t,n),Ft(t),e[Wt]=t.current,bu(e),new To(t)},ii.version="19.2.4",ii}var Pf;function Oh(){if(Pf)return Gu.exports;Pf=1;function d(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(d)}catch(T){console.error(T)}}return d(),Gu.exports=jh(),Gu.exports}var wh=Oh();const Rh="modulepreload",Uh=function(d){return"/docs/"+d},Ff={},U=function(T,h,s){let _=Promise.resolve();if(h&&h.length>0){let R=function(x){return Promise.all(x.map(Z=>Promise.resolve(Z).then(w=>({status:"fulfilled",value:w}),w=>({status:"rejected",reason:w}))))};document.getElementsByTagName("link");const L=document.querySelector("meta[property=csp-nonce]"),O=(L==null?void 0:L.nonce)||(L==null?void 0:L.getAttribute("nonce"));_=R(h.map(x=>{if(x=Uh(x),x in Ff)return;Ff[x]=!0;const Z=x.endsWith(".css"),w=Z?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${x}"]${w}`))return;const W=document.createElement("link");if(W.rel=Z?"stylesheet":Rh,Z||(W.as="script"),W.crossOrigin="",W.href=x,O&&W.setAttribute("nonce",O),document.head.appendChild(W),Z)return new Promise((P,ye)=>{W.addEventListener("load",P),W.addEventListener("error",()=>ye(new Error(`Unable to preload CSS for ${x}`)))})}))}function D(R){const L=new Event("vite:preloadError",{cancelable:!0});if(L.payload=R,window.dispatchEvent(L),!L.defaultPrevented)throw R}return _.then(R=>{for(const L of R||[])L.status==="rejected"&&D(L.reason);return T().catch(D)})},Eo={amber:{dark:{bg:"#09090b",sf:"#111114",sfH:"#18181c",bd:"#1e1e24",tx:"#e4e4e7",tx2:"#a1a1aa",txM:"#919199",ac:"#e8a845",acD:"rgba(232,168,69,0.12)",acT:"#fbbf24",cdBg:"#0c0c0f",cdTx:"#c4c4cc",sbBg:"#0c0c0e",hdBg:"rgba(9,9,11,0.85)"},light:{bg:"#fafaf9",sf:"#ffffff",sfH:"#f5f5f4",bd:"#e7e5e4",tx:"#1c1917",tx2:"#57534e",txM:"#706b66",ac:"#96640a",acD:"rgba(150,100,10,0.08)",acT:"#7a5208",cdBg:"#f5f3f0",cdTx:"#2c2520",sbBg:"#f5f5f3",hdBg:"rgba(250,250,249,0.85)"},fonts:{heading:"Instrument Serif",body:"DM Sans",code:"JetBrains Mono"}},editorial:{dark:{bg:"#080c1f",sf:"#0e1333",sfH:"#141940",bd:"#1a2050",tx:"#e8e6f0",tx2:"#b5b1c8",txM:"#9490ae",ac:"#ff6b4a",acD:"rgba(255,107,74,0.1)",acT:"#ff8a70",cdBg:"#0a0e27",cdTx:"#b8b4cc",sbBg:"#0a0e27",hdBg:"rgba(8,12,31,0.9)"},light:{bg:"#f6f4f0",sf:"#ffffff",sfH:"#eeece6",bd:"#ddd9d0",tx:"#1a1716",tx2:"#4a443e",txM:"#706960",ac:"#b83d22",acD:"rgba(184,61,34,0.07)",acT:"#9c3019",cdBg:"#edeae4",cdTx:"#3a3530",sbBg:"#f0ede8",hdBg:"rgba(246,244,240,0.92)"},fonts:{heading:"Cormorant Garamond",body:"Bricolage Grotesque",code:"Fira Code"}}},kh=()=>u.jsx("svg",{width:22,height:22,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round",children:u.jsx("path",{d:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"})}),Lh=()=>u.jsx("svg",{width:18,height:18,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round",children:u.jsx("path",{d:"M18 6L6 18M6 6l12 12"})}),Hh=()=>u.jsx("svg",{width:16,height:16,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:u.jsx("path",{d:"M22 2L11 13M22 2l-7 20-4-9-9-4z"})});function rm(d){let T="You are a helpful documentation assistant. Answer questions accurately based on the documentation provided below. If the answer isn't in the documentation, say so clearly. Keep answers concise and reference specific sections when possible.";if(d){const h=d.length>1e5?d.slice(0,1e5)+`

[Documentation truncated...]`:d;T+=`

Documentation:
${h}`}return T}async function Bh(d,T,h,s){var R,L,O;const _=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${T}`},body:JSON.stringify({model:h,messages:[{role:"system",content:rm(s)},...d.map(x=>({role:x.role,content:x.content}))]})});if(!_.ok){const x=await _.text();throw new Error(`OpenAI API error (${_.status}): ${x}`)}return((O=(L=(R=(await _.json()).choices)==null?void 0:R[0])==null?void 0:L.message)==null?void 0:O.content)||"No response."}async function qh(d,T,h,s){var R,L;const _=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":T,"anthropic-version":"2023-06-01","anthropic-dangerous-direct-browser-access":"true"},body:JSON.stringify({model:h,max_tokens:1024,system:rm(s),messages:d.map(O=>({role:O.role,content:O.content}))})});if(!_.ok){const O=await _.text();throw new Error(`Anthropic API error (${_.status}): ${O}`)}return((L=(R=(await _.json()).content)==null?void 0:R[0])==null?void 0:L.text)||"No response."}function Nh(d){return d==="openai"?"gpt-4o-mini":"claude-sonnet-4-20250514"}function Gh({provider:d,model:T,apiKey:h,context:s}){const[_,D]=H.useState(!1),[R,L]=H.useState([]),[O,x]=H.useState(""),[Z,w]=H.useState(!1),[W,P]=H.useState(null),ye=H.useRef(null),ne=H.useRef(null),oe=h||(typeof window<"u"?window.__TOME_AI_API_KEY__:void 0),j=T||Nh(d);H.useEffect(()=>{var G;(G=ye.current)==null||G.scrollIntoView({behavior:"smooth"})},[R]),H.useEffect(()=>{_&&setTimeout(()=>{var G;return(G=ne.current)==null?void 0:G.focus()},100)},[_]);const V=H.useCallback(async()=>{const G=O.trim();if(!G||Z||!oe)return;const he={role:"user",content:G},Te=[...R,he];L(Te),x(""),w(!0),P(null);try{let B;d==="openai"?B=await Bh(Te,oe,j,s):B=await qh(Te,oe,j,s),L(Oe=>[...Oe,{role:"assistant",content:B}])}catch(B){P(B instanceof Error?B.message:"Failed to get response")}finally{w(!1)}},[O,Z,R,d,oe,j,s]),K=H.useCallback(G=>{G.key==="Enter"&&!G.shiftKey&&(G.preventDefault(),V())},[V]);return _?u.jsxs("div",{"data-testid":"ai-chat-panel",style:{position:"fixed",bottom:24,right:24,zIndex:900,width:380,maxWidth:"calc(100vw - 48px)",height:520,maxHeight:"calc(100vh - 48px)",background:"var(--sf)",border:"1px solid var(--bd)",borderRadius:12,boxShadow:"0 16px 64px rgba(0,0,0,0.3)",display:"flex",flexDirection:"column",overflow:"hidden",fontFamily:"var(--font-body)"},children:[u.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 16px",borderBottom:"1px solid var(--bd)",flexShrink:0},children:[u.jsx("span",{style:{fontSize:14,fontWeight:600,color:"var(--tx)"},children:"Ask AI"}),u.jsx("button",{"data-testid":"ai-chat-close",onClick:()=>D(!1),"aria-label":"Close AI chat",style:{background:"none",border:"none",color:"var(--txM)",cursor:"pointer",display:"flex",padding:4},children:u.jsx(Lh,{})})]}),u.jsxs("div",{style:{flex:1,overflow:"auto",padding:"12px 16px"},children:[!oe&&u.jsxs("div",{"data-testid":"ai-chat-no-key",style:{textAlign:"center",color:"var(--txM)",fontSize:13,padding:"24px 8px",lineHeight:1.6},children:[u.jsx("p",{style:{marginBottom:8,fontWeight:500,color:"var(--tx)"},children:"AI not configured"}),u.jsxs("p",{style:{marginBottom:8},children:["To enable AI chat, set the ",u.jsx("code",{style:{fontFamily:"var(--font-code)",fontSize:"0.88em",background:"var(--cdBg)",padding:"0.15em 0.4em",borderRadius:4},children:"apiKeyEnv"})," in ",u.jsx("code",{style:{fontFamily:"var(--font-code)",fontSize:"0.88em",background:"var(--cdBg)",padding:"0.15em 0.4em",borderRadius:4},children:"tome.config.js"})," and provide the environment variable at build time."]}),u.jsxs("p",{style:{fontSize:11.5,color:"var(--txM)"},children:["Example: ",u.jsx("code",{style:{fontFamily:"var(--font-code)",fontSize:"0.88em",background:"var(--cdBg)",padding:"0.15em 0.4em",borderRadius:4},children:"TOME_AI_KEY=sk-... tome build"})]})]}),R.map((G,he)=>u.jsx("div",{"data-testid":`ai-chat-message-${G.role}`,style:{marginBottom:12,display:"flex",justifyContent:G.role==="user"?"flex-end":"flex-start"},children:u.jsx("div",{style:{maxWidth:"85%",padding:"8px 12px",borderRadius:10,fontSize:13,lineHeight:1.55,whiteSpace:"pre-wrap",wordBreak:"break-word",background:G.role==="user"?"var(--ac)":"var(--cdBg)",color:G.role==="user"?"#fff":"var(--tx)"},children:G.content})},he)),Z&&u.jsx("div",{"data-testid":"ai-chat-loading",style:{display:"flex",justifyContent:"flex-start",marginBottom:12},children:u.jsx("div",{style:{padding:"8px 12px",borderRadius:10,fontSize:13,background:"var(--cdBg)",color:"var(--txM)"},children:"Thinking..."})}),W&&u.jsx("div",{"data-testid":"ai-chat-error",style:{padding:"8px 12px",borderRadius:8,fontSize:12,background:"rgba(220,50,50,0.1)",color:"#d44",marginBottom:12},children:W}),u.jsx("div",{ref:ye})]}),u.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,padding:"10px 12px",borderTop:"1px solid var(--bd)",flexShrink:0},children:[u.jsx("input",{ref:ne,"data-testid":"ai-chat-input",value:O,onChange:G=>x(G.target.value),onKeyDown:K,placeholder:oe?"Ask a question...":"API key required",disabled:!oe,style:{flex:1,background:"var(--cdBg)",border:"1px solid var(--bd)",borderRadius:8,padding:"8px 12px",color:"var(--tx)",fontSize:13,fontFamily:"var(--font-body)",outline:"none"}}),u.jsx("button",{"data-testid":"ai-chat-send",onClick:V,disabled:!oe||!O.trim()||Z,"aria-label":"Send message",style:{width:34,height:34,borderRadius:8,background:oe&&O.trim()?"var(--ac)":"var(--cdBg)",color:oe&&O.trim()?"#fff":"var(--txM)",border:"none",cursor:oe&&O.trim()?"pointer":"default",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0},children:u.jsx(Hh,{})})]})]}):u.jsx("button",{"data-testid":"ai-chat-button",onClick:()=>D(!0),"aria-label":"Open AI chat",style:{position:"fixed",bottom:24,right:24,zIndex:900,width:48,height:48,borderRadius:"50%",background:"var(--ac)",color:"#fff",border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 16px rgba(0,0,0,0.25)",transition:"transform 0.15s"},children:u.jsx(kh,{})})}function Vh(d){const T=/^#([0-9a-f]{6})$/i.exec(d.trim());if(!T)return null;const h=parseInt(T[1],16);return[h>>16&255,h>>8&255,h&255]}function Yh(d,T){const h=Vh(d);if(!h)return null;const[s,_,D]=h,R=`rgba(${s},${_},${D},${T?.12:.08})`,L=T?1.15:.85,O=Math.min(255,Math.round(s*L)),x=Math.min(255,Math.round(_*L)),Z=Math.min(255,Math.round(D*L)),w=`rgb(${O},${x},${Z})`;return{ac:d,acD:R,acT:w}}const zt=({d,size:T=16})=>u.jsx("svg",{width:T,height:T,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round",children:u.jsx("path",{d})}),um=()=>u.jsx(zt,{d:"M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM21 21l-4.3-4.3"}),If=()=>u.jsx(zt,{d:"M9 18l6-6-6-6",size:14}),Qu=()=>u.jsx(zt,{d:"M6 9l6 6 6-6",size:14}),Xh=()=>u.jsx(zt,{d:"M3 12h18M3 6h18M3 18h18",size:20}),Qh=()=>u.jsx(zt,{d:"M18 6L6 18M6 6l12 12",size:18}),Wf=()=>u.jsx(zt,{d:"M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"}),$f=()=>u.jsx(zt,{d:"M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm0-4a1 1 0 0 1 1-1v-1a1 1 0 0 1-2 0v1a1 1 0 0 1 1 1Zm0 16a1 1 0 0 1 1 1v1a1 1 0 0 1-2 0v-1a1 1 0 0 1 1-1ZM4 12a1 1 0 0 1-1 1H2a1 1 0 0 1 0-2h1a1 1 0 0 1 1 1Zm18-1h-1a1 1 0 0 1 0 2h1a1 1 0 0 1 0-2ZM6.34 6.34a1 1 0 0 1-1.41 0l-.71-.71a1 1 0 0 1 1.41-1.41l.71.71a1 1 0 0 1 0 1.41Zm12.73-2.12-.71.71a1 1 0 0 1-1.41-1.41l.71-.71a1 1 0 1 1 1.41 1.41ZM6.34 17.66l-.71.71a1 1 0 0 1-1.41-1.41l.71-.71a1 1 0 0 1 1.41 1.41Zm12.73 2.12-.71-.71a1 1 0 0 1 1.41-1.41l.71.71a1 1 0 0 1-1.41 1.41Z"}),em=()=>u.jsx(zt,{d:"M19 12H5M12 19l-7-7 7-7",size:14}),tm=()=>u.jsx(zt,{d:"M5 12h14M12 5l7 7-7 7",size:14}),Zh=()=>u.jsx(zt,{d:"M17 3a2.83 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z",size:13});function Kh(d){const T=new Date(d),s=new Date().getTime()-T.getTime();if(isNaN(s))return"";const _=Math.floor(s/1e3),D=Math.floor(_/60),R=Math.floor(D/60),L=Math.floor(R/24),O=Math.floor(L/30),x=Math.floor(L/365);return _<60?"just now":D<60?`${D} minute${D===1?"":"s"} ago`:R<24?`${R} hour${R===1?"":"s"} ago`:L<30?`${L} day${L===1?"":"s"} ago`:O<12?`${O} month${O===1?"":"s"} ago`:x>=1?`${x} year${x===1?"":"s"} ago`:T.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}let ll=null;const Jh="/_pagefind/pagefind.js";async function Ph(){if(ll)return ll;try{return ll=await import(Jh),await ll.init(),ll}catch{return null}}let Ao=null;function Fh(){return Ao||(Ao=U(()=>import("./index-DxeWZrk1.js"),[]).catch(()=>null),Ao)}function Ih({appId:d,apiKey:T,indexName:h,onNavigate:s,onClose:_,basePath:D=""}){const[R,L]=H.useState(null),[O,x]=H.useState(!1);H.useEffect(()=>{Fh().then(w=>{w&&w.DocSearch?L(()=>w.DocSearch):w&&w.default?L(()=>w.default):x(!0)})},[]);const Z=H.useCallback(w=>{try{let P=new URL(w,"http://localhost").pathname;if(D){const ye=D.replace(/\/$/,"");P.startsWith(ye)&&(P=P.slice(ye.length))}return P.replace(/^\//,"").replace(/\/index\.html$/,"").replace(/\.html$/,"")||"index"}catch{return"index"}},[D]);return O?u.jsx("div",{onClick:_,style:{position:"fixed",inset:0,zIndex:1e3,background:"rgba(0,0,0,0.55)",backdropFilter:"blur(6px)",display:"flex",alignItems:"flex-start",justifyContent:"center",paddingTop:"12vh"},children:u.jsx("div",{onClick:w=>w.stopPropagation(),style:{background:"var(--sf)",border:"1px solid var(--bd)",borderRadius:12,width:"100%",maxWidth:520,boxShadow:"0 24px 80px rgba(0,0,0,0.4)",padding:"32px 18px",textAlign:"center",color:"var(--txM)",fontSize:14},children:"Algolia DocSearch is not available. Install @docsearch/react to enable it."})}):R?u.jsx("div",{"data-testid":"algolia-search-modal",children:u.jsx(R,{appId:d,apiKey:T,indexName:h,navigator:{navigate({itemUrl:w}){const W=Z(w);s(W)}},hitComponent:({hit:w,children:W})=>u.jsx("a",{href:w.url,onClick:P=>{P.preventDefault();const ye=Z(w.url);s(ye)},children:W})})}):u.jsx("div",{onClick:_,style:{position:"fixed",inset:0,zIndex:1e3,background:"rgba(0,0,0,0.55)",backdropFilter:"blur(6px)",display:"flex",alignItems:"flex-start",justifyContent:"center",paddingTop:"12vh"},children:u.jsx("div",{style:{background:"var(--sf)",border:"1px solid var(--bd)",borderRadius:12,width:"100%",maxWidth:520,boxShadow:"0 24px 80px rgba(0,0,0,0.4)",padding:"32px 18px",textAlign:"center",color:"var(--txM)",fontSize:14},children:"Loading search..."})})}const Wh=()=>u.jsx(zt,{d:"M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",size:14}),$h=()=>u.jsx(zt,{d:"M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM3.6 9h16.8M3.6 15h16.8M12 3a15 15 0 0 1 4 9 15 15 0 0 1-4 9 15 15 0 0 1-4-9 15 15 0 0 1 4-9Z",size:14}),eg=()=>u.jsx(zt,{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3",size:11}),tg={github:"M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z",twitter:"M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865l8.875 11.633Z",discord:"M13.545 2.907a13.227 13.227 0 00-3.257-1.011.05.05 0 00-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 00-3.658 0 8.258 8.258 0 00-.412-.833.051.051 0 00-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 00-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 003.995 2.02.05.05 0 00.056-.019c.308-.42.582-.863.818-1.329a.05.05 0 00-.028-.07 8.735 8.735 0 01-1.248-.595.05.05 0 01-.005-.083c.084-.063.168-.129.248-.195a.05.05 0 01.051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 01.053.007c.08.066.164.132.248.195a.051.051 0 01-.004.085c-.399.232-.813.431-1.249.594a.05.05 0 00-.03.07c.24.465.515.909.817 1.329a.05.05 0 00.056.019 13.235 13.235 0 004.001-2.02.049.049 0 00.021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 00-.02-.019z",linkedin:"M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 01.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z",youtube:"M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 011.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 01-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 01-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 010 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 011.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 017.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z",mastodon:"M11.19 12.195c2.016-.24 3.77-1.475 3.99-2.603.348-1.778.32-4.339.32-4.339 0-3.47-2.286-4.488-2.286-4.488C12.062.238 10.083.017 8.027 0h-.05C5.92.017 3.942.238 2.79.765 2.79.765.504 1.783.504 5.253c-.005.995-.01 2.19.013 3.44.075 4.21.56 8.354 3.383 9.386 1.302.476 2.418.576 3.317.507 1.628-.125 2.541-.8 2.541-.8l-.054-1.182s-1.163.366-2.47.322c-1.293-.044-2.658-.138-2.867-1.716a3.23 3.23 0 01-.028-.465s1.27.31 2.879.384c.984.045 1.905-.058 2.842-.17zM13 8.59V5.319c0-.67-.17-1.2-.507-1.592-.348-.4-.806-.605-1.373-.605-.656 0-1.154.252-1.486.756L9.2 4.595l-.434-.717c-.332-.504-.83-.756-1.486-.756-.567 0-1.025.204-1.373.605-.338.392-.507.923-.507 1.592V8.59h1.69V5.468c0-.67.285-1.012.855-1.012.63 0 .946.404.946 1.204V7.11h1.682V5.66c0-.8.316-1.204.946-1.204.57 0 .855.342.855 1.012V8.59H13z",bluesky:"M3.468 1.948C5.303 3.325 7.276 6.118 8 7.616c.724-1.498 2.697-4.29 4.532-5.668C13.855 1.013 16 .638 16 3.14c0 .5-.286 4.2-.454 4.8-.585 2.093-2.716 2.628-4.544 2.305 3.195.564 4.007 2.433 2.25 4.302-3.337 3.548-4.8-1.244-5.252-2.547 0 0-.116-.334-.166-.334h.332C8.166 11.666 8.05 12 8.05 12c-.452 1.303-1.916 6.095-5.252 2.547-1.756-1.869-.946-3.738 2.25-4.302-1.829.323-3.96-.212-4.544-2.305C.336 7.34.05 3.64.05 3.14.05.638 2.195 1.013 3.468 1.948z"},ng=({platform:d,customIcon:T})=>{const h=d==="custom"&&T?T:tg[d];return h?u.jsx("svg",{width:16,height:16,viewBox:"0 0 16 16",fill:"currentColor",children:u.jsx("path",{d:h})}):null},ag={Added:"#22c55e",Changed:"#3b82f6",Deprecated:"#f59e0b",Removed:"#ef4444",Fixed:"#8b5cf6",Security:"#f97316"};function lg({entries:d}){const[T,h]=H.useState(d.length<=5),s=T?d:d.slice(0,5);return u.jsxs("div",{"data-testid":"changelog-timeline",style:{position:"relative"},children:[u.jsx("div",{style:{position:"absolute",left:15,top:8,bottom:8,width:2,background:"var(--bd)"}}),s.map((_,D)=>u.jsxs("div",{"data-testid":`changelog-entry-${_.version}`,style:{position:"relative",paddingLeft:44,paddingBottom:D<s.length-1?32:0},children:[u.jsx("div",{style:{position:"absolute",left:8,top:6,width:16,height:16,borderRadius:"50%",background:_.version==="Unreleased"?"var(--txM)":"var(--ac)",border:"3px solid var(--bg, #1a1a1a)"}}),u.jsxs("div",{style:{display:"flex",alignItems:"baseline",gap:12,marginBottom:12},children:[u.jsx("span",{style:{fontSize:18,fontWeight:700,color:"var(--tx)",fontFamily:"var(--font-heading, inherit)"},children:_.url?u.jsx("a",{href:_.url,target:"_blank",rel:"noopener noreferrer",style:{color:"inherit",textDecoration:"none"},children:_.version}):_.version}),_.date&&u.jsx("span",{style:{fontSize:13,color:"var(--txM)",fontFamily:"var(--font-code, monospace)"},children:_.date})]}),_.sections.map(R=>{const L=ag[R.type]||"#6b7280";return u.jsxs("div",{style:{marginBottom:16},children:[u.jsxs("div",{style:{display:"inline-flex",alignItems:"center",gap:6,marginBottom:8},children:[u.jsx("span",{style:{display:"inline-block",width:8,height:8,borderRadius:"50%",background:L}}),u.jsx("span",{style:{fontSize:12,fontWeight:600,textTransform:"uppercase",letterSpacing:".06em",color:L,fontFamily:"var(--font-code, monospace)"},children:R.type})]}),u.jsx("ul",{style:{margin:0,paddingLeft:18,listStyleType:"disc",color:"var(--tx2)"},children:R.items.map((O,x)=>u.jsx("li",{style:{fontSize:14,lineHeight:1.7,color:"var(--tx2)",marginBottom:2},children:O},x))})]},R.type)})]},_.version)),!T&&d.length>5&&u.jsx("div",{style:{textAlign:"center",marginTop:24},children:u.jsxs("button",{"data-testid":"changelog-show-more",onClick:()=>h(!0),style:{background:"none",border:"1px solid var(--bd)",borderRadius:2,padding:"8px 20px",color:"var(--tx2)",fontSize:13,fontFamily:"var(--font-body, inherit)",cursor:"pointer"},children:["Show all ",d.length," releases"]})})]})}function ig(d,T,h){if(T==="index")return[];for(const s of d)if(s.pages.find(D=>D.id===T)){const D=[],R=s.pages[0];return D.push({label:s.section,href:R?R.urlPath:null}),D.push({label:h,href:null}),D}return[]}function og({config:d,navigation:T,currentPageId:h,pageHtml:s,pageComponent:_,mdxComponents:D,pageTitle:R,pageDescription:L,headings:O,tocEnabled:x=!0,editUrl:Z,lastUpdated:w,changelogEntries:W,onNavigate:P,allPages:ye,versioning:ne,currentVersion:oe,i18n:j,currentLocale:V,docContext:K,basePath:G="",isDraft:he,dir:Te,overrides:B}){var Zt,Fn,bn,si,cl,xa,xn,ci,dl,fl,ml,Sa,Ta,pl,hl,Gt,Ve,lt,Wt;const Oe=V||(j==null?void 0:j.defaultLocale)||"en",Je=Te||((Zt=j==null?void 0:j.localeDirs)==null?void 0:Zt[Oe])||"ltr",Me=Je==="rtl",Pe=((Fn=d.theme)==null?void 0:Fn.mode)||"auto",[Ue,Ct]=H.useState(()=>{var g;return Pe==="dark"?!0:Pe==="light"?!1:((g=window.matchMedia)==null?void 0:g.call(window,"(prefers-color-scheme: dark)").matches)??!0}),[re,yt]=H.useState(()=>typeof window<"u"&&window.innerWidth<768),[E,k]=H.useState(()=>typeof window<"u"&&window.innerWidth>=768),[F,ue]=H.useState(!1),[_e,m]=H.useState(!1),[C,q]=H.useState(!1),[Y,$]=H.useState(null),[ie,ge]=H.useState({}),[We,Le]=H.useState(()=>{var g;if(!((g=d.banner)!=null&&g.text))return!0;try{const N=Array.from(d.banner.text).reduce((ee,me)=>(ee<<5)-ee+me.charCodeAt(0)|0,0).toString(36);return localStorage.getItem("tome-banner-dismissed")===N}catch{return!1}}),Zn=ne&&oe&&oe!==ne.current,[Kn,il]=H.useState(T.map(g=>g.section)),It=H.useRef(null),Nt=H.useRef(null),pa=H.useRef(""),[ha,zo]=H.useState(()=>typeof window<"u"&&window.innerWidth>1100),ol=((bn=d.theme)==null?void 0:bn.preset)||"amber",ga=((si=Eo[ol])==null?void 0:si[Ue?"dark":"light"])||Eo.amber.dark,va=(cl=d.theme)!=null&&cl.accent?Yh(d.theme.accent,Ue):null,$e=va?{...ga,...va}:ga,rl=((xa=Eo[ol])==null?void 0:xa.fonts)||Eo.amber.fonts,ul={heading:((ci=(xn=d.theme)==null?void 0:xn.fonts)==null?void 0:ci.heading)||rl.heading,body:((fl=(dl=d.theme)==null?void 0:dl.fonts)==null?void 0:fl.body)||rl.body,code:((Sa=(ml=d.theme)==null?void 0:ml.fonts)==null?void 0:Sa.code)||rl.code};H.useEffect(()=>{if(Pe!=="auto")return;const g=window.matchMedia("(prefers-color-scheme: dark)"),N=ee=>Ct(ee.matches);return g.addEventListener("change",N),()=>g.removeEventListener("change",N)},[Pe]),H.useEffect(()=>{document.documentElement.classList.toggle("dark",Ue)},[Ue]),H.useEffect(()=>{const g=()=>{const N=window.innerWidth;zo(N>1100),yt(N<768)};return g(),window.addEventListener("resize",g),()=>window.removeEventListener("resize",g)},[]),H.useEffect(()=>{if(re&&E)return document.body.style.overflow="hidden",()=>{document.body.style.overflow=""}},[re,E]),H.useEffect(()=>{var g;(g=It.current)==null||g.scrollTo(0,0)},[h]),H.useEffect(()=>{const g=It.current;if(!g)return;const N=ee=>{const me=ee.target;me.tagName==="IMG"&&me.closest(".tome-content")&&$(me.src)};return g.addEventListener("click",N),()=>g.removeEventListener("click",N)},[]),H.useEffect(()=>{const g=It.current;if(!g)return;const N=ee=>{const me=ee.target.closest("a");if(!me)return;const ve=me.getAttribute("href");if(!ve||ve.startsWith("http://")||ve.startsWith("https://")||ve.startsWith("mailto:")||ve.startsWith("tel:")||ve.startsWith("//")||ve.startsWith("#"))return;ee.preventDefault();let Ye=ve.replace(/^\.\//,"").replace(/^\//,"").replace(/\.mdx?$/,"").replace(/\/$/,"");if(G){const Fe=G.replace(/^\//,"").replace(/\/$/,"");Fe&&Ye.startsWith(Fe+"/")?Ye=Ye.slice(Fe.length+1):Fe&&Ye===Fe&&(Ye="index")}Ye||(Ye="index"),P(Ye)};return g.addEventListener("click",N),()=>g.removeEventListener("click",N)},[P,G]),H.useEffect(()=>{if(!Y)return;const g=N=>{N.key==="Escape"&&$(null)};return window.addEventListener("keydown",g),()=>window.removeEventListener("keydown",g)},[Y]);const Ge=d.toc,Co=(Ge==null?void 0:Ge.depth)??3,Jn=(Ge==null?void 0:Ge.enabled)!==!1&&x,Dt=O.filter(g=>g.depth<=Co),[ri,ya]=H.useState("");H.useEffect(()=>{if(!Jn||Dt.length<2)return;const g=It.current;if(!g)return;const N=setTimeout(()=>{const ee=[];for(const ve of Dt){const Ye=g.querySelector(`#${CSS.escape(ve.id)}`);Ye&&ee.push(Ye)}if(ee.length===0)return;const me=new IntersectionObserver(ve=>{const Ye=ve.filter(Fe=>Fe.isIntersecting).sort((Fe,Sn)=>Fe.boundingClientRect.top-Sn.boundingClientRect.top);Ye.length>0&&ya(Ye[0].target.id)},{root:g,rootMargin:"0px 0px -80% 0px",threshold:0});for(const ve of ee)me.observe(ve);sl.current=me},100);return()=>{var ee;clearTimeout(N),(ee=sl.current)==null||ee.disconnect(),sl.current=null}},[h,Jn,Dt.map(g=>g.id).join(",")]);const sl=H.useRef(null);H.useEffect(()=>{ya("")},[h]),H.useEffect(()=>{if(!Nt.current||!s)return;const g=s.replace(/<h1[^>]*>[\s\S]*?<\/h1>\s*/,"");g!==pa.current&&(Nt.current.innerHTML=g,pa.current=g)},[s]);const ui=H.useCallback((g,N)=>{g.preventDefault();const ee=It.current;if(!ee)return;const me=ee.querySelector(`#${CSS.escape(N)}`);me&&(me.scrollIntoView({behavior:"smooth",block:"start"}),ya(N))},[]);H.useEffect(()=>{const g=N=>{(N.metaKey||N.ctrlKey)&&N.key==="k"&&(N.preventDefault(),ue(!0)),N.key==="Escape"&&ue(!1)};return window.addEventListener("keydown",g),()=>window.removeEventListener("keydown",g)},[]);const Qt=T.flatMap(g=>g.pages),et=Qt.findIndex(g=>g.id===h),bt=et>0?Qt[et-1]:null,tt=et<Qt.length-1?Qt[et+1]:null,ba=ig(T,h,R),jo=g=>il(N=>N.includes(g)?N.filter(ee=>ee!==g):[...N,g]),Oo={"--bg":$e.bg,"--sf":$e.sf,"--sfH":$e.sfH,"--bd":$e.bd,"--tx":$e.tx,"--tx2":$e.tx2,"--txM":$e.txM,"--ac":$e.ac,"--acD":$e.acD,"--acT":$e.acT,"--cdBg":$e.cdBg,"--cdTx":$e.cdTx,"--sbBg":$e.sbBg,"--hdBg":$e.hdBg,"--font-heading":`"${ul.heading}", serif`,"--font-body":`"${ul.body}", sans-serif`,"--font-code":`"${ul.code}", monospace`},Pn=_,dt=(Ta=d.banner)==null?void 0:Ta.link,yn=dt?dt.startsWith("#")||G&&dt.startsWith(G+"/"):!1;return u.jsxs("div",{dir:Je,className:"tome-grain",style:{...Oo,color:"var(--tx)",background:"var(--bg)",fontFamily:"var(--font-body)",minHeight:"100vh",overflow:"hidden"},children:[((pl=d.banner)==null?void 0:pl.text)&&!We&&u.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",gap:12,background:"var(--ac)",color:"#fff",padding:"8px 16px",fontSize:13,fontFamily:"var(--font-body)",fontWeight:500,textAlign:"center",width:"100vw",boxSizing:"border-box"},children:[d.banner.link?u.jsx("a",{href:yn&&dt.startsWith("#")?G+"/"+dt.slice(1):dt,...yn?{}:{target:"_blank",rel:"noopener noreferrer"},style:{color:"#fff",textDecoration:"underline"},onClick:yn?g=>{g.preventDefault();const N=G.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),ee=dt.startsWith("#")?dt.slice(1):dt.replace(new RegExp("^"+N+"/?"),"");P(ee||"index")}:void 0,children:d.banner.text}):u.jsx("span",{children:d.banner.text}),d.banner.dismissible!==!1&&u.jsx("button",{onClick:()=>{Le(!0);try{const g=Array.from(d.banner.text).reduce((N,ee)=>(N<<5)-N+ee.charCodeAt(0)|0,0).toString(36);localStorage.setItem("tome-banner-dismissed",g)}catch{}},"aria-label":"Dismiss banner",style:{background:"none",border:"none",color:"#fff",cursor:"pointer",fontSize:16,lineHeight:1,padding:0,opacity:.8},children:"×"})]}),F&&((hl=d.search)==null?void 0:hl.provider)==="algolia"&&d.search.appId&&d.search.apiKey&&d.search.indexName?u.jsx(Ih,{appId:d.search.appId,apiKey:d.search.apiKey,indexName:d.search.indexName,onNavigate:g=>{P(g),ue(!1)},onClose:()=>ue(!1),basePath:G}):F?u.jsx(rg,{allPages:ye,onNavigate:g=>{P(g),ue(!1)},onClose:()=>ue(!1),mobile:re}):null,u.jsxs("div",{style:{display:"flex",flexDirection:Me?"row-reverse":"row",flex:1,height:(Gt=d.banner)!=null&&Gt.text&&!We?"calc(100vh - 32px)":"100vh"},children:[re&&E&&u.jsx("div",{onClick:()=>k(!1),style:{position:"fixed",inset:0,zIndex:200,background:"rgba(0,0,0,0.4)",backdropFilter:"blur(2px)"}}),B!=null&&B.Sidebar?u.jsx(B.Sidebar,{config:d,navigation:T,currentPageId:h,onNavigate:P,mobile:re,sbOpen:E,setSbOpen:k,versioning:ne,currentVersion:oe}):u.jsxs("aside",{style:{width:E?270:0,minWidth:E?270:0,background:"var(--sbBg)",[Me?"borderLeft":"borderRight"]:"1px solid var(--bd)",display:"flex",flexDirection:"column",transition:"width .2s, min-width .2s",overflow:"hidden",...re?{position:"fixed",top:0,[Me?"right":"left"]:0,bottom:0,zIndex:201}:{}},children:[u.jsxs("a",{href:"/",style:{padding:"18px 20px",display:"flex",alignItems:"baseline",gap:6,borderBottom:"1px solid var(--bd)",textDecoration:"none",color:"inherit"},children:[u.jsx("span",{style:{fontFamily:"var(--font-heading)",fontSize:22,fontWeight:700,fontStyle:"italic"},children:d.name}),u.jsx("span",{style:{width:5,height:5,borderRadius:"50%",background:"var(--ac)",display:"inline-block"}})]}),u.jsx("div",{style:{padding:"12px 14px"},children:u.jsxs("button",{onClick:()=>{ue(!0),re&&k(!1)},style:{display:"flex",alignItems:"center",gap:8,width:"100%",background:"var(--cdBg)",border:"1px solid var(--bd)",borderRadius:2,padding:"8px 12px",cursor:"pointer",color:"var(--txM)",fontSize:12.5,fontFamily:"var(--font-body)"},children:[u.jsx(um,{}),u.jsx("span",{style:{flex:1,textAlign:Me?"right":"left"},children:"Search..."}),u.jsx("kbd",{style:{fontFamily:"var(--font-code)",fontSize:9,background:"var(--sf)",border:"1px solid var(--bd)",borderRadius:2,padding:"2px 6px"},children:"⌘K"})]})}),u.jsx("nav",{style:{flex:1,overflow:"auto",padding:"4px 10px 20px"},children:T.map(g=>u.jsxs("div",{style:{marginBottom:8},children:[u.jsxs("button",{onClick:()=>jo(g.section),style:{display:"flex",alignItems:"center",gap:6,width:"100%",background:"none",border:"none",padding:"8px 10px",cursor:"pointer",borderRadius:2,color:"var(--txM)",fontSize:10,fontWeight:600,textTransform:"uppercase",letterSpacing:".1em",fontFamily:"var(--font-code)"},children:[Kn.includes(g.section)?u.jsx(Qu,{}):u.jsx(If,{}),g.section]}),Kn.includes(g.section)&&u.jsx("div",{style:{[Me?"marginRight":"marginLeft"]:8,[Me?"borderRight":"borderLeft"]:"1px solid var(--bd)",[Me?"paddingRight":"paddingLeft"]:0},children:g.pages.map(N=>{const ee=h===N.id;return u.jsxs("button",{onClick:()=>{P(N.id),re&&k(!1)},style:{display:"flex",alignItems:"center",gap:10,width:"100%",textAlign:Me?"right":"left",background:"none",border:"none",borderRadius:0,[Me?"borderRight":"borderLeft"]:ee?"2px solid var(--ac)":"2px solid transparent",padding:"7px 14px",cursor:"pointer",color:ee?"var(--ac)":"var(--tx2)",fontSize:13,fontWeight:ee?500:400,fontFamily:"var(--font-body)",transition:"all .12s"},children:[N.title,N.badge&&(()=>{const me={default:{bg:"var(--sf)",text:"var(--tx2)"},info:{bg:"rgba(59,130,246,0.15)",text:"rgb(59,130,246)"},success:{bg:"rgba(34,197,94,0.15)",text:"rgb(34,197,94)"},warning:{bg:"rgba(234,179,8,0.15)",text:"rgb(202,138,4)"},danger:{bg:"rgba(239,68,68,0.15)",text:"rgb(239,68,68)"}},ve=me[N.badge.variant||"default"]||me.default;return u.jsx("span",{style:{fontSize:10,fontWeight:600,padding:"2px 6px",borderRadius:4,marginLeft:6,whiteSpace:"nowrap",background:ve.bg,color:ve.text},children:N.badge.text})})()]},N.id)})})]},g.section))}),ne&&re&&u.jsx("div",{style:{padding:"8px 16px",borderTop:"1px solid var(--bd)",display:"flex",gap:6},children:ne.versions.map(g=>u.jsxs("button",{onClick:()=>{const N=g===ne.current?"index":`${g}/index`;P(N)},style:{flex:1,padding:"3px 0",textAlign:"center",background:g===(oe||ne.current)?"var(--acD)":"var(--sf)",border:"1px solid var(--bd)",borderRadius:2,cursor:"pointer",color:g===(oe||ne.current)?"var(--ac)":"var(--tx2)",fontSize:11,fontFamily:"var(--font-code)",fontWeight:g===ne.current?600:400},children:[g,g===ne.current?" (latest)":""]},g))}),u.jsxs("div",{style:{padding:"12px 16px",borderTop:"1px solid var(--bd)",display:"flex",alignItems:"center",justifyContent:"space-between"},children:[Pe==="auto"?u.jsx("button",{"aria-label":Ue?"Switch to light mode":"Switch to dark mode",onClick:()=>Ct(g=>!g),style:{background:"none",border:"none",color:"var(--txM)",cursor:"pointer",display:"flex"},children:Ue?u.jsx($f,{}):u.jsx(Wf,{})}):u.jsx("div",{}),u.jsxs("span",{style:{fontSize:11,color:"var(--txM)",letterSpacing:.2},children:["Built with ","♡"," by Tome"]}),u.jsx("span",{style:{fontFamily:"var(--font-code)",fontSize:10,color:"var(--txM)"},children:"v0.3.2"})]})]}),u.jsxs("div",{style:{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"},children:[B!=null&&B.Header?u.jsx(B.Header,{config:d,navigation:T,currentPageId:h,onNavigate:P,mobile:re,sbOpen:E,setSbOpen:k,isDark:Ue,setDark:Ct,versioning:ne,currentVersion:oe,i18n:j,currentLocale:V,onSearchOpen:()=>ue(!0),basePath:G}):u.jsxs("header",{style:{display:"flex",alignItems:"center",gap:re?8:12,padding:re?"8px 12px":"10px 24px",borderBottom:"1px solid var(--bd)",background:"var(--hdBg)",backdropFilter:"blur(12px)",maxWidth:"100vw",overflow:"visible",position:"relative",zIndex:200},children:[u.jsx("button",{"aria-label":E?"Close sidebar":"Open sidebar",onClick:()=>k(!E),style:{background:"none",border:"none",color:"var(--txM)",cursor:"pointer",display:"flex"},children:E?u.jsx(Qh,{}):u.jsx(Xh,{})}),re?u.jsx("span",{style:{fontSize:13,color:"var(--ac)",fontFamily:"var(--font-code)",flex:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:((Ve=T.flatMap(g=>g.pages).find(g=>g.id===h))==null?void 0:Ve.title)||""}):u.jsx("div",{style:{display:"flex",alignItems:"center",gap:8,fontFamily:"var(--font-code)",fontSize:11,color:"var(--txM)",letterSpacing:".03em",flex:1},children:T.map(g=>{const N=g.pages.find(ee=>ee.id===h);return N?u.jsxs("span",{style:{display:"flex",alignItems:"center",gap:8},children:[u.jsx("span",{children:g.section}),u.jsx(If,{}),u.jsx("span",{style:{color:"var(--ac)"},children:N.title})]},g.section):null})}),d.topNav&&d.topNav.length>0&&!re&&u.jsxs("div",{style:{display:"flex",alignItems:"center",gap:12},children:[d.topNav.map(g=>{const N=g.href.startsWith("#")||G&&g.href.startsWith(G+"/"),ee=!N;return u.jsxs("a",{href:N&&g.href.startsWith("#")?G+"/"+g.href.slice(1):g.href,...ee?{target:"_blank",rel:"noopener noreferrer"}:{},onClick:N?me=>{me.preventDefault();const ve=g.href.startsWith("#")?g.href.slice(1):g.href.replace(new RegExp("^"+G.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+"/?"),"");P(ve)}:void 0,style:{display:"flex",alignItems:"center",gap:4,color:"var(--txM)",textDecoration:"none",fontSize:12,fontFamily:"var(--font-body)",fontWeight:500,transition:"color .15s"},onMouseOver:me=>me.currentTarget.style.color="var(--ac)",onMouseOut:me=>me.currentTarget.style.color="var(--txM)",children:[g.label,ee&&u.jsx(eg,{})]},g.label)}),u.jsx("span",{style:{width:1,height:16,background:"var(--bd)"}})]}),d.socialLinks&&d.socialLinks.length>0&&!re&&u.jsx("div",{style:{display:"flex",alignItems:"center",gap:8},children:d.socialLinks.map(g=>u.jsx("a",{href:g.url,target:"_blank",rel:"noopener noreferrer","aria-label":g.label||g.platform,"data-testid":`social-link-${g.platform}`,style:{display:"flex",alignItems:"center",justifyContent:"center",color:"var(--tx2)",cursor:"pointer",transition:"color .15s"},onMouseOver:N=>N.currentTarget.style.color="var(--tx)",onMouseOut:N=>N.currentTarget.style.color="var(--tx2)",children:u.jsx(ng,{platform:g.platform,customIcon:g.icon})},g.url))}),re&&Pe==="auto"&&u.jsx("button",{"aria-label":Ue?"Switch to light mode":"Switch to dark mode",onClick:()=>Ct(g=>!g),style:{background:"none",border:"none",color:"var(--txM)",cursor:"pointer",display:"flex",flexShrink:0},children:Ue?u.jsx($f,{}):u.jsx(Wf,{})}),ne&&!re&&u.jsxs("div",{style:{position:"relative"},children:[u.jsxs("button",{"data-testid":"version-switcher",onClick:()=>m(g=>!g),style:{display:"flex",alignItems:"center",gap:6,background:"var(--sf)",border:"1px solid var(--bd)",borderRadius:2,padding:"5px 10px",cursor:"pointer",color:"var(--tx2)",fontSize:12,fontFamily:"var(--font-code)"},children:[u.jsx(Wh,{}),oe||ne.current,u.jsx(Qu,{})]}),_e&&u.jsx("div",{"data-testid":"version-dropdown",style:{position:"absolute",top:"100%",right:0,marginTop:4,background:"var(--sf)",border:"1px solid var(--bd)",borderRadius:2,boxShadow:"0 8px 32px rgba(0,0,0,0.2)",overflow:"hidden",zIndex:100,minWidth:120},children:ne.versions.map(g=>u.jsxs("button",{onClick:()=>{m(!1);const N=g===ne.current?"index":`${g}/index`;P(N)},style:{display:"block",width:"100%",textAlign:"left",background:g===(oe||ne.current)?"var(--acD)":"none",border:"none",padding:"8px 14px",cursor:"pointer",color:g===(oe||ne.current)?"var(--ac)":"var(--tx2)",fontSize:12,fontFamily:"var(--font-code)",fontWeight:g===ne.current?600:400},children:[g,g===ne.current?" (latest)":""]},g))})]}),j&&j.locales.length>1&&!re&&u.jsxs("div",{style:{position:"relative"},children:[u.jsxs("button",{"data-testid":"language-switcher",onClick:()=>q(g=>!g),style:{display:"flex",alignItems:"center",gap:6,background:"var(--sf)",border:"1px solid var(--bd)",borderRadius:2,padding:"5px 10px",cursor:"pointer",color:"var(--tx2)",fontSize:12,fontFamily:"var(--font-body)"},children:[u.jsx($h,{}),((lt=j.localeNames)==null?void 0:lt[V||j.defaultLocale])||V||j.defaultLocale,u.jsx(Qu,{})]}),C&&u.jsx("div",{"data-testid":"language-dropdown",style:{position:"absolute",top:"100%",right:0,marginTop:4,background:"var(--sf)",border:"1px solid var(--bd)",borderRadius:2,boxShadow:"0 8px 32px rgba(0,0,0,0.2)",overflow:"hidden",zIndex:100,minWidth:120},children:j.locales.map(g=>{var Fe;const N=g===(V||j.defaultLocale),ee=((Fe=j.localeNames)==null?void 0:Fe[g])||g,me=V||j.defaultLocale;let ve=h;me!==j.defaultLocale&&h.startsWith(`${me}/`)&&(ve=h.slice(me.length+1));const Ye=g===j.defaultLocale?ve:`${g}/${ve}`;return u.jsx("button",{onClick:()=>{q(!1),P(Ye)},style:{display:"block",width:"100%",textAlign:"left",background:N?"var(--acD)":"none",border:"none",padding:"8px 14px",cursor:"pointer",color:N?"var(--ac)":"var(--tx2)",fontSize:12,fontFamily:"var(--font-body)",fontWeight:N?600:400},children:ee},g)})})]})]}),Zn&&u.jsxs("div",{"data-testid":"old-version-banner",style:{display:"flex",alignItems:"center",justifyContent:"center",gap:8,background:"var(--acD)",borderBottom:"1px solid var(--bd)",padding:"8px 24px",fontSize:13,color:"var(--tx2)"},children:[u.jsxs("span",{children:["You're viewing docs for ",oe,"."]}),u.jsx("button",{onClick:()=>{P("index")},style:{background:"none",border:"none",color:"var(--ac)",cursor:"pointer",fontWeight:600,fontSize:13,fontFamily:"var(--font-body)",textDecoration:"underline"},children:"Switch to latest."})]}),u.jsxs("div",{ref:It,style:{flex:1,overflow:"auto",display:"flex"},children:[u.jsxs("main",{style:{flex:1,maxWidth:re?"100%":760,padding:re?"24px 16px 60px":"40px 48px 80px",margin:"0 auto",minWidth:0},children:[ba.length>0&&u.jsx("nav",{"aria-label":"Breadcrumbs","data-testid":"breadcrumbs",style:{display:"flex",alignItems:"center",gap:6,fontSize:13,color:"var(--tx2)",marginBottom:8},children:ba.map((g,N)=>u.jsxs(om.Fragment,{children:[N>0&&u.jsx("span",{style:{color:"var(--tx2)",opacity:.5},children:"›"}),N<ba.length-1&&g.href!==null?u.jsx("a",{href:g.href,onClick:ee=>{ee.preventDefault();const me=T.flatMap(ve=>ve.pages).find(ve=>ve.urlPath===g.href);me&&P(me.id)},style:{color:"var(--tx2)",textDecoration:"none",cursor:"pointer"},children:g.label}):u.jsx("span",{style:N===ba.length-1?{color:"var(--tx)"}:void 0,children:g.label})]},N))}),u.jsx("h1",{style:{fontFamily:"var(--font-heading)",fontSize:re?26:38,fontWeight:400,fontStyle:"italic",lineHeight:1.15,marginBottom:8},children:R}),he&&u.jsx("div",{"data-testid":"draft-banner",style:{background:"#fef3c7",color:"#92400e",padding:"8px 16px",borderRadius:6,fontSize:13,marginBottom:16},children:"Draft — This page is only visible in development"}),L&&u.jsx("p",{style:{fontSize:16,color:"var(--tx2)",lineHeight:1.6,marginBottom:32},children:L}),u.jsx("div",{style:{borderTop:"1px solid var(--bd)",paddingTop:28},children:W&&W.length>0?u.jsx(lg,{entries:W}):Pn?u.jsx("div",{className:"tome-content",children:u.jsx(Pn,{components:D||{}})}):u.jsx("div",{className:"tome-content",ref:Nt})}),B!=null&&B.PageFooter?u.jsx(B.PageFooter,{editUrl:Z,lastUpdated:w,currentPageId:h,prev:bt,next:tt,onNavigate:P,mobile:re}):u.jsxs(u.Fragment,{children:[(Z||w)&&u.jsxs("div",{style:{marginTop:40,display:"flex",flexDirection:re?"column":"row",alignItems:re?"flex-start":"center",justifyContent:"space-between",gap:re?8:16},children:[Z&&u.jsx("div",{"data-testid":"edit-page-link",children:u.jsxs("a",{href:Z,target:"_blank",rel:"noopener noreferrer",style:{display:"inline-flex",alignItems:"center",gap:6,color:"var(--txM)",textDecoration:"none",fontSize:13,fontFamily:"var(--font-body)",transition:"color .15s"},onMouseOver:g=>g.currentTarget.style.color="var(--ac)",onMouseOut:g=>g.currentTarget.style.color="var(--txM)",children:[u.jsx(Zh,{})," Edit this page on GitHub"]})}),w&&u.jsxs("div",{"data-testid":"last-updated",style:{fontSize:12,color:"var(--txM)",fontFamily:"var(--font-body)"},children:["Last updated ",Kh(w)]})]}),u.jsx("div",{style:{display:"flex",alignItems:"center",gap:12,marginTop:24,padding:"12px 0"},children:ie[h]?u.jsx("span",{style:{fontSize:13,color:"var(--txM)",fontFamily:"var(--font-body)"},children:"Thanks for your feedback!"}):u.jsxs(u.Fragment,{children:[u.jsx("span",{style:{fontSize:13,color:"var(--txM)",fontFamily:"var(--font-body)"},children:"Was this helpful?"}),u.jsx("button",{onClick:()=>{ge(g=>({...g,[h]:!0}));try{localStorage.setItem(`tome-feedback-${h}`,"up")}catch{}},style:{background:"none",border:"1px solid var(--bd)",borderRadius:2,padding:"4px 10px",cursor:"pointer",fontSize:13,color:"var(--txM)",transition:"border-color .15s"},children:"👍"}),u.jsx("button",{onClick:()=>{ge(g=>({...g,[h]:!0}));try{localStorage.setItem(`tome-feedback-${h}`,"down")}catch{}},style:{background:"none",border:"1px solid var(--bd)",borderRadius:2,padding:"4px 10px",cursor:"pointer",fontSize:13,color:"var(--txM)",transition:"border-color .15s"},children:"👎"})]})}),u.jsxs("div",{style:{display:"flex",flexDirection:re?"column":"row",justifyContent:"space-between",marginTop:16,paddingTop:24,borderTop:"1px solid var(--bd)",gap:re?12:16},children:[bt?u.jsxs("button",{onClick:()=>P(bt.id),style:{display:"flex",alignItems:"center",gap:8,background:"none",border:"1px solid var(--bd)",borderRadius:2,padding:"10px 16px",cursor:"pointer",color:"var(--tx2)",fontSize:13,fontFamily:"var(--font-body)",transition:"border-color .15s, color .15s"},children:[Me?u.jsx(tm,{}):u.jsx(em,{})," ",bt.title]}):u.jsx("div",{}),tt?u.jsxs("button",{onClick:()=>P(tt.id),style:{display:"flex",alignItems:"center",gap:8,background:"none",border:"1px solid var(--bd)",borderRadius:2,padding:"10px 16px",cursor:"pointer",color:"var(--tx2)",fontSize:13,fontFamily:"var(--font-body)",transition:"border-color .15s, color .15s"},children:[tt.title," ",Me?u.jsx(em,{}):u.jsx(tm,{})]}):u.jsx("div",{})]})]})]}),B!=null&&B.Toc?Jn&&Dt.length>=2&&ha&&u.jsx(B.Toc,{headings:Dt,activeHeadingId:ri,onScrollToHeading:ui}):Jn&&Dt.length>=2&&ha&&u.jsxs("aside",{"data-testid":"toc-sidebar",style:{width:200,padding:Me?"40px 0 40px 16px":"40px 16px 40px 0",position:"sticky",top:0,alignSelf:"flex-start",flexShrink:0},children:[u.jsx("div",{style:{fontSize:10,fontWeight:600,textTransform:"uppercase",letterSpacing:".1em",color:"var(--txM)",marginBottom:12,fontFamily:"var(--font-code)"},children:"On this page"}),u.jsx("nav",{"aria-label":"Table of contents",style:{[Me?"borderRight":"borderLeft"]:"1px solid var(--bd)",[Me?"paddingRight":"paddingLeft"]:0},children:Dt.map((g,N)=>{const ee=ri===g.id;return u.jsx("a",{href:`#${g.id}`,onClick:me=>ui(me,g.id),"data-testid":`toc-link-${g.id}`,style:{display:"block",fontSize:12,color:ee?"var(--ac)":"var(--txM)",fontWeight:ee?500:400,textDecoration:"none",padding:"4px 12px",[Me?"paddingRight":"paddingLeft"]:12+(g.depth-2)*12,lineHeight:1.4,transition:"color .15s, font-weight .15s",[Me?"borderRight":"borderLeft"]:ee?"2px solid var(--ac)":"2px solid transparent",[Me?"marginRight":"marginLeft"]:-1},children:g.text},N)})})]})]})]})]}),(B==null?void 0:B.Footer)&&u.jsx(B.Footer,{config:d,navigation:T,currentPageId:h,onNavigate:P}),((Wt=d.ai)==null?void 0:Wt.enabled)&&u.jsx(Gh,{provider:d.ai.provider||"anthropic",model:d.ai.model,apiKey:typeof __TOME_AI_API_KEY__<"u"&&__TOME_AI_API_KEY__?__TOME_AI_API_KEY__:void 0,context:(K==null?void 0:K.map(g=>`## ${g.title}
${g.content}`).join(`

`))??ye.map(g=>`- ${g.title}${g.description?": "+g.description:""}`).join(`
`)}),Y&&u.jsx("div",{onClick:()=>$(null),style:{position:"fixed",inset:0,zIndex:9999,display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(0,0,0,0.7)",backdropFilter:"blur(8px)",cursor:"zoom-out"},children:u.jsx("img",{src:Y,alt:"",style:{maxWidth:"90vw",maxHeight:"90vh",objectFit:"contain",borderRadius:4,boxShadow:"0 16px 64px rgba(0,0,0,0.4)"}})})]})}function rg({allPages:d,onNavigate:T,onClose:h,mobile:s}){const[_,D]=H.useState(""),[R,L]=H.useState([]),[O,x]=H.useState(0),[Z,w]=H.useState(null),W=H.useRef(null),P=H.useRef(void 0);H.useEffect(()=>{Ph().then(j=>w(!!j)),setTimeout(()=>{var j;return(j=W.current)==null?void 0:j.focus()},50)},[]);const ye=H.useCallback(j=>{if(!j.trim())return[];const V=j.toLowerCase();return d.filter(K=>K.title.toLowerCase().includes(V)||(K.description||"").toLowerCase().includes(V)).slice(0,8).map(K=>({id:K.id,title:K.title,excerpt:K.description}))},[d]),ne=H.useCallback(async j=>{var K;if(!j.trim()){L([]),x(0);return}const V=ll;if(V)try{const G=await V.search(j),he=[];for(const Te of G.results.slice(0,8)){const B=await Te.data(),Je=(B.url||"").replace(/^\//,"").replace(/\/index\.html$/,"").replace(/\.html$/,"")||"index";he.push({id:Je,title:((K=B.meta)==null?void 0:K.title)||Je,excerpt:B.excerpt||void 0})}L(he),x(0);return}catch{}L(ye(j)),x(0)},[ye]);H.useEffect(()=>(P.current&&clearTimeout(P.current),P.current=setTimeout(()=>ne(_),120),()=>{P.current&&clearTimeout(P.current)}),[_,ne]);const oe=H.useCallback(j=>{j.key==="ArrowDown"?(j.preventDefault(),x(V=>Math.min(V+1,R.length-1))):j.key==="ArrowUp"?(j.preventDefault(),x(V=>Math.max(V-1,0))):j.key==="Enter"&&R.length>0&&(j.preventDefault(),T(R[O].id))},[R,O,T]);return u.jsx("div",{onClick:h,style:{position:"fixed",inset:0,zIndex:1e3,background:"rgba(0,0,0,0.55)",backdropFilter:"blur(6px)",display:"flex",alignItems:s?"stretch":"flex-start",justifyContent:"center",paddingTop:s?0:"12vh"},children:u.jsxs("div",{onClick:j=>j.stopPropagation(),style:{background:"var(--sf)",border:s?"none":"1px solid var(--bd)",borderRadius:s?0:2,width:"100%",maxWidth:s?"100%":520,boxShadow:s?"none":"0 24px 80px rgba(0,0,0,0.4)",overflow:"hidden",display:"flex",flexDirection:"column",...s?{height:"100%"}:{}},children:[u.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10,padding:"14px 18px",borderBottom:"1px solid var(--bd)"},children:[u.jsx(um,{}),u.jsx("input",{ref:W,value:_,onChange:j=>D(j.target.value),onKeyDown:oe,placeholder:"Search documentation...",style:{flex:1,background:"none",border:"none",outline:"none",color:"var(--tx)",fontSize:15,fontFamily:"var(--font-body)"}}),u.jsx("kbd",{style:{fontFamily:"var(--font-code)",fontSize:10,color:"var(--txM)",background:"var(--cdBg)",padding:"2px 6px",borderRadius:2,border:"1px solid var(--bd)"},children:"ESC"})]}),R.length>0&&u.jsx("div",{style:{padding:6,maxHeight:s?"none":360,overflow:"auto",flex:s?1:void 0},children:R.map((j,V)=>u.jsxs("button",{onClick:()=>T(j.id),style:{display:"block",width:"100%",textAlign:"left",background:V===O?"var(--acD)":"none",border:"none",borderRadius:2,padding:"10px 14px",cursor:"pointer",color:"var(--tx)",fontFamily:"var(--font-body)"},onMouseEnter:()=>x(V),children:[u.jsx("div",{style:{fontWeight:500,fontSize:14,marginBottom:2},children:j.title}),j.excerpt&&u.jsx("div",{style:{fontSize:12,color:"var(--txM)",lineHeight:1.3},dangerouslySetInnerHTML:{__html:j.excerpt}})]},j.id+V))}),_&&!R.length&&u.jsx("div",{style:{padding:"32px 18px",textAlign:"center",color:"var(--txM)",fontSize:14},children:"No results found"}),Z===!1&&_&&R.length>0&&u.jsx("div",{style:{padding:"6px 18px 10px",fontSize:11,color:"var(--txM)",textAlign:"center"},children:"Showing title matches. Build your site for full-text search."})]})})}function sm(d,T,h){let s=d;T&&s.startsWith(T)&&(s=s.slice(T.length));const _=s.replace(/^\//,"").replace(/\/index\.html$/,"").replace(/\.html$/,"").replace(/\/$/,"")||"index";return h.find(R=>R.id===_)?_:null}function ug(d,T,h){const s=h.find(_=>_.id===d);return s?T+s.urlPath:T+"/"+d}function sg(d,T){if(!d||!T)return;const{repo:h,branch:s="main",dir:_=""}=d,D=_?`${_.replace(/\/$/,"")}/`:"";return`https://github.com/${h}/edit/${s}/${D}${T}`}function cg(d,T,h,s,_){var L;const D=_(d,s,h);if(D)return D;const R=T.startsWith("#")?T.slice(1):T;return R&&h.some(O=>O.id===R)?R:((L=h[0])==null?void 0:L.id)||"index"}async function cm(d,T,h){try{const s=T.find(D=>D.id===d),_=await h(d);return s!=null&&s.isMdx&&_.meta?{isMdx:!0,component:_.default,frontmatter:_.meta.frontmatter,headings:_.meta.headings}:_.default?_.isChangelog&&_.changelogEntries?{isMdx:!1,..._.default,changelogEntries:_.changelogEntries}:{isMdx:!1,..._.default}:null}catch(s){return console.error(`Failed to load page: ${d}`,s),null}}function dg(d,T){return(d==null?void 0:d.version)||((T==null?void 0:T.current)??void 0)}const oi={name:"Tome",basePath:"/docs/",theme:{preset:"editorial",mode:"auto"},navigation:[{group:"Getting Started",pages:["index","quickstart","installation","project-structure"]},{group:"Core Concepts",pages:["configuration","pages-routing","components","theming"]},{group:"API Reference",pages:["api-overview","api-endpoints","api-auth"]},{group:"Guides",pages:["guides/search","guides/versioning","guides/migration","guides/redirects","guides/configuration","guides/custom-theme","guides/api-reference","guides/draft-pages","guides/plugins","guides/content-sources","guides/typedoc","guides/code-blocks"]},{group:"Tutorials",pages:["tutorials/first-site","tutorials/deploy-to-cloud"]},{group:"Reference",pages:["reference/cli","reference/components","reference/config","reference/frontmatter","reference/theme-presets"]},{group:"Concepts",pages:["concepts/architecture","concepts/file-routing"]},{group:"CLI",pages:["cli"]}],search:{provider:"local"},versioning:{current:"v3",versions:["v3","v2","v1"]},toc:{enabled:!0,depth:3},banner:{text:"New in v3 — Agent-friendly output, MDX mermaid & math, JSON-LD schema markup!",link:"/docs/configuration",dismissible:!0},math:!1,strictLinks:!1,lastUpdated:!0,topNav:[{label:"Home",href:"/"},{label:"Dashboard",href:"/dashboard"}],redirects:[],socialLinks:[{platform:"github",url:"https://github.com/tomehq/tome"},{platform:"twitter",url:"https://x.com/AaronCoinworthy"},{platform:"discord",url:"https://discord.gg/tome"}]},Qn=[{id:"api-auth",filePath:"v3/api-auth.md",urlPath:"/api-auth",frontmatter:{title:"Authentication",description:"Configure API authentication for the interactive playground — Bearer tokens, API keys, and custom headers.",icon:"lock",hidden:!1,draft:!1},isMdx:!1,version:"v3",lastUpdated:"2026-03-14T23:12:48-04:00"},{id:"api-endpoints",filePath:"v3/api-endpoints.md",urlPath:"/api-endpoints",frontmatter:{title:"Endpoints",description:"How Tome renders API endpoints from your OpenAPI spec — methods, parameters, schemas, and the interactive playground.",icon:"globe",hidden:!1,draft:!1},isMdx:!1,version:"v3",lastUpdated:"2026-03-14T23:12:48-04:00"},{id:"api-overview",filePath:"v3/api-overview.md",urlPath:"/api-overview",frontmatter:{title:"Overview",description:"Generate interactive API documentation from OpenAPI specs with Tome.",icon:"code",hidden:!1,draft:!1},isMdx:!1,version:"v3",lastUpdated:"2026-03-14T23:12:48-04:00"},{id:"cli",filePath:"v3/cli.md",urlPath:"/cli",frontmatter:{title:"CLI Reference",description:"Complete reference for every command and flag in the Tome CLI.",icon:"terminal",hidden:!1,draft:!1},isMdx:!1,version:"v3",lastUpdated:"2026-03-14T23:12:48-04:00"},{id:"components",filePath:"v3/components.mdx",urlPath:"/components",frontmatter:{title:"Components",description:"Built-in MDX components — Callout, Tabs, Card, Steps, Accordion, PackageManager, TypeTable, FileTree, and more.",icon:"puzzle",hidden:!1,draft:!1},isMdx:!0,version:"v3",lastUpdated:"2026-03-15T18:58:20-04:00"},{id:"concepts/architecture",filePath:"v3/concepts/architecture.md",urlPath:"/concepts/architecture",frontmatter:{title:"Architecture",description:"How Tome works internally — the Vite plugin, virtual modules, build pipeline, and theme system.",hidden:!1,draft:!1},isMdx:!1,version:"v3",lastUpdated:"2026-03-14T23:12:48-04:00"},{id:"concepts/file-routing",filePath:"v3/concepts/file-routing.md",urlPath:"/concepts/file-routing",frontmatter:{title:"File-System Routing",description:"How Tome maps files in the pages/ directory to URLs — naming conventions, nested routes, i18n, and versioning.",hidden:!1,draft:!1},isMdx:!1,version:"v3",lastUpdated:"2026-03-14T23:12:48-04:00"},{id:"configuration",filePath:"v3/configuration.mdx",urlPath:"/configuration",frontmatter:{title:"Configuration",description:"How to configure your Tome site using tome.config.js — name, logo, navigation, theme, and more.",icon:"gear",hidden:!1,draft:!1},isMdx:!0,version:"v3"},{id:"guides/api-reference",filePath:"v3/guides/api-reference.md",urlPath:"/guides/api-reference",frontmatter:{title:"API Reference Setup",description:"How to generate an interactive API reference from an OpenAPI specification in Tome.",icon:"code",hidden:!1,draft:!1},isMdx:!1,version:"v3",lastUpdated:"2026-03-14T23:12:48-04:00"},{id:"guides/code-blocks",filePath:"v3/guides/code-blocks.md",urlPath:"/guides/code-blocks",frontmatter:{title:"Code Blocks",description:"Advanced code block features — syntax highlighting, line numbers, titles, line highlighting, and TypeScript hover types with Twoslash.",icon:"code",hidden:!1,draft:!1},isMdx:!1,version:"v3",lastUpdated:"2026-03-15T18:58:20-04:00"},{id:"guides/configuration",filePath:"v3/guides/configuration.md",urlPath:"/guides/configuration",frontmatter:{title:"Configuration",description:"How to configure your Tome site using tome.config.js — name, logo, navigation, theme, and more.",icon:"gear",hidden:!1,draft:!1},isMdx:!1,version:"v3",lastUpdated:"2026-03-14T23:12:48-04:00"},{id:"guides/content-sources",filePath:"v3/guides/content-sources.md",urlPath:"/guides/content-sources",frontmatter:{title:"Content Sources",description:"Pull documentation content from GitHub repositories or Notion databases alongside your local files.",icon:"cloud-download",hidden:!1,draft:!1},isMdx:!1,version:"v3",lastUpdated:"2026-03-15T16:49:32-04:00"},{id:"guides/custom-theme",filePath:"v3/guides/custom-theme.md",urlPath:"/guides/custom-theme",frontmatter:{title:"Custom Theme",description:"How to customize your Tome site's appearance — presets, accent colors, fonts, dark mode, and CSS variables.",icon:"palette",hidden:!1,draft:!1},isMdx:!1,version:"v3",lastUpdated:"2026-03-14T23:12:48-04:00"},{id:"guides/draft-pages",filePath:"v3/guides/draft-pages.md",urlPath:"/guides/draft-pages",frontmatter:{title:"Draft Pages",description:"Mark pages as drafts to hide them from production builds while keeping them visible in development.",icon:"eye-off",hidden:!1,draft:!1},isMdx:!1,version:"v3",lastUpdated:"2026-03-15T16:49:32-04:00"},{id:"guides/migration",filePath:"v3/guides/migration.md",urlPath:"/guides/migration",frontmatter:{title:"Migrate from GitBook or Mintlify",description:"Move your existing documentation to Tome with a single command. Covers content conversion, navigation, redirects, and assets.",icon:"arrow-right-arrow-left",hidden:!1,draft:!1},isMdx:!1,version:"v3",lastUpdated:"2026-03-15T16:49:32-04:00"},{id:"guides/plugins",filePath:"v3/guides/plugins.md",urlPath:"/guides/plugins",frontmatter:{title:"Plugin System",description:"Extend Tome with plugins that hook into the build lifecycle — modify routes, inject head tags, and run custom logic.",icon:"puzzle",hidden:!1,draft:!1},isMdx:!1,version:"v3",lastUpdated:"2026-03-15T16:49:32-04:00"},{id:"guides/redirects",filePath:"v3/guides/redirects.md",urlPath:"/guides/redirects",frontmatter:{title:"Redirects",description:"Set up URL redirects to preserve links when pages move. Supports config-level and per-page frontmatter redirects.",icon:"arrow-turn-right",hidden:!1,draft:!1},isMdx:!1,version:"v3",lastUpdated:"2026-03-14T23:12:48-04:00"},{id:"guides/search",filePath:"v3/guides/search.md",urlPath:"/guides/search",frontmatter:{title:"Search",description:"How to set up search in your Tome documentation site — built-in Pagefind and optional Algolia DocSearch.",icon:"search",hidden:!1,draft:!1},isMdx:!1,version:"v3",lastUpdated:"2026-03-15T16:49:32-04:00"},{id:"guides/typedoc",filePath:"v3/guides/typedoc.md",urlPath:"/guides/typedoc",frontmatter:{title:"TypeDoc Generation",description:"Generate API documentation from TypeScript source code using the built-in TypeDoc integration.",icon:"file-code",hidden:!1,draft:!1},isMdx:!1,version:"v3",lastUpdated:"2026-03-15T16:49:32-04:00"},{id:"guides/versioning",filePath:"v3/guides/versioning.md",urlPath:"/guides/versioning",frontmatter:{title:"Multi-Version Docs",description:"How to maintain multiple versions of your documentation with Tome's built-in versioning system.",icon:"layers",hidden:!1,draft:!1},isMdx:!1,version:"v3",lastUpdated:"2026-03-14T23:12:48-04:00"},{id:"index",filePath:"v3/index.md",urlPath:"/",frontmatter:{title:"Introduction",description:"Tome is an open-source documentation platform for Markdown and MDX. Beautiful docs without the $250/month price tag.",hidden:!1,draft:!1},isMdx:!1,version:"v3",lastUpdated:"2026-03-14T23:12:48-04:00"},{id:"installation",filePath:"v3/installation.mdx",urlPath:"/installation",frontmatter:{title:"Installation",description:"System requirements and detailed installation instructions for Tome.",icon:"download",hidden:!1,draft:!1},isMdx:!0,version:"v3",lastUpdated:"2026-03-14T23:12:48-04:00"},{id:"pages-routing",filePath:"v3/pages-routing.md",urlPath:"/pages-routing",frontmatter:{title:"Pages & Routing",description:"How Tome maps files in the pages/ directory to URLs — naming conventions, nested routes, i18n, and versioning.",icon:"map",hidden:!1,draft:!1},isMdx:!1,version:"v3",lastUpdated:"2026-03-14T23:12:48-04:00"},{id:"project-structure",filePath:"v3/project-structure.mdx",urlPath:"/project-structure",frontmatter:{title:"Project Structure",description:"How a Tome documentation project is organized — pages, config, entry point, and build output.",icon:"folder",hidden:!1,draft:!1},isMdx:!0,version:"v3",lastUpdated:"2026-03-14T23:12:48-04:00"},{id:"quickstart",filePath:"v3/quickstart.md",urlPath:"/quickstart",frontmatter:{title:"Quickstart",description:"Get a Tome documentation site running in under a minute.",icon:"zap",hidden:!1,badge:"New",draft:!1},isMdx:!1,version:"v3",lastUpdated:"2026-03-15T16:49:32-04:00"},{id:"reference/cli",filePath:"v3/reference/cli.md",urlPath:"/reference/cli",frontmatter:{title:"CLI Reference",description:"Complete reference for every command and flag in the Tome CLI.",icon:"terminal",hidden:!1,draft:!1},isMdx:!1,version:"v3",lastUpdated:"2026-03-14T23:12:48-04:00"},{id:"reference/components",filePath:"v3/reference/components.md",urlPath:"/reference/components",frontmatter:{title:"Components",description:"Reference for all built-in MDX components — Callout, Tabs, Card, Steps, Accordion, and more.",icon:"puzzle",hidden:!1,draft:!1},isMdx:!1,version:"v3",lastUpdated:"2026-03-14T23:12:48-04:00"},{id:"reference/config",filePath:"v3/reference/config.md",urlPath:"/reference/config",frontmatter:{title:"Config Reference",description:"Complete reference for every field in tome.config.js — types, defaults, and descriptions.",icon:"file-text",hidden:!1,draft:!1},isMdx:!1,version:"v3",lastUpdated:"2026-03-15T16:49:32-04:00"},{id:"reference/frontmatter",filePath:"v3/reference/frontmatter.md",urlPath:"/reference/frontmatter",frontmatter:{title:"Frontmatter",description:"Reference for all YAML frontmatter fields supported in Tome documentation pages.",icon:"file-text",hidden:!1,draft:!1},isMdx:!1,version:"v3",lastUpdated:"2026-03-15T16:49:32-04:00"},{id:"reference/theme-presets",filePath:"v3/reference/theme-presets.md",urlPath:"/reference/theme-presets",frontmatter:{title:"Theme Presets",description:"Detailed reference for Tome's built-in theme presets — color tokens, CSS variables, and font stacks.",icon:"swatches",hidden:!1,draft:!1},isMdx:!1,version:"v3",lastUpdated:"2026-03-14T23:12:48-04:00"},{id:"theming",filePath:"v3/theming.md",urlPath:"/theming",frontmatter:{title:"Theming",description:"Customize the look of your Tome site — presets, colors, fonts, dark mode, and CSS variables.",icon:"palette",hidden:!1,draft:!1},isMdx:!1,version:"v3",lastUpdated:"2026-03-14T23:12:48-04:00"},{id:"tutorials/deploy-to-cloud",filePath:"v3/tutorials/deploy-to-cloud.md",urlPath:"/tutorials/deploy-to-cloud",frontmatter:{title:"Deploy to Tome Cloud",description:"Publish your documentation site to Tome Cloud with a single command. Includes custom domain setup.",icon:"cloud",hidden:!1,draft:!1},isMdx:!1,version:"v3",lastUpdated:"2026-03-15T16:49:32-04:00"},{id:"tutorials/first-site",filePath:"v3/tutorials/first-site.md",urlPath:"/tutorials/first-site",frontmatter:{title:"Create Your First Site",description:"A step-by-step tutorial that walks you through creating a documentation site with Tome, from installation to running the dev server.",icon:"rocket",hidden:!1,draft:!1},isMdx:!1,version:"v3",lastUpdated:"2026-03-14T23:12:48-04:00"},{id:"v2/api-auth",filePath:"v2/api-auth.md",urlPath:"/v2/api-auth",frontmatter:{title:"Authentication",description:"Configure API authentication for the interactive playground — Bearer tokens, API keys, and custom headers.",icon:"lock",hidden:!1,draft:!1},isMdx:!1,version:"v2",lastUpdated:"2026-03-13T19:09:31-04:00"},{id:"v2/api-endpoints",filePath:"v2/api-endpoints.md",urlPath:"/v2/api-endpoints",frontmatter:{title:"Endpoints",description:"How Tome renders API endpoints from your OpenAPI spec — methods, parameters, schemas, and the interactive playground.",icon:"globe",hidden:!1,draft:!1},isMdx:!1,version:"v2",lastUpdated:"2026-03-13T19:09:31-04:00"},{id:"v2/api-overview",filePath:"v2/api-overview.md",urlPath:"/v2/api-overview",frontmatter:{title:"Overview",description:"Generate interactive API documentation from OpenAPI specs with Tome.",icon:"code",hidden:!1,draft:!1},isMdx:!1,version:"v2",lastUpdated:"2026-03-13T19:09:31-04:00"},{id:"v2/cli",filePath:"v2/cli.md",urlPath:"/v2/cli",frontmatter:{title:"CLI Reference",description:"Complete reference for every command and flag in the Tome CLI.",icon:"terminal",hidden:!1,draft:!1},isMdx:!1,version:"v2",lastUpdated:"2026-03-13T19:09:31-04:00"},{id:"v2/components",filePath:"v2/components.mdx",urlPath:"/v2/components",frontmatter:{title:"Components",description:"Built-in MDX components — Callout, Tabs, Card, Steps, Accordion, PackageManager, TypeTable, FileTree, and more.",icon:"puzzle",hidden:!1,draft:!1},isMdx:!0,version:"v2",lastUpdated:"2026-03-15T16:49:32-04:00"},{id:"v2/concepts/architecture",filePath:"v2/concepts/architecture.md",urlPath:"/v2/concepts/architecture",frontmatter:{title:"Architecture",description:"How Tome works internally — the Vite plugin, virtual modules, build pipeline, and theme system.",hidden:!1,draft:!1},isMdx:!1,version:"v2",lastUpdated:"2026-03-13T19:09:31-04:00"},{id:"v2/concepts/file-routing",filePath:"v2/concepts/file-routing.md",urlPath:"/v2/concepts/file-routing",frontmatter:{title:"File-System Routing",description:"How Tome maps files in the pages/ directory to URLs — naming conventions, nested routes, i18n, and versioning.",hidden:!1,draft:!1},isMdx:!1,version:"v2",lastUpdated:"2026-03-13T19:09:31-04:00"},{id:"v2/configuration",filePath:"v2/configuration.md",urlPath:"/v2/configuration",frontmatter:{title:"Configuration",description:"How to configure your Tome site using tome.config.js — name, logo, navigation, theme, and more.",icon:"gear",hidden:!1,draft:!1},isMdx:!1,version:"v2",lastUpdated:"2026-03-13T19:09:31-04:00"},{id:"v2/guides/api-reference",filePath:"v2/guides/api-reference.md",urlPath:"/v2/guides/api-reference",frontmatter:{title:"API Reference Setup",description:"How to generate an interactive API reference from an OpenAPI specification in Tome.",icon:"code",hidden:!1,draft:!1},isMdx:!1,version:"v2",lastUpdated:"2026-03-13T19:09:31-04:00"},{id:"v2/guides/configuration",filePath:"v2/guides/configuration.md",urlPath:"/v2/guides/configuration",frontmatter:{title:"Configuration",description:"How to configure your Tome site using tome.config.js — name, logo, navigation, theme, and more.",icon:"gear",hidden:!1,draft:!1},isMdx:!1,version:"v2",lastUpdated:"2026-03-13T19:09:31-04:00"},{id:"v2/guides/custom-theme",filePath:"v2/guides/custom-theme.md",urlPath:"/v2/guides/custom-theme",frontmatter:{title:"Custom Theme",description:"How to customize your Tome site's appearance — presets, accent colors, fonts, dark mode, and CSS variables.",icon:"palette",hidden:!1,draft:!1},isMdx:!1,version:"v2",lastUpdated:"2026-03-13T19:09:31-04:00"},{id:"v2/guides/migration",filePath:"v2/guides/migration.md",urlPath:"/v2/guides/migration",frontmatter:{title:"Migrate from GitBook or Mintlify",description:"Move your existing documentation to Tome with a single command. Covers content conversion, navigation, redirects, and assets.",icon:"arrow-right-arrow-left",hidden:!1,draft:!1},isMdx:!1,version:"v2",lastUpdated:"2026-03-15T16:49:32-04:00"},{id:"v2/guides/redirects",filePath:"v2/guides/redirects.md",urlPath:"/v2/guides/redirects",frontmatter:{title:"Redirects",description:"Set up URL redirects to preserve links when pages move. Supports config-level and per-page frontmatter redirects.",icon:"arrow-turn-right",hidden:!1,draft:!1},isMdx:!1,version:"v2",lastUpdated:"2026-03-13T19:09:31-04:00"},{id:"v2/guides/search",filePath:"v2/guides/search.md",urlPath:"/v2/guides/search",frontmatter:{title:"Search",description:"How to set up search in your Tome documentation site — built-in Pagefind and optional Algolia DocSearch.",icon:"search",hidden:!1,draft:!1},isMdx:!1,version:"v2",lastUpdated:"2026-03-15T16:49:32-04:00"},{id:"v2/guides/versioning",filePath:"v2/guides/versioning.md",urlPath:"/v2/guides/versioning",frontmatter:{title:"Multi-Version Docs",description:"How to maintain multiple versions of your documentation with Tome's built-in versioning system.",icon:"layers",hidden:!1,draft:!1},isMdx:!1,version:"v2",lastUpdated:"2026-03-13T19:09:31-04:00"},{id:"v2/index",filePath:"v2/index.md",urlPath:"/v2",frontmatter:{title:"Introduction",description:"Tome is an open-source documentation platform for Markdown and MDX. Beautiful docs without the $250/month price tag.",hidden:!1,draft:!1},isMdx:!1,version:"v2",lastUpdated:"2026-03-13T19:09:31-04:00"},{id:"v2/installation",filePath:"v2/installation.mdx",urlPath:"/v2/installation",frontmatter:{title:"Installation",description:"System requirements and detailed installation instructions for Tome.",icon:"download",hidden:!1,draft:!1},isMdx:!0,version:"v2",lastUpdated:"2026-03-13T19:09:31-04:00"},{id:"v2/pages-routing",filePath:"v2/pages-routing.md",urlPath:"/v2/pages-routing",frontmatter:{title:"Pages & Routing",description:"How Tome maps files in the pages/ directory to URLs — naming conventions, nested routes, i18n, and versioning.",icon:"map",hidden:!1,draft:!1},isMdx:!1,version:"v2",lastUpdated:"2026-03-13T19:09:31-04:00"},{id:"v2/project-structure",filePath:"v2/project-structure.mdx",urlPath:"/v2/project-structure",frontmatter:{title:"Project Structure",description:"How a Tome documentation project is organized — pages, config, entry point, and build output.",icon:"folder",hidden:!1,draft:!1},isMdx:!0,version:"v2",lastUpdated:"2026-03-13T19:09:31-04:00"},{id:"v2/quickstart",filePath:"v2/quickstart.md",urlPath:"/v2/quickstart",frontmatter:{title:"Quickstart",description:"Get a Tome documentation site running in under a minute.",icon:"zap",hidden:!1,draft:!1},isMdx:!1,version:"v2",lastUpdated:"2026-03-13T19:09:31-04:00"},{id:"v2/reference/cli",filePath:"v2/reference/cli.md",urlPath:"/v2/reference/cli",frontmatter:{title:"CLI Reference",description:"Complete reference for every command and flag in the Tome CLI.",icon:"terminal",hidden:!1,draft:!1},isMdx:!1,version:"v2",lastUpdated:"2026-03-13T19:09:31-04:00"},{id:"v2/reference/components",filePath:"v2/reference/components.md",urlPath:"/v2/reference/components",frontmatter:{title:"Components",description:"Reference for all built-in MDX components — Callout, Tabs, Card, Steps, Accordion, and more.",icon:"puzzle",hidden:!1,draft:!1},isMdx:!1,version:"v2",lastUpdated:"2026-03-13T19:09:31-04:00"},{id:"v2/reference/config",filePath:"v2/reference/config.md",urlPath:"/v2/reference/config",frontmatter:{title:"Config Reference",description:"Complete reference for every field in tome.config.js — types, defaults, and descriptions.",icon:"file-text",hidden:!1,draft:!1},isMdx:!1,version:"v2",lastUpdated:"2026-03-13T19:09:31-04:00"},{id:"v2/reference/frontmatter",filePath:"v2/reference/frontmatter.md",urlPath:"/v2/reference/frontmatter",frontmatter:{title:"Frontmatter",description:"Reference for all YAML frontmatter fields supported in Tome documentation pages.",icon:"file-text",hidden:!1,draft:!1},isMdx:!1,version:"v2",lastUpdated:"2026-03-13T19:09:31-04:00"},{id:"v2/reference/theme-presets",filePath:"v2/reference/theme-presets.md",urlPath:"/v2/reference/theme-presets",frontmatter:{title:"Theme Presets",description:"Detailed reference for Tome's built-in theme presets — color tokens, CSS variables, and font stacks.",icon:"swatches",hidden:!1,draft:!1},isMdx:!1,version:"v2",lastUpdated:"2026-03-13T19:09:31-04:00"},{id:"v2/theming",filePath:"v2/theming.md",urlPath:"/v2/theming",frontmatter:{title:"Theming",description:"Customize the look of your Tome site — presets, colors, fonts, dark mode, and CSS variables.",icon:"palette",hidden:!1,draft:!1},isMdx:!1,version:"v2",lastUpdated:"2026-03-13T19:09:31-04:00"},{id:"v2/tutorials/deploy-to-cloud",filePath:"v2/tutorials/deploy-to-cloud.md",urlPath:"/v2/tutorials/deploy-to-cloud",frontmatter:{title:"Deploy to Tome Cloud",description:"Publish your documentation site to Tome Cloud with a single command. Includes custom domain setup.",icon:"cloud",hidden:!1,draft:!1},isMdx:!1,version:"v2",lastUpdated:"2026-03-15T16:49:32-04:00"},{id:"v2/tutorials/first-site",filePath:"v2/tutorials/first-site.md",urlPath:"/v2/tutorials/first-site",frontmatter:{title:"Create Your First Site",description:"A step-by-step tutorial that walks you through creating a documentation site with Tome, from installation to running the dev server.",icon:"rocket",hidden:!1,draft:!1},isMdx:!1,version:"v2",lastUpdated:"2026-03-13T19:09:31-04:00"},{id:"v1/api-auth",filePath:"v1/api-auth.md",urlPath:"/v1/api-auth",frontmatter:{title:"Authentication",description:"Configure API authentication for the interactive playground — Bearer tokens, API keys, and custom headers.",icon:"lock",hidden:!1,draft:!1},isMdx:!1,version:"v1",lastUpdated:"2026-03-13T19:09:31-04:00"},{id:"v1/api-endpoints",filePath:"v1/api-endpoints.md",urlPath:"/v1/api-endpoints",frontmatter:{title:"Endpoints",description:"How Tome renders API endpoints from your OpenAPI spec — methods, parameters, schemas, and the interactive playground.",icon:"globe",hidden:!1,draft:!1},isMdx:!1,version:"v1",lastUpdated:"2026-03-13T19:09:31-04:00"},{id:"v1/api-overview",filePath:"v1/api-overview.md",urlPath:"/v1/api-overview",frontmatter:{title:"Overview",description:"Generate interactive API documentation from OpenAPI specs with Tome.",icon:"code",hidden:!1,draft:!1},isMdx:!1,version:"v1",lastUpdated:"2026-03-13T19:09:31-04:00"},{id:"v1/cli",filePath:"v1/cli.md",urlPath:"/v1/cli",frontmatter:{title:"CLI Reference",description:"Complete reference for every command and flag in the Tome CLI.",icon:"terminal",hidden:!1,draft:!1},isMdx:!1,version:"v1",lastUpdated:"2026-03-13T19:09:31-04:00"},{id:"v1/components",filePath:"v1/components.mdx",urlPath:"/v1/components",frontmatter:{title:"Components",description:"Built-in MDX components — Callout, Tabs, Card, Steps, Accordion, PackageManager, TypeTable, FileTree, and more.",icon:"puzzle",hidden:!1,draft:!1},isMdx:!0,version:"v1",lastUpdated:"2026-03-15T16:49:32-04:00"},{id:"v1/concepts/architecture",filePath:"v1/concepts/architecture.md",urlPath:"/v1/concepts/architecture",frontmatter:{title:"Architecture",description:"How Tome works internally — the Vite plugin, virtual modules, build pipeline, and theme system.",hidden:!1,draft:!1},isMdx:!1,version:"v1",lastUpdated:"2026-03-13T19:09:31-04:00"},{id:"v1/concepts/file-routing",filePath:"v1/concepts/file-routing.md",urlPath:"/v1/concepts/file-routing",frontmatter:{title:"File-System Routing",description:"How Tome maps files in the pages/ directory to URLs — naming conventions, nested routes, i18n, and versioning.",hidden:!1,draft:!1},isMdx:!1,version:"v1",lastUpdated:"2026-03-13T19:09:31-04:00"},{id:"v1/configuration",filePath:"v1/configuration.md",urlPath:"/v1/configuration",frontmatter:{title:"Configuration",description:"How to configure your Tome site using tome.config.js — name, logo, navigation, theme, and more.",icon:"gear",hidden:!1,draft:!1},isMdx:!1,version:"v1",lastUpdated:"2026-03-13T19:09:31-04:00"},{id:"v1/guides/api-reference",filePath:"v1/guides/api-reference.md",urlPath:"/v1/guides/api-reference",frontmatter:{title:"API Reference Setup",description:"How to generate an interactive API reference from an OpenAPI specification in Tome.",icon:"code",hidden:!1,draft:!1},isMdx:!1,version:"v1",lastUpdated:"2026-03-13T19:09:31-04:00"},{id:"v1/guides/configuration",filePath:"v1/guides/configuration.md",urlPath:"/v1/guides/configuration",frontmatter:{title:"Configuration",description:"How to configure your Tome site using tome.config.js — name, logo, navigation, theme, and more.",icon:"gear",hidden:!1,draft:!1},isMdx:!1,version:"v1",lastUpdated:"2026-03-13T19:09:31-04:00"},{id:"v1/guides/custom-theme",filePath:"v1/guides/custom-theme.md",urlPath:"/v1/guides/custom-theme",frontmatter:{title:"Custom Theme",description:"How to customize your Tome site's appearance — presets, accent colors, fonts, dark mode, and CSS variables.",icon:"palette",hidden:!1,draft:!1},isMdx:!1,version:"v1",lastUpdated:"2026-03-13T19:09:31-04:00"},{id:"v1/guides/search",filePath:"v1/guides/search.md",urlPath:"/v1/guides/search",frontmatter:{title:"Search",description:"How to set up search in your Tome documentation site — built-in Pagefind and optional Algolia DocSearch.",icon:"search",hidden:!1,draft:!1},isMdx:!1,version:"v1",lastUpdated:"2026-03-15T16:49:32-04:00"},{id:"v1/guides/versioning",filePath:"v1/guides/versioning.md",urlPath:"/v1/guides/versioning",frontmatter:{title:"Multi-Version Docs",description:"How to maintain multiple versions of your documentation with Tome's built-in versioning system.",icon:"layers",hidden:!1,draft:!1},isMdx:!1,version:"v1",lastUpdated:"2026-03-13T19:09:31-04:00"},{id:"v1/index",filePath:"v1/index.md",urlPath:"/v1",frontmatter:{title:"Introduction",description:"Tome is an open-source documentation platform for Markdown and MDX. Beautiful docs without the $250/month price tag.",hidden:!1,draft:!1},isMdx:!1,version:"v1",lastUpdated:"2026-03-13T19:09:31-04:00"},{id:"v1/installation",filePath:"v1/installation.mdx",urlPath:"/v1/installation",frontmatter:{title:"Installation",description:"System requirements and detailed installation instructions for Tome.",icon:"download",hidden:!1,draft:!1},isMdx:!0,version:"v1",lastUpdated:"2026-03-13T19:09:31-04:00"},{id:"v1/pages-routing",filePath:"v1/pages-routing.md",urlPath:"/v1/pages-routing",frontmatter:{title:"Pages & Routing",description:"How Tome maps files in the pages/ directory to URLs — naming conventions, nested routes, i18n, and versioning.",icon:"map",hidden:!1,draft:!1},isMdx:!1,version:"v1",lastUpdated:"2026-03-13T19:09:31-04:00"},{id:"v1/project-structure",filePath:"v1/project-structure.mdx",urlPath:"/v1/project-structure",frontmatter:{title:"Project Structure",description:"How a Tome documentation project is organized — pages, config, entry point, and build output.",icon:"folder",hidden:!1,draft:!1},isMdx:!0,version:"v1",lastUpdated:"2026-03-13T19:09:31-04:00"},{id:"v1/quickstart",filePath:"v1/quickstart.md",urlPath:"/v1/quickstart",frontmatter:{title:"Quickstart",description:"Get a Tome documentation site running in under a minute.",icon:"zap",hidden:!1,draft:!1},isMdx:!1,version:"v1",lastUpdated:"2026-03-13T19:09:31-04:00"},{id:"v1/reference/cli",filePath:"v1/reference/cli.md",urlPath:"/v1/reference/cli",frontmatter:{title:"CLI Reference",description:"Complete reference for every command and flag in the Tome CLI.",icon:"terminal",hidden:!1,draft:!1},isMdx:!1,version:"v1",lastUpdated:"2026-03-13T19:09:31-04:00"},{id:"v1/reference/components",filePath:"v1/reference/components.md",urlPath:"/v1/reference/components",frontmatter:{title:"Components",description:"Reference for all built-in MDX components — Callout, Tabs, Card, Steps, Accordion, and more.",icon:"puzzle",hidden:!1,draft:!1},isMdx:!1,version:"v1",lastUpdated:"2026-03-13T19:09:31-04:00"},{id:"v1/reference/config",filePath:"v1/reference/config.md",urlPath:"/v1/reference/config",frontmatter:{title:"Config Reference",description:"Complete reference for every field in tome.config.js — types, defaults, and descriptions.",icon:"file-text",hidden:!1,draft:!1},isMdx:!1,version:"v1",lastUpdated:"2026-03-13T19:09:31-04:00"},{id:"v1/reference/frontmatter",filePath:"v1/reference/frontmatter.md",urlPath:"/v1/reference/frontmatter",frontmatter:{title:"Frontmatter",description:"Reference for all YAML frontmatter fields supported in Tome documentation pages.",icon:"file-text",hidden:!1,draft:!1},isMdx:!1,version:"v1",lastUpdated:"2026-03-13T19:09:31-04:00"},{id:"v1/reference/theme-presets",filePath:"v1/reference/theme-presets.md",urlPath:"/v1/reference/theme-presets",frontmatter:{title:"Theme Presets",description:"Detailed reference for Tome's built-in theme presets — color tokens, CSS variables, and font stacks.",icon:"swatches",hidden:!1,draft:!1},isMdx:!1,version:"v1",lastUpdated:"2026-03-13T19:09:31-04:00"},{id:"v1/theming",filePath:"v1/theming.md",urlPath:"/v1/theming",frontmatter:{title:"Theming",description:"Customize the look of your Tome site — presets, colors, fonts, dark mode, and CSS variables.",icon:"palette",hidden:!1,draft:!1},isMdx:!1,version:"v1",lastUpdated:"2026-03-13T19:09:31-04:00"},{id:"v1/tutorials/deploy-to-cloud",filePath:"v1/tutorials/deploy-to-cloud.md",urlPath:"/v1/tutorials/deploy-to-cloud",frontmatter:{title:"Deploy to Tome Cloud",description:"Publish your documentation site to Tome Cloud with a single command. Includes custom domain setup.",icon:"cloud",hidden:!1,draft:!1},isMdx:!1,version:"v1",lastUpdated:"2026-03-15T16:49:32-04:00"},{id:"v1/tutorials/first-site",filePath:"v1/tutorials/first-site.md",urlPath:"/v1/tutorials/first-site",frontmatter:{title:"Create Your First Site",description:"A step-by-step tutorial that walks you through creating a documentation site with Tome, from installation to running the dev server.",icon:"rocket",hidden:!1,draft:!1},isMdx:!1,version:"v1",lastUpdated:"2026-03-13T19:09:31-04:00"}],fg=[{section:"Getting Started",pages:[{title:"Introduction",id:"index",urlPath:"/"},{title:"Quickstart",id:"quickstart",urlPath:"/quickstart",icon:"zap",badge:{text:"New",variant:"default"}},{title:"Installation",id:"installation",urlPath:"/installation",icon:"download"},{title:"Project Structure",id:"project-structure",urlPath:"/project-structure",icon:"folder"}]},{section:"Core Concepts",pages:[{title:"Configuration",id:"configuration",urlPath:"/configuration",icon:"gear"},{title:"Pages & Routing",id:"pages-routing",urlPath:"/pages-routing",icon:"map"},{title:"Components",id:"components",urlPath:"/components",icon:"puzzle"},{title:"Theming",id:"theming",urlPath:"/theming",icon:"palette"}]},{section:"API Reference",pages:[{title:"Overview",id:"api-overview",urlPath:"/api-overview",icon:"code"},{title:"Endpoints",id:"api-endpoints",urlPath:"/api-endpoints",icon:"globe"},{title:"Authentication",id:"api-auth",urlPath:"/api-auth",icon:"lock"}]},{section:"Guides",pages:[{title:"Search",id:"guides/search",urlPath:"/guides/search",icon:"search"},{title:"Multi-Version Docs",id:"guides/versioning",urlPath:"/guides/versioning",icon:"layers"},{title:"Migrate from GitBook or Mintlify",id:"guides/migration",urlPath:"/guides/migration",icon:"arrow-right-arrow-left"},{title:"Redirects",id:"guides/redirects",urlPath:"/guides/redirects",icon:"arrow-turn-right"},{title:"Configuration",id:"guides/configuration",urlPath:"/guides/configuration",icon:"gear"},{title:"Custom Theme",id:"guides/custom-theme",urlPath:"/guides/custom-theme",icon:"palette"},{title:"API Reference Setup",id:"guides/api-reference",urlPath:"/guides/api-reference",icon:"code"},{title:"Draft Pages",id:"guides/draft-pages",urlPath:"/guides/draft-pages",icon:"eye-off"},{title:"Plugin System",id:"guides/plugins",urlPath:"/guides/plugins",icon:"puzzle"},{title:"Content Sources",id:"guides/content-sources",urlPath:"/guides/content-sources",icon:"cloud-download"},{title:"TypeDoc Generation",id:"guides/typedoc",urlPath:"/guides/typedoc",icon:"file-code"},{title:"Code Blocks",id:"guides/code-blocks",urlPath:"/guides/code-blocks",icon:"code"}]},{section:"Tutorials",pages:[{title:"Create Your First Site",id:"tutorials/first-site",urlPath:"/tutorials/first-site",icon:"rocket"},{title:"Deploy to Tome Cloud",id:"tutorials/deploy-to-cloud",urlPath:"/tutorials/deploy-to-cloud",icon:"cloud"}]},{section:"Reference",pages:[{title:"CLI Reference",id:"reference/cli",urlPath:"/reference/cli",icon:"terminal"},{title:"Components",id:"reference/components",urlPath:"/reference/components",icon:"puzzle"},{title:"Config Reference",id:"reference/config",urlPath:"/reference/config",icon:"file-text"},{title:"Frontmatter",id:"reference/frontmatter",urlPath:"/reference/frontmatter",icon:"file-text"},{title:"Theme Presets",id:"reference/theme-presets",urlPath:"/reference/theme-presets",icon:"swatches"}]},{section:"Concepts",pages:[{title:"Architecture",id:"concepts/architecture",urlPath:"/concepts/architecture"},{title:"File-System Routing",id:"concepts/file-routing",urlPath:"/concepts/file-routing"}]},{section:"CLI",pages:[{title:"CLI Reference",id:"cli",urlPath:"/cli",icon:"terminal"}]}],nm={current:"v3",versions:["v3","v2","v1"]},Zu=null,mg={"api-auth":()=>U(()=>import("./api-auth-Byjz-iV9.js"),[]),"api-endpoints":()=>U(()=>import("./api-endpoints-TqCZlt0q.js"),[]),"api-overview":()=>U(()=>import("./api-overview-LE0WErY0.js"),[]),cli:()=>U(()=>import("./cli-yDlNjo18.js"),[]),components:()=>U(()=>import("./components-BAApWzPk.js"),[]),"concepts/architecture":()=>U(()=>import("./architecture-C2NGRlqT.js"),[]),"concepts/file-routing":()=>U(()=>import("./file-routing-Dw65VE9g.js"),[]),configuration:()=>U(()=>import("./configuration-TGjrrwWb.js"),[]),"guides/api-reference":()=>U(()=>import("./api-reference-b2AZkNie.js"),[]),"guides/code-blocks":()=>U(()=>import("./code-blocks-D5saY7-t.js"),[]),"guides/configuration":()=>U(()=>import("./configuration-DoKt2MNK.js"),[]),"guides/content-sources":()=>U(()=>import("./content-sources-D6KQzQ92.js"),[]),"guides/custom-theme":()=>U(()=>import("./custom-theme-D1JC2bin.js"),[]),"guides/draft-pages":()=>U(()=>import("./draft-pages-D6Bz02Ir.js"),[]),"guides/migration":()=>U(()=>import("./migration-DKsr8Ohn.js"),[]),"guides/plugins":()=>U(()=>import("./plugins-CHX8Br4K.js"),[]),"guides/redirects":()=>U(()=>import("./redirects-rHgYe5nE.js"),[]),"guides/search":()=>U(()=>import("./search-DETstkUu.js"),[]),"guides/typedoc":()=>U(()=>import("./typedoc-D0RVHgwX.js"),[]),"guides/versioning":()=>U(()=>import("./versioning-BtluP-Zz.js"),[]),index:()=>U(()=>import("./index-qGT15Eet.js"),[]),installation:()=>U(()=>import("./installation-BgS2ouwf.js"),[]),"pages-routing":()=>U(()=>import("./pages-routing-Dd90JtDN.js"),[]),"project-structure":()=>U(()=>import("./project-structure-Cgy2iY1l.js"),[]),quickstart:()=>U(()=>import("./quickstart-9kvLdGBP.js"),[]),"reference/cli":()=>U(()=>import("./cli-zNYYdWE0.js"),[]),"reference/components":()=>U(()=>import("./components-oxsuT-ad.js"),[]),"reference/config":()=>U(()=>import("./config-CxB2ku6w.js"),[]),"reference/frontmatter":()=>U(()=>import("./frontmatter-DBUtOdTG.js"),[]),"reference/theme-presets":()=>U(()=>import("./theme-presets-Dm0l_qvl.js"),[]),theming:()=>U(()=>import("./theming-CgmcicVv.js"),[]),"tutorials/deploy-to-cloud":()=>U(()=>import("./deploy-to-cloud-2OKGSp7A.js"),[]),"tutorials/first-site":()=>U(()=>import("./first-site-D08TNHOP.js"),[]),"v2/api-auth":()=>U(()=>import("./api-auth-CcxBQtOi.js"),[]),"v2/api-endpoints":()=>U(()=>import("./api-endpoints-BiYCpfQi.js"),[]),"v2/api-overview":()=>U(()=>import("./api-overview-CcR7v8Jk.js"),[]),"v2/cli":()=>U(()=>import("./cli-VG7wjGqT.js"),[]),"v2/components":()=>U(()=>import("./components-Bk9qxNVJ.js"),[]),"v2/concepts/architecture":()=>U(()=>import("./architecture-CcA0OJfJ.js"),[]),"v2/concepts/file-routing":()=>U(()=>import("./file-routing-fRO6-5Ap.js"),[]),"v2/configuration":()=>U(()=>import("./configuration-CsCULSZC.js"),[]),"v2/guides/api-reference":()=>U(()=>import("./api-reference-Dq_uyr41.js"),[]),"v2/guides/configuration":()=>U(()=>import("./configuration-Cl11Q11p.js"),[]),"v2/guides/custom-theme":()=>U(()=>import("./custom-theme-BKCfH7kl.js"),[]),"v2/guides/migration":()=>U(()=>import("./migration-Dkjb3TM3.js"),[]),"v2/guides/redirects":()=>U(()=>import("./redirects-CdUHrd4i.js"),[]),"v2/guides/search":()=>U(()=>import("./search-qXAft3Oe.js"),[]),"v2/guides/versioning":()=>U(()=>import("./versioning-CAwPRAO2.js"),[]),"v2/index":()=>U(()=>import("./index-Dd58d4tY.js"),[]),"v2/installation":()=>U(()=>import("./installation-AakUXyY8.js"),[]),"v2/pages-routing":()=>U(()=>import("./pages-routing-ryyM9Mg7.js"),[]),"v2/project-structure":()=>U(()=>import("./project-structure-uFm-WvIO.js"),[]),"v2/quickstart":()=>U(()=>import("./quickstart-DKERrucV.js"),[]),"v2/reference/cli":()=>U(()=>import("./cli-DjGvlq6X.js"),[]),"v2/reference/components":()=>U(()=>import("./components-tclV2FlS.js"),[]),"v2/reference/config":()=>U(()=>import("./config-mMkyFvNw.js"),[]),"v2/reference/frontmatter":()=>U(()=>import("./frontmatter-C1Z2em6H.js"),[]),"v2/reference/theme-presets":()=>U(()=>import("./theme-presets-DpG_w7fN.js"),[]),"v2/theming":()=>U(()=>import("./theming-B0AnkweM.js"),[]),"v2/tutorials/deploy-to-cloud":()=>U(()=>import("./deploy-to-cloud-DkUtgjbQ.js"),[]),"v2/tutorials/first-site":()=>U(()=>import("./first-site-DEd5jgY_.js"),[]),"v1/api-auth":()=>U(()=>import("./api-auth-DIQ2zMdx.js"),[]),"v1/api-endpoints":()=>U(()=>import("./api-endpoints-Cxe3dma9.js"),[]),"v1/api-overview":()=>U(()=>import("./api-overview-CS2qw1N_.js"),[]),"v1/cli":()=>U(()=>import("./cli-rJxheBDj.js"),[]),"v1/components":()=>U(()=>import("./components-0yP2BP4o.js"),[]),"v1/concepts/architecture":()=>U(()=>import("./architecture-TOF4MWYj.js"),[]),"v1/concepts/file-routing":()=>U(()=>import("./file-routing-D5THgrFi.js"),[]),"v1/configuration":()=>U(()=>import("./configuration-DR_fnmoG.js"),[]),"v1/guides/api-reference":()=>U(()=>import("./api-reference-DWpxqQWI.js"),[]),"v1/guides/configuration":()=>U(()=>import("./configuration-LDDCWT7Z.js"),[]),"v1/guides/custom-theme":()=>U(()=>import("./custom-theme-CU-rD_pi.js"),[]),"v1/guides/search":()=>U(()=>import("./search-Bpy7almg.js"),[]),"v1/guides/versioning":()=>U(()=>import("./versioning-DvkOHnTT.js"),[]),"v1/index":()=>U(()=>import("./index-DrZJqgU0.js"),[]),"v1/installation":()=>U(()=>import("./installation-1CAGDidu.js"),[]),"v1/pages-routing":()=>U(()=>import("./pages-routing-DRlSamyp.js"),[]),"v1/project-structure":()=>U(()=>import("./project-structure-CiGqaN-y.js"),[]),"v1/quickstart":()=>U(()=>import("./quickstart-D4wxQ7dZ.js"),[]),"v1/reference/cli":()=>U(()=>import("./cli-Dn7shT7j.js"),[]),"v1/reference/components":()=>U(()=>import("./components-hl9Vdsgh.js"),[]),"v1/reference/config":()=>U(()=>import("./config-C_s3eA3Y.js"),[]),"v1/reference/frontmatter":()=>U(()=>import("./frontmatter-B4Lu0l4F.js"),[]),"v1/reference/theme-presets":()=>U(()=>import("./theme-presets-BltaXSPM.js"),[]),"v1/theming":()=>U(()=>import("./theming-BRrZLtP0.js"),[]),"v1/tutorials/deploy-to-cloud":()=>U(()=>import("./deploy-to-cloud-1pcn5rdP.js"),[]),"v1/tutorials/first-site":()=>U(()=>import("./first-site-B_hUv9FB.js"),[])};function dm(d){const T=mg[d];return T?T():Promise.resolve({default:null})}const pg=[{id:"api-auth",title:"Authentication",content:`
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

<Callout title="Important">
  This is critical information that users should not miss.
</Callout>

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

<Callout type="warning" title="Deprecation Notice">
  This API endpoint will be removed in v3.0.
</Callout>

\`\`\`mdx
<Callout type="warning" title="Deprecation Notice">
  This API endpoint will be removed in v3.0.
</Callout>
\`\`\`

## Tabs

Present content variants — useful for multiple languages or platform-specific instructions:

<Tabs items={["npm", "pnpm", "yarn"]}>
  <div>npm install @tomehq/cli</div>
  <div>pnpm add @tomehq/cli</div>
  <div>yarn add @tomehq/cli</div>
</Tabs>

\`\`\`mdx
<Tabs items={["npm", "pnpm", "yarn"]}>
  <div>npm install @tomehq/cli</div>
  <div>pnpm add @tomehq/cli</div>
  <div>yarn add @tomehq/cli</div>
</Tabs>
\`\`\`

The active tab persists across page navigations within the same session.

## Card

Link to related pages or external resources:

<Card title="Quickstart" href="#quickstart">
  Get up and running in under a minute.
</Card>

\`\`\`mdx
<Card title="Quickstart" href="#quickstart">
  Get up and running in under a minute.
</Card>
\`\`\`

### Card group

Arrange cards in a responsive grid:

<CardGroup cols={3}>
  <Card title="Setup">Step 1</Card>
  <Card title="Configure">Step 2</Card>
  <Card title="Deploy">Step 3</Card>
</CardGroup>

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

<Steps>
  <div>**Install dependencies** — Run \`npm install\` in your project directory.</div>
  <div>**Configure** — Edit \`tome.config.js\` with your settings.</div>
  <div>**Deploy** — Run \`tome deploy\` to publish your site.</div>
</Steps>

\`\`\`mdx
<Steps>
  <div>**Install dependencies** — Run \`npm install\` in your project directory.</div>
  <div>**Configure** — Edit \`tome.config.js\` with your settings.</div>
  <div>**Deploy** — Run \`tome deploy\` to publish your site.</div>
</Steps>
\`\`\`

## Accordion

Collapsible content sections for FAQs or optional details:

<Accordion title="How do I deploy?">
  Run \`npx @tomehq/cli deploy\` from your project directory. See the deployment guide for details.
</Accordion>

\`\`\`mdx
<Accordion title="How do I deploy?">
  Run \`npx @tomehq/cli deploy\` from your project directory. See the deployment guide for details.
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

## LinkCard

A card component that links to another page or URL. Use \`CardGrid\` to arrange multiple cards in a responsive grid.

<LinkCard title="Getting Started" description="Learn the basics of Tome" href="#quickstart" />

<CardGrid>
  <LinkCard title="Configuration" description="Customize your site" href="#configuration" />
  <LinkCard title="Theming" description="Change colors and fonts" href="#theming" />
  <LinkCard title="Components" description="Built-in MDX components" href="#components" />
</CardGrid>

\`\`\`mdx
<LinkCard title="Getting Started" description="Learn the basics of Tome" href="/quickstart" />

<CardGrid>
  <LinkCard title="Configuration" description="Customize your site" href="/configuration" />
  <LinkCard title="Theming" description="Change colors and fonts" href="/theming" />
  <LinkCard title="Components" description="Built-in MDX components" href="/components" />
</CardGrid>
\`\`\`

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| \`title\` | \`string\` | Yes | Card heading text |
| \`description\` | \`string\` | No | Short description below the title |
| \`href\` | \`string\` | Yes | Link destination (page path or URL) |

\`CardGrid\` renders children in a responsive 2–3 column grid.

## CodeSamples

Display tabbed code samples, typically used for showing API calls in multiple languages.

<CodeSamples
  samples={[
    { label: "cURL", language: "bash", code: 'curl -X GET https://api.example.com/users' },
    { label: "JavaScript", language: "js", code: 'const res = await fetch("https://api.example.com/users")' },
    { label: "Python", language: "python", code: 'requests.get("https://api.example.com/users")' },
  ]}
/>

\`\`\`mdx
<CodeSamples
  samples={[
    { label: "cURL", language: "bash", code: 'curl -X GET https://api.example.com/users' },
    { label: "JavaScript", language: "js", code: 'const res = await fetch("https://api.example.com/users")' },
    { label: "Python", language: "python", code: 'requests.get("https://api.example.com/users")' },
  ]}
/>
\`\`\`

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| \`samples\` | \`{ label: string, language: string, code: string }[]\` | Yes | Array of code samples to display as tabs |

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

**3. Build-time generation** — During builds, the plugin injects analytics scripts, JSON-LD schema markup, and generates machine-readable files (\`mcp.json\`, \`llms.txt\`, \`skill.md\`, \`robots.txt\`, \`search.json\`).

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
2. Custom remark plugins transform \`mermaid\` and \`math\` code blocks into JSX placeholder elements
3. File passed to \`@mdx-js/rollup\` for JSX compilation
4. Virtual module re-exports the compiled React component + metadata
5. Client-side: mermaid and KaTeX render the placeholders (same as \`.md\` files)

## Build output

\`\`\`text
out/
├── index.html           # SPA entry with JSON-LD schema
├── assets/
│   ├── index-[hash].js  # Application bundle
│   └── index-[hash].css # Styles
├── [page]/index.html    # Per-page HTML shells (SEO + Pagefind)
├── _pagefind/           # Search index
├── mcp.json             # MCP manifest
├── llms.txt             # AI-readable page index
├── llms-full.txt        # Full page content for LLMs
├── skill.md             # Agent capability file
├── robots.txt           # Crawler directives (AI-friendly)
├── search.json          # Structured page index (JSON API)
├── og/                  # Auto-generated Open Graph images
└── 404.html             # Error page
\`\`\`

The output is a single-page application with per-page HTML shells for SEO and search indexing. Each page shell contains the content in a \`data-pagefind-body\` div for Pagefind and a \`TechArticle\` JSON-LD schema in the \`<head>\`.

Six machine-readable files are auto-generated at build time to make your docs discoverable by AI tools, search engines, and language models — no configuration needed.

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

<Callout type="tip" title="Live example">
  Look at the top of this page — the coral banner saying "New in v3" is a live banner configured in this site's \`tome.config.js\`.
</Callout>

\`\`\`javascript
banner: {
  text: "v2.0 is now available!",
  link: "/changelog",         // Optional — makes the text a link
  dismissible: true,          // Default: true — shows a close button
},
\`\`\`

When a user dismisses the banner, it stays hidden until you change the text. Updating the \`text\` value automatically shows the banner again for all users.

## Math rendering

Use \` \`\`\`math \` fenced code blocks for display math in both \`.md\` and \`.mdx\` files:

\`\`\`math
E = mc^2
\`\`\`

\`\`\`math
\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}
\`\`\`

Math is rendered client-side with KaTeX loaded from CDN — no dependencies to install, no config flag needed. Just write the code block and it works.

For \`.md\` files, you can also enable inline math with \`$E = mc^2$\` and display math with \`$$\` blocks by setting:

\`\`\`javascript
math: true,
\`\`\`

## Mermaid diagrams

Mermaid diagrams work out of the box with no configuration. Use a \`mermaid\` code fence in any \`.md\` or \`.mdx\` file:

\`\`\`mermaid
flowchart LR
    A["Write Markdown"] --> B["Tome builds"]
    B --> C["Beautiful docs"]
\`\`\`

\`\`\`mermaid
sequenceDiagram
    participant User
    participant Tome
    participant CDN
    User->>Tome: tome build
    Tome->>CDN: Deploy static files
    CDN-->>User: Fast docs site
\`\`\`

Diagrams are rendered client-side and automatically adapt to your site's light/dark theme. Colors, labels, and borders adjust for both light and dark mode with proper contrast.

## Agent-friendly output

Tome automatically generates six machine-readable files at build time — no configuration needed:

| File | Description |
|------|-------------|
| \`llms.txt\` | Page index with titles, descriptions, and URLs |
| \`llms-full.txt\` | Full raw Markdown content of all non-hidden pages |
| \`skill.md\` | Agent capability file — site structure, available resources, and usage instructions |
| \`robots.txt\` | Crawler directives — explicitly allows AI crawlers (GPTBot, ClaudeBot, PerplexityBot, etc.) |
| \`search.json\` | Structured page index with titles, headings, tags, and word counts |
| \`mcp.json\` | MCP manifest with page metadata, headings, and optional content |

Every HTML page also gets **JSON-LD schema markup** injected into the \`<head>\`:
- \`WebSite\` schema on the homepage (with \`SearchAction\`)
- \`TechArticle\` schema on each documentation page

Hidden pages (with \`hidden: true\` in frontmatter) are excluded from all generated files.

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
`},{id:"guides/code-blocks",title:"Code Blocks",content:`
Tome uses [Shiki](https://shiki.style) for syntax highlighting. All standard fenced code blocks work out of the box with no configuration. This guide covers the additional features available on top of basic highlighting.

## Syntax highlighting

Use a language identifier after the opening fence:

\`\`\`javascript
const greeting = "hello";
console.log(greeting);
\`\`\`

Shiki supports [200+ languages](https://shiki.style/languages). Common identifiers: \`javascript\`, \`typescript\`, \`python\`, \`go\`, \`rust\`, \`bash\`, \`json\`, \`yaml\`, \`sql\`, \`graphql\`, \`html\`, \`css\`.

## Code block titles

Add a \`title\` attribute to show a filename or label above the code block:

\`\`\`javascript title="tome.config.js"
export default {
  name: "My Docs",
};
\`\`\`

The title renders as a label bar above the code, styled to match your theme.

## Line highlighting

Highlight specific lines using curly braces after the language:

\`\`\`javascript {2,4}
const a = 1;
const b = 2; // highlighted
const c = 3;
const d = 4; // highlighted
\`\`\`

Use ranges for consecutive lines:

\`\`\`javascript {1,3-5}
import { config } from "./config";  // highlighted

export function init() {   // highlighted
  config.load();            // highlighted
  config.validate();        // highlighted
}
\`\`\`

Highlighted lines receive a subtle background color that works in both light and dark mode.

## Line numbers

Show line numbers in the gutter with \`showLineNumbers\`:

\`\`\`typescript showLineNumbers
interface User {
  id: string;
  name: string;
  email: string;
}
\`\`\`

You can also use \`lineNumbers\` as an alias.

## Combining features

All meta attributes can be combined on a single code fence:

\`\`\`typescript title="types.ts" showLineNumbers {3-4}
interface Config {
  name: string;
  theme: ThemeOptions;   // highlighted
  plugins: Plugin[];     // highlighted
}
\`\`\`

## Twoslash (TypeScript hover types)

Twoslash renders TypeScript type information inline — the same hover popups you see in VS Code, but rendered statically in your docs. This is powerful for documenting TypeScript APIs where seeing inferred types matters.

\`\`\`\`markdown
\`\`\`ts twoslash
const user = {
  name: "Alice",
  age: 30,
};

user.name;
//   ^?
\`\`\`
\`\`\`\`

The \`^?\` marker tells Twoslash to show the inferred type at that position. In the rendered output, hovering over \`user.name\` displays \`(property) name: string\`.

### Setup

Twoslash requires an optional peer dependency:

\`\`\`bash
npm install @shikijs/twoslash
\`\`\`

If the package is not installed, Tome logs a warning and renders the code block without type annotations — your build won't break.

### Twoslash features

| Syntax | Effect |
|--------|--------|
| \`//  ^?\` | Show type at cursor position |
| \`// @errors: 2304\` | Expect and display a TypeScript error |
| \`// @noErrors\` | Suppress all TypeScript errors |
| \`// ---cut---\` | Hide code above this line (setup code) |

Example with hidden setup code:

\`\`\`\`markdown
\`\`\`ts twoslash
interface User {
  id: string;
  name: string;
}
// ---cut---
function greet(user: User) {
  return \`Hello, \${user.name}\`;
}
//              ^?
\`\`\`
\`\`\`\`

Only the code below \`---cut---\` is shown in the rendered output, but the \`User\` type is still available for inference.

## Copy button

Every code block includes a copy-to-clipboard button in the top-right corner. This is automatic — no configuration or markup needed.

## Diff highlighting

Show added and removed lines in code blocks using inline markers:

\`\`\`javascript
const config = {
  name: "My Docs",    // [!code --]
  name: "Acme Docs",  // [!code ++]
};
\`\`\`

Lines marked with \`// [!code --]\` are styled with a red background, and \`// [!code ++]\` with a green background. The markers are stripped from the rendered output.
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
`},{id:"guides/content-sources",title:"Content Sources",content:`
Content sources let you pull documentation from external services — GitHub repos, Notion databases, or custom APIs — and merge them with your local pages at build time. Remote pages are treated exactly like local files: they appear in navigation, search, and the route manifest.

## Configuration

Add content sources to the \`contentSources\` array in your config:

\`\`\`javascript
import { githubSource, notionSource } from "@tomehq/core";

export default {
  name: "My Docs",
  contentSources: [
    githubSource({
      owner: "acme",
      repo: "sdk-docs",
      path: "docs",
    }),
  ],
};
\`\`\`

## GitHub source

Pull \`.md\` and \`.mdx\` files from a GitHub repository:

\`\`\`javascript
import { githubSource } from "@tomehq/core";

githubSource({
  owner: "acme",          // GitHub org or user
  repo: "sdk-docs",       // Repository name
  branch: "main",         // Branch to pull from (default: "main")
  path: "docs",           // Directory within the repo (default: "docs")
  token: process.env.GH_TOKEN,  // Optional — required for private repos
})
\`\`\`

The source fetches the repo tree via the GitHub API, then downloads each \`.md\` / \`.mdx\` file from the specified path. File paths within the directory become page IDs — \`docs/getting-started.md\` becomes the page ID \`getting-started\`.

### Private repositories

For private repos, pass a GitHub personal access token (classic or fine-grained) with \`contents:read\` permission:

\`\`\`javascript
githubSource({
  owner: "acme",
  repo: "internal-docs",
  token: process.env.GH_TOKEN,
})
\`\`\`

## Notion source

Pull pages from a Notion database:

\`\`\`javascript
import { notionSource } from "@tomehq/core";

notionSource({
  databaseId: "abc123...",           // Notion database ID
  apiKey: process.env.NOTION_TOKEN,  // Notion integration token
})
\`\`\`

Each page in the database is converted to Markdown:

- The page title becomes the \`title\` frontmatter field
- Headings, paragraphs, lists, code blocks, quotes, and dividers are converted
- Bold, italic, code, and link annotations are preserved
- The title is slugified to create the page ID (\`Getting Started\` becomes \`getting-started\`)

### Setting up the Notion integration

1. Go to [notion.so/my-integrations](https://www.notion.so/my-integrations) and create a new integration
2. Copy the integration token
3. Share your database with the integration (click "..." on the database, then "Connections")

## Custom content sources

Use \`defineContentSource\` to create your own source with full type checking:

\`\`\`javascript
import { defineContentSource } from "@tomehq/core";

const apiSource = defineContentSource({
  name: "my-api",

  async fetchPages() {
    const res = await fetch("https://api.example.com/docs");
    const data = await res.json();

    return data.pages.map((page) => ({
      id: page.slug,
      content: \`---\\ntitle: \${page.title}\\n---\\n\\n\${page.body}\`,
      format: "md",
      lastModified: page.updatedAt,
    }));
  },
});
\`\`\`

Each page must return:

| Field | Type | Description |
|-------|------|-------------|
| \`id\` | \`string\` | Page identifier (used for URL and navigation) |
| \`content\` | \`string\` | Raw Markdown/MDX including frontmatter |
| \`format\` | \`"md"\` or \`"mdx"\` | File format |
| \`lastModified\` | \`string?\` | ISO 8601 date (optional) |

Custom sources can also implement an optional \`watch\` method for development mode — return a cleanup function to stop watching:

\`\`\`javascript
defineContentSource({
  name: "polling-api",
  async fetchPages() { /* ... */ },

  watch(onChange) {
    const interval = setInterval(async () => {
      const pages = await this.fetchPages();
      onChange(pages);
    }, 30000); // Poll every 30 seconds

    return () => clearInterval(interval);
  },
});
\`\`\`

## Using multiple sources

You can combine any number of content sources. Remote pages are merged with local files — if a remote page has the same ID as a local page, the local page takes priority.

\`\`\`javascript
import { githubSource, notionSource } from "@tomehq/core";

export default {
  name: "My Docs",
  contentSources: [
    githubSource({ owner: "acme", repo: "sdk-docs", path: "docs" }),
    notionSource({ databaseId: "abc123", apiKey: process.env.NOTION_TOKEN }),
  ],
};
\`\`\`

Content is fetched once at build time (and on startup in dev mode). Failed sources log a warning but don't block the build — your local pages will still work.
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
`},{id:"guides/draft-pages",title:"Draft Pages",content:`
Tome supports draft pages — content that is visible during local development but automatically excluded from production builds. This is useful for work-in-progress content, internal notes, or pages you want to preview before publishing.

## Marking a page as a draft

Add \`draft: true\` to the page's frontmatter:

\`\`\`markdown
---
title: Upcoming Feature
draft: true
---

This page is a work in progress. It won't appear in production.
\`\`\`

That's it. No other configuration is needed.

## How drafts behave

### Development (\`tome dev\`)

Draft pages are **included** in development. They appear in the sidebar navigation and are fully routable. A yellow banner is shown at the top of the page:

> Draft — This page is only visible in development

This makes it easy to tell at a glance which pages are drafts while you work.

### Production (\`tome build\`)

Draft pages are **excluded** from production builds:

- Removed from the sidebar navigation
- Removed from the route manifest (no URL is generated)
- Excluded from \`llms.txt\` and \`search.json\`
- Not included in the page loader bundle

If someone navigates to a draft page's URL in production, they'll get a 404.

## Use cases

**Work-in-progress content.** Start writing a new guide and set \`draft: true\`. Preview it locally, share the dev URL with teammates, then remove the flag when it's ready.

**Internal notes.** Keep internal-only pages (runbooks, architecture decisions) as permanent drafts so they never leak into the public site.

**Staged launches.** Write docs for an upcoming feature ahead of time. When the feature ships, remove \`draft: true\` from all related pages and redeploy.

## Combining with \`hidden\`

Drafts and hidden pages are different:

| Frontmatter | Dev sidebar | Dev URL | Prod sidebar | Prod URL |
|-------------|-------------|---------|-------------- |----------|
| *(default)* | Visible | Works | Visible | Works |
| \`hidden: true\` | Hidden | Works | Hidden | Works |
| \`draft: true\` | Visible | Works | Hidden | 404 |

Use \`hidden\` for pages that should exist in production but not appear in navigation (e.g., linked from other pages). Use \`draft\` for pages that should not exist in production at all.
`},{id:"guides/migration",title:"Migrate from GitBook or Mintlify",content:'\nTome provides automated migration from GitBook and Mintlify. The CLI handles navigation restructuring, component syntax conversion, redirect mapping, and asset copying.\n\n## Migrate from GitBook\n\n```bash\nnpx @tomehq/cli migrate gitbook ./path-to-gitbook-project\n```\n\n### What gets converted\n\n| GitBook | Tome |\n|---------|------|\n| `SUMMARY.md` navigation | `tome.config.js` navigation array |\n| `.gitbook.yaml` config | `tome.config.js` settings |\n| `{% hint style="info" %}` | `<Callout type="info">` |\n| `{% hint style="warning" %}` | `<Callout type="warning">` |\n| `{% hint style="danger" %}` | `<Callout type="danger">` |\n| `{% hint style="success" %}` | `<Callout type="tip">` |\n| `{% tabs %}` / `{% tab %}` | `<Tabs>` / `<Tab>` |\n| `{% code title="file.js" %}` | Fenced code block with title |\n| `{% embed url="..." %}` | Plain markdown link |\n| `.gitbook.yaml` redirects | `tome.config.js` redirects |\n| Images / assets | Copied to `public/` |\n\n### Options\n\n```bash\n# Output to a specific directory\nnpx @tomehq/cli migrate gitbook ./gitbook-docs --out ./my-new-docs\n\n# Preview without writing files\nnpx @tomehq/cli migrate gitbook ./gitbook-docs --dry-run\n```\n\n### How it works\n\n1. Reads `SUMMARY.md` for navigation structure and `.gitbook.yaml` for project settings\n2. Walks all Markdown files and converts GitBook-specific syntax to Tome MDX components\n3. Files containing converted JSX components are renamed from `.md` to `.mdx`\n4. Copies static assets (images, `.gitbook/assets/`) to `public/`\n5. Generates '}],hg={};function gg({samples:d}){var s;const[T,h]=H.useState(0);return d.length===0?null:u.jsxs("div",{"data-testid":"code-samples",style:{border:"1px solid var(--bd)",borderRadius:8,overflow:"hidden"},children:[u.jsx("div",{style:{display:"flex",borderBottom:"1px solid var(--bd)",background:"var(--sf)",overflowX:"auto",WebkitOverflowScrolling:"touch"},children:d.map((_,D)=>u.jsx("button",{onClick:()=>h(D),style:{padding:"8px 16px",fontSize:13,fontWeight:500,background:D===T?"var(--cdBg)":"transparent",color:D===T?"var(--tx)":"var(--tx2)",border:"none",borderBottom:D===T?"2px solid var(--ac)":"2px solid transparent",cursor:"pointer",fontFamily:"var(--font-body)",whiteSpace:"nowrap"},children:_.label},_.language))}),u.jsx("pre",{style:{margin:0,padding:16,background:"var(--cdBg)",overflow:"auto"},children:u.jsx("code",{style:{fontSize:13,fontFamily:"var(--font-code)"},children:(s=d[T])==null?void 0:s.code})})]})}function vg({href:d,title:T,description:h,icon:s,external:_}){const D=_??d.startsWith("http");return u.jsxs("a",{href:d,target:D?"_blank":void 0,rel:D?"noopener noreferrer":void 0,style:{display:"block",padding:"16px 20px",border:"1px solid var(--bd)",borderRadius:8,textDecoration:"none",color:"inherit",background:"var(--sf)",transition:"border-color 0.15s, background 0.15s",cursor:"pointer"},onMouseEnter:R=>{R.currentTarget.style.borderColor="var(--ac)",R.currentTarget.style.background="var(--sfH)"},onMouseLeave:R=>{R.currentTarget.style.borderColor="var(--bd)",R.currentTarget.style.background="var(--sf)"},children:[u.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8},children:[s&&u.jsx("span",{style:{fontSize:18},children:s}),u.jsx("span",{style:{fontWeight:600,fontSize:15,color:"var(--tx)"},children:T}),u.jsx("span",{style:{marginLeft:"auto",color:"var(--tx2)",fontSize:14},children:D?"↗":"→"})]}),h&&u.jsx("p",{style:{margin:"6px 0 0",fontSize:13,color:"var(--tx2)",lineHeight:1.5},children:h})]})}function yg({columns:d=2,children:T}){return u.jsx("div",{style:{display:"grid",gridTemplateColumns:`repeat(${d}, 1fr)`,gap:12,marginTop:16,marginBottom:16},children:T})}const bg={Added:"#22c55e",Changed:"#3b82f6",Deprecated:"#f59e0b",Removed:"#ef4444",Fixed:"#8b5cf6",Security:"#f97316"};function am(d){return bg[d]||"#6b7280"}function xg({entries:d,initialLimit:T}){const[h,s]=H.useState(!T),_=h?d:d.slice(0,T||d.length);return d.length===0?u.jsx("div",{"data-testid":"changelog-empty",style:{padding:"40px 0",textAlign:"center",color:"var(--txM)",fontSize:14},children:"No changelog entries found."}):u.jsxs("div",{"data-testid":"changelog-timeline",style:{position:"relative"},children:[u.jsx("div",{style:{position:"absolute",left:15,top:8,bottom:8,width:2,background:"var(--bd)"}}),_.map((D,R)=>u.jsxs("div",{"data-testid":`changelog-entry-${D.version}`,style:{position:"relative",paddingLeft:44,paddingBottom:R<_.length-1?32:0},children:[u.jsx("div",{style:{position:"absolute",left:8,top:6,width:16,height:16,borderRadius:"50%",background:D.version==="Unreleased"?"var(--txM)":"var(--ac)",border:"3px solid var(--bg, #1a1a1a)"}}),u.jsxs("div",{style:{display:"flex",alignItems:"baseline",gap:12,marginBottom:12},children:[u.jsx("span",{style:{fontSize:18,fontWeight:700,color:"var(--tx)",fontFamily:"var(--font-heading, inherit)"},children:D.url?u.jsx("a",{href:D.url,target:"_blank",rel:"noopener noreferrer",style:{color:"inherit",textDecoration:"none"},children:D.version}):D.version}),D.date&&u.jsx("span",{style:{fontSize:13,color:"var(--txM)",fontFamily:"var(--font-code, monospace)"},children:D.date})]}),D.sections.map(L=>u.jsxs("div",{style:{marginBottom:16},children:[u.jsxs("div",{style:{display:"inline-flex",alignItems:"center",gap:6,marginBottom:8},children:[u.jsx("span",{style:{display:"inline-block",width:8,height:8,borderRadius:"50%",background:am(L.type)}}),u.jsx("span",{style:{fontSize:12,fontWeight:600,textTransform:"uppercase",letterSpacing:".06em",color:am(L.type),fontFamily:"var(--font-code, monospace)"},children:L.type})]}),u.jsx("ul",{style:{margin:0,paddingLeft:18,listStyleType:"disc",color:"var(--tx2)"},children:L.items.map((O,x)=>u.jsx("li",{style:{fontSize:14,lineHeight:1.7,color:"var(--tx2)",marginBottom:2},children:O},x))})]},L.type))]},D.version)),!h&&d.length>(T||0)&&u.jsx("div",{style:{textAlign:"center",marginTop:24},children:u.jsxs("button",{"data-testid":"changelog-show-more",onClick:()=>s(!0),style:{background:"none",border:"1px solid var(--bd)",borderRadius:2,padding:"8px 20px",color:"var(--tx2)",fontSize:13,fontFamily:"var(--font-body, inherit)",cursor:"pointer",transition:"border-color .15s, color .15s"},children:["Show all ",d.length," releases"]})})]})}const lm={info:{color:"#3b82f6",label:"INFO"},warning:{color:"#f59e0b",label:"WARNING"},tip:{color:"var(--ac, #a78bfa)",label:"TIP"},danger:{color:"#ef4444",label:"DANGER"}};function Sg({type:d="info",title:T,children:h}){const s=lm[d]||lm.info;return u.jsxs("div",{style:{borderLeft:`3px solid ${s.color}`,background:`${s.color}11`,borderRadius:"0 2px 2px 0",padding:"14px 18px",marginBottom:20},children:[T?u.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,marginBottom:4},children:[u.jsx("span",{style:{fontWeight:700,fontSize:10,letterSpacing:".08em",color:s.color,fontFamily:"var(--font-code, monospace)"},children:s.label}),u.jsx("span",{style:{fontWeight:600,fontSize:13,color:s.color},children:T})]}):u.jsx("div",{style:{marginBottom:4},children:u.jsx("span",{style:{fontWeight:700,fontSize:10,letterSpacing:".08em",color:s.color,fontFamily:"var(--font-code, monospace)"},children:s.label})}),u.jsx("div",{style:{fontSize:14,lineHeight:1.65,color:"var(--tx2)"},children:h})]})}function Tg({items:d,children:T}){const[h,s]=H.useState(0);return u.jsxs("div",{style:{marginBottom:20},children:[u.jsx("div",{style:{display:"flex",gap:0,borderBottom:"1px solid var(--bd)"},children:d.map((_,D)=>u.jsx("button",{onClick:()=>s(D),style:{padding:"8px 16px",background:"none",border:"none",borderBottom:h===D?"2px solid var(--ac)":"2px solid transparent",color:h===D?"var(--ac)":"var(--txM)",fontWeight:h===D?600:400,fontSize:13,cursor:"pointer",fontFamily:"inherit"},children:_},D))}),u.jsx("div",{style:{padding:"16px 0"},children:T[h]})]})}function _g({title:d,icon:T,href:h,children:s}){const _=u.jsxs("div",{style:{border:"1px solid var(--bd)",borderRadius:2,padding:"20px",transition:"border-color 0.15s",cursor:h?"pointer":"default"},children:[T&&u.jsx("span",{style:{fontSize:24,marginBottom:8,display:"block"},children:T}),u.jsx("div",{style:{fontWeight:600,fontSize:14,marginBottom:4},children:d}),s&&u.jsx("div",{style:{fontSize:13,color:"var(--txM)",lineHeight:1.5},children:s})]});return h?u.jsx("a",{href:h,style:{textDecoration:"none",color:"inherit"},children:_}):_}function Eg({cols:d=2,children:T}){return u.jsx("div",{style:{display:"grid",gridTemplateColumns:`repeat(${d}, 1fr)`,gap:12,marginBottom:20},children:T})}function Ag({children:d}){return u.jsx("div",{style:{paddingLeft:24,borderLeft:"2px solid var(--bd)",marginBottom:20},children:om.Children.map(d,(T,h)=>u.jsxs("div",{style:{position:"relative",paddingBottom:20},children:[u.jsx("div",{style:{position:"absolute",left:-33,top:0,width:20,height:20,borderRadius:"50%",background:"var(--ac)",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700},children:h+1}),u.jsx("div",{style:{paddingLeft:8},children:T})]}))})}function Mg({title:d,children:T}){const[h,s]=H.useState(!1);return u.jsxs("div",{style:{border:"1px solid var(--bd)",borderRadius:2,marginBottom:8,overflow:"hidden"},children:[u.jsxs("button",{onClick:()=>s(!h),style:{display:"flex",alignItems:"center",justifyContent:"space-between",width:"100%",padding:"12px 16px",background:"var(--sf)",border:"none",cursor:"pointer",fontWeight:500,fontSize:14,color:"var(--tx)",fontFamily:"inherit"},children:[d,u.jsx("span",{style:{transform:h?"rotate(180deg)":"rotate(0)",transition:"transform 0.2s"},children:"▾"})]}),h&&u.jsx("div",{style:{padding:"12px 16px",borderTop:"1px solid var(--bd)",fontSize:14,color:"var(--tx2)",lineHeight:1.65},children:T})]})}const zg={install:{npm:"npm install",yarn:"yarn add",pnpm:"pnpm add",bun:"bun add"},"install -D":{npm:"npm install -D",yarn:"yarn add -D",pnpm:"pnpm add -D",bun:"bun add -d"},uninstall:{npm:"npm uninstall",yarn:"yarn remove",pnpm:"pnpm remove",bun:"bun remove"},run:{npm:"npm run",yarn:"yarn",pnpm:"pnpm",bun:"bun run"},exec:{npm:"npx",yarn:"yarn dlx",pnpm:"pnpm dlx",bun:"bunx"},init:{npm:"npm init",yarn:"yarn init",pnpm:"pnpm init",bun:"bun init"},create:{npm:"npm create",yarn:"yarn create",pnpm:"pnpm create",bun:"bun create"}};function Cg(d,T){for(const[h,s]of Object.entries(zg))if(d.startsWith(h+" ")||d===h){const _=d.slice(h.length);return(s[T]||h)+_}return`${T} ${d}`}function Dg({command:d}){const[T,h]=H.useState(0),[s,_]=H.useState(!1),D=["npm","yarn","pnpm","bun"],R=Cg(d,D[T]);return u.jsxs("div",{style:{border:"1px solid var(--bd)",borderRadius:2,marginBottom:16,overflow:"hidden"},children:[u.jsx("div",{style:{display:"flex",borderBottom:"1px solid var(--bd)",background:"var(--sf)",overflowX:"auto"},children:D.map((L,O)=>u.jsx("button",{onClick:()=>{h(O),_(!1)},style:{padding:"8px 14px",background:"none",border:"none",cursor:"pointer",fontSize:12,fontFamily:"var(--font-code)",fontWeight:O===T?600:400,color:O===T?"var(--ac)":"var(--txM)",borderBottom:O===T?"2px solid var(--ac)":"2px solid transparent",whiteSpace:"nowrap"},children:L},L))}),u.jsxs("div",{style:{display:"flex",alignItems:"center",padding:"10px 14px",background:"var(--cdBg)",gap:8},children:[u.jsx("code",{style:{flex:1,fontFamily:"var(--font-code)",fontSize:13,color:"var(--cdTx)",whiteSpace:"pre",overflowX:"auto"},children:R}),u.jsx("button",{onClick:()=>{var L;(L=navigator.clipboard)==null||L.writeText(R),_(!0),setTimeout(()=>_(!1),2e3)},style:{background:"none",border:"none",cursor:"pointer",color:"var(--txM)",fontSize:12,fontFamily:"var(--font-code)",flexShrink:0},children:s?"✓":"Copy"})]})]})}function jg({name:d,fields:T}){return u.jsxs("div",{style:{marginBottom:16},children:[d&&u.jsx("h4",{style:{fontFamily:"var(--font-code)",fontSize:15,marginBottom:8,color:"var(--tx)"},children:d}),u.jsx("div",{style:{overflowX:"auto",WebkitOverflowScrolling:"touch"},children:u.jsxs("table",{style:{width:"100%",borderCollapse:"collapse",fontSize:13,fontFamily:"var(--font-body)"},children:[u.jsx("thead",{children:u.jsx("tr",{style:{borderBottom:"2px solid var(--bd)"},children:["Property","Type","Required","Default","Description"].map(h=>u.jsx("th",{style:{textAlign:"left",padding:"8px 10px",color:"var(--txM)",fontWeight:600,fontSize:11,textTransform:"uppercase",letterSpacing:".05em",whiteSpace:"nowrap"},children:h},h))})}),u.jsx("tbody",{children:T.map(h=>u.jsxs("tr",{style:{borderBottom:"1px solid var(--bd)"},children:[u.jsx("td",{style:{padding:"8px 10px",fontFamily:"var(--font-code)",fontWeight:500,color:"var(--tx)"},children:h.name}),u.jsx("td",{style:{padding:"8px 10px",fontFamily:"var(--font-code)",fontSize:12,color:"var(--ac)"},children:h.type}),u.jsx("td",{style:{padding:"8px 10px"},children:h.required&&u.jsx("span",{style:{fontSize:10,fontWeight:600,color:"#e04040",background:"rgba(224,64,64,0.1)",padding:"2px 6px",borderRadius:2},children:"required"})}),u.jsx("td",{style:{padding:"8px 10px",fontFamily:"var(--font-code)",fontSize:12,color:"var(--txM)"},children:h.default||"—"}),u.jsx("td",{style:{padding:"8px 10px",color:"var(--tx2)"},children:h.description||""})]},h.name))})]})})]})}function Og({name:d}){return u.jsxs("div",{style:{display:"flex",alignItems:"center",gap:6,padding:"3px 0",fontFamily:"var(--font-code)",fontSize:13,color:"var(--tx2)"},children:[u.jsx("span",{style:{opacity:.6},children:"📄"})," ",d]})}function wg({name:d,defaultOpen:T,children:h}){const[s,_]=H.useState(T??!1);return u.jsxs("div",{children:[u.jsxs("button",{onClick:()=>_(!s),style:{display:"flex",alignItems:"center",gap:6,padding:"3px 0",background:"none",border:"none",cursor:"pointer",fontFamily:"var(--font-code)",fontSize:13,color:"var(--tx)",fontWeight:500},children:[u.jsx("span",{children:s?"📂":"📁"})," ",d]}),s&&u.jsx("div",{style:{paddingLeft:18,borderLeft:"1px solid var(--bd)",marginLeft:8},children:h})]})}function Pu({children:d}){return u.jsx("div",{style:{border:"1px solid var(--bd)",borderRadius:2,padding:"12px 16px",background:"var(--cdBg)",marginBottom:16},children:d})}Pu.File=Og;Pu.Folder=wg;const Rg={Callout:Sg,Tabs:Tg,Card:_g,CardGroup:Eg,Steps:Ag,Accordion:Mg,ChangelogTimeline:xg,PackageManager:Dg,TypeTable:jg,FileTree:Pu,CodeSamples:gg,LinkCard:vg,CardGrid:yg},Ug=`
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
  .tome-content ul, .tome-content ol { color: var(--tx2); padding-inline-start: 1.5em; margin-bottom: 1em; }
  .tome-content li { margin-bottom: 0.3em; line-height: 1.7; }
  .tome-content code { font-family: var(--font-code); font-size: 0.88em; background: var(--cdBg); padding: 0.15em 0.4em; border-radius: 2px; color: var(--ac); }
  .tome-content pre { margin-bottom: 1.2em; border-radius: 2px; overflow-x: auto; border: 1px solid var(--bd); }
  .tome-content pre code { background: none; padding: 1em 1.2em; display: block; font-size: 12.5px; line-height: 1.7; color: var(--cdTx); }
  .tome-content blockquote { border-inline-start: 3px solid var(--ac); padding: 0.5em 1em; margin: 1em 0; background: var(--acD); border-radius: 0 2px 2px 0; }
  .tome-content blockquote p { color: var(--tx2); margin: 0; }
  .tome-content table { width: 100%; border-collapse: collapse; margin-bottom: 1em; }
  .tome-content th, .tome-content td { padding: 0.5em 0.8em; border: 1px solid var(--bd); text-align: start; font-size: 0.9em; }
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

  /* ── Expressive code blocks ───────────────────────────── */

  /* Code block wrapper (for titled blocks) */
  .tome-code-block-wrapper { position: relative; margin-bottom: 1.2em; border: 1px solid var(--bd); border-radius: 2px; overflow: hidden; }
  .tome-code-block-wrapper pre { margin-bottom: 0; border: none; border-radius: 0; }
  .tome-code-title {
    font-family: var(--font-code); font-size: 12px; color: var(--tx2);
    background: var(--sf); padding: 6px 12px; border-bottom: 1px solid var(--bd);
    letter-spacing: 0.01em; font-weight: 500;
  }

  /* Line highlighting */
  .tome-content pre .line.tome-line-highlight {
    background: rgba(139, 148, 158, 0.1);
    display: inline-block; width: 100%; margin: 0 -1.2em; padding: 0 1.2em;
  }
  html.dark .tome-content pre .line.tome-line-highlight {
    background: rgba(200, 210, 220, 0.08);
  }

  /* Diff lines */
  .tome-content pre .line.tome-line-added {
    background: rgba(34, 197, 94, 0.12);
    display: inline-block; width: 100%; margin: 0 -1.2em; padding: 0 1.2em;
  }
  .tome-content pre .line.tome-line-removed {
    background: rgba(239, 68, 68, 0.12);
    display: inline-block; width: 100%; margin: 0 -1.2em; padding: 0 1.2em;
  }
  html.dark .tome-content pre .line.tome-line-added { background: rgba(34, 197, 94, 0.15); }
  html.dark .tome-content pre .line.tome-line-removed { background: rgba(239, 68, 68, 0.15); }

  /* Line numbers (CSS counter) */
  .tome-content pre[data-line-numbers] code {
    counter-reset: line;
  }
  .tome-content pre[data-line-numbers] .line::before {
    counter-increment: line;
    content: counter(line);
    display: inline-block; width: 2.5em; margin-inline-end: 1em;
    text-align: end; color: var(--txM); opacity: 0.4;
    font-size: 0.85em; user-select: none;
    border-inline-end: 1px solid var(--bd); padding-inline-end: 0.8em; margin-inline-end: 0.8em;
  }

  /* Word highlighting */
  .tome-word-highlight {
    background: rgba(139, 148, 158, 0.2); border-radius: 2px;
    padding: 1px 3px; margin: 0 -1px;
  }
  html.dark .tome-word-highlight {
    background: rgba(200, 210, 220, 0.15);
  }

  /* Copy button */
  .tome-content pre { position: relative; }
  .tome-copy-btn {
    position: absolute; top: 8px; inset-inline-end: 8px;
    font-family: var(--font-code); font-size: 11px;
    color: var(--tx2); background: var(--sf); border: 1px solid var(--bd);
    padding: 3px 8px; border-radius: 2px; cursor: pointer;
    opacity: 0; transition: opacity 0.15s;
    z-index: 2; line-height: 1.4;
  }
  .tome-content pre:hover .tome-copy-btn,
  .tome-copy-btn:focus { opacity: 1; }
  .tome-copy-btn:hover { background: var(--sfH); }

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

  /* ── Twoslash type hover tooltips ───────────────────── */
  .twoslash-hover {
    position: relative;
    border-bottom: 1px dotted var(--tx2);
    cursor: help;
  }
  .twoslash-popup-container {
    position: absolute;
    opacity: 0;
    display: none;
    z-index: 10;
    left: 0;
    top: 100%;
    margin-top: 4px;
    padding: 6px 10px;
    background: var(--sf);
    border: 1px solid var(--bd);
    border-radius: 6px;
    font-size: 12px;
    font-family: var(--font-code);
    color: var(--tx);
    white-space: pre-wrap;
    max-width: 500px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    pointer-events: none;
  }
  .twoslash-hover:hover .twoslash-popup-container {
    opacity: 1;
    display: block;
  }
  /* Twoslash error/warning underlines */
  .twoslash-error {
    position: relative;
    background: rgba(239, 68, 68, 0.1);
    border-bottom: 2px wavy rgba(239, 68, 68, 0.6);
  }
  /* Twoslash highlighted identifiers */
  .twoslash-highlighted {
    background: rgba(139, 148, 158, 0.15);
    border-radius: 2px;
    padding: 1px 2px;
  }
  /* Twoslash type annotation line (^?) */
  .twoslash-popup-code .shiki { background: transparent !important; padding: 0; margin: 0; }
  .twoslash-popup-code .shiki code { padding: 0; font-size: 12px; }
  html.dark .twoslash-popup-container {
    background: var(--sf);
    border-color: var(--bd);
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  }
`,Mo=(oi.basePath||"/").replace(/\/$/,"");function kg(d){return sm(d,Mo,Qn)}function Ku(d){return ug(d,Mo,Qn)}const fm=cg(window.location.pathname,window.location.hash,Qn,Mo,sm),Lg=cm(fm,Qn,dm);function Hg(){var oe;const[d,T]=H.useState(fm),[h,s]=H.useState(null),[_,D]=H.useState(!0),R=H.useCallback(async(j,V)=>{D(!0),T(j);const K=Ku(j);V!=null&&V.replace?window.history.replaceState(null,"",K):window.history.pushState(null,"",K);const G=await cm(j,Qn,dm);if(s(G),D(!1),!(V!=null&&V.skipScroll)){const he=window.location.hash.slice(1);he?requestAnimationFrame(()=>{const Te=document.getElementById(he);Te&&Te.scrollIntoView({behavior:"smooth",block:"start"})}):window.scrollTo(0,0)}},[]);H.useEffect(()=>{const j=window.location.hash.slice(1);if(j&&Qn.some(V=>V.id===j)){const V=Ku(j);window.history.replaceState(null,"",V),R(j,{replace:!0})}else{const V=Ku(d);window.history.replaceState(null,"",V),Lg.then(K=>{s(K),D(!1)})}},[]),H.useEffect(()=>{const j=()=>{const V=kg(window.location.pathname);V&&V!==d&&R(V,{replace:!0,skipScroll:!0})};return window.addEventListener("popstate",j),()=>window.removeEventListener("popstate",j)},[d,R]);const L=H.useRef(null),[O,x]=H.useState(()=>{var V,K;if(typeof document>"u")return"light";if(document.documentElement.classList.contains("dark"))return"dark";const j=((V=oi.theme)==null?void 0:V.mode)||"auto";return j==="dark"?"dark":j==="light"?"light":(K=window.matchMedia)!=null&&K.call(window,"(prefers-color-scheme: dark)").matches?"dark":"light"});H.useEffect(()=>{const j=new MutationObserver(()=>{const V=document.documentElement.classList.contains("dark");x(V?"dark":"light")});return j.observe(document.documentElement,{attributes:!0,attributeFilter:["class"]}),()=>j.disconnect()},[]),H.useEffect(()=>{const j=document.querySelectorAll(".tome-mermaid[data-mermaid]");if(j.length===0)return;let V=!1;const K="https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs";return(async()=>{try{L.current||(L.current=(await import(K)).default);const G=L.current;if(V)return;const he=O==="dark",Te=getComputedStyle(document.documentElement).getPropertyValue("--font-body").trim()||"sans-serif";G.initialize({startOnLoad:!1,theme:he?"dark":"default",fontFamily:Te,flowchart:{padding:15,nodeSpacing:30,rankSpacing:40}});for(let B=0;B<j.length;B++){const Oe=j[B],Je=Oe.getAttribute("data-mermaid");if(Je)try{const Me=atob(Je),{svg:Pe}=await G.render(`tome-mermaid-${B}-${Date.now()}`,Me);V||(Oe.innerHTML=Pe)}catch(Me){console.warn("[tome] Mermaid render failed:",Me),Oe.textContent="Diagram rendering failed",Oe.style.cssText="padding:16px;color:var(--txM);font-size:13px;border:1px dashed var(--bd);border-radius:2px;text-align:center;"}}}catch(G){console.warn("[tome] Failed to load mermaid from CDN:",G),j.forEach(he=>{he.textContent="Failed to load diagram renderer",he.style.cssText="padding:16px;color:var(--txM);font-size:13px;border:1px dashed var(--bd);border-radius:2px;text-align:center;"})}})(),()=>{V=!0}},[h,_,O]),H.useEffect(()=>{if(_)return;const j=document.querySelectorAll(".tome-content pre"),V=[];return j.forEach(K=>{if(K.querySelector(".tome-copy-btn"))return;const G=document.createElement("button");G.className="tome-copy-btn",G.textContent="Copy",G.addEventListener("click",async()=>{const he=K.querySelector("code");if(he)try{await navigator.clipboard.writeText(he.textContent||""),G.textContent="Copied!",setTimeout(()=>{G.textContent="Copy"},2e3)}catch{G.textContent="Failed",setTimeout(()=>{G.textContent="Copy"},2e3)}}),K.appendChild(G),V.push(G)}),()=>{V.forEach(K=>K.remove())}},[h,_]);const Z=Qn.map(j=>({id:j.id,title:j.frontmatter.title,description:j.frontmatter.description})),w=Qn.find(j=>j.id===d),W=dg(w,nm),P=sg(oi.editLink,w==null?void 0:w.filePath),ye=(w==null?void 0:w.locale)||(Zu==null?void 0:Zu.defaultLocale)||"en",ne="ltr";return H.useEffect(()=>{const j=document.querySelectorAll(".tome-math[data-math]").length>0;if(!oi.math&&!j)return;const V="tome-katex-css";if(document.getElementById(V))return;const K=document.createElement("link");K.id=V,K.rel="stylesheet",K.href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css",K.crossOrigin="anonymous",document.head.appendChild(K)},[h,_]),H.useEffect(()=>{const j=document.querySelectorAll(".tome-math[data-math]");if(j.length===0)return;let V=!1;const K="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.mjs";return(async()=>{try{const G=(await import(K)).default;if(V)return;for(const he of j){const Te=he.getAttribute("data-math");if(Te)try{const B=atob(Te),Oe=he.classList.contains("tome-math-block");G.render(B,he,{displayMode:Oe,throwOnError:!1})}catch(B){console.warn("[tome] KaTeX render failed:",B)}}}catch(G){console.warn("[tome] Failed to load KaTeX from CDN:",G)}})(),()=>{V=!0}},[h,_]),u.jsxs(u.Fragment,{children:[u.jsx("style",{children:Ug}),u.jsx(og,{config:oi,navigation:fg,currentPageId:d,pageHtml:h!=null&&h.isMdx?void 0:_?"":(h==null?void 0:h.html)||"<p>Page not found</p>",pageComponent:h!=null&&h.isMdx?h.component:void 0,mdxComponents:Rg,pageTitle:(h==null?void 0:h.frontmatter.title)||(_?"":"Not Found"),pageDescription:h==null?void 0:h.frontmatter.description,headings:(h==null?void 0:h.headings)||[],tocEnabled:(h==null?void 0:h.frontmatter.toc)!==!1,editUrl:P,lastUpdated:w==null?void 0:w.lastUpdated,changelogEntries:h!=null&&h.isMdx||h==null?void 0:h.changelogEntries,onNavigate:R,allPages:Z,docContext:pg,versioning:nm||void 0,currentVersion:W,basePath:Mo,isDraft:((oe=w==null?void 0:w.frontmatter)==null?void 0:oe.draft)===!0,dir:ne,i18n:void 0,currentLocale:ye,overrides:hg})]})}const im=document.getElementById("tome-root");im&&wh.createRoot(im).render(u.jsx(Hg,{}));export{H as a,om as e,u as j,Dh as r};
