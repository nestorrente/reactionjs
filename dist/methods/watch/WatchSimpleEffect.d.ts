import AbstractWatch from './AbstractWatch';
import { SimpleEffect } from './types';
import Watcher, { WatcherSource } from '../../util/Watcher';
export default class WatchSimpleEffect<T> extends AbstractWatch<T, void> {
    private readonly callback;
    constructor(callback: SimpleEffect);
    protected getWatcherSource(): WatcherSource<void>;
    protected onNextTickAfterWatcherInvalidate(watcher: Watcher<void>): void;
    protected afterWatcherCreation(watcher: Watcher<void>): void;
}
//# sourceMappingURL=WatchSimpleEffect.d.ts.map