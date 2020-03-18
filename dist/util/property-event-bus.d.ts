export declare type ReadListener<T> = (object: any, propName: string, value: T) => void;
export declare type InvalidateListener = (object: any, propName: string) => void;
export declare type ChangeListener<T = any> = (object: any, propName: string, newValue: T, oldValue: T) => void;
export declare class PropertyEventBus {
    private readonly eventBus;
    constructor();
    addReadListener(listener: ReadListener<any>): void;
    removeReadListener(listener: ReadListener<any>): void;
    triggerReadEvent(object: any, propName: string, value: any): void;
    addInvalidateListener(listener: InvalidateListener): void;
    removeInvalidateListener(listener: InvalidateListener): void;
    triggerInvalidateEvent<T = any>(object: any, propName: string): void;
    addChangeListener(listener: ChangeListener): void;
    removeChangeListener(listener: ChangeListener): void;
    triggerChangeEvent<T = any>(object: any, propName: string, newValue: T, oldValue: T): void;
}
declare const propertyEventBus: PropertyEventBus;
export default propertyEventBus;
//# sourceMappingURL=property-event-bus.d.ts.map