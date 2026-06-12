import type { Theme } from "metamorphosis/Theme"
import type { InjectionKey, Ref, ShallowRef } from "vue"

import type { InternalTranslationFunction } from "./composables/useSetupI18n.js"
import type { DarkModeCommands, DarkModeState } from "./types/index.js"

export const darkModeCommandsInjectionKey = Symbol.for("@witchcraft/ui:darkModeCommands") as InjectionKey<DarkModeCommands>

export const darkModeStateInjectionKey = Symbol.for("@witchcraft/ui:darkModeState") as InjectionKey<DarkModeState>


export const languageLocaleInjectionKey = Symbol.for("@witchcraft/ui:languageLocale") as InjectionKey<Ref<string>>

export const timeLocaleInjectionKey = Symbol.for("@witchcraft/ui:timeLocale") as InjectionKey<Ref<string>>


export const i18nInjectionKey = Symbol.for("@witchcraft/ui:i18n") as InjectionKey<InternalTranslationFunction>

export const translationMessagesInjectionKey = Symbol.for("@witchcraft/ui:i18nMessages") as InjectionKey<Ref<Record<string, any>>>


/** @deprecated see WDevOnly */
export const showDevOnlyInjectionKey = Symbol.for("@witchcraft/ui:showDevOnly") as InjectionKey<Ref<boolean>>


export const themeInjectionKey = Symbol.for("@witchcraft/ui:theme") as InjectionKey<ShallowRef<Theme<any>>>

