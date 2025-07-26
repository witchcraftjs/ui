import { computed, type InjectionKey, onMounted, provide, type Ref,ref, watch } from "vue"


const defaultLocalStorageKey = "prefersColorSchemeDark"
const defaultOrder = ["system", "dark", "light"] as const
/** @deprecated */
const injectionKey = Symbol("isDarkMode") as InjectionKey<Ref<boolean>>
/** @deprecated */
const manualInjectionKey = Symbol("manualDarkMode") as InjectionKey<Ref<boolean | undefined>>
const commandsInjectionKey = Symbol("darkModeCommands") as InjectionKey<DarkModeCommands>
const stateInjectionKey = Symbol("darkModeState") as InjectionKey<DarkModeState>

/**
 * @deprecated Use `useSetupDarkMode` instead.
 *
 * A composable for setting up dark mode that automatically takes care of saving the user's preference.
 *
 * See the returned utilities for more details.
 *
 * It also provides injection keys with a ref so it can be accessed in deep nested components if needed. Alternatively you can use `useInjectedDarkMode` for ease of use.
 *
 * Note that this should only be called once at the root of the app.
 */
export const useDarkMode = ({
	useLocalStorage = true,
	darkModeOrder = defaultOrder,
	/** True by default, should be passed import.meta.client if using nuxt, or false when running server side. */
	isClientSide = true
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
		manualDarkMode.value =
			value === "dark"
			? true
			: value === "light"
			? false
			: undefined
	}
	function cycleDarkMode(): void {
		const index = darkModeOrder.indexOf(darkModeState.value)

		if (index === 2) {
			setDarkMode(darkModeOrder[0]!)
		} else {
			setDarkMode(darkModeOrder[index + 1]!)
		}
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
	provide(injectionKey, darkMode)
	provide(manualInjectionKey, manualDarkMode)

	provide(stateInjectionKey, {
		darkMode,
		darkModeState,
		manualDarkMode,
		systemDarkMode,
	})
	provide(commandsInjectionKey, {
		setDarkMode,
		cycleDarkMode,
	})

	return {
		darkMode,
		darkModeState,
		setDarkMode,
		cycleDarkMode,
		manualDarkMode,
		systemDarkMode,
	}
}
export const defaultDarkModeOrder = defaultOrder

export const isDarkModeInjectionKey = injectionKey

export const manualDarkModeInjectionKey = manualInjectionKey

export const darkModeCommandsInjectionKey = commandsInjectionKey

export const darkModeStateInjectionKey = stateInjectionKey


export type DarkModeOptions = {
	/* Whether to save the manual dark mode to local storage. Uses the key "prefersColorSchemeDark" by default. You can pass a key instead of true to use that as the key instead. */
	useLocalStorage?: boolean | string
	/* The order of the string dark modes when using `cycleDarkMode`. Defaults to `["system", "dark", "light"]` */
	darkModeOrder?: readonly ("system" | "dark" | "light")[]
	/** True by default, should be passed import.meta.client if using nuxt, or false when running server side. */
	isClientSide?: boolean
}

 
export interface DarkModeCommands {
	setDarkMode: (value: "dark" | "light" | "system") => void
	cycleDarkMode: () => void
}

 
export interface DarkModeState {
	/** Whether the dark mode should be enabled or not */
	darkMode: Ref<boolean>
	/** The current state of the darkMode but as a string (dark, light, system) */
	darkModeState: Ref<"dark" | "light" | "system">
	/** The value of the manuably controllable dark mode. You can set this to true/false or undefined to allow the systemDarkMode to take priority. Alternatively use setDarkMode instead. */
	manualDarkMode: Ref<boolean | undefined>
	/** The value of the system dark mode. This is automatically set depending on the user's `prefer-color-scheme` and should not be set directly. */
	systemDarkMode: Ref<boolean>

}
