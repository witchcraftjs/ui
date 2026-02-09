import { type Ref } from "vue";
/**
 * Returns a ref with the current time if the given value ref is true or it's an array with 1 or more items.. It will update the time every 50ms (configurable) if so (within a requestAnimationFrame).
 *
 * When the value is anything else it will clear the interval and set the time to undefined.
 *
 * Useful for use with a progress bar.
 *
 * Updating the time all the time is expensive and not idea. This way we only set the interval if we really need it.
 */
export declare function useTimeConditionally(val: Ref<any[] | boolean | any>, { refreshInterval }?: {
    refreshInterval?: number;
}): {
    time: Ref<undefined | number>;
    refresh: () => void;
};
//# sourceMappingURL=useTimeConditionally.d.ts.map