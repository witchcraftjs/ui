import { inject } from "vue"

import type { DarkModeCommands, DarkModeState } from "./useDarkMode.js"

import { darkModeCommandsInjectionKey, darkModeStateInjectionKey } from "../injectionKeys.js"

export function useInjectedDarkMode(): DarkModeState & DarkModeCommands {
	const darkModeState = inject(darkModeStateInjectionKey)
	const darkModeCommands = inject(darkModeCommandsInjectionKey)
	if (!darkModeState || !darkModeCommands) {
		throw new Error("useInjectedDarkMode could not find provided state. Did you use useSetupDarkMode?")
	}
	return {
		...darkModeState,
		...darkModeCommands
	}
}
