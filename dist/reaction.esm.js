/*!
 * Reaction.js v0.2.0
 * https://github.com/nestorrente/reactionjs
 * 
 * Released under the MIT License.
 * 
 * Build date: 2020-03-19T15:16:21.350Z
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * EventBus v1.0.5
 * https://github.com/nestorrente/event-bus
 * 
 * Released under the MIT License.
 * 
 * Build date: 2020-03-19T12:08:01.489Z
 */
!function(e,t){if(true)module.exports=t();else { var n, r; }}(window,(function(){return function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=0)}([function(e,t,r){"use strict";r.r(t);var n=function(){function e(){this.listeners={}}return e.prototype.on=function(e,t){return this.listeners.hasOwnProperty(e)||(this.listeners[e]=[]),this.listeners[e].push(t),this},e.prototype.off=function(e,t){return this.listeners.hasOwnProperty(e)&&(void 0!==t?this.removeListener(e,t):this.removeAllListeners(e)),this},e.prototype.removeListener=function(e,t){var r=this.listeners[e].indexOf(t);-1!==r&&this.listeners[e].splice(r,1),this.removeListenersArrayIfEmpty(e)},e.prototype.removeListenersArrayIfEmpty=function(e){0===this.listeners[e].length&&this.removeAllListeners(e)},e.prototype.removeAllListeners=function(e){delete this.listeners[e]},e.prototype.once=function(e,t){var r=this,n=function(){for(var o=[],i=0;i<arguments.length;i++)o[i]=arguments[i];t.apply(void 0,o),r.off(e,n)};return this.on(e,n)},e.prototype.trigger=function(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];if(this.listeners.hasOwnProperty(e))for(var n=0,o=this.listeners[e];n<o.length;n++){var i=o[n];try{i.apply(void 0,t)}catch(e){console.error(e)}}return this},e}();t.default=n}])}));
//# sourceMappingURL=event-bus.esm.js.map

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "ref", function() { return /* reexport */ ref; });
__webpack_require__.d(__webpack_exports__, "reactive", function() { return /* reexport */ reactive; });
__webpack_require__.d(__webpack_exports__, "computed", function() { return /* reexport */ computed; });
__webpack_require__.d(__webpack_exports__, "watch", function() { return /* reexport */ watch; });
__webpack_require__.d(__webpack_exports__, "nextTick", function() { return /* reexport */ nextTick; });

// CONCATENATED MODULE: ./src/utils.ts
var _toString = Object.prototype.toString;
function isPlainObject(value) {
    return _toString.apply(value) === '[object Object]';
}
function isArray(value) {
    return Array.isArray(value);
}
var nextUniqueId = 1;
function uniqueId(prefix) {
    if (prefix === void 0) { prefix = ''; }
    return '' + prefix + (nextUniqueId++);
}

// EXTERNAL MODULE: ./node_modules/@nestorrente/event-bus/dist/event-bus.esm.js
var event_bus_esm = __webpack_require__(0);
var event_bus_esm_default = /*#__PURE__*/__webpack_require__.n(event_bus_esm);

// CONCATENATED MODULE: ./src/util/property-event-bus.ts

var property_event_bus_PropertyEventBus = /** @class */ (function () {
    function PropertyEventBus() {
        this.eventBus = new event_bus_esm_default.a();
    }
    PropertyEventBus.prototype.addReadListener = function (listener) {
        this.eventBus.on('read', listener);
    };
    PropertyEventBus.prototype.removeReadListener = function (listener) {
        this.eventBus.off('read', listener);
    };
    PropertyEventBus.prototype.triggerReadEvent = function (object, propName, value) {
        this.eventBus.trigger('read', object, propName, value);
    };
    PropertyEventBus.prototype.addInvalidateListener = function (listener) {
        this.eventBus.on('invalidate', listener);
    };
    PropertyEventBus.prototype.removeInvalidateListener = function (listener) {
        this.eventBus.off('invalidate', listener);
    };
    PropertyEventBus.prototype.triggerInvalidateEvent = function (object, propName) {
        this.eventBus.trigger('invalidate', object, propName);
    };
    PropertyEventBus.prototype.addChangeListener = function (listener) {
        this.eventBus.on('change', listener);
    };
    PropertyEventBus.prototype.removeChangeListener = function (listener) {
        this.eventBus.off('change', listener);
    };
    PropertyEventBus.prototype.triggerChangeEvent = function (object, propName, newValue, oldValue) {
        this.eventBus.trigger('change', object, propName, newValue, oldValue);
    };
    return PropertyEventBus;
}());

