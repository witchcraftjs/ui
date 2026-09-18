import { type Ref } from "vue";
import type { Point } from "../types/index.js";
/**
 * A composable for dragging items only after a certain threshold of movement has been reached.
 *
 * What to do with the actual pointer coordinates is up to you.
 *
 * The is compatible with the `useScrollNearContainerEdges` composable as well.
 *
 * ```ts
 * const {
 * 	pointerCoords,
 * 	passedDragThreshold,
 * 	startDragThresholdCheck,
 * 	endDragThresholdCheck,
 * 	checkDragThreshold,
 * } = useDragWithThreshold({ threshold: ref(5) })
 *
 * function grabPointerDown(e: PointerEvent): void {
 * 	startDragThresholdCheck(e)
 * 	e.preventDefault()
 *
 * 	document.addEventListener("pointermove", grabPointerMove)
 * 	document.addEventListener("pointerup", grabPointerUp)
 * 	document.addEventListener("keyup", escapeDrag)
 * }
 * function grabPointerMove(e: PointerEvent): void {
 * 	e.preventDefault()
 * 	checkDragThreshold(e)
 * 	if (passedDragThreshold.value) {
 *
 * 	}
 * }
 * function grabPointerUp(e: PointerEvent): void {
 * 	if (passedDragThreshold.value) {
 *			// drag
 * 	} else  {
 * 		// handleAsClick(e)
 * 	}
 * 	stopDrag()
 * }
 *
 * function stopDrag(): void {
 * 	endDragThresholdCheck()
 * 	document.removeEventListener("keyup", escapeDrag)
 * 	document.removeEventListener("pointermove", grabPointerMove)
 * 	document.removeEventListener("pointerup", grabPointerUp)
 * }
 *
 * function escapeDrag(e: KeyboardEvent): void {
 * 	if (e.code === "Escape") stopDrag()
 * }
 * ```
 */
export declare const useDragWithThreshold: ({ initialOffset, pointerCoords, threshold }?: {
    initialOffset?: Ref<Point | undefined>;
    pointerCoords?: Ref<Point | undefined>;
    threshold?: Ref<number>;
}) => {
    initialOffset: Ref<Point | undefined, Point | undefined>;
    pointerCoords: Ref<Point | undefined, Point | undefined>;
    threshold: Ref<number, number>;
    passedDragThreshold: Ref<boolean, boolean>;
    getEventCoords: (e: {
        clientX: number;
        clientY: number;
    }) => Point;
    checkDragThreshold: (e: PointerEvent) => void;
    startDragThresholdCheck: (e: PointerEvent) => void;
    endDragThresholdCheck: () => void;
};
//# sourceMappingURL=useDragWithThreshold.d.ts.map