import Ref, {REF_PROP_NAME} from '../util/Ref';
import propertyEventBus from '../util/property-event-bus';
import Watcher, {WatcherCallback, WatcherOptions} from '../util/Watcher';

export default function computed<T>(callback: WatcherCallback<T>): Readonly<Ref<T>> {

	const options: WatcherOptions<T> = {
		onInvalidate(watcher: Watcher<T>): void {
			// console.log('Se invalida la computed');
			propertyEventBus.triggerInvalidateEvent(refObject, 'value');
		},
		onRecompute(watcher: Watcher<T>, newExecutionResult: T, previousExecutionResult?: T): void {
			// console.log('Se ejecuta el cálculo de la computed');
			if (newExecutionResult !== previousExecutionResult) {
				propertyEventBus.triggerChangeEvent(refObject, 'value', newExecutionResult, previousExecutionResult);
			}
		}
	};

	const watcherInstance = new Watcher(callback, options);

	const refObject = createReadonlyRef(() => {
		return watcherInstance.getResult();
	});

	return refObject;

}

export function createReadonlyRef<T>(getter: () => T): Readonly<Ref<T>> {

	const refObject = {
		get value() {
			const value = getter();
			propertyEventBus.triggerReadEvent(this, 'value', value);
			return value;
		},
		set value(newValue: T) {
			throw new Error('Cannot modify the value of a readonly reference');
		}
	};

	Object.defineProperty(refObject, REF_PROP_NAME, {value: true});

	return refObject as Ref<T>;

}
