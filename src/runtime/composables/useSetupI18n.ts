import {
	type InjectionKey,
	provide,
	type Ref,
	ref,
	watch,
} from "vue"

import { defaultTranslationFunction } from "../helpers/defaultTranslationFunction.js"


export type TranslationFunction = (key: string, replacements?: Record<string, any>) => string

const _i18nInjectionKey = Symbol("witchcraftUiI18n") as InjectionKey<TranslationFunction>
const _translationMessagesInjectionKey = Symbol("witchcraftUiI18nMessages") as InjectionKey<Ref<Record<string, any>>>

const messagesGlob = import.meta.glob("../assets/locales/*.json")
const loaded: Record<string, any> = {}
const dummyLibraryMessages = new Proxy({}, {
	get() {
		return "..."
	},
})
const dummyMessageSet = new Proxy({}, {
	get(_, key: string) {
		if (key === "witchcraft-ui") {
			return dummyLibraryMessages
		} else return undefined
	},
})


/**
 * A composable for providing a translation function + messages for the library. Note the Root component already takes care of setting this up with defaults, disable it via it's `useBuiltinTranslations` option.
 *
 * Should be called only once. You can choose to await it or not (see the `useDummyMessageSetWhileLoading` option).
 *
 * A default function is available, see {@link defaultTranslationFunction}.
 *
 * To avoid hydration errors, on the server, the message loading is awaited.
 */
export async function useSetupI18n({
	locale,
	useBuiltinTranslations = false,
	useDummyMessageSetWhileLoading = true,
	translationFunction = defaultTranslationFunction,
}: {
	locale: Ref<string>
	/** Will asynchronously load the built-in translations for the current locale (watching and updating if needed). If you don't use this, you'll need to provide a custom translation function. */
	useBuiltinTranslations?: boolean
	/** To avoid having to wrap the component in a Suspense component because of the await on `useSetupI18n`, we can provide a dummy message proxy that just returns empty text until the messages are loaded. */
	useDummyMessageSetWhileLoading?: boolean
	/** A	custom translation function. The default requires the `useBuiltinTranslations` option to be true. */
	translationFunction?: TranslationFunction
}): Promise<void> {
	provide(_i18nInjectionKey, translationFunction)
	if (useBuiltinTranslations) {
		const messages = ref(useDummyMessageSetWhileLoading ? dummyMessageSet : {})
		provide(_translationMessagesInjectionKey, messages)
		async function loadMessageSet(l: string): Promise<void> {
			const isLoaded = loaded[l]
			if (isLoaded) {
				messages.value = loaded[l]
			} else {
				const newMessages = ((await messagesGlob[`../assets/locales/${l}.json`]!()) as any).default as any
				loaded[l] = newMessages
				messages.value = newMessages
			}
		}
		if (import.meta.server) {
			await loadMessageSet(locale.value)
		} else {
			void loadMessageSet(locale.value)
		}
		watch(locale, async () => {
			void loadMessageSet(locale.value)
		})
	}
}

export const i18nInjectionKey = _i18nInjectionKey
export const translationMessagesInjectionKey = _translationMessagesInjectionKey

