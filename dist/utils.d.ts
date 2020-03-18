export declare function isPlainObject(value: any): value is Dictionary<any>;
export declare function isArray(value: any): value is any[];
export interface Dictionary<T> {
    [key: string]: T;
}
export declare function uniqueId(prefix?: string): string;
//# sourceMappingURL=utils.d.ts.map