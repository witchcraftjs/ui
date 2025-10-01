import { reactive } from "vue"

/**
 * Helper for managing props passed to slots and their fallbacks.
 *
 * Most slots have a default style but vue makes it hard to pass them both to the slot and the fallback content without repitition.
 *
 * This helper allows setting the variables from the template when creating the slot WHILE also using the created state without having to use any wrapper components, {@link https://github.com/vuejs/core/issues/1172 | see also this issue}.
 *
 * @example
 * ```vue
 * <template>
 * 	<div>
 * 		<slot
 * 			v-bind="setSlotVar('title', {
 * 				class: 'title focus-outline flex rounded-sm font-bold'
 * 				someOtherProp: true
 * 			})"
 * 		>
 * 			<FallbackComponent v-bind="slotVars.title"/>
 * 		<slot/>
 * 	</div>
 * </template>
 * <script setup lang="ts">
 * import { useSlotVars } from "@witchcraft/ui/composables/useSlotVars"
 * const { slotVars, setSlotVar } = useSlotVars()
 * </script>
 * ```
 * The magic is that setSlotVar both sets and returns the value for the slot name passed. You can then access the state in a fallback component by accessing slotVars[slotName]. Unfortunately this is untyped unless you set the generic in useSlotsVars, but we usually don't need them to be typed.
 */
export function useSlotVars<T extends Record<string, Record<string, any>>, TKey extends keyof T>() {
	const state = reactive<Record<TKey, Record<string, any>>>({} as any)
	function setSlotVar<T extends Record<string, any>>(name: TKey, obj: T): T {
		state[name as keyof typeof state] = obj as any
		return state[name as keyof typeof state] as T
	}
	return {
		slotVars: state,
		setSlotVar
	}
}
