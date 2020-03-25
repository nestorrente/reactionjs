import {Runnable} from '../../util/types';

// Types extracted from Vue's Composition API source: https://github.com/vuejs/composition-api/blob/master/src/apis/watch.ts

export type CleanupRegistrator = (invalidate: Runnable) => void;
export type SimpleEffect = (onCleanup: CleanupRegistrator) => void;
export type StopHandle = () => void;
export type WatcherCallBack<T> = (newVal: T, oldVal: T | undefined, onCleanup: CleanupRegistrator) => void;
