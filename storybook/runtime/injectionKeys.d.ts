import type { Theme } from "metamorphosis/Theme";
import type { InjectionKey, Ref, ShallowRef } from "vue";
import type { InternalTranslationFunction } from "./composables/useSetupI18n.js";
import type { DarkModeCommands, DarkModeState } from "./types/index.js";
export declare const darkModeCommandsInjectionKey: InjectionKey<DarkModeCommands>;
export declare const darkModeStateInjectionKey: InjectionKey<DarkModeState>;
export declare const languageLocaleInjectionKey: InjectionKey<Ref<string>>;
export declare const timeLocaleInjectionKey: InjectionKey<Ref<string>>;
export declare const i18nInjectionKey: InjectionKey<InternalTranslationFunction>;
export declare const translationMessagesInjectionKey: InjectionKey<Ref<Record<string, any>>>;
/** @deprecated see WDevOnly */
export declare const showDevOnlyInjectionKey: InjectionKey<Ref<boolean>>;
export declare const themeInjectionKey: InjectionKey<ShallowRef<Theme<any>>>;
//# sourceMappingURL=injectionKeys.d.ts.map