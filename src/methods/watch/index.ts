import {WatcherSource} from '../../util/Watcher';
import {SimpleEffect, StopHandle, WatcherCallBack} from './types';
import WatchSimpleEffect from './WatchSimpleEffect';
import WatchSource from './WatchSource';

// TODO update documentation - watchEffect() instead of watch() with 1 argument

// FIXME check what happends if you do this without using nextTick():
//     dependency = 1
//     stopWatcher()
//     dependency = 2
//   Watcher is executed because of the "=1" change, because the "=2" change, or is not executed at all?

export function watchEffect(callback: SimpleEffect): StopHandle {
	const watchObject = new WatchSimpleEffect(callback);
	watchObject.init();
	return () => watchObject.stop();
}

export function watch<T>(source: WatcherSource<T>, callback: WatcherCallBack<T>): StopHandle {
	const watchObject = new WatchSource(source, callback);
	watchObject.init();
	return () => watchObject.stop();
}
