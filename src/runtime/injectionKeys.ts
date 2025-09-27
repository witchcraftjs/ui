import type { InjectionKey, Ref } from "vue"

import type { DarkModeCommands, DarkModeState } from "./composables/useDarkMode.js"
import type { TranslationFunction } from "./composables/useSetupI18n.js"

/** @deprecated */
export const isDarkModeInjectionKey = Symbol("isDarkMode") as InjectionKey<Ref<boolean>>

/** @deprecated */
export const manualDarkModeInjectionKey = Symbol("manualDarkMode") as InjectionKey<Ref<boolean | undefined>>

export const darkModeCommandsInjectionKey = Symbol("darkModeCommands") as InjectionKey<DarkModeCommands>

export const darkModeStateInjectionKey = Symbol("darkModeState") as InjectionKey<DarkModeState>


export const languageLocaleInjectionKey = Symbol("witchcraftUiLanguageLocale") as InjectionKey<Ref<string>>

export const timeLocaleInjectionKey = Symbol("witchcraftUiTimeLocale") as InjectionKey<Ref<string>>


export const i18nInjectionKey = Symbol("witchcraftUiI18n") as InjectionKey<TranslationFunction>

export const translationMessagesInjectionKey = Symbol("witchcraftUiI18nMessages") as InjectionKey<Ref<Record<string, any>>>


export const showDevOnlyInjectionKey = Symbol("showDevOnly") as InjectionKey<Ref<boolean>>

