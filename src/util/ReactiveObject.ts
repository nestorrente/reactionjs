import {Dictionary} from 'src/utils';

export const REACTIVE_ID_PROP_NAME = '__reactive_id__';

export default interface ReactiveObject {
	[REACTIVE_ID_PROP_NAME]: true;
}

export type ReactivePlainObject = Dictionary<any> & ReactiveObject;

export function isReactive(object: Dictionary<any>): object is ReactivePlainObject {
	return !!object[REACTIVE_ID_PROP_NAME];
}
