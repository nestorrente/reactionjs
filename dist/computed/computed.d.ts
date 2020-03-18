import Ref from '../util/Ref';
import { WatcherCallback } from '../util/Watcher';
export default function computed<T>(callback: WatcherCallback<T>): Readonly<Ref<T>>;
export declare function createReadonlyRef<T>(getter: () => T): Readonly<Ref<T>>;
//# sourceMappingURL=computed.d.ts.map