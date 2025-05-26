import { type Ref, ref } from "vue"

import type { Point } from "../types/index.js"


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
export const useDragWithThreshold = ({
	initialOffset = ref({ x: 0, y: 0 }),
	pointerCoords = ref({ x: 0, y: 0 }),
	threshold = ref(10),
}: {
	initialOffset?: Ref<Point | undefined>
	pointerCoords?: Ref<Point | undefined>
	threshold?: Ref<number>
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
} = {}) => {
	const passedDragThreshold = ref(false)
	function getDistance(p1: Point, p2: Point): number {
		const xDiff = p2.x - p1.x
		const yDiff = p2.y - p1.y

		return Math.sqrt((xDiff * xDiff) + (yDiff * yDiff))
	}

	function getEventCoords(e: { clientX: number, clientY: number }): Point {
		return { x: e.clientX, y: e.clientY }
	}

	function checkDragThreshold(e: PointerEvent): void {
		pointerCoords.value = getEventCoords(e)
		// don't allow it to be reset to false
		passedDragThreshold.value ||=
		initialOffset.value !== undefined &&
			getDistance(initialOffset.value, pointerCoords.value) >= threshold.value
	}
	function startDragThresholdCheck(e: PointerEvent): void {
		passedDragThreshold.value = false
		initialOffset.value = getEventCoords(e)
		pointerCoords.value = getEventCoords(e)
	}
	function endDragThresholdCheck(): void {
		passedDragThreshold.value = false
		initialOffset.value = undefined
		pointerCoords.value = undefined
	}
	return {
		initialOffset,
		pointerCoords,
		threshold,
		passedDragThreshold,
		getEventCoords,
		checkDragThreshold,
		startDragThresholdCheck,
		endDragThresholdCheck,
	}
}

