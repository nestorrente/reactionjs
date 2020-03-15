const _toString = Object.prototype.toString;

export function isPlainObject(value: any): value is Dictionary<any> {
	return _toString.apply(value) === '[object Object]';
}

export function isArray(value: any): value is any[] {
	return Array.isArray(value);
}

export interface Dictionary<T> {
	[key: string]: T;
}

let nextUniqueId: number = 1;

export function uniqueId(prefix: string = ''): string {
	return '' + prefix + (nextUniqueId++);
}
