import type { Directive } from "vue"

import { castType } from "@alanscodelog/utils/castType"
import { last } from "@alanscodelog/utils/last"
import { throttle } from "@alanscodelog/utils/throttle"

import { globalResizeObserver } from "../globalResizeObserver.js"
import type { ResizeCallback } from "../types.js"


const observer = globalResizeObserver
const lastCondition = Symbol("lastConditition")
const dir = Symbol("dir")
/**
 * Directive for detecting flex wrap on element. It will bind a resize-observer to the element to detect when it's children have wrapped and add a .wrapped class when they are.
 *
 * The directive throttles the observer callback by 50ms by default and ignored children elements with the `.detect-flex-ignore` selector, both are configurable when you register the directive.
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
 * If you only want the listener attached sometimes you can pass `{condition:yourCondition}`, this option is reactive.
 */
// const addClass = (el: HTMLElement) => () => el.classList.add("wrapped")
// const removeClass = (el: HTMLElement) => () => el.classList.remove("wrapped")

export const detectFlex = (throttleTime: number = 50, ignoreSelector = ".detect-flex-ignore"): Directive => {
	const callback: ResizeCallback = (_rect, el) => {
		const vertical = (el as any)[dir] as boolean
		const pos = vertical ? "x" : "y"
		const dimension = vertical ? "width" : "height"

		castType<HTMLElement>(el)

		const filteredChildren = Array.from(el.children).filter(child => !child.matches(ignoreSelector))
		const firstChild = filteredChildren[0]
		const lastChild = last(filteredChildren)

		if (firstChild === undefined || firstChild === lastChild) {
			// eslint-disable-next-line no-console
			console.warn("detect-flex directive detected there are less than two child elements.")
			// eslint-disable-next-line no-console
			console.warn(el)
			el.classList.remove("wrapped")
			return
		}

		const firstRect = firstChild.getBoundingClientRect()
		const lastRect = lastChild.getBoundingClientRect()


		// should work even if the flex items are different heights
		// only exceptions i think are if the element aligns itself below another element somehow
		// rounded to nearest 10th since getBoundingClientRect can have rounding errors
		if (Math.round(10 * (firstRect[pos] + firstRect[dimension] - lastRect[pos])) * 10 <= 0) {
			el.classList.add("wrapped")
		} else {
			el.classList.remove("wrapped")
		}
	}

	const throttledCallback = throttle(callback, throttleTime)

	return {
		mounted(el: HTMLElement, { value: { condition = true, vertical = false } = {} }: DetectFlexOptions) {
			(el as any)[dir] = vertical
			if (condition) {
				(el as any)[lastCondition] = condition
				observer.observe(el, throttledCallback)
			}
		},
		updated(el: HTMLElement, { value: { condition = true, vertical = false } = {} }: DetectFlexOptions) {
			(el as any)[dir] = vertical
			if (condition !== (el as any)[lastCondition]) {
				(el as any)[lastCondition] = condition
				if (condition) {
					observer.observe(el, throttledCallback)
				} else {
					observer.unobserve(el, throttledCallback)
				}
			}
		},
		unmounted(el: HTMLElement, { value: { vertical = false } = {} }: DetectFlexOptions) {
			(el as any)[dir] = vertical
			observer.unobserve(el, throttledCallback)
		},
	}
}
type DetectFlexOptions = {
	value: { condition?: boolean, vertical?: boolean }
}
