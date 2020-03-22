import CleanupCallbackRegister from './CleanupCallbackRegister';
import Watcher, {WatcherSource} from '../../util/Watcher';
import nextTick from '../nextTick';

export default abstract class AbstractWatch<T, U> {

	protected readonly cleanupCallbackRegister: CleanupCallbackRegister;
	protected invalidated: boolean;
	protected stopped: boolean;
	private watcherInstance: Watcher<U> | undefined;

	constructor() {
		this.cleanupCallbackRegister = new CleanupCallbackRegister();
		this.invalidated = false;
		this.stopped = false;
	}

	public init() {
		this.watcherInstance = this.createWatcher();
		this.afterWatcherCreation(this.watcherInstance);
	}

	private createWatcher(): Watcher<U> {
		return new Watcher(
			this.getWatcherSource(),
			{
				onInvalidate: () => {

					if (this.invalidated || this.stopped) {
						return;
					}

					nextTick(() => {
						this.onNextTickAfterWatcherInvalidate(this.watcherInstance!);
					});

					this.invalidated = true;

				},
				onRecompute: () => {
					this.invalidated = false;
				}
			}
		);
	}

	protected abstract getWatcherSource(): WatcherSource<U>;

	protected abstract onNextTickAfterWatcherInvalidate(watcher: Watcher<U>): void;

	protected abstract afterWatcherCreation(watcher: Watcher<U>): void;

	public stop() {
		if (!this.stopped) {
			this.stopped = true;
			this.cleanupCallbackRegister.execute();
			this.watcherInstance!.stop();
		}
	}

}
