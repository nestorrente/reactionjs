import {propertyEventBus, ReadListener} from './property-event-bus';

export type Callback<T> = () => T;

export interface CallbackDependency {
	object: any;
	propName: string;
}

export interface CallbackExecutionInfo<T> {
	dependencies: CallbackDependency[];
	result: T;
}

export class CallbackDependencyListener {

	public executeAndListenForDependencies<T>(callback: Callback<T>): CallbackExecutionInfo<T> {

		const dependencies: CallbackDependency[] = [];
		const dependencyListener = this.createDependencyListener(dependencies);

		propertyEventBus.addReadListener(dependencyListener);

		const result = callback();

		propertyEventBus.removeReadListener(dependencyListener);

		return {
			dependencies,
			result
		};

	}

	private createDependencyListener(dependencies: CallbackDependency[]): ReadListener<any> {
		return (object: any, propName: string) => {
			// FIXME evitar repetir dependencias
			return dependencies.push({
				object,
				propName
			});
		};
	}

}

const callbackDependencyListener = new CallbackDependencyListener();
export default callbackDependencyListener;
