import propertyEventBus from './property-event-bus';
import ReactiveObject from '../util/ReactiveObject';
import callbackDependencyListener from './callback-dependency-listener';

export interface WatcherDependency {
	object: any;
	propName: string;
}

export type WatcherCallback<T> = () => T;

export interface WatcherOptions<T> {

	onInvalidate(watcher: Watcher<T>): void;

	onRecompute(watcher: Watcher<T>, newExecutionResult: T, previousExecutionResult?: T): void;

}

export default class Watcher<T> {

	private readonly callback: WatcherCallback<T>;
	private readonly options: WatcherOptions<T>;

	private executionResult: T | undefined;

	private dependencies: WatcherDependency[];
	private invalidated: boolean;

	constructor(callback: WatcherCallback<T>, options: WatcherOptions<T>) {

		this.callback = callback;
		this.options = options;

		this.dependencies = [];
		this.invalidated = true;

		propertyEventBus.addInvalidateListener(this.dependencyInvalidationListener.bind(this));

	}

	private dependencyInvalidationListener(object: any, propName: string) {
		if (!this.invalidated && this.isDependency(object, propName)) {
			this.invalidate();
		}
	}

	private isDependency(object: ReactiveObject, propName: string) {
		return this.dependencies.some(dependency => {
			return dependency.object === object && dependency.propName === propName;
		});
	}

	private invalidate() {
		if (!this.invalidated) {
			this.dependencies = [];
			this.invalidated = true;
			this.onInvalidate();
		}
	}

	private onInvalidate(): void {
		const {onInvalidate} = this.options;
		onInvalidate(this);
	}

	public getResult(): T {
		if (this.invalidated) {
			this.recompute();
		}
		return this.executionResult!;
	}

	private recompute() {

		const callbackExecutionInfo = callbackDependencyListener.executeAndListenForDependencies(this.callback);

		const previousExecutionResult = this.executionResult;

		this.dependencies = callbackExecutionInfo.dependencies;
		this.executionResult = callbackExecutionInfo.result;

		this.invalidated = false;

		this.onRecompute(this.executionResult!, previousExecutionResult);

	}

	private onRecompute(newExecutionResult: T, previousExecutionResult?: T): void {
		const {onRecompute} = this.options;
		onRecompute(this, newExecutionResult, previousExecutionResult);
	}

}
