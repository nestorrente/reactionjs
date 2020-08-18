import {Runnable} from '../../util/types';

// Types extracted from Vue's Composition API source code: https://github.com/vuejs/composition-api/

export type CleanupRegistrator = (invalidate: Runnable) => void;
export type StopHandle = () => void;
export type WatcherCallBack<T> = (newVal: T, oldVal: T | undefined, onCleanup: CleanupRegistrator) => void;

export interface WatchOptions {
	immediate?: boolean;
}

export type SimpleEffect = (onCleanup: CleanupRegistrator) => void;
