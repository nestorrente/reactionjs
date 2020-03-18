import { Dictionary } from 'src/utils';
export declare const REACTIVE_ID_PROP_NAME = "__reactive_id__";
export default interface ReactiveObject {
    [REACTIVE_ID_PROP_NAME]: true;
}
export declare type ReactivePlainObject = Dictionary<any> & ReactiveObject;
export declare function isReactive(object: Dictionary<any>): object is ReactivePlainObject;
//# sourceMappingURL=ReactiveObject.d.ts.map