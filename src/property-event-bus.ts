import EventBus from './EventBus';

export type ReadListener<T> = (object: any, propName: string, value: T) => void;
export type InvalidateListener = (object: any, propName: string) => void;
export type ChangeListener<T = any> = (object: any, propName: string, newValue: T, oldValue: T) => void;

export class PropertyEventBus {

	private readonly eventBus: EventBus;

	constructor() {
		this.eventBus = new EventBus();

	}

	public addReadListener(listener: ReadListener<any>) {
		this.eventBus.on('read', listener);
	}

	public removeReadListener(listener: ReadListener<any>) {
		this.eventBus.off('read', listener);
	}

	public triggerReadEvent(object: any, propName: string, value: any) {
		this.eventBus.trigger('read', object, propName, value);
	}

	public addInvalidateListener(listener: InvalidateListener) {
		this.eventBus.on('invalidate', listener);
	}

	public removeInvalidateListener(listener: InvalidateListener) {
		this.eventBus.off('invalidate', listener);
	}

	public triggerInvalidateEvent<T = any>(object: any, propName: string) {
		this.eventBus.trigger('invalidate', object, propName);
	}

	public addChangeListener(listener: ChangeListener) {
		this.eventBus.on('change', listener);
	}

	public removeChangeListener(listener: ChangeListener) {
		this.eventBus.off('change', listener);
	}

	public triggerChangeEvent<T = any>(object: any, propName: string, newValue: T, oldValue: T) {
		this.eventBus.trigger('change', object, propName, newValue, oldValue);
	}

}

export const propertyEventBus = new PropertyEventBus();
