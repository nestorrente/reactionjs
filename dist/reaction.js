/*!
 * @license
 * Reaction.js v0.4.1
 * https://github.com/nestorrente/reactionjs
 * 
 * Released under the MIT License.
 * 
 * Build date: 2020-08-18T21:58:16.489Z
 */
var Reaction=function(n){var r={};function i(t){if(r[t])return r[t].exports;var e=r[t]={i:t,l:!1,exports:{}};return n[t].call(e.exports,e,e.exports,i),e.l=!0,e.exports}return i.m=n,i.c=r,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(n,r,function(t){return e[t]}.bind(null,r));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=1)}([function(t,e){t.exports=EventBus},function(t,e,n){"use strict";n.r(e),n.d(e,"ref",function(){return g}),n.d(e,"reactive",function(){return d}),n.d(e,"computed",function(){return j}),n.d(e,"watch",function(){return D}),n.d(e,"watchEffect",function(){return T}),n.d(e,"nextTick",function(){return I});var r=Object.prototype.toString;function i(t){return null!=t&&"object"==typeof t&&"[object Object]"===r.apply(t)}var o=n(0),a=n.n(o);function c(){this.eventBus=new a.a}var u=new(c.prototype.addReadListener=function(t){this.eventBus.on("read",t)},c.prototype.removeReadListener=function(t){this.eventBus.off("read",t)},c.prototype.triggerReadEvent=function(t,e,n){this.eventBus.trigger("read",t,e,n)},c.prototype.addInvalidateListener=function(t){this.eventBus.on("invalidate",t)},c.prototype.removeInvalidateListener=function(t){this.eventBus.off("invalidate",t)},c.prototype.triggerInvalidateEvent=function(t,e){this.eventBus.trigger("invalidate",t,e)},c.prototype.addChangeListener=function(t){this.eventBus.on("change",t)},c.prototype.removeChangeListener=function(t){this.eventBus.off("change",t)},c.prototype.triggerChangeEvent=function(t,e,n,r){this.eventBus.trigger("change",t,e,n,r)},c),s="__ref__";function l(t){return null!=t&&"object"==typeof t&&!!t[s]}var p="__reactive_id__";function f(t){return null!=t&&"object"==typeof t&&t[p]}function d(t){if(f(t))return t;if(!i(t))throw new Error("Cannot observe value:"+t);return h(t)}function v(t){return null==t||"object"!=typeof t||f(t)||l(t)?t:i(t)?h(t):Array.isArray(t)?function(t){for(var e=0;e<t.length;++e)t[e]=v(t[e]);return t}(t):t}function h(t){var e,n=(e={},Object.defineProperty(e,p,{value:!0}),e);for(var r in t)if(t.hasOwnProperty(r)){y(n,r,t);var i=t[r];t[r]=v(i)}return n}function y(o,a,c){Object.defineProperty(o,a,{enumerable:!0,get:function(){var t=c[a];return u.triggerReadEvent(o,a,t),l(t)?t.value:t},set:function(t){var e=c[a],n=l(e),r=n?e.value:e;if(r!==t){var i=v(t);n?e.value=i:c[a]=i,u.triggerInvalidateEvent(o,a),u.triggerChangeEvent(o,a,i,r)}}})}function g(t){if(l(t))return t;var e=d({value:t});return Object.defineProperty(e,s,{value:!0}),e}function b(){}var R=new(b.prototype.executeAndListenForDependencies=function(t){var e=[],n=this.createDependencyListener(e);u.addReadListener(n);var r=t();return u.removeReadListener(n),{dependencies:e,result:r}},b.prototype.createDependencyListener=function(n){return function(t,e){return n.push({object:t,propName:e})}},b);function _(t,e){var n;this.callback="function"!=typeof(n=t)?function(){return n.value}:n,this.options=e,this.dependencies=[],this.invalidated=!0,this.dependencyInvalidationListener=this.dependencyInvalidationListener.bind(this),u.addInvalidateListener(this.dependencyInvalidationListener)}var m=(_.prototype.dependencyInvalidationListener=function(t,e){!this.invalidated&&this.isDependency(t,e)&&this.invalidate()},_.prototype.isDependency=function(e,n){return this.dependencies.some(function(t){return t.object===e&&t.propName===n})},_.prototype.stop=function(){u.removeInvalidateListener(this.dependencyInvalidationListener),this.invalidate()},_.prototype.invalidate=function(){this.invalidated||(this.dependencies=[],this.invalidated=!0,this.onInvalidate())},_.prototype.onInvalidate=function(){(0,this.options.onInvalidate)()},_.prototype.getResult=function(){return this.invalidated&&this.recompute(),this.executionResult},_.prototype.recompute=function(){var t=R.executeAndListenForDependencies(this.callback),e=this.executionResult;this.dependencies=t.dependencies,this.executionResult=t.result,this.invalidated=!1,this.onRecompute(this.executionResult,e)},_.prototype.onRecompute=function(t,e){(0,this.options.onRecompute)(t,e)},_);function j(t){var e,n,r=new m(t,{onInvalidate:function(){u.triggerInvalidateEvent(i,"value")},onRecompute:function(t,e){t!==e&&u.triggerChangeEvent(i,"value",t,e)}}),i=(e=function(){return r.getResult()},n={get value(){var t=e();return u.triggerReadEvent(this,"value",t),t},set value(t){throw new Error("Cannot modify the value of a readonly reference")}},Object.defineProperty(n,s,{value:!0}),n);return i}function k(){this.callback=null}var w=(k.prototype.registerCallback=function(t){this.callback=t},k.prototype.execute=function(){this.callback&&(this.callback(),this.callback=null)},k);function I(t){setTimeout(t,0)}function O(){this.cleanupCallbackRegister=new w,this.invalidated=!1,this.stopped=!1}var x,C,L=(O.prototype.init=function(){this.watcherInstance=this.createWatcher(),this.afterWatcherCreation(this.watcherInstance)},O.prototype.createWatcher=function(){var t=this;return new m(this.getWatcherSource(),{onInvalidate:function(){t.invalidated||t.stopped||(I(function(){t.stopped||t.onNextTickAfterWatcherInvalidate(t.watcherInstance)}),t.invalidated=!0)},onRecompute:function(){t.invalidated=!1}})},O.prototype.stop=function(){this.stopped||(this.stopped=!0,this.cleanupCallbackRegister.execute(),this.watcherInstance.stop())},O);function P(t){var e=C.call(this)||this;return e.callback=t,e}var E,B,W=((x=function(t,e){return(x=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}x(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)})(P,C=L),P.prototype.getWatcherSource=function(){var e=this;return function(){return e.callback(function(t){e.cleanupCallbackRegister.registerCallback(t)})}},P.prototype.onNextTickAfterWatcherInvalidate=function(t){this.cleanupCallbackRegister.execute(),t.getResult()},P.prototype.afterWatcherCreation=function(t){t.getResult()},P);function A(t,e){var n=B.call(this)||this;return n.source=t,n.callback=e,n}var S=((E=function(t,e){return(E=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}E(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)})(A,B=L),A.prototype.getWatcherSource=function(){return this.source},A.prototype.onNextTickAfterWatcherInvalidate=function(t){var e=this,n=t.getResult();this.lastResult!==n?(this.cleanupCallbackRegister.execute(),this.callback(n,this.lastResult,function(t){e.cleanupCallbackRegister.registerCallback(t)}),this.lastResult=n):this.invalidated=!1},A.prototype.afterWatcherCreation=function(t){this.lastResult=t.getResult()},A);function T(t){var e=new W(t);return e.init(),function(){return e.stop()}}function D(t,e){var n=new S(t,e);return n.init(),function(){return n.stop()}}}]);