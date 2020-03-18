export declare type Callback<T> = () => T;
export interface CallbackDependency {
    object: any;
    propName: string;
}
export interface CallbackExecutionInfo<T> {
    dependencies: CallbackDependency[];
    result: T;
}
export declare class CallbackDependencyListener {
    executeAndListenForDependencies<T>(callback: Callback<T>): CallbackExecutionInfo<T>;
    private createDependencyListener;
}
declare const callbackDependencyListener: CallbackDependencyListener;
export default callbackDependencyListener;
//# sourceMappingURL=callback-dependency-listener.d.ts.map