import type { Theme } from "metamorphosis/Theme"
import { customRef, onScopeDispose, type Ref } from "vue"

/**
 * Wraps a Theme instance to provide Vue-compatible reactive wrappers for CSS output and registered entries.
 * ```ts
 * const theme = new Theme({ bg, fg, accent })
 * const { theme, css, entries } = useMetamorphosisTheme(theme)
 * ```
 */
export function useMetamorphosisTheme(
	/** The plain Theme instance. */
	theme: Theme<any>
): {
	/** Direct access to the raw Theme instance. */
	instance: Theme<any>
	/** Read-only ref containing the computed CSS variable map. */
	css: Ref<Theme<any>["css"]>
	/** Read-only. */
	value: Ref<Theme<any>["value"]>
} {
	let triggerVueUpdate: () => void = () => {}
	let triggerEntriesUpdate: () => void = () => {}

	const cssRef = customRef((track, trigger) => {
		triggerVueUpdate = trigger
		return {
			get() {
				track()
				return theme.css
			},
			set() {
				throw new Error("Cannot set theme CSS directly.")
			}
		}
	})

	const valueRef = customRef((track, trigger) => {
		triggerEntriesUpdate = trigger
		return {
			get() {
				track()
				return theme.value
			},
			set() {
				throw new Error("Cannot set theme entries directly.")
			}
		}
	})

	const listener = {
		notify: () => {
			triggerVueUpdate()
			triggerEntriesUpdate()
		}
	}
	theme.on("change", listener.notify)

	onScopeDispose(() => {
		theme.off("change", listener.notify)
	})

	return {
		instance: theme,
		css: cssRef,
		value: valueRef
	}
}
