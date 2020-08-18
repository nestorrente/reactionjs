import AbstractWatch from './AbstractWatch';
import Watcher, { WatcherSource } from '../../util/Watcher';
import { WatcherCallBack } from './types';
export default class WatchSource<T> extends AbstractWatch<T, T> {
    private readonly source;
    private readonly callback;
    private readonly immediate;
    private lastResult?;
    constructor(source: WatcherSource<T>, callback: WatcherCallBack<T>, immediate: boolean);
    protected getWatcherSource(): WatcherSource<T>;
    protected onNextTickAfterWatcherInvalidate(watcher: Watcher<T>): void;
    protected afterWatcherCreation(watcher: Watcher<T>): void;
}
//# sourceMappingURL=WatchSource.d.ts.map