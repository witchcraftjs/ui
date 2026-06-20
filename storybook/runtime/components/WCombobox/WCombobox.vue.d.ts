import type { AcceptableValue, ComboboxContentEmits, ComboboxContentProps, ComboboxInputEmits, ComboboxInputProps } from "reka-ui";
import type { EmitsToProps, HTMLAttributes, InputHTMLAttributes } from "vue";
import { type SuggestionsDisplayProps } from "../../composables/useDisplayForReka.js";
import type { PopupConstrainToProps } from "../../types/index.js";
declare const __VLS_export: <TSuggestion extends NonNullable<AcceptableValue>>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: __VLS_PrettifyLocal<Pick<NonNullable<Awaited<typeof __VLS_setup>>, "attrs" | "emit" | "slots">>, __VLS_exposed?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
    props: import("vue").PublicProps & __VLS_PrettifyLocal<(SuggestionsDisplayProps<TSuggestion> & PopupConstrainToProps & {
        id?: string;
        border?: boolean;
        to?: string;
        /**
         * Validates the input, return true if valid, otherwise return an error message.
         *
         * If the input is invalid, modelValue is not updated. Empty inputs are visually valid, but they cannot trigger saves or or any setting of modelValue.
         *
         * If restrictToSuggestions is true, the input will be invalid if there is no exact match.
         *
         * `save` will not be emitted when the input is invalid.
         *
         * To show an error message, return a string from the function.
         */
        isValid?: (searchTerm: string) => true | string;
        suggestions: TSuggestion[];
        /** Shown in the popup when the search term is valid, not empty, not already selected, there are no suggestions, and restrictToSuggestions is false. Defaults to undefined. */
        emptyLabel?: string;
        /** The popup can't be styled via the regular class attr because it's teleported. You can also pass any reka ComboboxContent options. */
        contentProps?: {
            class?: string;
            to?: string;
        } & HTMLAttributes & ComboboxContentProps & EmitsToProps<ComboboxContentEmits>;
        /** Disables the filter. */
        ignoreFilter?: boolean;
        /** If false, modelValue is set to the search term (so long as it's valid). */
        restrictToSuggestions?: boolean;
        /** Input attributes or reka-ui ComboboxInput props. */
        inputProps?: Omit<InputHTMLAttributes, "class" | "autocomplete"> & {
            class?: string;
        } & HTMLAttributes & ComboboxInputProps & EmitsToProps<ComboboxInputEmits>;
    } & {
        modelValue?: TSuggestion;
        open?: boolean;
        searchTerm?: string;
        loading?: boolean;
    }) & {
        "onUpdate:modelValue"?: ((value: TSuggestion) => any) | undefined;
        "onUpdate:open"?: ((value: boolean) => any) | undefined;
        "onUpdate:searchTerm"?: ((value: string) => any) | undefined;
        "onUpdate:loading"?: ((value: boolean) => any) | undefined;
        onSave?: ((value: string) => any) | undefined;
        onNew?: ((value: string) => any) | undefined;
    } & Partial<NonNullable<import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & {
        open?: boolean | undefined;
        defaultOpen?: boolean | undefined;
        resetSearchTermOnBlur?: boolean | undefined;
        resetSearchTermOnSelect?: boolean | undefined;
        openOnFocus?: boolean | undefined;
        openOnClick?: boolean | undefined;
        ignoreFilter?: boolean | undefined;
        resetModelValueOnClear?: boolean | undefined;
        name?: string | undefined;
        dir?: import("reka-ui").Direction | undefined;
        as?: (import("reka-ui").AsTag | import("vue").Component) | undefined;
        disabled?: boolean | undefined;
        multiple?: boolean | undefined;
        required?: boolean | undefined;
        modelValue?: any;
        defaultValue?: any;
        highlightOnHover?: boolean | undefined;
        by?: string | ((a: any, b: any) => boolean) | undefined;
        asChild?: boolean | undefined;
        "onUpdate:modelValue"?: ((value: any) => any) | undefined;
        "onUpdate:open"?: ((value: boolean) => any) | undefined | undefined;
        onHighlight?: ((payload: {
            ref: HTMLElement;
            value: any;
        } | undefined) => any) | undefined;
    }>>> & (typeof globalThis extends {
        __VLS_PROPS_FALLBACK: infer P;
    } ? P : {});
    expose: (exposed: {}) => void;
    attrs: any;
    slots: {
        'loading-indicator'?: (props: {}) => any;
    } & {
        right?: (props: {}) => any;
    } & {
        trigger?: (props: {
            open: boolean;
        }) => any;
    } & {
        toggle?: (props: {
            isOpen: boolean;
        }) => any;
    } & {
        header?: (props: {
            class: string;
            filtered: TSuggestion[];
            isShowingEmptyLabel: boolean;
        }) => any;
    } & {
        invalid?: (props: {
            searchTerm: string;
            errorMessage: string;
            id: string;
            role: string;
        }) => any;
    } & {
        suggestions?: (props: {
            filtered: TSuggestion[];
            display: (value: TSuggestion, options?: {
                isForEmit?: boolean;
            }) => string;
            searchTerm: string;
        }) => any;
    } & {
        'suggestion-icon'?: (props: {
            suggestion: Exclude<TSuggestion, any[]>;
        }) => any;
    } & {
        suggestion?: (props: {
            suggestion: Exclude<TSuggestion, any[]>;
            suggestionText: string;
        }) => any;
    };
    emit: {
        (e: "save", value: string): void;
        (e: "new", value: string): void;
    } & (((event: "update:modelValue", value: TSuggestion) => void) & ((event: "update:open", value: boolean) => void) & ((event: "update:searchTerm", value: string) => void) & ((event: "update:loading", value: boolean) => void));
}>) => import("vue").VNode & {
    __ctx?: Awaited<typeof __VLS_setup>;
};
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_PrettifyLocal<T> = (T extends any ? {
    [K in keyof T]: T[K];
} : {
    [K in keyof T as K]: T[K];
}) & {};
//# sourceMappingURL=WCombobox.vue.d.ts.map