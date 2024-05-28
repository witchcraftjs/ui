import { computed, onMounted, type Ref,ref, watch } from "vue"


// future add lib name?
const defaultLocalStorageKey = "prefersColorSchemeDark"
export const useDarkMode = ({
	useLocalStorage,
}: { useLocalStorage?: boolean | string } = {}): {
	darkMode: Ref<boolean>
	manualDarkMode: Ref<boolean | undefined>
	systemDarkMode: Ref<boolean>
} => {
	const systemDarkMode = ref(false)
	const manualDarkMode = ref<boolean | undefined>(undefined)
	if (useLocalStorage) {
		watch(manualDarkMode, () => {
			localStorage.setItem(defaultLocalStorageKey, manualDarkMode.value ? "true" : "false")
		})
	}

	const darkMode = computed(() => manualDarkMode.value ?? systemDarkMode.value)

	onMounted(() => {
		window.matchMedia("(prefers-color-scheme: dark)")
			.addEventListener("change", ({ matches }) => {
				if (matches) {
					systemDarkMode.value = true
				} else {
					systemDarkMode.value = false
				}
			})
		if (useLocalStorage !== false) {
			const key = typeof useLocalStorage === "string" ? useLocalStorage : defaultLocalStorageKey
			const value = localStorage.getItem(key)

			if (value === "true") {
				manualDarkMode.value = true
			} else if (value === "false") {
				manualDarkMode.value = false
			}
		}
	})

	return { darkMode, manualDarkMode, systemDarkMode }
}
