import { type Ref } from "vue";
/**
 * Returns a reactive ref that indicates whether the user presses a key *and* produced a change in focus. Used for only providing a `:focus` outline when the user is navigating via the keyboard.
 *
 * Can be optionally passed a reactive ref to enable/disabled the calculation (e.g. based on a user setting). This is returned back by the function in case you want to just use the control variable it auto creates. Event listeners are automatically attached/detached when this is changed.
 *
 * In setup:
 * ```ts
 * const el = ref(null)
 *
 * const {outline, control: outlineControl} = useAccesibilityOutline(el)
 * outlineControl.value = userSettings.outlineOnlyOnNavigation
 * // or
 * useAccesibilityOutline(el, userSettings.outlineOnlyOnNavigation)
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
 * 	<div id="app" :class="classes" ref="el" tabindex="-1"></div>
 * ```
 *
 * In style of any subcomponents we can now target `:focus` only when the user is navigating with the keyboard.
 *
 * ```css
 * .outline button:focus {
 * 	....
 * }
 * ```
 *
 */
export declare function useAccesibilityOutline(target: Ref<HTMLElement | null>, enable?: Ref<boolean>): Record<"outline" | "control", Ref<boolean>>;
//# sourceMappingURL=useAccesibilityOutline.d.ts.map