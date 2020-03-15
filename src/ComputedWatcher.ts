import {propertyEventBus} from './property-event-bus';
import {ReactiveObject} from './types';

interface Dependency {
	object: any;
	propName: string;
}

export type WatcherComputeCallback = () => void;
export type OnWatcherInvalidatedCallback = (watcherInstance: ComputedWatcher) => void;

export default class ComputedWatcher {

	private readonly computeCallback: WatcherComputeCallback;
	private readonly onInvalidatedCallback: OnWatcherInvalidatedCallback;

	private dependencies: Dependency[];
	private invalidated: boolean;

	constructor(computeCallback: WatcherComputeCallback, onInvalidatedCallback: OnWatcherInvalidatedCallback) {

		this.computeCallback = computeCallback;
		this.onInvalidatedCallback = onInvalidatedCallback;

		this.dependencies = [];
		this.invalidated = true;

		this.onDependencyRead = this.onDependencyRead.bind(this);
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

	private invalidate() {
		this.dependencies = [];
		this.invalidated = true;
		const onInvalidatedCallback = this.onInvalidatedCallback;
		onInvalidatedCallback(this);
	}

	public recompute() {
		if (this.invalidated) {
			this.invalidated = false;
			this.computeAndListenForDependencies();
		}
	}

	private computeAndListenForDependencies() {
		propertyEventBus.addReadListener(this.onDependencyRead);
		const computeCallback = this.computeCallback;
		computeCallback();
		propertyEventBus.removeReadListener(this.onDependencyRead);
	}

	private onDependencyRead(object: any, propName: string) {
		// FIXME evitar repetir dependencias
		this.dependencies.push({
			object,
			propName
		});
	}

}
