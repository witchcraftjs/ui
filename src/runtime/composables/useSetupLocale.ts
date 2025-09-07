import { type InjectionKey, provide, type Ref, ref } from "vue"

export const languageLocaleInjectionKey = Symbol("witchcraftUiLanguageLocale") as InjectionKey<Ref<string>>
export const timeLocaleInjectionKey = Symbol("witchcraftUiTimeLocale") as InjectionKey<Ref<string>>

export function useSetupLocale(): {
	languageLocale: Ref<string>
	timeLocale: Ref<string>
	setLanguageLocale: (value: string) => void
	setTimeLocale: (value: string) => void
} {
	const languageLocale = ref("en")
	// GB instead of US so we can get sane dd/mm/yy.
	const timeLocale = ref("en-GB")
	function setLanguageLocale(value: string): void {
		languageLocale.value = value
	}
	function setTimeLocale(value: string): void {
		timeLocale.value = value
	}

	provide(languageLocaleInjectionKey, languageLocale)
	provide(timeLocaleInjectionKey, timeLocale)
	return {
		languageLocale,
		timeLocale,
		setLanguageLocale,
		setTimeLocale
	}
}
