export interface Dictionary<T> {
    [key: string]: T;
}
export declare type Consumer<T> = (t: T) => void;
export declare type Runnable = () => void;
export declare type Supplier<T> = () => T;
//# sourceMappingURL=types.d.ts.map