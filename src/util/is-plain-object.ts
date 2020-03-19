import {Dictionary} from './types';

const _toString = Object.prototype.toString;

export function isPlainObject(value: any): value is Dictionary<any> {
	return _toString.apply(value) === '[object Object]';
}
