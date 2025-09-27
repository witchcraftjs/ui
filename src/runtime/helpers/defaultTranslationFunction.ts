import { inject } from "vue"

import { translationMessagesInjectionKey } from "../injectionKeys.js"


/**
 * A default translation function to use with `useSetupI18n`. Requires at least one set of translation message sets (or a dummy) be loaded (the useSetupI18n function takes care of setting up a temporary dummy if you set `useBuiltinTranslations: true`).
 *
 * It can take a simple replacement object as the second argument, it's keys in the form `{key}` will be replace with the given value.
 *
 * For example:
 * ```js
 * const messages = {
 * 	"some-message": "This is a {key}",
 * }
 *
 * t("some-message", { key: "message" })
 * ```
 * Would return "This is a message".
 */

export function defaultTranslationFunction(key: string, replacements?: Record<string, any>): string {
	const messages = inject(translationMessagesInjectionKey)
	if (messages === undefined) throw new Error("witchcraft/ui: The default translation function requires the useSetupI18n `useBuiltinTranslations` options to be true. Did you set it?")
	let value = (messages.value)["witchcraft-ui"][key]
	if (value === undefined) throw new Error(`No translation for key ${key}.`)
	if (replacements !== undefined) {
		for (const [k, val] of Object.entries(replacements)) {
			value = value.replaceAll(`{${k}}`, val)
		}
	}
	return value
}
