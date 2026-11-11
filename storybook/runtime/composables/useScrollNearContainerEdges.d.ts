import { type Ref } from "vue";
import type { ScrollNearContainerEdgesOptions } from "../types/index.js";
/**
 * Creates a function `scrollContainer` that allows scrolling a container manually when the coordinates are near it's edges.
 * Supports scrolling faster the closer one is to the edge, and configuing an inner and outer margin.
 *
 * It can be used in any *move event.
 *
 * By default it sets a setInterval timer to continue scrolling even when the user does not move.
 * An `endScroll` function is provided which should be called on the *up event to cleanup the timer and variables properly (there is also the individual `clearScrollInterval` and `resetCanScroll` functions.
 *
 * It also provides an `isScrolling` ref and a `scrollIndicator` reactive object for knowing which direction the user is scrolling in to be able to style the element. They can be force cleared with the `resetCanScroll` function.
 *
 * ```ts
 * const {
 * 	scrollEdges,
 * 	isScrolling,
 * 	scrollIndicator,
 * 	endScroll,
 * } = useScrollNearContainerEdges({
 * 	containerEl,
 * 	scrollMargin,
 * 	outerScrollMargin,
 * })
 *
 * const onPointerMove = (e: PointerEvent): void => {
 * 	scrollEdges(e.clientX, e.clientY)
 * 	if (isScrolling.value) {
 * 		e.preventDefault()
 * 		return
 * 	}
 * 	//...
 * }
 * const onPointerUp = (_e: PointerEvent): void => {
 * 	endScroll()
 * 	//...
 * }
 * ```
 * Styling example with tailwind and tailwind-merge:
 *
 * ```vue
 * <div
 * 	:class="twMerge(
 * 		isScrolling && `relative after:content-[''] after:absolute after:inset after:border-2 after:border-transparent`,
 * 		scrollIndicator.right && `after:border-r-accent-500/60`,
 * 		scrollIndicator.down && `after:border-b-accent-500/60`,
 * 		scrollIndicator.left && `after:border-l-accent-500/60`,
 * 		scrollIndicator.up && `after:border-t-accent-500/60`,
 * 	)"
 * >
 * 	<div class="overflow-auto" ref="containerEl" >
 * </div>
 * ```
 */
export declare const useScrollNearContainerEdges: ({ containerEl, scrollMargin, outerScrollMargin, fastPixelMultiplier, fastPixelAmount, useTimer, timerInterval }: ScrollNearContainerEdgesOptions) => {
    scrollEdges: (clientX: number, clientY: number, overrideUseTimer?: boolean) => void;
    /** Reactive. */
    scrollIndicator: {
        left: boolean;
        right: boolean;
        down: boolean;
        up: boolean;
    };
    resetScrollIndicator: () => void;
    clearScrollInterval: () => void;
    isScrolling: Ref<boolean>;
    endScroll: () => void;
};
//# sourceMappingURL=useScrollNearContainerEdges.d.ts.map