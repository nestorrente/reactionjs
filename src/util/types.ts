export interface Dictionary<T> {
	[key: string]: T;
}

export type Runnable = () => void;
export type Supplier<T> = () => T;
