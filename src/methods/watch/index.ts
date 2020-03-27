import {WatcherSource} from '../../util/Watcher';
import {SimpleEffect, StopHandle, WatcherCallBack} from './types';
import AbstractWatch from './AbstractWatch';
import WatchSimpleEffect from './WatchSimpleEffect';
import WatchSource from './WatchSource';

// TODO update documentation in order to explain watch(source, callback) - until now, only watch(callback) is explained in README

// FIXME check what happends if you do this without using nextTick():
//     dependency = 1
//     stopWatcher()
//     dependency = 2
//   Watcher is executed because of the "=1" change, because the "=2" change, or is not executed at all?

export default function watch(callback: SimpleEffect): StopHandle;
export default function watch<T>(source: WatcherSource<T>, callback: WatcherCallBack<T>): StopHandle;
export default function watch<T>(source: SimpleEffect | WatcherSource<T>, callback?: WatcherCallBack<T>): StopHandle {
	const watchObject = createWatchObject(source, callback);
	watchObject.init();
	return () => watchObject.stop();
}

function createWatchObject<T>(source: SimpleEffect | WatcherSource<T>, callback?: WatcherCallBack<T>): AbstractWatch<T, any> {
	if (callback === undefined) {
		return new WatchSimpleEffect(source as SimpleEffect);
	} else {
		return new WatchSource(source as WatcherSource<T>, callback);
	}

}
