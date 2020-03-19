export interface Dictionary<T> {
	[key: string]: T;
}

export type Consumer<T> = (t: T) => void;
export type Runnable = () => void;
export type Supplier<T> = () => T;
