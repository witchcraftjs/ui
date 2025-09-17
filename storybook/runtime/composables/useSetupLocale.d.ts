import { type InjectionKey, type Ref } from "vue";
export declare const languageLocaleInjectionKey: InjectionKey<Ref<string>>;
export declare const timeLocaleInjectionKey: InjectionKey<Ref<string>>;
export declare function useSetupLocale(): {
    languageLocale: Ref<string>;
    timeLocale: Ref<string>;
    setLanguageLocale: (value: string) => void;
    setTimeLocale: (value: string) => void;
};
//# sourceMappingURL=useSetupLocale.d.ts.map