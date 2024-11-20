import { onBeforeUnmount, onMounted, provide, type Ref,ref } from "vue"

const injectionKey = Symbol("showDevOnly")
/**
	* For nuxt only.
	*
	* Communicates with the dev only component to show/hide it depending on a keypress (single key, no modifiers, `F1` by default). 	*
	*/
export function useShowDevOnlyKey(key: string = "F1"): void {
	if (!import.meta.dev) return
	const showDevOnly = ref(false)
	provide(injectionKey, showDevOnly)

	const listener = (e: KeyboardEvent) => {
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

export const showDevOnlyInjectionKey = injectionKey
