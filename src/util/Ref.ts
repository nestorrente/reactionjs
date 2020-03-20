export const REF_PROP_NAME = '__ref__';

export default interface Ref<T> {
	readonly [REF_PROP_NAME]: true;
	value: T;
}

export function isRef(value: any): value is Ref<any> {
	return value != null && typeof value === 'object' && !!value[REF_PROP_NAME];
}
