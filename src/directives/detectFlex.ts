import { castType, last, throttle } from "@alanscodelog/utils"
import type { Directive } from "vue"

/**
 * Directive for detecting flex wrap on element. It will bind a resize-observer to the element to detect when it's children have wrapped and add a .wrapped class when they are.
 *
 * The directive throttles the observer by 50ms by default and ignored children elements with the `.detect-flex-ignore` selector, both are configurable when you register the directive.
 * ```ts
 * // in main.ts
 * app.directive("detect-flex", detectFlex())
 * // change the throttle and ignore selector
 * app.directive("detect-flex", detectFlex(100, `.ignore`))
 *
 * // or in component:
 * {
 * 	directives: {
 * 		detectFlex: detectFlex()
 * 	}
 * }
 * ```
 * Then in the template:
 * ```
 * 	<div v-detect-flex> <!--parent-->
 * 		<div><div/> <!--child-->
 * 		<div><div/> <!--child-->
 * 	</div>
 * ```
 *
 * This just checks the first child element is below the last element, so it might not work in some cases, but for most purposes works fine.
 *
 *
 * By default it detects row wrapping, pass `vertical:true` for column wrapping.
 *
 * None of the above options can be reactive (yet), if they change nothing will change.
 *
 * If you only want the listener attached sometimes you can pass `{condition:yourCondition}`, this option is reactive.
 */
// const addClass = (el: HTMLElement) => () => el.classList.add("wrapped")
// const removeClass = (el: HTMLElement) => () => el.classList.remove("wrapped")
export const detectFlex = (throttleTime: number = 50, ignoreSelector = ".detect-flex-ignore"): Directive => {
	function createObserver(vertical: boolean): ResizeObserver {
		const pos = vertical ? "x" : "y"
		const dimension = vertical ? "width" : "height"
		const flexWrapDetector = (elements: ResizeObserverEntry[]): void => {
			for (const el of elements) {
				const t = el.target
				castType<HTMLElement>(t)

				const filteredChildren = Array.from(t.children).filter(child => !child.matches(ignoreSelector))
				const firstChild = filteredChildren[0]
				const lastChild = last(filteredChildren)

				if (firstChild === undefined || firstChild === lastChild) {
					// eslint-disable-next-line no-console
					console.warn("detect-flex directive detected there are less than two child elements.")
					// eslint-disable-next-line no-console
					console.warn(t)
					t.classList.remove("wrapped")
					return
				}

				const firstRect = firstChild.getBoundingClientRect()
				const lastRect = lastChild.getBoundingClientRect()


				// should work even if the flex items are different heights
				// only exceptions i think are if the element aligns itself below another element somehow
				// rounded to nearest 10th since getBoundingClientRect can have rounding errors
				if (Math.round(10 * (firstRect[pos] + firstRect[dimension] - lastRect[pos])) * 10 <= 0) {
					t.classList.add("wrapped")
				} else {
					t.classList.remove("wrapped")
				}
			}
		}
		const throttledDetector = throttle(flexWrapDetector, throttleTime)
		// let throttledDetector = flexWrapDetector
		const ro = new ResizeObserver(throttledDetector)
		return ro
	}

	const verticalDetector = createObserver(true)
	const horizontalDetector = createObserver(false)
	let lastCondition = false

	return {
		mounted(el: HTMLElement, { value: { condition = true, vertical = false } = {} }: DetectFlexOptions) {
			if (condition) {
				lastCondition = condition
				vertical
				? verticalDetector.observe(el)
				: horizontalDetector.observe(el)
			}
		},
		updated(el: HTMLElement, { value: { condition = true, vertical = false } = {} }: DetectFlexOptions) {
			if (condition !== lastCondition) {
				lastCondition = condition
				if (condition) {
					vertical
						? verticalDetector.observe(el)
						: horizontalDetector.observe(el)
				} else {
						vertical
						? verticalDetector.unobserve(el)
						: horizontalDetector.unobserve(el)
				}
			}
		},
		unmounted(el: HTMLElement, { value: { vertical = false } = {} }: DetectFlexOptions) {
			vertical
				? verticalDetector.unobserve(el)
				: horizontalDetector.unobserve(el)
		},
	}
}
type DetectFlexOptions = {
	value: { condition?: boolean, vertical?: boolean }
}
