import CleanupCallbackRegister from './CleanupCallbackRegister';
import Watcher, { WatcherSource } from '../../util/Watcher';
export default abstract class AbstractWatch<T, U> {
    protected readonly cleanupCallbackRegister: CleanupCallbackRegister;
    protected invalidated: boolean;
    protected stopped: boolean;
    private watcherInstance;
    constructor();
    init(): void;
    private createWatcher;
    protected abstract getWatcherSource(): WatcherSource<U>;
    protected abstract onNextTickAfterWatcherInvalidate(watcher: Watcher<U>): void;
    protected abstract afterWatcherCreation(watcher: Watcher<U>): void;
    stop(): void;
}
//# sourceMappingURL=AbstractWatch.d.ts.map