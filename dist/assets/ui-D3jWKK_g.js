import"./react-Bz8UQmz5.js";import{j as Ee}from"./motion-CiGFDz8f.js";function Te(t,r){for(var o=0;o<r.length;o++){const l=r[o];if(typeof l!="string"&&!Array.isArray(l)){for(const i in l)if(i!=="default"&&!(i in t)){const u=Object.getOwnPropertyDescriptor(l,i);u&&Object.defineProperty(t,i,u.get?u:{enumerable:!0,get:()=>l[i]})}}}return Object.freeze(Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}))}function Ie(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var me={exports:{}},p={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var _e;function We(){if(_e)return p;_e=1;var t=Symbol.for("react.element"),r=Symbol.for("react.portal"),o=Symbol.for("react.fragment"),l=Symbol.for("react.strict_mode"),i=Symbol.for("react.profiler"),u=Symbol.for("react.provider"),h=Symbol.for("react.context"),x=Symbol.for("react.forward_ref"),R=Symbol.for("react.suspense"),T=Symbol.for("react.memo"),B=Symbol.for("react.lazy"),I=Symbol.iterator;function M(e){return e===null||typeof e!="object"?null:(e=I&&e[I]||e["@@iterator"],typeof e=="function"?e:null)}var N={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},C=Object.assign,$={};function A(e,n,f){this.props=e,this.context=n,this.refs=$,this.updater=f||N}A.prototype.isReactComponent={},A.prototype.setState=function(e,n){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,n,"setState")},A.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function v(){}v.prototype=A.prototype;function z(e,n,f){this.props=e,this.context=n,this.refs=$,this.updater=f||N}var ne=z.prototype=new v;ne.constructor=z,C(ne,A.prototype),ne.isPureReactComponent=!0;var le=Array.isArray,ie=Object.prototype.hasOwnProperty,re={current:null},ce={key:!0,ref:!0,__self:!0,__source:!0};function se(e,n,f){var y,d={},_=null,S=null;if(n!=null)for(y in n.ref!==void 0&&(S=n.ref),n.key!==void 0&&(_=""+n.key),n)ie.call(n,y)&&!ce.hasOwnProperty(y)&&(d[y]=n[y]);var k=arguments.length-2;if(k===1)d.children=f;else if(1<k){for(var b=Array(k),O=0;O<k;O++)b[O]=arguments[O+2];d.children=b}if(e&&e.defaultProps)for(y in k=e.defaultProps,k)d[y]===void 0&&(d[y]=k[y]);return{$$typeof:t,type:e,key:_,ref:S,props:d,_owner:re.current}}function E(e,n){return{$$typeof:t,type:e.type,key:n,ref:e.ref,props:e.props,_owner:e._owner}}function V(e){return typeof e=="object"&&e!==null&&e.$$typeof===t}function Y(e){var n={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(f){return n[f]})}var D=/\/+/g;function g(e,n){return typeof e=="object"&&e!==null&&e.key!=null?Y(""+e.key):n.toString(36)}function U(e,n,f,y,d){var _=typeof e;(_==="undefined"||_==="boolean")&&(e=null);var S=!1;if(e===null)S=!0;else switch(_){case"string":case"number":S=!0;break;case"object":switch(e.$$typeof){case t:case r:S=!0}}if(S)return S=e,d=d(S),e=y===""?"."+g(S,0):y,le(d)?(f="",e!=null&&(f=e.replace(D,"$&/")+"/"),U(d,n,f,"",function(O){return O})):d!=null&&(V(d)&&(d=E(d,f+(!d.key||S&&S.key===d.key?"":(""+d.key).replace(D,"$&/")+"/")+e)),n.push(d)),1;if(S=0,y=y===""?".":y+":",le(e))for(var k=0;k<e.length;k++){_=e[k];var b=y+g(_,k);S+=U(_,n,f,b,d)}else if(b=M(e),typeof b=="function")for(e=b.call(e),k=0;!(_=e.next()).done;)_=_.value,b=y+g(_,k++),S+=U(_,n,f,b,d);else if(_==="object")throw n=String(e),Error("Objects are not valid as a React child (found: "+(n==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":n)+"). If you meant to render a collection of children, use an array instead.");return S}function G(e,n,f){if(e==null)return e;var y=[],d=0;return U(e,y,"","",function(_){return n.call(f,_,d++)}),y}function oe(e){if(e._status===-1){var n=e._result;n=n(),n.then(function(f){(e._status===0||e._status===-1)&&(e._status=1,e._result=f)},function(f){(e._status===0||e._status===-1)&&(e._status=2,e._result=f)}),e._status===-1&&(e._status=0,e._result=n)}if(e._status===1)return e._result.default;throw e._result}var P={current:null},K={transition:null},J={ReactCurrentDispatcher:P,ReactCurrentBatchConfig:K,ReactCurrentOwner:re};function ae(){throw Error("act(...) is not supported in production builds of React.")}return p.Children={map:G,forEach:function(e,n,f){G(e,function(){n.apply(this,arguments)},f)},count:function(e){var n=0;return G(e,function(){n++}),n},toArray:function(e){return G(e,function(n){return n})||[]},only:function(e){if(!V(e))throw Error("React.Children.only expected to receive a single React element child.");return e}},p.Component=A,p.Fragment=o,p.Profiler=i,p.PureComponent=z,p.StrictMode=l,p.Suspense=R,p.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=J,p.act=ae,p.cloneElement=function(e,n,f){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var y=C({},e.props),d=e.key,_=e.ref,S=e._owner;if(n!=null){if(n.ref!==void 0&&(_=n.ref,S=re.current),n.key!==void 0&&(d=""+n.key),e.type&&e.type.defaultProps)var k=e.type.defaultProps;for(b in n)ie.call(n,b)&&!ce.hasOwnProperty(b)&&(y[b]=n[b]===void 0&&k!==void 0?k[b]:n[b])}var b=arguments.length-2;if(b===1)y.children=f;else if(1<b){k=Array(b);for(var O=0;O<b;O++)k[O]=arguments[O+2];y.children=k}return{$$typeof:t,type:e.type,key:d,ref:_,props:y,_owner:S}},p.createContext=function(e){return e={$$typeof:h,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:u,_context:e},e.Consumer=e},p.createElement=se,p.createFactory=function(e){var n=se.bind(null,e);return n.type=e,n},p.createRef=function(){return{current:null}},p.forwardRef=function(e){return{$$typeof:x,render:e}},p.isValidElement=V,p.lazy=function(e){return{$$typeof:B,_payload:{_status:-1,_result:e},_init:oe}},p.memo=function(e,n){return{$$typeof:T,type:e,compare:n===void 0?null:n}},p.startTransition=function(e){var n=K.transition;K.transition={};try{e()}finally{K.transition=n}},p.unstable_act=ae,p.useCallback=function(e,n){return P.current.useCallback(e,n)},p.useContext=function(e){return P.current.useContext(e)},p.useDebugValue=function(){},p.useDeferredValue=function(e){return P.current.useDeferredValue(e)},p.useEffect=function(e,n){return P.current.useEffect(e,n)},p.useId=function(){return P.current.useId()},p.useImperativeHandle=function(e,n,f){return P.current.useImperativeHandle(e,n,f)},p.useInsertionEffect=function(e,n){return P.current.useInsertionEffect(e,n)},p.useLayoutEffect=function(e,n){return P.current.useLayoutEffect(e,n)},p.useMemo=function(e,n){return P.current.useMemo(e,n)},p.useReducer=function(e,n,f){return P.current.useReducer(e,n,f)},p.useRef=function(e){return P.current.useRef(e)},p.useState=function(e){return P.current.useState(e)},p.useSyncExternalStore=function(e,n,f){return P.current.useSyncExternalStore(e,n,f)},p.useTransition=function(){return P.current.useTransition()},p.version="18.3.1",p}var ke;function He(){return ke||(ke=1,me.exports=We()),me.exports}var a=He();const Be=Ie(a),Ve=Te({__proto__:null,default:Be},[a]);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fe=t=>t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),xe=(...t)=>t.filter((r,o,l)=>!!r&&r.trim()!==""&&l.indexOf(r)===o).join(" ").trim();/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var ze={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qe=a.forwardRef(({color:t="currentColor",size:r=24,strokeWidth:o=2,absoluteStrokeWidth:l,className:i="",children:u,iconNode:h,...x},R)=>a.createElement("svg",{ref:R,...ze,width:r,height:r,stroke:t,strokeWidth:l?Number(o)*24/Number(r):o,className:xe("lucide",i),...x},[...h.map(([T,B])=>a.createElement(T,B)),...Array.isArray(u)?u:[u]]));/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const m=(t,r)=>{const o=a.forwardRef(({className:l,...i},u)=>a.createElement(qe,{ref:u,iconNode:r,className:xe(`lucide-${Fe(t)}`,l),...i}));return o.displayName=`${t}`,o};/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ue=[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]],Xt=m("ArrowLeft",Ue);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ge=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]],Yt=m("ArrowRight",Ge);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ze=[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]],Kt=m("Check",Ze);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xe=[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]],Jt=m("ChevronRight",Xe);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ye=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polyline",{points:"12 6 12 12 16 14",key:"68esgv"}]],Qt=m("Clock",Ye);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ke=[["line",{x1:"12",x2:"12",y1:"2",y2:"22",key:"7eqyqh"}],["path",{d:"M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",key:"1b0p4s"}]],en=m("DollarSign",Ke);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Je=[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",key:"1nclc0"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]],tn=m("Eye",Je);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qe=[["path",{d:"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",key:"c3ymky"}]],nn=m("Heart",Qe);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const et=[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]],rn=m("LoaderCircle",et);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const tt=[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]],on=m("Lock",tt);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const nt=[["path",{d:"M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4",key:"u53s6r"}],["polyline",{points:"10 17 15 12 10 7",key:"1ail0h"}],["line",{x1:"15",x2:"3",y1:"12",y2:"12",key:"v6grx8"}]],an=m("LogIn",nt);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const rt=[["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}],["polyline",{points:"16 17 21 12 16 7",key:"1gabdz"}],["line",{x1:"21",x2:"9",y1:"12",y2:"12",key:"1uyos4"}]],ln=m("LogOut",rt);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ot=[["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2",key:"18n3k1"}],["path",{d:"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7",key:"1ocrg3"}]],un=m("Mail",ot);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const at=[["line",{x1:"4",x2:"20",y1:"12",y2:"12",key:"1e0a9i"}],["line",{x1:"4",x2:"20",y1:"6",y2:"6",key:"1owob3"}],["line",{x1:"4",x2:"20",y1:"18",y2:"18",key:"yk5zj1"}]],cn=m("Menu",at);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const lt=[["path",{d:"M5 12h14",key:"1ays0h"}]],sn=m("Minus",lt);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const it=[["path",{d:"M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z",key:"1a0edw"}],["path",{d:"M12 22V12",key:"d0xqtd"}],["polyline",{points:"3.29 7 12 12 20.71 7",key:"ousv84"}],["path",{d:"m7.5 4.27 9 5.15",key:"1c824w"}]],pn=m("Package",it);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ut=[["path",{d:"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",key:"1a8usu"}],["path",{d:"m15 5 4 4",key:"1mk7zo"}]],fn=m("Pencil",ut);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ct=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]],dn=m("Plus",ct);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const st=[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}]],yn=m("Shield",st);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pt=[["path",{d:"M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z",key:"hou9p0"}],["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M16 10a4 4 0 0 1-8 0",key:"1ltviw"}]],hn=m("ShoppingBag",pt);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ft=[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]],mn=m("Trash2",ft);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const dt=[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"17 8 12 3 7 8",key:"t8dd8p"}],["line",{x1:"12",x2:"12",y1:"3",y2:"15",key:"widbto"}]],vn=m("Upload",dt);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yt=[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["line",{x1:"19",x2:"19",y1:"8",y2:"14",key:"1bvyxn"}],["line",{x1:"22",x2:"16",y1:"11",y2:"11",key:"1shjgl"}]],gn=m("UserPlus",yt);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ht=[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]],_n=m("User",ht);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mt=[["circle",{cx:"12",cy:"12",r:"6",key:"1vlfrh"}],["polyline",{points:"12 10 12 12 13 13",key:"19dquz"}],["path",{d:"m16.13 7.66-.81-4.05a2 2 0 0 0-2-1.61h-2.68a2 2 0 0 0-2 1.61l-.78 4.05",key:"18k57s"}],["path",{d:"m7.88 16.36.8 4a2 2 0 0 0 2 1.61h2.72a2 2 0 0 0 2-1.61l.81-4.05",key:"16ny36"}]],kn=m("Watch",mt);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vt=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],bn=m("X",vt);function be(t,r){if(typeof t=="function")return t(r);t!=null&&(t.current=r)}function gt(...t){return r=>{let o=!1;const l=t.map(i=>{const u=be(i,r);return!o&&typeof u=="function"&&(o=!0),u});if(o)return()=>{for(let i=0;i<l.length;i++){const u=l[i];typeof u=="function"?u():be(t[i],null)}}}}function _t(...t){return a.useCallback(gt(...t),t)}function Ce(t){const r=a.forwardRef((o,l)=>{let{children:i,...u}=o,h=null,x=!1;const R=[];we(i)&&typeof fe=="function"&&(i=fe(i._payload)),a.Children.forEach(i,M=>{var N;if(Et(M)){x=!0;const C=M;let $="child"in C.props?C.props.child:C.props.children;we($)&&typeof fe=="function"&&($=fe($._payload)),h=bt(C,$),R.push((N=h==null?void 0:h.props)==null?void 0:N.children)}else R.push(M)}),h?h=a.cloneElement(h,void 0,R):!x&&a.Children.count(i)===1&&a.isValidElement(i)&&(h=i);const T=h?St(h):void 0,B=_t(l,T);if(!h){if(i||i===0)throw new Error(x?Mt(t):Rt(t));return i}const I=wt(u,h.props??{});return h.type!==a.Fragment&&(I.ref=l?B:T),a.cloneElement(h,I)});return r.displayName=`${t}.Slot`,r}var wn=Ce("Slot"),kt=Symbol.for("radix.slottable"),bt=(t,r)=>{if("child"in t.props){const o=t.props.child;return a.isValidElement(o)?a.cloneElement(o,void 0,t.props.children(o.props.children)):null}return a.isValidElement(r)?r:null};function wt(t,r){const o={...r};for(const l in r){const i=t[l],u=r[l];/^on[A-Z]/.test(l)?i&&u?o[l]=(...x)=>{const R=u(...x);return i(...x),R}:i&&(o[l]=i):l==="style"?o[l]={...i,...u}:l==="className"&&(o[l]=[i,u].filter(Boolean).join(" "))}return{...t,...o}}function St(t){var l,i;let r=(l=Object.getOwnPropertyDescriptor(t.props,"ref"))==null?void 0:l.get,o=r&&"isReactWarning"in r&&r.isReactWarning;return o?t.ref:(r=(i=Object.getOwnPropertyDescriptor(t,"ref"))==null?void 0:i.get,o=r&&"isReactWarning"in r&&r.isReactWarning,o?t.props.ref:t.props.ref||t.ref)}function Et(t){return a.isValidElement(t)&&typeof t.type=="function"&&"__radixId"in t.type&&t.type.__radixId===kt}var xt=Symbol.for("react.lazy");function we(t){return t!=null&&typeof t=="object"&&"$$typeof"in t&&t.$$typeof===xt&&"_payload"in t&&Ct(t._payload)}function Ct(t){return typeof t=="object"&&t!==null&&"then"in t}var Rt=t=>`${t} failed to slot onto its children. Expected a single React element child or \`Slottable\`.`,Mt=t=>`${t} failed to slot onto its \`Slottable\`. Expected \`Slottable\` to receive a single React element child.`,fe=Ve[" use ".trim().toString()],Pt=["a","button","div","form","h2","h3","img","input","label","li","nav","ol","p","select","span","svg","ul"],$t=Pt.reduce((t,r)=>{const o=Ce(`Primitive.${r}`),l=a.forwardRef((i,u)=>{const{asChild:h,...x}=i,R=h?o:r;return typeof window<"u"&&(window[Symbol.for("radix-ui")]=!0),Ee.jsx(R,{...x,ref:u})});return l.displayName=`Primitive.${r}`,{...t,[r]:l}},{}),jt="Label",Re=a.forwardRef((t,r)=>Ee.jsx($t.label,{...t,ref:r,onMouseDown:o=>{var i;o.target.closest("button, input, select, textarea")||((i=t.onMouseDown)==null||i.call(t,o),!o.defaultPrevented&&o.detail>1&&o.preventDefault())}}));Re.displayName=jt;var Sn=Re,Nt=Object.defineProperty,Ot=Object.defineProperties,At=Object.getOwnPropertyDescriptors,de=Object.getOwnPropertySymbols,Me=Object.prototype.hasOwnProperty,Pe=Object.prototype.propertyIsEnumerable,Se=(t,r,o)=>r in t?Nt(t,r,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[r]=o,Dt=(t,r)=>{for(var o in r||(r={}))Me.call(r,o)&&Se(t,o,r[o]);if(de)for(var o of de(r))Pe.call(r,o)&&Se(t,o,r[o]);return t},Lt=(t,r)=>Ot(t,At(r)),Tt=(t,r)=>{var o={};for(var l in t)Me.call(t,l)&&r.indexOf(l)<0&&(o[l]=t[l]);if(t!=null&&de)for(var l of de(t))r.indexOf(l)<0&&Pe.call(t,l)&&(o[l]=t[l]);return o};function It(t){let r=setTimeout(t,0),o=setTimeout(t,10),l=setTimeout(t,50);return[r,o,l]}function Wt(t){let r=a.useRef();return a.useEffect(()=>{r.current=t}),r.current}var Ht=18,$e=40,Bt=`${$e}px`,Vt=["[data-lastpass-icon-root]","com-1password-button","[data-dashlanecreated]",'[style$="2147483647 !important;"]'].join(",");function Ft({containerRef:t,inputRef:r,pushPasswordManagerStrategy:o,isFocused:l}){let[i,u]=a.useState(!1),[h,x]=a.useState(!1),[R,T]=a.useState(!1),B=a.useMemo(()=>o==="none"?!1:(o==="increase-width"||o==="experimental-no-flickering")&&i&&h,[i,h,o]),I=a.useCallback(()=>{let M=t.current,N=r.current;if(!M||!N||R||o==="none")return;let C=M,$=C.getBoundingClientRect().left+C.offsetWidth,A=C.getBoundingClientRect().top+C.offsetHeight/2,v=$-Ht,z=A;document.querySelectorAll(Vt).length===0&&document.elementFromPoint(v,z)===M||(u(!0),T(!0))},[t,r,R,o]);return a.useEffect(()=>{let M=t.current;if(!M||o==="none")return;function N(){let $=window.innerWidth-M.getBoundingClientRect().right;x($>=$e)}N();let C=setInterval(N,1e3);return()=>{clearInterval(C)}},[t,o]),a.useEffect(()=>{let M=l||document.activeElement===r.current;if(o==="none"||!M)return;let N=setTimeout(I,0),C=setTimeout(I,2e3),$=setTimeout(I,5e3),A=setTimeout(()=>{T(!0)},6e3);return()=>{clearTimeout(N),clearTimeout(C),clearTimeout($),clearTimeout(A)}},[r,l,o,I]),{hasPWMBadge:i,willPushPWMBadge:B,PWM_BADGE_SPACE_WIDTH:Bt}}var zt=a.createContext({}),qt=a.forwardRef((t,r)=>{var o=t,{value:l,onChange:i,maxLength:u,textAlign:h="left",pattern:x,placeholder:R,inputMode:T="numeric",onComplete:B,pushPasswordManagerStrategy:I="increase-width",pasteTransformer:M,containerClassName:N,noScriptCSSFallback:C=Ut,render:$,children:A}=o,v=Tt(o,["value","onChange","maxLength","textAlign","pattern","placeholder","inputMode","onComplete","pushPasswordManagerStrategy","pasteTransformer","containerClassName","noScriptCSSFallback","render","children"]),z,ne,le,ie,re;let[ce,se]=a.useState(typeof v.defaultValue=="string"?v.defaultValue:""),E=l??ce,V=Wt(E),Y=a.useCallback(c=>{i==null||i(c),se(c)},[i]),D=a.useMemo(()=>x?typeof x=="string"?new RegExp(x):x:null,[x]),g=a.useRef(null),U=a.useRef(null),G=a.useRef({value:E,onChange:Y,isIOS:typeof window<"u"&&((ne=(z=window==null?void 0:window.CSS)==null?void 0:z.supports)==null?void 0:ne.call(z,"-webkit-touch-callout","none"))}),oe=a.useRef({prev:[(le=g.current)==null?void 0:le.selectionStart,(ie=g.current)==null?void 0:ie.selectionEnd,(re=g.current)==null?void 0:re.selectionDirection]});a.useImperativeHandle(r,()=>g.current,[]),a.useEffect(()=>{let c=g.current,s=U.current;if(!c||!s)return;G.current.value!==c.value&&G.current.onChange(c.value),oe.current.prev=[c.selectionStart,c.selectionEnd,c.selectionDirection];function j(){if(document.activeElement!==c){n(null),y(null);return}let w=c.selectionStart,L=c.selectionEnd,pe=c.selectionDirection,F=c.maxLength,Q=c.value,q=oe.current.prev,Z=-1,X=-1,ee;if(Q.length!==0&&w!==null&&L!==null){let Ae=w===L,De=w===Q.length&&Q.length<F;if(Ae&&!De){let te=w;if(te===0)Z=0,X=1,ee="forward";else if(te===F)Z=te-1,X=te,ee="backward";else if(F>1&&Q.length>1){let he=0;if(q[0]!==null&&q[1]!==null){ee=te<q[1]?"backward":"forward";let Le=q[0]===q[1]&&q[0]<F;ee==="backward"&&!Le&&(he=-1)}Z=he+te,X=he+te+1}}Z!==-1&&X!==-1&&Z!==X&&g.current.setSelectionRange(Z,X,ee)}let ve=Z!==-1?Z:w,ge=X!==-1?X:L,Oe=ee??pe;n(ve),y(ge),oe.current.prev=[ve,ge,Oe]}if(document.addEventListener("selectionchange",j,{capture:!0}),j(),document.activeElement===c&&ae(!0),!document.getElementById("input-otp-style")){let w=document.createElement("style");if(w.id="input-otp-style",document.head.appendChild(w),w.sheet){let L="background: transparent !important; color: transparent !important; border-color: transparent !important; opacity: 0 !important; box-shadow: none !important; -webkit-box-shadow: none !important; -webkit-text-fill-color: transparent !important;";ue(w.sheet,"[data-input-otp]::selection { background: transparent !important; color: transparent !important; }"),ue(w.sheet,`[data-input-otp]:autofill { ${L} }`),ue(w.sheet,`[data-input-otp]:-webkit-autofill { ${L} }`),ue(w.sheet,"@supports (-webkit-touch-callout: none) { [data-input-otp] { letter-spacing: -.6em !important; font-weight: 100 !important; font-stretch: ultra-condensed; font-optical-sizing: none !important; left: -1px !important; right: 1px !important; } }"),ue(w.sheet,"[data-input-otp] + * { pointer-events: all !important; }")}}let W=()=>{s&&s.style.setProperty("--root-height",`${c.clientHeight}px`)};W();let H=new ResizeObserver(W);return H.observe(c),()=>{document.removeEventListener("selectionchange",j,{capture:!0}),H.disconnect()}},[]);let[P,K]=a.useState(!1),[J,ae]=a.useState(!1),[e,n]=a.useState(null),[f,y]=a.useState(null);a.useEffect(()=>{It(()=>{var c,s,j,W;(c=g.current)==null||c.dispatchEvent(new Event("input"));let H=(s=g.current)==null?void 0:s.selectionStart,w=(j=g.current)==null?void 0:j.selectionEnd,L=(W=g.current)==null?void 0:W.selectionDirection;H!==null&&w!==null&&(n(H),y(w),oe.current.prev=[H,w,L])})},[E,J]),a.useEffect(()=>{V!==void 0&&E!==V&&V.length<u&&E.length===u&&(B==null||B(E))},[u,B,V,E]);let d=Ft({containerRef:U,inputRef:g,pushPasswordManagerStrategy:I,isFocused:J}),_=a.useCallback(c=>{let s=c.currentTarget.value.slice(0,u);if(s.length>0&&D&&!D.test(s)){c.preventDefault();return}typeof V=="string"&&s.length<V.length&&document.dispatchEvent(new Event("selectionchange")),Y(s)},[u,Y,V,D]),S=a.useCallback(()=>{var c;if(g.current){let s=Math.min(g.current.value.length,u-1),j=g.current.value.length;(c=g.current)==null||c.setSelectionRange(s,j),n(s),y(j)}ae(!0)},[u]),k=a.useCallback(c=>{var s,j;let W=g.current;if(!M&&(!G.current.isIOS||!c.clipboardData||!W))return;let H=c.clipboardData.getData("text/plain"),w=M?M(H):H;c.preventDefault();let L=(s=g.current)==null?void 0:s.selectionStart,pe=(j=g.current)==null?void 0:j.selectionEnd,F=(L!==pe?E.slice(0,L)+w+E.slice(pe):E.slice(0,L)+w+E.slice(L)).slice(0,u);if(F.length>0&&D&&!D.test(F))return;W.value=F,Y(F);let Q=Math.min(F.length,u-1),q=F.length;W.setSelectionRange(Q,q),n(Q),y(q)},[u,Y,D,E]),b=a.useMemo(()=>({position:"relative",cursor:v.disabled?"default":"text",userSelect:"none",WebkitUserSelect:"none",pointerEvents:"none"}),[v.disabled]),O=a.useMemo(()=>({position:"absolute",inset:0,width:d.willPushPWMBadge?`calc(100% + ${d.PWM_BADGE_SPACE_WIDTH})`:"100%",clipPath:d.willPushPWMBadge?`inset(0 ${d.PWM_BADGE_SPACE_WIDTH} 0 0)`:void 0,height:"100%",display:"flex",textAlign:h,opacity:"1",color:"transparent",pointerEvents:"all",background:"transparent",caretColor:"transparent",border:"0 solid transparent",outline:"0 solid transparent",boxShadow:"none",lineHeight:"1",letterSpacing:"-.5em",fontSize:"var(--root-height)",fontFamily:"monospace",fontVariantNumeric:"tabular-nums"}),[d.PWM_BADGE_SPACE_WIDTH,d.willPushPWMBadge,h]),je=a.useMemo(()=>a.createElement("input",Lt(Dt({autoComplete:v.autoComplete||"one-time-code"},v),{"data-input-otp":!0,"data-input-otp-placeholder-shown":E.length===0||void 0,"data-input-otp-mss":e,"data-input-otp-mse":f,inputMode:T,pattern:D==null?void 0:D.source,"aria-placeholder":R,style:O,maxLength:u,value:E,ref:g,onPaste:c=>{var s;k(c),(s=v.onPaste)==null||s.call(v,c)},onChange:_,onMouseOver:c=>{var s;K(!0),(s=v.onMouseOver)==null||s.call(v,c)},onMouseLeave:c=>{var s;K(!1),(s=v.onMouseLeave)==null||s.call(v,c)},onFocus:c=>{var s;S(),(s=v.onFocus)==null||s.call(v,c)},onBlur:c=>{var s;ae(!1),(s=v.onBlur)==null||s.call(v,c)}})),[_,S,k,T,O,u,f,e,v,D==null?void 0:D.source,E]),ye=a.useMemo(()=>({slots:Array.from({length:u}).map((c,s)=>{var j;let W=J&&e!==null&&f!==null&&(e===f&&s===e||s>=e&&s<f),H=E[s]!==void 0?E[s]:null,w=E[0]!==void 0?null:(j=R==null?void 0:R[s])!=null?j:null;return{char:H,placeholderChar:w,isActive:W,hasFakeCaret:W&&H===null}}),isFocused:J,isHovering:!v.disabled&&P}),[J,P,u,f,e,v.disabled,E]),Ne=a.useMemo(()=>$?$(ye):a.createElement(zt.Provider,{value:ye},A),[A,ye,$]);return a.createElement(a.Fragment,null,C!==null&&a.createElement("noscript",null,a.createElement("style",null,C)),a.createElement("div",{ref:U,"data-input-otp-container":!0,style:b,className:N},Ne,a.createElement("div",{style:{position:"absolute",inset:0,pointerEvents:"none"}},je)))});qt.displayName="Input";function ue(t,r){try{t.insertRule(r)}catch{console.error("input-otp could not insert CSS rule:",r)}}var Ut=`
[data-input-otp] {
  --nojs-bg: white !important;
  --nojs-fg: black !important;

  background-color: var(--nojs-bg) !important;
  color: var(--nojs-fg) !important;
  caret-color: var(--nojs-fg) !important;
  letter-spacing: .25em !important;
  text-align: center !important;
  border: 1px solid var(--nojs-fg) !important;
  border-radius: 4px !important;
  width: 100% !important;
}
@media (prefers-color-scheme: dark) {
  [data-input-otp] {
    --nojs-bg: black !important;
    --nojs-fg: white !important;
  }
}`;export{Yt as A,Kt as C,en as D,tn as E,nn as H,ln as L,cn as M,dn as P,Ve as R,hn as S,mn as T,_n as U,kn as W,bn as X,a,sn as b,Be as c,Xt as d,yn as e,pn as f,Ie as g,Qt as h,Jt as i,vn as j,fn as k,an as l,un as m,on as n,rn as o,qt as p,zt as q,He as r,gn as s,wn as t,Sn as u};