var propertyEventBus = new property_event_bus_PropertyEventBus();
/* harmony default export */ var property_event_bus = (propertyEventBus);

// CONCATENATED MODULE: ./src/util/Ref.ts
var REF_PROP_NAME = '__ref__';
function isRef(object) {
    return !!object[REF_PROP_NAME];
}

// CONCATENATED MODULE: ./src/util/ReactiveObject.ts
var REACTIVE_ID_PROP_NAME = '__reactive_id__';
function isReactive(object) {
    return !!object[REACTIVE_ID_PROP_NAME];
}

// CONCATENATED MODULE: ./src/methods/reactive.ts




function reactive(object) {
    if (isReactive(object)) {
        return object;
    }
    if (!isPlainObject(object)) {
        throw new Error('Cannot observe value:' + object);
    }
    return createReactiveObject(object);
}
function doMakeReactiveChain(value) {
    if (isReactive(value) || isRef(value)) {
        return value;
    }
    if (isPlainObject(value)) {
        return createReactiveObject(value);
    }
    if (isArray(value)) {
        return createReactiveArray(value);
    }
    return value;
}
function createReactiveObject(object) {
    var reactiveObject = createEmptyReactiveObject();
    for (var propName in object) {
        if (!object.hasOwnProperty(propName)) {
            continue;
        }
        proxifyProperty(reactiveObject, propName, object);
        var value = object[propName];
        object[propName] = doMakeReactiveChain(value);
    }
    return reactiveObject;
}
function createEmptyReactiveObject() {
    var object = {};
    Object.defineProperty(object, REACTIVE_ID_PROP_NAME, { value: true });
    return object;
}
function createReactiveArray(value) {
    for (var i = 0; i < value.length; ++i) {
        value[i] = doMakeReactiveChain(value[i]);
    }
    return value;
}
function proxifyProperty(reactiveObject, propName, originalObject) {
    Object.defineProperty(reactiveObject, propName, {
        enumerable: true,
        get: function () {
            var value = originalObject[propName];
            property_event_bus.triggerReadEvent(reactiveObject, propName, value);
            return isRef(value) ? value.value : value;
        },
        set: function (value) {
            var previousValueOrRef = originalObject[propName];
            var objectIsRef = isRef(previousValueOrRef);
            var previousValue = objectIsRef ? previousValueOrRef.value : previousValueOrRef;
            if (previousValue === value) {
                return;
            }
            var newValue = doMakeReactiveChain(value);
            if (objectIsRef) {
                previousValueOrRef.value = newValue;
            }
            else {
                originalObject[propName] = newValue;
            }
            property_event_bus.triggerInvalidateEvent(reactiveObject, propName);
            property_event_bus.triggerChangeEvent(reactiveObject, propName, newValue, previousValue);
        }
    });
}

// CONCATENATED MODULE: ./src/methods/ref.ts


function ref(value) {
    var refObject = reactive({
        value: value
    });
    Object.defineProperty(refObject, REF_PROP_NAME, { value: true });
    return refObject;
}

// CONCATENATED MODULE: ./src/util/callback-dependency-listener.ts

var callback_dependency_listener_CallbackDependencyListener = /** @class */ (function () {
    function CallbackDependencyListener() {
    }
    CallbackDependencyListener.prototype.executeAndListenForDependencies = function (callback) {
        var dependencies = [];
        var dependencyListener = this.createDependencyListener(dependencies);
        property_event_bus.addReadListener(dependencyListener);
        var result = callback();
        property_event_bus.removeReadListener(dependencyListener);
        return {
            dependencies: dependencies,
            result: result
        };
    };
    CallbackDependencyListener.prototype.createDependencyListener = function (dependencies) {
        return function (object, propName) {
            // FIXME evitar repetir dependencias
            return dependencies.push({
                object: object,
                propName: propName
            });
        };
    };
    return CallbackDependencyListener;
}());

var callbackDependencyListener = new callback_dependency_listener_CallbackDependencyListener();
/* harmony default export */ var callback_dependency_listener = (callbackDependencyListener);

