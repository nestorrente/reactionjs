import {isPlainObject} from '../util/is-plain-object';
import propertyEventBus from '../util/property-event-bus';
import {isRef} from '../util/Ref';
import {Dictionary} from '../util/types';
import {isReactive, REACTIVE_ID_PROP_NAME, ReactivePlainObject} from '../util/ReactiveObject';

export default function reactive<T>(object: T): T {

	if (isReactive(object)) {
		return object;
	}

	if (!isPlainObject(object)) {
		throw new Error('Cannot observe value:' + object);
	}

	return createReactiveObject(object) as T;

}

function doMakeReactiveChain(value: any) {

	if (isReactive(value) || isRef(value)) {
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

		proxifyProperty(reactiveObject, propName, object);

		const value: any = object[propName];
		object[propName] = doMakeReactiveChain(value);

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
		value[i] = doMakeReactiveChain(value[i]);
	}

	return value;

}

export function proxifyProperty(reactiveObject: Dictionary<any>, propName: string, originalObject: Dictionary<any>) {
	Object.defineProperty(reactiveObject, propName, {
		enumerable: true,
		get(): any {
			const value = originalObject[propName];
			propertyEventBus.triggerReadEvent(reactiveObject, propName, value);
			return isRef(value) ? value.value : value;
		},
		set(value: any): void {

			const previousValueOrRef = originalObject[propName];
			const objectIsRef = isRef(previousValueOrRef);

			const previousValue = objectIsRef ? previousValueOrRef.value : previousValueOrRef;

			if (previousValue === value) {
				return;
			}

			const newValue = doMakeReactiveChain(value);

			if (objectIsRef) {
				previousValueOrRef.value = newValue;
			} else {
				originalObject[propName] = newValue;
			}

			propertyEventBus.triggerInvalidateEvent(reactiveObject, propName);
			propertyEventBus.triggerChangeEvent(reactiveObject, propName, newValue, previousValue);

		}
	});
}
