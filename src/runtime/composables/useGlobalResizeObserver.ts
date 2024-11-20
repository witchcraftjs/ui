import type { AnyFunction } from "@alanscodelog/utils"
import { onBeforeUnmount, onMounted, type Ref, watch } from "vue"

import { globalResizeObserver } from "../globalResizeObserver.js"


export const useGlobalResizeObserver = (el: Ref<HTMLElement | null>, cb: AnyFunction): void => {
	let wasMounted = false
	// in case we accidentally use it in an onMounted hook or somewhere where the element already exists
	if (el.value) {
		wasMounted = true
		globalResizeObserver.observe(el.value, cb)
	}
	onMounted(() => {
		watch(el, (_newval, oldval) => {
			if (el.value) {
				globalResizeObserver.observe(el.value, cb)
			} else {
				if (oldval) {
					globalResizeObserver.unobserve(oldval, cb)
				}
			}
		})
		if (el.value && !wasMounted) {
			globalResizeObserver.observe(el.value, cb)
		}
	})
	onBeforeUnmount(() => {
		if (el.value) {
			globalResizeObserver.unobserve(el.value, cb)
		}
	})
}
