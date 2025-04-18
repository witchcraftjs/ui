import { inject } from "vue"

import { i18nInjectionKey } from "./useSetupI18n.js"
import { type TranslationFunction } from "./useSetupI18n.js"

export function useInjectedI18n(): TranslationFunction {
	const val = inject(i18nInjectionKey, undefined)
	if (val === undefined) throw new Error("witchcraft/ui: i18n is not injected. See useSetupI18n.")
	return val
}
