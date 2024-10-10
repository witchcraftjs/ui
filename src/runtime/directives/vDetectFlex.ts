import { castType } from "@alanscodelog/utils/castType.js"
import { last } from "@alanscodelog/utils/last.js"
import { throttle } from "@alanscodelog/utils/throttle.js"
import { unreachable } from "@alanscodelog/utils/unreachable.js"
import type { Directive } from "vue"

import { globalResizeObserver } from "../globalResizeObserver.js"
import type { ResizeCallback } from "../types/index.js"


const observer = globalResizeObserver
/**
 * Directive for detecting flex wrap on element. It will bind a resize-observer to the element to detect when it's children have wrapped and add a .wrapped class when they are.
 *
 * The directive throttles the observer callback by 50ms by default and ignored children elements with the `.detect-flex-ignore` selector, both are configurable.
 *
 * If you only want the listener attached sometimes you can pass `{condition:yourCondition}`, this option is reactive.
 *
 * By default it detects row wrapping, pass `vertical:true` for column wrapping.
 * ```vue
 * 	<!--parent-->
 * 	<div v-detect-flex="{vertical: false, condition: yourCondition, ignoreSelector: `detect-flex-ignore`, throttle: 500}">
 * 		<div><div/> <!--child-->
 * 		<div><div/> <!--child-->
 * 	</div>
 * ```
 *
 * This just checks the first child element is below the last element, so it might not work in some cases, but for most purposes works fine.
 *
 */
type PrivateState = {
	lastCondition: boolean
	lastThrottleTime: number
	callback?: typeof callback
	vertical: boolean
	ignoreSelector: string
}

const callbacks: Record<number, { count: number, callback: typeof callback }> = {}
const elMap = new WeakMap<HTMLElement, PrivateState>()

function getOrCreateCallback(throttleTime: number): ResizeCallback {
	if (callbacks[throttleTime]) {
		callbacks[throttleTime].count++
	} else {
		callbacks[throttleTime] = { count: 1, callback: throttle(callback, throttleTime) }
	}
	return callbacks[throttleTime].callback
}
function removeCallback(throttleTime: number): void {
	if (callbacks[throttleTime]) {
		callbacks[throttleTime].count--
		if (callbacks[throttleTime].count === 0) delete callbacks[throttleTime]
	}
}

function callback(_rect: DOMRectReadOnly, el: Element): void {
	const _ = elMap.get(el as HTMLElement)
	if (!_) {unreachable()}
	const pos = _.vertical ? "x" : "y"
	const dimension = _.vertical ? "width" : "height"

	castType<HTMLElement>(el)

	const filteredChildren = Array.from(el.children).filter(child => _.ignoreSelector && !child.matches(_.ignoreSelector))
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


export const vDetectFlex: Directive = {
	mounted(el: HTMLElement, { value: { condition = true, vertical = false, throttleTime = 50, ignoreSelector = ".detect-flex-ignore" } = {} }: DetectFlexOptions) {
		const _: PrivateState = {
			vertical,
			lastCondition: condition,
			lastThrottleTime: throttleTime,
			ignoreSelector,
		}
		elMap.set(el, _)
		if (condition) {
			_.callback = getOrCreateCallback(throttleTime)
			observer.observe(el, _.callback)
		}
	},
	updated(el: HTMLElement, { value: { condition = true, vertical = false, throttleTime = 50, ignoreSelector = ".detect-flex-ignore" } = {} }: DetectFlexOptions) {
		const _ = elMap.get(el)
		if (!_) {unreachable()}

		_.vertical = vertical
		_.ignoreSelector = ignoreSelector
		if (throttleTime !== _.lastThrottleTime) {
			if (condition && _.lastCondition) {
				if (!_.callback) unreachable()
				observer.unobserve(el, _.callback)
				removeCallback(_.lastThrottleTime)
				_.callback = getOrCreateCallback(throttleTime)
				observer.observe(el, _.callback)
			}
			_.lastThrottleTime = throttleTime
		}
		if (condition !== _.lastCondition) {
			_.lastCondition = condition
			if (condition) {
				_.callback = getOrCreateCallback(throttleTime)
				observer.observe(el, _.callback)
			} else {
				if (!_.callback) unreachable()
				observer.unobserve(el, _.callback)
				removeCallback(throttleTime)
				_.callback = undefined
			}
		}
	},
	unmounted(el: HTMLElement, { value: { vertical = false, throttleTime = 50, ignoreSelector = ".detect-flex-ignore" } = {} }: DetectFlexOptions) {
		const _ = elMap.get(el)
		if (!_) {unreachable()}
		_.vertical = vertical
		_.ignoreSelector = ignoreSelector
		_.lastThrottleTime = throttleTime
		if (_.lastCondition) {
			if (!_.callback) unreachable()
			observer.unobserve(el, _.callback)
			_.callback = undefined
		}
	},
	getSSRProps() {
		return {}
	},
}
type DetectFlexOptions = {
	value: {
		condition?: boolean
		vertical?: boolean
		throttleTime?: number
		ignoreSelector?: string
	}
}
