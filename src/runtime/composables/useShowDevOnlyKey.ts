import { onBeforeUnmount, onMounted, provide, ref } from "vue"

import { showDevOnlyInjectionKey } from "../injectionKeys.js"

/**
	* For nuxt only.
	*
	* Communicates with the dev only component to show/hide it depending on a keypress (single key, no modifiers, `F1` by default). 	*
	*/
export function useShowDevOnlyKey(key: string = "F1"): void {
	if (!(import.meta as any).dev) return
	const showDevOnly = ref(false)
	provide(showDevOnlyInjectionKey, showDevOnly)

	const listener = (e: KeyboardEvent): void => {
		if (e.key === key && !e.ctrlKey && !e.metaKey && !e.altKey) {
			showDevOnly.value = !showDevOnly.value
			e.preventDefault()
		}
	}
	onMounted(() => {
		document.addEventListener("keydown", listener)
	})
	onBeforeUnmount(() => {
		document.removeEventListener("keydown", listener)
	})
}

