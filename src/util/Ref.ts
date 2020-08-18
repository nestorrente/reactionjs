export const REF_PROP_NAME = '__ref__';

export default interface Ref<T> {
	readonly [REF_PROP_NAME]: true;
	value: T;
}

export function isRef(value: any): value is Ref<any> {
	return value != null && typeof value === 'object' && !!value[REF_PROP_NAME];
}

// Types extracted from Vue's Composition API source code: https://github.com/vuejs/composition-api/

// tslint:disable-next-line:ban-types
type BailTypes = Function | Map<any, any> | Set<any> | WeakMap<any, any> | WeakSet<any>;

export type UnwrapRef<T> = T extends Ref<infer V> ? UnwrapRef2<V> : T extends BailTypes ? T : T extends object ? {
	[K in keyof T]: UnwrapRef2<T[K]>;
} : T;
type UnwrapRef2<T> = T extends Ref<infer V> ? UnwrapRef3<V> : T extends BailTypes ? T : T extends object ? {
	[K in keyof T]: UnwrapRef3<T[K]>;
} : T;
type UnwrapRef3<T> = T extends Ref<infer V> ? UnwrapRef4<V> : T extends BailTypes ? T : T extends object ? {
	[K in keyof T]: UnwrapRef4<T[K]>;
} : T;
type UnwrapRef4<T> = T extends Ref<infer V> ? UnwrapRef5<V> : T extends BailTypes ? T : T extends object ? {
	[K in keyof T]: UnwrapRef5<T[K]>;
} : T;
type UnwrapRef5<T> = T extends Ref<infer V> ? UnwrapRef6<V> : T extends BailTypes ? T : T extends object ? {
	[K in keyof T]: UnwrapRef6<T[K]>;
} : T;
type UnwrapRef6<T> = T extends Ref<infer V> ? UnwrapRef7<V> : T extends BailTypes ? T : T extends object ? {
	[K in keyof T]: UnwrapRef7<T[K]>;
} : T;
type UnwrapRef7<T> = T extends Ref<infer V> ? UnwrapRef8<V> : T extends BailTypes ? T : T extends object ? {
	[K in keyof T]: UnwrapRef8<T[K]>;
} : T;
type UnwrapRef8<T> = T extends Ref<infer V> ? UnwrapRef9<V> : T extends BailTypes ? T : T extends object ? {
	[K in keyof T]: UnwrapRef9<T[K]>;
} : T;
type UnwrapRef9<T> = T extends Ref<infer V> ? UnwrapRef10<V> : T extends BailTypes ? T : T extends object ? {
	[K in keyof T]: UnwrapRef10<T[K]>;
} : T;
type UnwrapRef10<T> = T extends Ref<infer V> ? V : T;
