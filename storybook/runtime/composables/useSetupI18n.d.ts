import { type Ref } from "vue";
export type TranslationFunction = (key: string, replacements?: Record<string, any>) => string;
/**
 * A composable for providing a translation function + messages for the library. Note the Root component already takes care of setting this up with defaults, disable it via it's `useBuiltinTranslations` option.
 *
 * Should be called only once. You can choose to await it or not (see the `useDummyMessageSetWhileLoading` option).
 *
 * A default function is available, see {@link defaultTranslationFunction}.
 *
 * To avoid hydration errors, on the server, the message loading is awaited.
 */
export declare function useSetupI18n({ locale, useBuiltinTranslations, useDummyMessageSetWhileLoading, translationFunction }: {
    locale: Ref<string>;
    /** Will asynchronously load the built-in translations for the current locale (watching and updating if needed). If you don't use this, you'll need to provide a custom translation function. */
    useBuiltinTranslations?: boolean;
    /** To avoid having to wrap the component in a Suspense component because of the await on `useSetupI18n`, we can provide a dummy message proxy that just returns empty text until the messages are loaded. */
    useDummyMessageSetWhileLoading?: boolean;
    /** A	custom translation function. The default requires the `useBuiltinTranslations` option to be true. */
    translationFunction?: TranslationFunction;
}): Promise<void>;
//# sourceMappingURL=useSetupI18n.d.ts.map