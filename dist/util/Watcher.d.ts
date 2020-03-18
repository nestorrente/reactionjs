export interface WatcherDependency {
    object: any;
    propName: string;
}
export declare type WatcherCallback<T> = () => T;
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
//# sourceMappingURL=Watcher.d.ts.map