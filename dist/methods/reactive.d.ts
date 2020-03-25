import { UnwrapRef } from '../util/Ref';
import { Dictionary } from '../util/types';
export default function reactive<T>(object: T): UnwrapRef<T>;
export declare function defineReactiveProperty(reactiveObject: Dictionary<any>, propName: string, dataObject: Dictionary<any>): void;
//# sourceMappingURL=reactive.d.ts.map