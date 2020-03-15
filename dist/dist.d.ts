declare module "EventBus" {
    export interface Dictionary<T> {
        [key: string]: T;
    }
    export type Listener = (...args: any[]) => void;
    export default class EventBus {
        private listeners;
        on(event: string, listener: Listener): EventBus;
        off(event: string, listener?: Listener): EventBus;
        private removeListener;
        private removeAllListeners;
        private removeListenersArrayIfEmpty;
        once(event: string, listener: Listener): EventBus;
        trigger(event: string, ...eventParameters: any[]): EventBus;
    }
}
declare module "property-event-bus" {
    export type ReadListener<T> = (object: any, propName: string, value: T) => void;
    export type InvalidateListener = (object: any, propName: string) => void;
    export type ChangeListener<T = any> = (object: any, propName: string, newValue: T, oldValue: T) => void;
    export class PropertyEventBus {
        private readonly eventBus;
        constructor();
        addReadListener(listener: ReadListener<any>): void;
        removeReadListener(listener: ReadListener<any>): void;
        triggerReadEvent(object: any, propName: string, value: any): void;
        addInvalidateListener(listener: InvalidateListener): void;
        removeInvalidateListener(listener: InvalidateListener): void;
        triggerInvalidateEvent<T = any>(object: any, propName: string): void;
        addChangeListener(listener: ChangeListener): void;
        removeChangeListener(listener: ChangeListener): void;
        triggerChangeEvent<T = any>(object: any, propName: string, newValue: T, oldValue: T): void;
    }
    export const propertyEventBus: PropertyEventBus;
}
declare module "CallbackDependencyListener" {
    export type Callback<T> = () => T;
    export interface CallbackDependency {
        object: any;
        propName: string;
    }
    export interface CallbackExecutionInfo<T> {
        dependencies: CallbackDependency[];
        result: T;
    }
    export class CallbackDependencyListener {
        executeAndListenForDependencies<T>(callback: Callback<T>): CallbackExecutionInfo<T>;
        private createDependencyListener;
    }
    const callbackDependencyListener: CallbackDependencyListener;
    export default callbackDependencyListener;
}
declare module "utils" {
    export function isPlainObject(value: any): value is Dictionary<any>;
    export function isArray(value: any): value is any[];
    export interface Dictionary<T> {
        [key: string]: T;
    }
    export function uniqueId(prefix?: string): string;
}
declare module "types" {
    import { Dictionary } from "utils";
    export const REF_PROP_NAME = "__ref__";
    export interface Ref<T> {
        readonly [REF_PROP_NAME]: true;
        value: T;
    }
    export function isRef(object: Dictionary<any>): object is Ref<any>;
    export const COMPUTED_REF_PROP_NAME = "__computed_ref__";
    export interface ComputedRef<T> extends Readonly<Ref<T>> {
        readonly [COMPUTED_REF_PROP_NAME]: true;
    }
    export function isComputedRef(object: Dictionary<any>): object is ComputedRef<any>;
    export const REACTIVE_ID_PROP_NAME = "__reactive_id__";
    export interface ReactiveObject {
        [REACTIVE_ID_PROP_NAME]: true;
    }
    export type ReactivePlainObject = Dictionary<any> & ReactiveObject;
    export function isReactive(object: Dictionary<any>): object is ReactivePlainObject;
}
declare module "ComputedWatcher" {
    export type WatcherComputeCallback = () => void;
    export type OnWatcherInvalidatedCallback = (watcherInstance: ComputedWatcher) => void;
    export default class ComputedWatcher {
        private readonly computeCallback;
        private readonly onInvalidatedCallback;
        private dependencies;
        private invalidated;
        constructor(computeCallback: WatcherComputeCallback, onInvalidatedCallback: OnWatcherInvalidatedCallback);
        private dependencyInvalidationListener;
        private isDependency;
        private invalidate;
        recompute(): void;
        private computeAndListenForDependencies;
        private onDependencyRead;
    }
}
declare module "Watcher" {
    export interface WatcherDependency {
        object: any;
        propName: string;
    }
    export type WatcherCallback<T> = () => T;
    export interface WatcherOptions<T> {
        onInvalidate(watcher: Watcher<T>): void;
        onRecompute(watcher: Watcher<T>, newExecutionResult: T, previousExecutionResult?: T): void;
    }
    export default class Watcher<T> {
        private readonly callback;
        private readonly options;
        private executionResult;
        private dependencies;
        private invalidated;
        constructor(callback: WatcherCallback<T>, options: WatcherOptions<T>);
        private dependencyInvalidationListener;
        private isDependency;
        private invalidate;
        private onInvalidate;
        getResult(): T;
        private recompute;
        private onRecompute;
    }
}
declare module "computed" {
    import { Ref } from "types";
    import { WatcherCallback } from "Watcher";
    export default function computed<T>(callback: WatcherCallback<T>): Readonly<Ref<T>>;
    export function createReadonlyRef<T>(getter: () => T): Readonly<Ref<T>>;
}
declare module "reactive" {
    import { Dictionary } from "utils";
    export default function reactive<T>(object: T): T;
    export function proxifyProperty(reactiveObject: Dictionary<any>, propName: string, originalObject: Dictionary<any>): void;
}
declare module "ref" {
    import { Ref } from "types";
    export default function ref<T>(value: T): Ref<T>;
}
declare module "watch" {
    import { WatcherCallback } from "Watcher";
    export default function watch(callback: WatcherCallback<void>): void;
}
declare module "index" {
    import ref from "ref";
    import reactive from "reactive";
    import watch from "watch";
    import computed from "computed";
    import { Ref } from "types";
    export { ref, reactive, watch, computed, Ref };
}
declare module "__tests__/Reactive.test" { }
