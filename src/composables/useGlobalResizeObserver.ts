import type { AnyFunction } from "@alanscodelog/utils"
import { onMounted, onUnmounted, type Ref, watch } from "vue"

import { globalResizeObserver } from "../globalResizeObserver.js"


export const useGlobalResizeObserver = (el: Ref<HTMLElement | null>, cb: AnyFunction): void => {
	onMounted(() => {
		watch(el, (_newval, oldval) => {
			if (el.value) {
				globalResizeObserver.observe(el.value, cb)
			} else {
				if (oldval) {
					globalResizeObserver.unobserve(oldval, cb)
				}
			}
		}, { immediate: true })
	})
	// todo is this needed?
	onUnmounted(() => {
		if (el.value) {
			globalResizeObserver.unobserve(el.value, cb)
		}
	})
}
