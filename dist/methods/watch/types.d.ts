import { Runnable } from '../../util/types';
export declare type CleanupRegistrator = (invalidate: Runnable) => void;
export declare type StopHandle = () => void;
export declare type WatcherCallBack<T> = (newVal: T, oldVal: T | undefined, onCleanup: CleanupRegistrator) => void;
export interface WatchOptions {
    immediate?: boolean;
}
export declare type SimpleEffect = (onCleanup: CleanupRegistrator) => void;
//# sourceMappingURL=types.d.ts.map