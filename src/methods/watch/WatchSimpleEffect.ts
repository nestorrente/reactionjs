import AbstractWatch from './AbstractWatch';
import {SimpleEffect} from './types';
import Watcher, {WatcherSource} from '../../util/Watcher';

export default class WatchSimpleEffect<T> extends AbstractWatch<T, void> {

	private readonly callback: SimpleEffect;

	constructor(callback: SimpleEffect) {
		super();
		this.callback = callback;
	}

	protected getWatcherSource(): WatcherSource<void> {
		return () => this.callback(cleanup => {
			this.cleanupCallbackRegister.registerCallback(cleanup);
		});
	}

	protected onNextTickAfterWatcherInvalidate(watcher: Watcher<void>) {
		this.cleanupCallbackRegister.execute();
		watcher.getResult();
	}

	protected afterWatcherCreation(watcher: Watcher<void>): void {
		watcher.getResult();
	}

}
