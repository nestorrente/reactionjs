import {isPlainObject} from '../util/is-plain-object';
import propertyEventBus from '../util/property-event-bus';
import {isRef, UnwrapRef} from '../util/Ref';
import {Dictionary} from '../util/types';
import {isReactive, REACTIVE_ID_PROP_NAME, ReactivePlainObject} from '../util/ReactiveObject';

export default function reactive<T>(object: T): UnwrapRef<T> {

	if (isReactive(object)) {
		return object as UnwrapRef<T>;
	}

	if (!isPlainObject(object)) {
		throw new Error('Cannot observe value:' + object);
	}

	return createReactiveObject(object) as UnwrapRef<T>;

}

function doReactiveCreationChain(value: any) {

	if (value == null || typeof value !== 'object' || isReactive(value) || isRef(value)) {
		return value;
	}

	if (isPlainObject(value)) {
		return createReactiveObject(value);
	}

	if (Array.isArray(value)) {
		return createReactiveArray(value);
	}

	return value;

}

function createReactiveObject(object: Dictionary<any>): Dictionary<any> {

	const reactiveObject = createEmptyReactiveObject();

	for (const propName in object) {

		if (!object.hasOwnProperty(propName)) {
			continue;
		}

		defineReactiveProperty(reactiveObject, propName, object);

		const value: any = object[propName];
		object[propName] = doReactiveCreationChain(value);

	}

	return reactiveObject;

}

function createEmptyReactiveObject(): ReactivePlainObject {

	const object = {};
	Object.defineProperty(object, REACTIVE_ID_PROP_NAME, {value: true});

	return object as ReactivePlainObject;

}

function createReactiveArray(value: any[]) {

	for (let i = 0; i < value.length; ++i) {
		value[i] = doReactiveCreationChain(value[i]);
	}

	return value;

}

export function defineReactiveProperty(reactiveObject: Dictionary<any>, propName: string, dataObject: Dictionary<any>) {
	Object.defineProperty(reactiveObject, propName, {
		enumerable: true,
		get(): any {

			const value = dataObject[propName];

			propertyEventBus.triggerReadEvent(reactiveObject, propName, value);

			return isRef(value) ? value.value : value;

		},
		set(value: any): void {

			const previousValueOrRef = dataObject[propName];
			const objectIsRef = isRef(previousValueOrRef);

			const previousValue = objectIsRef ? previousValueOrRef.value : previousValueOrRef;

			if (previousValue === value) {
				return;
			}

			const newValue = doReactiveCreationChain(value);

			if (objectIsRef) {
				previousValueOrRef.value = newValue;
			} else {
				dataObject[propName] = newValue;
			}

			propertyEventBus.triggerInvalidateEvent(reactiveObject, propName);
			propertyEventBus.triggerChangeEvent(reactiveObject, propName, newValue, previousValue);

		}
	});
}
