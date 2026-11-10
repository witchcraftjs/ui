import { onBeforeMount, onMounted, type Ref } from "vue"
/**
 *
 * This takes the value of the element at the given id (onBeforeMount, i.e. pre-hydration if available), and sets the given ref to that value onMounted.
 *
 * Checkboxes and radios report their state through `checked`, not `value` (a checkbox's `value` is always "on"). A checked checkbox writes `true`, a checked radio writes its own `value`, an unchecked one writes nothing and leaves the ref alone.
 *
 * This should be compatible with both nuxt and vue.
 *
 * Nore that while it's generic, you will need to provide a transform function to convert the string to the desired type.
 *
 * @experimental
 */
export function usePreHydrationValue<T>(
	id: string,
	refVal: Ref<T>,
	transform: (val: string) => T = val => val as any
): void {
	// directly setting it in the onBeforeMount hook doesn't work
	let temp: string | boolean = ""
	onBeforeMount(() => {
		const el = document.getElementById(id) as HTMLInputElement
		if (!el) return
		temp = el.type === "checkbox"
			? el.checked
			: el.type === "radio"
				? el.checked ? el.value : ""
				: el.value
	})
	onMounted(() => {
		if (!temp) return
		refVal.value = (typeof temp === "boolean" ? temp : transform(temp)) as T
	})
}
