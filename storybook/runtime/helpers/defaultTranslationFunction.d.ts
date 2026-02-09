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
export declare function defaultTranslationFunction(key: string, replacements?: Record<string, any>): string;
//# sourceMappingURL=defaultTranslationFunction.d.ts.map