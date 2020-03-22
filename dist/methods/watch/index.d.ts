import { WatcherSource } from '../../util/Watcher';
import { SimpleEffect, StopHandle, WatcherCallBack } from './types';
export default function watch(callback: SimpleEffect): StopHandle;
export default function watch<T>(source: WatcherSource<T>, callback: WatcherCallBack<T>): StopHandle;
//# sourceMappingURL=index.d.ts.map