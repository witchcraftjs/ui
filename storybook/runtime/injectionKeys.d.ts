import type { InjectionKey, Ref } from "vue";
import type { DarkModeCommands, DarkModeState } from "./composables/useDarkMode.js";
import type { TranslationFunction } from "./composables/useSetupI18n.js";
/** @deprecated */
export declare const isDarkModeInjectionKey: InjectionKey<Ref<boolean>>;
/** @deprecated */
export declare const manualDarkModeInjectionKey: InjectionKey<Ref<boolean | undefined>>;
export declare const darkModeCommandsInjectionKey: InjectionKey<DarkModeCommands>;
export declare const darkModeStateInjectionKey: InjectionKey<DarkModeState>;
export declare const languageLocaleInjectionKey: InjectionKey<Ref<string>>;
export declare const timeLocaleInjectionKey: InjectionKey<Ref<string>>;
export declare const i18nInjectionKey: InjectionKey<TranslationFunction>;
export declare const translationMessagesInjectionKey: InjectionKey<Ref<Record<string, any>>>;
export declare const showDevOnlyInjectionKey: InjectionKey<Ref<boolean>>;
//# sourceMappingURL=injectionKeys.d.ts.map