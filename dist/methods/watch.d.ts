import { Consumer, Runnable } from '../util/types';
import { WatcherSource } from '../util/Watcher';
export default function watch(callback: Runnable): void;
export default function watch<T>(source: WatcherSource<T>, callback: Consumer<T>): void;
//# sourceMappingURL=watch.d.ts.map