// CONCATENATED MODULE: ./src/util/Watcher.ts


var Watcher_Watcher = /** @class */ (function () {
    function Watcher(callback, options) {
        this.callback = callback;
        this.options = options;
        this.dependencies = [];
        this.invalidated = true;
        property_event_bus.addInvalidateListener(this.dependencyInvalidationListener.bind(this));
    }
    Watcher.prototype.dependencyInvalidationListener = function (object, propName) {
        if (!this.invalidated && this.isDependency(object, propName)) {
            this.invalidate();
        }
    };
    Watcher.prototype.isDependency = function (object, propName) {
        return this.dependencies.some(function (dependency) {
            return dependency.object === object && dependency.propName === propName;
        });
    };
    Watcher.prototype.invalidate = function () {
        if (!this.invalidated) {
            this.dependencies = [];
            this.invalidated = true;
            this.onInvalidate();
        }
    };
    Watcher.prototype.onInvalidate = function () {
        var onInvalidate = this.options.onInvalidate;
        onInvalidate(this);
    };
    Watcher.prototype.getResult = function () {
        if (this.invalidated) {
            this.recompute();
        }
        return this.executionResult;
    };
    Watcher.prototype.recompute = function () {
        var callbackExecutionInfo = callback_dependency_listener.executeAndListenForDependencies(this.callback);
        var previousExecutionResult = this.executionResult;
        this.dependencies = callbackExecutionInfo.dependencies;
        this.executionResult = callbackExecutionInfo.result;
        this.invalidated = false;
        this.onRecompute(this.executionResult, previousExecutionResult);
    };
    Watcher.prototype.onRecompute = function (newExecutionResult, previousExecutionResult) {
        var onRecompute = this.options.onRecompute;
        onRecompute(this, newExecutionResult, previousExecutionResult);
    };
    return Watcher;
}());
/* harmony default export */ var util_Watcher = (Watcher_Watcher);

// CONCATENATED MODULE: ./src/methods/computed.ts



function computed(callback) {
    var options = {
        onInvalidate: function (watcher) {
            // console.log('Se invalida la computed');
            property_event_bus.triggerInvalidateEvent(refObject, 'value');
        },
        onRecompute: function (watcher, newExecutionResult, previousExecutionResult) {
            // console.log('Se ejecuta el cálculo de la computed');
            if (newExecutionResult !== previousExecutionResult) {
                property_event_bus.triggerChangeEvent(refObject, 'value', newExecutionResult, previousExecutionResult);
            }
        }
    };
    var watcherInstance = new util_Watcher(callback, options);
    var refObject = createReadonlyRef(function () {
        return watcherInstance.getResult();
    });
    return refObject;
}
function createReadonlyRef(getter) {
    var refObject = {
        get value() {
            var value = getter();
            property_event_bus.triggerReadEvent(this, 'value', value);
            return value;
        },
        set value(newValue) {
            throw new Error('Cannot modify the value of a readonly reference');
        }
    };
    Object.defineProperty(refObject, REF_PROP_NAME, { value: true });
    return refObject;
}

// CONCATENATED MODULE: ./src/methods/watch.ts

// TODO añadir la opción de un watch que reciba un callback de dependencias () => any / () => any[]
function watch(callback) {
    var recomputingTimeoutId = null;
    var options = {
        onInvalidate: function (watcher) {
            if (recomputingTimeoutId == null) {
                // Enqueue recomputing
                // TODO create a nextTick function that uses setImmediate()/setTimeout()
                recomputingTimeoutId = setTimeout(function () {
                    watcher.getResult();
                }, 0);
            }
        },
        onRecompute: function (watcher, newExecutionResult, previousExecutionResult) {
            recomputingTimeoutId = null;
        }
    };
    var watcherInstance = new util_Watcher(callback, options);
    // Force first execution
    watcherInstance.getResult();
}

// CONCATENATED MODULE: ./src/methods/nextTick.ts
function nextTick(callback) {
    setTimeout(callback, 0);
}

// CONCATENATED MODULE: ./src/methods/index.ts







// CONCATENATED MODULE: ./src/index.ts




/***/ })
/******/ ]);
});
//# sourceMappingURL=reaction.esm.js.map