import { inject } from "vue"

import type { useSetupLocale } from "./useSetupLocale.js"

import { languageLocaleInjectionKey, timeLocaleInjectionKey } from "../injectionKeys.js"

export function useInjectedLocale(): ReturnType<typeof useSetupLocale> {
	const timeLocale = inject(timeLocaleInjectionKey)
	const languageLocale = inject(languageLocaleInjectionKey)
	if (timeLocale === undefined || languageLocale === undefined) {
		throw new Error("useInjectedLocale could not find provided state. Did you use useSetupLocale?")
	}
	function setLanguageLocale(value: string): void {
		languageLocale!.value = value
	}
	function setTimeLocale(value: string): void {
		timeLocale!.value = value
	}
	return {
		timeLocale,
		languageLocale,
		setLanguageLocale,
		setTimeLocale
	}
}
