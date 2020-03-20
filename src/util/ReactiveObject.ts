import {Dictionary} from './types';

export const REACTIVE_ID_PROP_NAME = '__reactive_id__';

export default interface ReactiveObject {
	[REACTIVE_ID_PROP_NAME]: true;
}

export type ReactivePlainObject = Dictionary<any> & ReactiveObject;

export function isReactive(value: any): value is ReactivePlainObject {
	return value != null && typeof value === 'object' && !!value[REACTIVE_ID_PROP_NAME];
}
