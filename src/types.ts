import {Dictionary} from './utils';

export const REF_PROP_NAME = '__ref__';

export interface Ref<T> {
	readonly [REF_PROP_NAME]: true;
	value: T;
}

export function isRef(object: Dictionary<any>): object is Ref<any> {
	return !!object[REF_PROP_NAME];
}

export const COMPUTED_REF_PROP_NAME = '__computed_ref__';

export interface ComputedRef<T> extends Readonly<Ref<T>> {
	readonly [COMPUTED_REF_PROP_NAME]: true;
}

export function isComputedRef(object: Dictionary<any>): object is ComputedRef<any> {
	return !!object[COMPUTED_REF_PROP_NAME] && isRef(object);
}

export const REACTIVE_ID_PROP_NAME = '__reactive_id__';

export interface ReactiveObject {
	[REACTIVE_ID_PROP_NAME]: true;
}

export type ReactivePlainObject = Dictionary<any> & ReactiveObject;

export function isReactive(object: Dictionary<any>): object is ReactivePlainObject {
	return !!object[REACTIVE_ID_PROP_NAME];
}
