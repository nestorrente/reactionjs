import { Dictionary } from './types';
export declare const REF_PROP_NAME = "__ref__";
export default interface Ref<T> {
    readonly [REF_PROP_NAME]: true;
    value: T;
}
export declare function isRef(object: Dictionary<any>): object is Ref<any>;
//# sourceMappingURL=Ref.d.ts.map