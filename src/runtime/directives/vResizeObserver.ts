import type { Directive } from "vue"

import { globalResizeObserver } from "../globalResizeObserver.js"
import type { ResizeCallback } from "../types/index.js"

const observer = globalResizeObserver
const lastCondition = Symbol("lastCondition")
const checkCallback = (cb: any): void => {
	if (cb === undefined) {
		throw new Error("No callback function passed to resize observer directive.")
	}
}
export const vResizeObserver: Directive = {
	mounted(el: HTMLElement, { value: { condition = true, callback } }: Options) {
		if (condition) {
			observer.observe(el, callback)
		}
		checkCallback(callback)
	},
	updated(el: HTMLElement, { value: { condition = true, callback } }: Options) {
		if (condition !== (el as any)[lastCondition]) {
			(el as any)[lastCondition] = condition
			if (condition) {
				observer.observe(el, callback)
			} else {
				observer.unobserve(el, callback)
			}
		}
		checkCallback(callback)
	},
	unmounted(el: HTMLElement, { value: { callback } }: Options) {
		observer.unobserve(el, callback)
		delete (el as any)[lastCondition]
	},
	getSSRProps() {
		return {}
	}
}
type Options = {
	value: {
		condition?: boolean
		callback: ResizeCallback
	}
}
