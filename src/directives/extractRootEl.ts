import type { Directive } from "vue"

/**
 * Vue 3 no longer allows extracting the root element from a component.
 *
 * This allows us to extract it via a callback.
 *
 * Note the callback will be called on mount/unmount to keep the value up to date and make it null if the element disappears.
 *
 * One can create a ref:
 * ```ts
 * import { extractRootEl as vExtractRootEl } from "@alanscodelog/vue-components/directives"
 * const el = ref<HTMLElement|null>(null)
 *
 * ```
 * Then in the template
 * ```vue
 * <SomeComponent v-extract-root-el="_ => el = _" />
 * ```
 *
 * Currently only tested with single root elements.
 */
export const extractRootEl: Directive = {
	mounted(el: HTMLElement, { value: callback }: Options) {
		callback(el)
	},
	unmounted(_el: HTMLElement, { value: callback }: Options) {
		callback(null)
	},
	getSSRProps() {
		return {}
	},
}
type Options = {
	value: (el: HTMLElement | null) => void
}
