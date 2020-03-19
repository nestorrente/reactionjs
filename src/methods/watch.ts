import {Consumer, Runnable} from '../util/types';
import Watcher, {WatcherSource} from '../util/Watcher';
import nextTick from './nextTick';

// TODO update documentation in order to explain watch(source, callback) - until now, only watch(callback) is explained in README

export default function watch(callback: Runnable): void;
export default function watch<T>(source: WatcherSource<T>, callback: Consumer<T>): void;
export default function watch<T>(source: WatcherSource<T>, callback?: Consumer<T>): void {

	let invalidated: boolean = false;

	const watcherInstance = new Watcher(source, {
		onInvalidate(watcher): void {
			if (!invalidated) {
				// Enqueue recomputing
				nextTick(() => {

					const result = watcher.getResult();

					if (callback != null) {
						callback(result);
					}

				});
				invalidated = true;
			}
		},
		onRecompute(watcher, newExecutionResult, previousExecutionResult?): void {
			invalidated = false;
		}
	});

	watcherInstance.getResult();

}

// FIXME adapt in order to give a similar (but more limited) flexibility to Vue's Composition API

// type CleanupRegistrator = (invalidate: Runnable) => void;
// type SimpleEffect = (onCleanup: CleanupRegistrator) => void;
// type StopHandle = () => void;
// type WatcherSource<T> = Ref<T> | Supplier<T>;
// type WatcherCallBack<T> = (newVal: T, oldVal: T, onCleanup: CleanupRegistrator) => void;
//
// function watch2(source: SimpleEffect): StopHandle;
// function watch2<T>(source: WatcherSource<T>, callback: WatcherCallBack<T>): StopHandle;
// function watch2<T>(): StopHandle {
// 	return () => {
// 		// stop watching
// 	};
// }
