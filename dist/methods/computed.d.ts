import Ref from '../util/Ref';
import { Supplier } from '../util/types';
export default function computed<T>(callback: Supplier<T>): Readonly<Ref<T>>;
export declare function createReadonlyRef<T>(getter: () => T): Readonly<Ref<T>>;
//# sourceMappingURL=computed.d.ts.map