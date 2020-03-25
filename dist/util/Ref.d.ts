export declare const REF_PROP_NAME = "__ref__";
export default interface Ref<T> {
    readonly [REF_PROP_NAME]: true;
    value: T;
}
export declare function isRef(value: any): value is Ref<any>;
declare type BailTypes = Function | Map<any, any> | Set<any> | WeakMap<any, any> | WeakSet<any>;
export declare type UnwrapRef<T> = T extends Ref<infer V> ? UnwrapRef2<V> : T extends BailTypes ? T : T extends object ? {
    [K in keyof T]: UnwrapRef2<T[K]>;
} : T;
declare type UnwrapRef2<T> = T extends Ref<infer V> ? UnwrapRef3<V> : T extends BailTypes ? T : T extends object ? {
    [K in keyof T]: UnwrapRef3<T[K]>;
} : T;
declare type UnwrapRef3<T> = T extends Ref<infer V> ? UnwrapRef4<V> : T extends BailTypes ? T : T extends object ? {
    [K in keyof T]: UnwrapRef4<T[K]>;
} : T;
declare type UnwrapRef4<T> = T extends Ref<infer V> ? UnwrapRef5<V> : T extends BailTypes ? T : T extends object ? {
    [K in keyof T]: UnwrapRef5<T[K]>;
} : T;
declare type UnwrapRef5<T> = T extends Ref<infer V> ? UnwrapRef6<V> : T extends BailTypes ? T : T extends object ? {
    [K in keyof T]: UnwrapRef6<T[K]>;
} : T;
declare type UnwrapRef6<T> = T extends Ref<infer V> ? UnwrapRef7<V> : T extends BailTypes ? T : T extends object ? {
    [K in keyof T]: UnwrapRef7<T[K]>;
} : T;
declare type UnwrapRef7<T> = T extends Ref<infer V> ? UnwrapRef8<V> : T extends BailTypes ? T : T extends object ? {
    [K in keyof T]: UnwrapRef8<T[K]>;
} : T;
declare type UnwrapRef8<T> = T extends Ref<infer V> ? UnwrapRef9<V> : T extends BailTypes ? T : T extends object ? {
    [K in keyof T]: UnwrapRef9<T[K]>;
} : T;
declare type UnwrapRef9<T> = T extends Ref<infer V> ? UnwrapRef10<V> : T extends BailTypes ? T : T extends object ? {
    [K in keyof T]: UnwrapRef10<T[K]>;
} : T;
declare type UnwrapRef10<T> = T extends Ref<infer V> ? V : T;
export {};
//# sourceMappingURL=Ref.d.ts.map