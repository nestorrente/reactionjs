import AbstractWatch from './AbstractWatch';
import Watcher, {WatcherSource} from '../../util/Watcher';
import {WatcherCallBack} from './types';

export default class WatchSource<T> extends AbstractWatch<T, T> {

	private readonly source: WatcherSource<T>;
	private readonly callback: WatcherCallBack<T>;
	private lastResult?: T;

	constructor(source: WatcherSource<T>, callback: WatcherCallBack<T>) {
		super();
		this.source = source;
		this.callback = callback;
	}

	protected getWatcherSource(): WatcherSource<T> {
		return this.source;
	}

	protected onNextTickAfterWatcherInvalidate(watcher: Watcher<T>) {

		const newResult = watcher.getResult();

		// FIXME check what is the Vue behaviour when this result is an array of dependencies, and do the same here
		if (this.lastResult === newResult) {
			this.invalidated = false;
			return;
		}

		this.cleanupCallbackRegister.execute();

		this.callback(newResult, this.lastResult, cleanup => {
			this.cleanupCallbackRegister.registerCallback(cleanup);
		});

		this.lastResult = newResult;

	}

	protected afterWatcherCreation(watcher: Watcher<T>): void {

		const newResult = watcher.getResult();

		this.callback(newResult, this.lastResult, cleanup => {
			this.cleanupCallbackRegister.registerCallback(cleanup);
		});

		this.lastResult = newResult;

	}

}
