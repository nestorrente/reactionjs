/*!
 * Reaction.js v0.1.2
 * https://github.com/nestorrente/reactionjs
 * 
 * Released under the MIT License.
 * 
 * Build date: 2020-03-18T20:25:49.101Z
 */
var Reaction=function(e){var t={};function n(r){if(t[r])return t[r].exports;var i=t[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(r,i,function(t){return e[t]}.bind(null,i));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([function(e,t){e.exports=EventBus},function(e,t,n){"use strict";n.r(t),n.d(t,"ref",(function(){return l})),n.d(t,"reactive",(function(){return d})),n.d(t,"watch",(function(){return g})),n.d(t,"computed",(function(){return _}));var r=Object.prototype.toString;function i(e){return"[object Object]"===r.apply(e)}var o=n(0),u=n.n(o),a=new(function(){function e(){this.eventBus=new u.a}return e.prototype.addReadListener=function(e){this.eventBus.on("read",e)},e.prototype.removeReadListener=function(e){this.eventBus.off("read",e)},e.prototype.triggerReadEvent=function(e,t,n){this.eventBus.trigger("read",e,t,n)},e.prototype.addInvalidateListener=function(e){this.eventBus.on("invalidate",e)},e.prototype.removeInvalidateListener=function(e){this.eventBus.off("invalidate",e)},e.prototype.triggerInvalidateEvent=function(e,t){this.eventBus.trigger("invalidate",e,t)},e.prototype.addChangeListener=function(e){this.eventBus.on("change",e)},e.prototype.removeChangeListener=function(e){this.eventBus.off("change",e)},e.prototype.triggerChangeEvent=function(e,t,n,r){this.eventBus.trigger("change",e,t,n,r)},e}());function c(e){return!!e.__ref__}function s(e){return!!e.__reactive_id__}function d(e){if(s(e))return e;if(!i(e))throw new Error("Cannot observe value:"+e);return v(e)}function f(e){return s(e)||c(e)?e:i(e)?v(e):function(e){return Array.isArray(e)}(e)?function(e){for(var t=0;t<e.length;++t)e[t]=f(e[t]);return e}(e):e}function v(e){var t=function(){var e={};return Object.defineProperty(e,"__reactive_id__",{value:!0}),e}();for(var n in e)if(e.hasOwnProperty(n)){p(t,n,e);var r=e[n];e[n]=f(r)}return t}function p(e,t,n){Object.defineProperty(e,t,{enumerable:!0,get:function(){var r=n[t];return a.triggerReadEvent(e,t,r),c(r)?r.value:r},set:function(r){var i=n[t],o=c(i),u=o?i.value:i;if(u!==r){var s=f(r);o?i.value=s:n[t]=s,a.triggerInvalidateEvent(e,t),a.triggerChangeEvent(e,t,s,u)}}})}function l(e){var t=d({value:e});return Object.defineProperty(t,"__ref__",{value:!0}),t}var h=new(function(){function e(){}return e.prototype.executeAndListenForDependencies=function(e){var t=[],n=this.createDependencyListener(t);a.addReadListener(n);var r=e();return a.removeReadListener(n),{dependencies:t,result:r}},e.prototype.createDependencyListener=function(e){return function(t,n){return e.push({object:t,propName:n})}},e}()),y=function(){function e(e,t){this.callback=e,this.options=t,this.dependencies=[],this.invalidated=!0,a.addInvalidateListener(this.dependencyInvalidationListener.bind(this))}return e.prototype.dependencyInvalidationListener=function(e,t){!this.invalidated&&this.isDependency(e,t)&&this.invalidate()},e.prototype.isDependency=function(e,t){return this.dependencies.some((function(n){return n.object===e&&n.propName===t}))},e.prototype.invalidate=function(){this.invalidated||(this.dependencies=[],this.invalidated=!0,this.onInvalidate())},e.prototype.onInvalidate=function(){(0,this.options.onInvalidate)(this)},e.prototype.getResult=function(){return this.invalidated&&this.recompute(),this.executionResult},e.prototype.recompute=function(){var e=h.executeAndListenForDependencies(this.callback),t=this.executionResult;this.dependencies=e.dependencies,this.executionResult=e.result,this.invalidated=!1,this.onRecompute(this.executionResult,t)},e.prototype.onRecompute=function(e,t){(0,this.options.onRecompute)(this,e,t)},e}();function g(e){var t=null;new y(e,{onInvalidate:function(e){null==t&&(t=setTimeout((function(){e.getResult()}),0))},onRecompute:function(e,n,r){t=null}}).getResult()}function _(e){var t=new y(e,{onInvalidate:function(e){a.triggerInvalidateEvent(n,"value")},onRecompute:function(e,t,r){t!==r&&a.triggerChangeEvent(n,"value",t,r)}}),n=function(e){var t={get value(){var t=e();return a.triggerReadEvent(this,"value",t),t},set value(e){throw new Error("Cannot modify the value of a readonly reference")}};return Object.defineProperty(t,"__ref__",{value:!0}),t}((function(){return t.getResult()}));return n}}]);
//# sourceMappingURL=reaction.js.map