import type { InjectionKey, Ref } from "vue"
import { computed, nextTick, onMounted, provide, ref, watch } from "vue"

import { darkModeCommandsInjectionKey, darkModeStateInjectionKey } from "../injectionKeys.js"
import type { DarkModeCommands, DarkModeOptions, DarkModeState } from "../types/index.js"
import { defaultDarkModeOrder } from "../types/index.js"


const isDarkModeInjectionKey = Symbol("isDarkMode") as InjectionKey<Ref<boolean>>
const manualDarkModeInjectionKey = Symbol("manualDarkMode") as InjectionKey<Ref<boolean | undefined>>
const defaultLocalStorageKey = "prefersColorSchemeDark"

/**
 * A composable for setting up dark mode that automatically takes care of saving the user's preference.
 *
 * See the returned utilities for more details.
 *
 * Use it's twin, `useInjectedDarkMode` for accessing the injected state and commands in components
 *
 * Note that this should only be called once at the root of the app.
 */
export const useSetupDarkMode = ({
	useLocalStorage = true,
	darkModeOrder = defaultDarkModeOrder,

	isClientSide = true,
	useViewTransition = true
}: DarkModeOptions = {}): DarkModeState & DarkModeCommands => {
	const systemDarkMode = ref(false)
	const manualDarkMode = ref<boolean | undefined>(undefined)

	if (useLocalStorage && isClientSide) {
		watch(manualDarkMode, () => {
			localStorage.setItem(defaultLocalStorageKey, manualDarkMode.value ? "true" : "false")
		})
	}

	const darkMode = computed(() => manualDarkMode.value ?? systemDarkMode.value)
	const darkModeState = computed(() =>
		manualDarkMode.value === undefined
			? "system"
			: manualDarkMode.value
				? "dark"
				: "light"
	)
	// todo move to useinjected
	function setDarkMode(value: "dark" | "light" | "system"): void {
		manualDarkMode.value
			= value === "dark"
				? true
				: value === "light"
					? false
					: undefined
	}

	function getNextValue(): "dark" | "light" | "system" {
		const index = darkModeOrder.indexOf(darkModeState.value)

		return index === 2
			? darkModeOrder[0]!
			: darkModeOrder[index + 1]!
	}

	function _cycleDarkMode(): void {
		setDarkMode(getNextValue())
	}

	function cycleDarkMode(): void {
		if (!useViewTransition) {
			_cycleDarkMode()
			return
		}
		const nextValue = getNextValue()
		const index = darkModeOrder.indexOf(darkModeState.value)
		const systemDarkModeName = systemDarkMode.value ? "dark" : "light"

		if (nextValue === "system" && systemDarkModeName === darkModeOrder[index]) {
			// don't do view transitions if we're not really transitioning
			_cycleDarkMode()
			return
		}
		if (!document.startViewTransition) _cycleDarkMode()
		document.startViewTransition(async () => {
			_cycleDarkMode()
			await nextTick()
		})
	}

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
	provide(isDarkModeInjectionKey, darkMode)
	provide(manualDarkModeInjectionKey, manualDarkMode)

	provide(darkModeStateInjectionKey, {
		darkMode,
		darkModeState,
		manualDarkMode,
		systemDarkMode
	})
	provide(darkModeCommandsInjectionKey, {
		setDarkMode,
		cycleDarkMode
	})

	return {
		darkMode,
		darkModeState,
		setDarkMode,
		cycleDarkMode,
		manualDarkMode,
		systemDarkMode
	}
}

