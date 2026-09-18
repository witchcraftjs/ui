import type { ResizeCallback } from "../types/index.js";
export declare class ResizeObserverWrapper {
    observers: WeakMap<Element, Set<ResizeCallback>>;
    observer: ResizeObserver;
    constructor();
    observe(element: Element, callback: ResizeCallback): void;
    unobserve(element: Element, callback: ResizeCallback): void;
}
//# sourceMappingURL=resizeObserverWrapper.d.ts.map