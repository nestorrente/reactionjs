import Watcher, {WatcherCallback, WatcherOptions} from './Watcher';

// TODO añadir la opción de un watch que reciba un callback de dependencias () => any / () => any[]

export default function watch(callback: WatcherCallback<void>): void {

	let recomputingTimeoutId: NodeJS.Timeout | null = null;

	const options: WatcherOptions<void> = {
		onInvalidate(watcher: Watcher<void>): void {
			if (recomputingTimeoutId == null) {
				// Enqueue recomputing
				recomputingTimeoutId = setTimeout(() => {
					watcher.getResult();
				}, 0);
			}
		},
		onRecompute(watcher: Watcher<void>, newExecutionResult: void, previousExecutionResult?: void): void {
			recomputingTimeoutId = null;
		}
	};

	const watcherInstance = new Watcher(callback, options);

	// Force first execution
	watcherInstance.getResult();

}
