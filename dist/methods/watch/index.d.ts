import { WatcherSource } from '../../util/Watcher';
import { SimpleEffect, StopHandle, WatcherCallBack, WatchOptions } from './types';
export declare function watchEffect(callback: SimpleEffect): StopHandle;
export declare function watch<T>(source: WatcherSource<T>, callback: WatcherCallBack<T>, options?: WatchOptions): StopHandle;
//# sourceMappingURL=index.d.ts.map