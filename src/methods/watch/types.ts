import {Runnable} from '../../util/types';

export type CleanupRegistrator = (invalidate: Runnable) => void;
export type SimpleEffect = (onCleanup: CleanupRegistrator) => void;
export type StopHandle = () => void;
export type WatcherCallBack<T> = (newVal: T, oldVal: T | undefined, onCleanup: CleanupRegistrator) => void;
