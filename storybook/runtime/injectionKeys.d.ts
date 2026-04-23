import type { InjectionKey, Ref } from "vue";
import type { TranslationFunction } from "./composables/useSetupI18n.js";
import type { DarkModeCommands, DarkModeState } from "./types/index.js";
export declare const darkModeCommandsInjectionKey: InjectionKey<DarkModeCommands>;
export declare const darkModeStateInjectionKey: InjectionKey<DarkModeState>;
export declare const languageLocaleInjectionKey: InjectionKey<Ref<string>>;
export declare const timeLocaleInjectionKey: InjectionKey<Ref<string>>;
export declare const i18nInjectionKey: InjectionKey<TranslationFunction>;
export declare const translationMessagesInjectionKey: InjectionKey<Ref<Record<string, any>>>;
export declare const showDevOnlyInjectionKey: InjectionKey<Ref<boolean>>;
//# sourceMappingURL=injectionKeys.d.ts.map