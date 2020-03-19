import {Dictionary} from './types';

export const REF_PROP_NAME = '__ref__';

export default interface Ref<T> {
	readonly [REF_PROP_NAME]: true;
	value: T;
}

export function isRef(object: Dictionary<any>): object is Ref<any> {
	return !!object[REF_PROP_NAME];
}
