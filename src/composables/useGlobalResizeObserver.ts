import { onBeforeUnmount, onMounted, type Ref, watch } from "vue"

import type { AnyFunction } from "@alanscodelog/utils"

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
	onBeforeUnmount(() => {
		if (el.value) {
			globalResizeObserver.unobserve(el.value, cb)
		}
	})
}
