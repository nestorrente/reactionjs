var Reaction = (function () {
    var defines = {};
    var entry = [null];
    function define(name, dependencies, factory) {
        defines[name] = { dependencies: dependencies, factory: factory };
        entry[0] = name;
    }
    define("require", ["exports"], function (exports) {
        Object.defineProperty(exports, "__cjsModule", { value: true });
        Object.defineProperty(exports, "default", { value: function (name) { return resolve(name); } });
    });
    var __importDefault = (this && this.__importDefault) || function (mod) {
        return (mod && mod.__esModule) ? mod : { "default": mod };
    };
    define("EventBus", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        var EventBus = /** @class */ (function () {
            function EventBus() {
                this.listeners = {};
            }
            EventBus.prototype.on = function (event, listener) {
                if (!this.listeners.hasOwnProperty(event)) {
                    this.listeners[event] = [];
                }
                this.listeners[event].push(listener);
                return this;
            };
            EventBus.prototype.off = function (event, listener) {
                if (this.listeners.hasOwnProperty(event)) {
                    if (listener === undefined) {
                        this.removeAllListeners(event);
                    }
                    else {
                        this.removeListener(event, listener);
                    }
                }
                return this;
            };
            EventBus.prototype.removeListener = function (event, listener) {
                var index = this.listeners[event].indexOf(listener);
                if (index !== -1) {
                    this.listeners[event].splice(index, 1);
                }
                this.removeListenersArrayIfEmpty(event);
            };
            EventBus.prototype.removeAllListeners = function (event) {
                delete this.listeners[event];
            };
            EventBus.prototype.removeListenersArrayIfEmpty = function (event) {
                if (this.listeners[event].length === 0) {
                    this.removeAllListeners(event);
                }
            };
            EventBus.prototype.once = function (event, listener) {
                var _this = this;
                var onceListener = function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    listener.apply(void 0, args);
                    _this.off(event, onceListener);
                };
                return this.on(event, onceListener);
            };
            EventBus.prototype.trigger = function (event) {
                var eventParameters = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    eventParameters[_i - 1] = arguments[_i];
                }
                if (this.listeners.hasOwnProperty(event)) {
                    for (var _a = 0, _b = this.listeners[event]; _a < _b.length; _a++) {
                        var listener = _b[_a];
                        try {
                            listener.apply(void 0, eventParameters);
                        }
                        catch (e) {
                            console.error(e);
                        }
                    }
                }
                return this;
            };
            return EventBus;
        }());
        exports.default = EventBus;
    });
    define("property-event-bus", ["require", "exports", "EventBus"], function (require, exports, EventBus_1) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        EventBus_1 = __importDefault(EventBus_1);
        var PropertyEventBus = /** @class */ (function () {
            function PropertyEventBus() {
                this.eventBus = new EventBus_1.default();
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
        exports.PropertyEventBus = PropertyEventBus;
        exports.propertyEventBus = new PropertyEventBus();
    });
    define("CallbackDependencyListener", ["require", "exports", "property-event-bus"], function (require, exports, property_event_bus_1) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        var CallbackDependencyListener = /** @class */ (function () {
            function CallbackDependencyListener() {
            }
            CallbackDependencyListener.prototype.executeAndListenForDependencies = function (callback) {
                var dependencies = [];
                var dependencyListener = this.createDependencyListener(dependencies);
                property_event_bus_1.propertyEventBus.addReadListener(dependencyListener);
                var result = callback();
                property_event_bus_1.propertyEventBus.removeReadListener(dependencyListener);
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
        exports.CallbackDependencyListener = CallbackDependencyListener;
        var callbackDependencyListener = new CallbackDependencyListener();
        exports.default = callbackDependencyListener;
    });
    define("utils", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        var _toString = Object.prototype.toString;
        function isPlainObject(value) {
            return _toString.apply(value) === '[object Object]';
        }
        exports.isPlainObject = isPlainObject;
        function isArray(value) {
            return Array.isArray(value);
        }
        exports.isArray = isArray;
        var nextUniqueId = 1;
        function uniqueId(prefix) {
            if (prefix === void 0) { prefix = ''; }
            return '' + prefix + (nextUniqueId++);
        }
        exports.uniqueId = uniqueId;
    });
    define("types", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.REF_PROP_NAME = '__ref__';
        function isRef(object) {
            return !!object[exports.REF_PROP_NAME];
        }
        exports.isRef = isRef;
        exports.COMPUTED_REF_PROP_NAME = '__computed_ref__';
        function isComputedRef(object) {
            return !!object[exports.COMPUTED_REF_PROP_NAME] && isRef(object);
        }
        exports.isComputedRef = isComputedRef;
        exports.REACTIVE_ID_PROP_NAME = '__reactive_id__';
        function isReactive(object) {
            return !!object[exports.REACTIVE_ID_PROP_NAME];
        }
        exports.isReactive = isReactive;
    });
    define("ComputedWatcher", ["require", "exports", "property-event-bus"], function (require, exports, property_event_bus_2) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        var ComputedWatcher = /** @class */ (function () {
            function ComputedWatcher(computeCallback, onInvalidatedCallback) {
                this.computeCallback = computeCallback;
                this.onInvalidatedCallback = onInvalidatedCallback;
                this.dependencies = [];
                this.invalidated = true;
                this.onDependencyRead = this.onDependencyRead.bind(this);
                this.dependencyInvalidationListener = this.dependencyInvalidationListener.bind(this);
                property_event_bus_2.propertyEventBus.addInvalidateListener(this.dependencyInvalidationListener);
            }
            ComputedWatcher.prototype.dependencyInvalidationListener = function (object, propName) {
                if (!this.invalidated && this.isDependency(object, propName)) {
                    this.invalidate();
                }
            };
            ComputedWatcher.prototype.isDependency = function (object, propName) {
                return this.dependencies.some(function (dependency) {
                    return dependency.object === object && dependency.propName === propName;
                });
            };
            ComputedWatcher.prototype.invalidate = function () {
                this.dependencies = [];
                this.invalidated = true;
                var onInvalidatedCallback = this.onInvalidatedCallback;
                onInvalidatedCallback(this);
            };
            ComputedWatcher.prototype.recompute = function () {
                if (this.invalidated) {
                    this.invalidated = false;
                    this.computeAndListenForDependencies();
                }
            };
            ComputedWatcher.prototype.computeAndListenForDependencies = function () {
                property_event_bus_2.propertyEventBus.addReadListener(this.onDependencyRead);
                var computeCallback = this.computeCallback;
                computeCallback();
                property_event_bus_2.propertyEventBus.removeReadListener(this.onDependencyRead);
            };
            ComputedWatcher.prototype.onDependencyRead = function (object, propName) {
                // FIXME evitar repetir dependencias
                this.dependencies.push({
                    object: object,
                    propName: propName
                });
            };
            return ComputedWatcher;
        }());
        exports.default = ComputedWatcher;
    });
    define("Watcher", ["require", "exports", "property-event-bus", "CallbackDependencyListener"], function (require, exports, property_event_bus_3, CallbackDependencyListener_1) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        CallbackDependencyListener_1 = __importDefault(CallbackDependencyListener_1);
        var Watcher = /** @class */ (function () {
            function Watcher(callback, options) {
                this.callback = callback;
                this.options = options;
                this.dependencies = [];
                this.invalidated = true;
                property_event_bus_3.propertyEventBus.addInvalidateListener(this.dependencyInvalidationListener.bind(this));
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
                var callbackExecutionInfo = CallbackDependencyListener_1.default.executeAndListenForDependencies(this.callback);
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
        exports.default = Watcher;
    });
    define("computed", ["require", "exports", "types", "property-event-bus", "Watcher"], function (require, exports, types_1, property_event_bus_4, Watcher_1) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        Watcher_1 = __importDefault(Watcher_1);
        function computed(callback) {
            var options = {
                onInvalidate: function (watcher) {
                    // console.log('Se invalida la computed');
                    property_event_bus_4.propertyEventBus.triggerInvalidateEvent(refObject, 'value');
                },
                onRecompute: function (watcher, newExecutionResult, previousExecutionResult) {
                    // console.log('Se ejecuta el cálculo de la computed');
                    if (newExecutionResult !== previousExecutionResult) {
                        property_event_bus_4.propertyEventBus.triggerChangeEvent(refObject, 'value', newExecutionResult, previousExecutionResult);
                    }
                }
            };
            var watcherInstance = new Watcher_1.default(callback, options);
            var refObject = createReadonlyRef(function () {
                return watcherInstance.getResult();
            });
            return refObject;
        }
        exports.default = computed;
        function createReadonlyRef(getter) {
            var refObject = {
                get value() {
                    var value = getter();
                    property_event_bus_4.propertyEventBus.triggerReadEvent(this, 'value', value);
                    return value;
                },
                set value(newValue) {
                    throw new Error('Cannot modify the value of a readonly reference');
                }
            };
            Object.defineProperty(refObject, types_1.REF_PROP_NAME, { value: true });
            Object.defineProperty(refObject, types_1.COMPUTED_REF_PROP_NAME, { value: true });
            return refObject;
        }
        exports.createReadonlyRef = createReadonlyRef;
    });
    define("reactive", ["require", "exports", "utils", "property-event-bus", "types"], function (require, exports, utils_1, property_event_bus_5, types_2) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        function reactive(object) {
            if (types_2.isReactive(object)) {
                return object;
            }
            if (!utils_1.isPlainObject(object)) {
                throw new Error('Cannot observe value:' + object);
            }
            return createReactiveObject(object);
        }
        exports.default = reactive;
        function doMakeReactiveChain(value) {
            if (types_2.isReactive(value) || types_2.isRef(value)) {
                return value;
            }
            if (utils_1.isPlainObject(value)) {
                return createReactiveObject(value);
            }
            if (utils_1.isArray(value)) {
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
            Object.defineProperty(object, types_2.REACTIVE_ID_PROP_NAME, { value: true });
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
                    property_event_bus_5.propertyEventBus.triggerReadEvent(reactiveObject, propName, value);
                    return types_2.isRef(value) ? value.value : value;
                },
                set: function (value) {
                    var previousValueOrRef = originalObject[propName];
                    var objectIsRef = types_2.isRef(previousValueOrRef);
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
                    property_event_bus_5.propertyEventBus.triggerInvalidateEvent(reactiveObject, propName);
                    property_event_bus_5.propertyEventBus.triggerChangeEvent(reactiveObject, propName, newValue, previousValue);
                }
            });
        }
        exports.proxifyProperty = proxifyProperty;
    });
    define("ref", ["require", "exports", "reactive", "types"], function (require, exports, reactive_1, types_3) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        reactive_1 = __importDefault(reactive_1);
        function ref(value) {
            var refObject = reactive_1.default({
                value: value
            });
            Object.defineProperty(refObject, types_3.REF_PROP_NAME, { value: true });
            return refObject;
        }
        exports.default = ref;
    });
    define("watch", ["require", "exports", "Watcher"], function (require, exports, Watcher_2) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        Watcher_2 = __importDefault(Watcher_2);
        // TODO añadir la opción de un watch que reciba un callback de dependencias () => any / () => any[]
        function watch(callback) {
            var recomputingTimeoutId = null;
            var options = {
                onInvalidate: function (watcher) {
                    if (recomputingTimeoutId == null) {
                        // Enqueue recomputing
                        recomputingTimeoutId = setTimeout(function () {
                            watcher.getResult();
                        }, 0);
                    }
                },
                onRecompute: function (watcher, newExecutionResult, previousExecutionResult) {
                    recomputingTimeoutId = null;
                }
            };
            var watcherInstance = new Watcher_2.default(callback, options);
            // Force first execution
            watcherInstance.getResult();
        }
        exports.default = watch;
    });
    define("index", ["require", "exports", "ref", "reactive", "watch", "computed"], function (require, exports, ref_1, reactive_2, watch_1, computed_1) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        ref_1 = __importDefault(ref_1);
        reactive_2 = __importDefault(reactive_2);
        watch_1 = __importDefault(watch_1);
        computed_1 = __importDefault(computed_1);
        exports.ref = ref_1.default;
        exports.reactive = reactive_2.default;
        exports.watch = watch_1.default;
        exports.computed = computed_1.default;
    });
    //# sourceMappingURL=dist.js.map
    'marker:resolver';

    function get_define(name) {
        if (defines[name]) {
            return defines[name];
        }
        else if (defines[name + '/index']) {
            return defines[name + '/index'];
        }
        else {
            var dependencies = ['exports'];
            var factory = function (exports) {
                try {
                    Object.defineProperty(exports, "__cjsModule", { value: true });
                    Object.defineProperty(exports, "default", { value: require(name) });
                }
                catch (_a) {
                    throw Error(['module "', name, '" not found.'].join(''));
                }
            };
            return { dependencies: dependencies, factory: factory };
        }
    }
    var instances = {};
    function resolve(name) {
        if (instances[name]) {
            return instances[name];
        }
        if (name === 'exports') {
            return {};
        }
        var define = get_define(name);
        instances[name] = {};
        var dependencies = define.dependencies.map(function (name) { return resolve(name); });
        define.factory.apply(define, dependencies);
        var exports = dependencies[define.dependencies.indexOf('exports')];
        instances[name] = (exports['__cjsModule']) ? exports.default : exports;
        return instances[name];
    }
    if (entry[0] !== null) {
        return resolve(entry[0]);
    }
})();