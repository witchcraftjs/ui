import type { Ref } from "vue";
/**
 * For async operations sometimes it actually loads so fast the loading indicator is not visible but we still want it to be briefly visible. This delays the setting of the returned ref to false by the given timeout so it at least flashes onscreen.
 *
 * Setting to true is not delayed.
 *
 * If the indicator is set to true while the timeout is still running, it's canceled.
 */
export declare function useDelayedLoadingIndicator(loading: Ref<boolean>, timeout?: number): Ref<boolean, boolean>;
//# sourceMappingURL=useDelayedLoadingIndicator.d.ts.map