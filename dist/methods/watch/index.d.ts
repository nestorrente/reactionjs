import { WatcherSource } from '../../util/Watcher';
import { SimpleEffect, StopHandle, WatcherCallBack } from './types';
export declare function watchEffect(callback: SimpleEffect): StopHandle;
export declare function watch<T>(source: WatcherSource<T>, callback: WatcherCallBack<T>): StopHandle;
//# sourceMappingURL=index.d.ts.map