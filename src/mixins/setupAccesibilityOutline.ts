import { castType } from "@alanscodelog/utils"
import { onBeforeUnmount, onMounted, Ref, ref, watch } from "vue"

/**
 * Returns a reactive ref that indicates whether the user presses a key *and* produced a change in focus. Used for only providing a `:focus` outline when the user is navigating via the keyboard.
 *
 * Can be optionally passed a reactive ref to enable/disabled the calculation (e.g. based on a user setting). This is returned back by the function in case you want to just use the control variable it auto creates. Event listeners are automatically attached/detached when this is changed.
 *
 * In setup:
 * ```ts
 * const el = ref(null)
 *
 * const {outline, control: outlineControl} = setupAccesibilityOutline(el)
 * outlineControl.value = userSettings.outlineOnlyOnNavigation
 * // or
 * setupAccesibilityOutline(el, userSettings.outlineOnlyOnNavigation)
 *
 * const classes = computed(() =>( {
 * 	// if setting is false => always outline
 * 	outline: !userSettings.outlineOnlyOnNavigation || outline.value
 * }))
 *
 * return {
 * 	classes,
 * 	el
 * }
 * ```
 *
 * In the root app component. Note it requires the element have a tabindex.
 * ```html
 * 	<div id="main" :class="classes" ref="el" tabindex="-1"></div>
 * ```
 *
 * In style of any subcomponents we can now target `:focus` only when the user is navigating with the keyboard.
 *
 * ```scss
 * button {
 * 	.outline &:focus {
 * 		....
 * 	}
 * }
 * ```
 */
export function setupAccesibilityOutline(
	target: Ref<HTMLElement | null>,
	enable: Ref<boolean> = ref(true),
): Record<"outline" | "control", Ref<boolean>> {
	const outline = ref(false)
	const awaitingFocus = ref(false)
	const keydown = (_e: KeyboardEvent): void => {
		awaitingFocus.value = true
		setTimeout(() => {
			awaitingFocus.value = false
		}, 0)
	}
	const mousedown = (_e: MouseEvent): void => {
		awaitingFocus.value = false
		outline.value = false
	}
	const focusin = (_e: FocusEvent): void => {
		if (awaitingFocus.value && enable.value) {
			outline.value = true
		}
	}
	const attach = (): void => {
		castType<Ref<HTMLElement>>(target.value)
		target.value.addEventListener("focusin", focusin)
		target.value.addEventListener("keydown", keydown)
		target.value.addEventListener("mousedown", mousedown)
	}
	const detach = (): void => {
		castType<Ref<HTMLElement>>(target.value)
		target.value.removeEventListener("focusin", focusin)
		target.value.removeEventListener("keydown", keydown)
		target.value.removeEventListener("mousedown", mousedown)
	}

	watch(enable, (newVal, oldVal) => {
		if (newVal === oldVal) return
		if (newVal) {
			attach()
		} else {
			outline.value = false
			detach()
		}
	})

	onMounted(() => {
		if (enable.value) {
			attach()
		}
	})
	onBeforeUnmount(() => {
		detach()
	})
	return { outline, control: enable }
}
