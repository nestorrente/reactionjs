import Ref from './Ref';
import { Supplier } from './types';
export interface WatcherDependency {
    object: any;
    propName: string;
}
export interface WatcherEventListener<T> {
    onInvalidate(): void;
    onRecompute(newExecutionResult: T, previousExecutionResult?: T): void;
}
export declare type WatcherSource<T> = Ref<T> | Supplier<T>;
export default class Watcher<T> {
    private readonly callback;
    private readonly options;
    private executionResult;
    private dependencies;
    private invalidated;
    constructor(source: WatcherSource<T>, options: WatcherEventListener<T>);
    private dependencyInvalidationListener;
    private isDependency;
    stop(): void;
    private invalidate;
    private onInvalidate;
    getResult(): T;
    private recompute;
    private onRecompute;
}
//# sourceMappingURL=Watcher.d.ts.map