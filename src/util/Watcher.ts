import callbackDependencyListener from './callback-dependency-listener';
import propertyEventBus from './property-event-bus';
import ReactiveObject from './ReactiveObject';
import Ref from './Ref';
import {Supplier} from './types';

export interface WatcherDependency {
	object: any;
	propName: string;
}

export interface WatcherEventListener<T> {

	onInvalidate(): void;

	onRecompute(newExecutionResult: T, previousExecutionResult?: T): void;

}

export type WatcherSource<T> = Ref<T> | Supplier<T>;

export default class Watcher<T> {

	private readonly callback: Supplier<T>;
	private readonly options: WatcherEventListener<T>;

	private executionResult: T | undefined;

	private dependencies: WatcherDependency[];
	private invalidated: boolean;

	constructor(source: WatcherSource<T>, options: WatcherEventListener<T>) {

		this.callback = convertSourceToCallback(source);
		this.options = options;

		this.dependencies = [];
		this.invalidated = true;

		this.dependencyInvalidationListener = this.dependencyInvalidationListener.bind(this);

		propertyEventBus.addInvalidateListener(this.dependencyInvalidationListener);

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

	public stop(): void {
		propertyEventBus.removeInvalidateListener(this.dependencyInvalidationListener);
		this.invalidate();
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
		onInvalidate();
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
		onRecompute(newExecutionResult, previousExecutionResult);
	}

}

function convertSourceToCallback<T>(source: WatcherSource<T>): Supplier<T> {

	if (typeof source === 'function') {
		return source;
	}

	return () => source.value;

}
