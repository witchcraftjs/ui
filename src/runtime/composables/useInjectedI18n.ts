import { inject } from "vue"

import type { TranslationFunction } from "./useSetupI18n.js"

import { i18nInjectionKey, translationMessagesInjectionKey } from "../injectionKeys.js"

export function useInjectedI18n(): TranslationFunction {
	const val = inject(i18nInjectionKey, undefined)
	const messages = inject(translationMessagesInjectionKey, undefined)

	if (val === undefined) {
		throw new Error("witchcraft/ui: i18n is not injected. See useSetupI18n.")
	}

	if (messages === undefined) {
		throw new Error("witchcraft/ui: The default translation function requires the useSetupI18n `useBuiltinTranslations` options to be true. Did you set it?")
	}
	return (key: string, replacements?: Record<string, any>) =>
		val(key, replacements, messages)
}
