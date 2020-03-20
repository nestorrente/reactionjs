export declare const REF_PROP_NAME = "__ref__";
export default interface Ref<T> {
    readonly [REF_PROP_NAME]: true;
    value: T;
}
export declare function isRef(value: any): value is Ref<any>;
//# sourceMappingURL=Ref.d.ts.map