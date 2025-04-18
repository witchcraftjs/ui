import { reactive, type Ref, ref } from "vue"

import type { ScrollNearContainerEdgesOptions } from "../types/index.js"


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
 
export const useScrollNearContainerEdges = ({
	containerEl,
	scrollMargin = 10,
	outerScrollMargin,
	fastPixelMultiplier = 4,
	fastPixelAmount,
	useTimer = true,
	timerInterval = 1,
}: ScrollNearContainerEdgesOptions): {
		scrollEdges: (clientX: number, clientY: number, overrideUseTimer?: boolean) => void
		/** Reactive. */
		scrollIndicator: { left: boolean, right: boolean, down: boolean, up: boolean }
		resetScrollIndicator: () => void
		clearScrollInterval: () => void
		isScrolling: Ref<boolean>
		endScroll: () => void
	} => {
	fastPixelMultiplier = fastPixelAmount !== undefined ? fastPixelAmount * 2 : fastPixelMultiplier
	const scrollIndicator = reactive({ left: false, right: false, down: false, up: false })
	const isScrolling = ref(false)
	const resetScrollIndicator = (): void => {
		scrollIndicator.right = false
		scrollIndicator.left = false
		scrollIndicator.up = false
		scrollIndicator.down = false
		isScrolling.value = false
	}
	let timer: ReturnType<typeof setTimeout>

	const scrollContainerRelative = (x: number, y: number): void => {
		const el = containerEl.value
		if (!el) return
		const leftSpace = el.scrollLeft
		const topSpace = el.scrollTop
		el.scroll(leftSpace + x, topSpace + y)
	}

	const move = { x: 0, y: 0 }
	const resetMove = (): void => {
		move.x = 0; move.y = 0
	}
	const m = scrollMargin
	const M = outerScrollMargin ?? 0

	const tryScrollContainer = (x: number, y: number): void => {
		const el = containerEl.value
		if (!el) return
		const box = el.getBoundingClientRect()
		
		/*
		     rightRightLimit│
		                    │
		  rightLeftLimit│   │
		                │   ▼
		┌───────────────┼───┐
		│OuterLimit     │   │
		│ ┌─────────────┴─┐ │
		│ │Container    ▼ │ │
		│ │ ┌───────────┐ │ │
		│ │ │InnerLimit │ │ │
		│ │ └───────────┘ │ │
		│ └───────────────┘ │
		└───────────────────┘
		*/
		const leftLimit = box.x
		const rightLimit = box.x + box.width
		const topLimit = box.y
		const bottomLimit = box.y + box.height

		const leftLeftLimit = leftLimit - M
		const leftRightLimit = leftLimit + m
		const rightLeftLimit = rightLimit - M
		const rightRightLimit = rightLimit + m

		const topTopLimit = topLimit - M
		const topBottomLimit = topLimit + m
		const bottomTopLimit = bottomLimit - m
		const bottomBottomLimit = bottomLimit + M
		const t = m + M

		resetScrollIndicator()
		resetMove()

		if (x > leftLeftLimit && x < leftRightLimit) {
			const leftSpace = el.scrollLeft
			if (leftSpace > 0) {
				const edgeOffset = ((leftLimit + m) - x) / t
				move.x = -edgeOffset * fastPixelMultiplier
			}
		} else if (x > rightLeftLimit && x < rightRightLimit) {
			const rightSpace = (el.scrollWidth - el.scrollLeft) - Math.round(box.width)
			if (rightSpace > 0) {
				const edgeOffset = (x - (rightLimit - m)) / t
				move.x = edgeOffset * fastPixelMultiplier
			}
		}
		if (y > topTopLimit && y < topBottomLimit) {
			const topSpace = el.scrollTop
			if (topSpace > 0) {
				const edgeOffset = ((topLimit + m) - y) / t
				move.y = -edgeOffset * fastPixelMultiplier
			}
		} else if (y > bottomTopLimit && y < bottomBottomLimit) {
			const bottomSpace = (el.scrollHeight - el.scrollTop) - Math.round(box.height)
			if (bottomSpace > 0) {
				const edgeOffset = (y - (bottomLimit - m)) / t
				move.y = edgeOffset * fastPixelMultiplier
			}
		}
		if (move.x !== 0 || move.y !== 0) {
			isScrolling.value = true
			scrollIndicator.right = move.x > 0
			scrollIndicator.left = move.x < 0
			scrollIndicator.up = move.y < 0
			scrollIndicator.down = move.y > 0
			scrollContainerRelative(move.x, move.y)
		}
	}
	const clearScrollInterval = (): void => {
		clearInterval(timer)
	}

	const scrollEdges = (clientX: number, clientY: number, overrideUseTimer?: boolean): void => {
		clearInterval(timer)
		tryScrollContainer(clientX, clientY)

		if (overrideUseTimer ? overrideUseTimer : useTimer) {
			timer = setInterval(() => {
				tryScrollContainer(clientX, clientY)
			}, timerInterval)
		}
	}
	const endScroll = (): void => {
		clearScrollInterval()
		resetScrollIndicator()
		resetMove()
	}
	return {
		scrollEdges,
		scrollIndicator,
		resetScrollIndicator,
		clearScrollInterval,
		isScrolling,
		endScroll,
		/* resetMove does not need to be returned since the user cannot call the timer interval manually and the scrollContainer function resets it before starting. */
	}
}
