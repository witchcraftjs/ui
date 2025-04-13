import { type HTMLAttributes, type InputHTMLAttributes } from "vue";
import { type BaseInteractiveProps, type LabelProps, type LinkableByIdProps, type MultiValueProps, type SuggestionsProps, type TailwindClassProp, type WrapperProps } from "../shared/props.js";
type WrapperTypes = WrapperProps<"suggestions", HTMLAttributes> & WrapperProps<"wrapper", HTMLAttributes> & WrapperProps<"inner-wrapper", HTMLAttributes>;
type RealProps = SuggestionsProps & LinkableByIdProps & LabelProps & BaseInteractiveProps & MultiValueProps & {
    suggestions?: SuggestionsProps["suggestions"];
    valid?: boolean;
};
interface Props extends 
/** @vue-ignore */
Partial<Omit<InputHTMLAttributes, "class" | "readonly" | "disabled" | "onSubmit"> & TailwindClassProp>, 
/** @vue-ignore */
Partial<WrapperTypes>, RealProps {
}
declare const _default: __VLS_WithSlots<import("vue").DefineComponent<Props & {
    values?: string[] | undefined;
    modelValue: string;
    inputValue?: string;
}, {
    suggestionsComponent: import("vue").Ref<{
        suggestions: {
            list: any[] | undefined;
            filtered: any[] | undefined;
            active: number;
            available: boolean;
            moreThanOneAvailable: boolean;
            hasExactlyMatching: string | object | undefined;
            hasValidSuggestion: boolean;
            openable: boolean | undefined;
            getLabel: (item: any) => string;
            isOpen: boolean;
            open: () => void;
            close: () => void;
            enterSelected: () => void;
            enterSuggestion: (num: number) => void;
            toggle: () => void;
            cancel: () => void;
            select: (num: number) => void;
            prev: () => void;
            next: () => void;
            first: () => void;
            last: () => void;
        };
        el: HTMLElement | null;
        inputKeydownHandler: (e: KeyboardEvent) => void;
        inputBlurHandler: (e: MouseEvent) => void;
        inputFocusHandler: (e: FocusEvent) => void;
    } | null, import("vue").ShallowUnwrapRef<{
        suggestions: {
            list: any[] | undefined;
            filtered: any[] | undefined;
            active: number;
            available: boolean;
            moreThanOneAvailable: boolean;
            hasExactlyMatching: string | object | undefined;
            hasValidSuggestion: boolean;
            openable: boolean | undefined;
            getLabel: (item: any) => string;
            isOpen: boolean;
            open: () => void;
            close: () => void;
            enterSelected: () => void;
            enterSuggestion: (num: number) => void;
            toggle: () => void;
            cancel: () => void;
            select: (num: number) => void;
            prev: () => void;
            next: () => void;
            first: () => void;
            last: () => void;
        };
        el: import("vue").Ref<HTMLElement | null, HTMLElement | null>;
        inputKeydownHandler: (e: KeyboardEvent) => void;
        inputBlurHandler: (e: MouseEvent) => void;
        inputFocusHandler: (e: FocusEvent) => void;
    }> | {
        suggestions: {
            list: any[] | undefined;
            filtered: any[] | undefined;
            active: number;
            available: boolean;
            moreThanOneAvailable: boolean;
            hasExactlyMatching: string | object | undefined;
            hasValidSuggestion: boolean;
            openable: boolean | undefined;
            getLabel: (item: any) => string;
            isOpen: boolean;
            open: () => void;
            close: () => void;
            enterSelected: () => void;
            enterSuggestion: (num: number) => void;
            toggle: () => void;
            cancel: () => void;
            select: (num: number) => void;
            prev: () => void;
            next: () => void;
            first: () => void;
            last: () => void;
        };
        el: HTMLElement | null;
        inputKeydownHandler: (e: KeyboardEvent) => void;
        inputBlurHandler: (e: MouseEvent) => void;
        inputFocusHandler: (e: FocusEvent) => void;
    } | null>;
    el: import("vue").Ref<HTMLElement | null, HTMLElement | null>;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:values": (value: string[] | undefined) => any;
    "update:modelValue": (value: string) => any;
    "update:inputValue": (value: string) => any;
} & {
    submit: (val: string, suggestion?: any) => any;
    blur: (val: FocusEvent) => any;
    input: (val: InputEvent) => any;
    keydown: (val: KeyboardEvent) => any;
    focus: (val: FocusEvent) => any;
    indicatorClick: (val: MouseEvent) => any;
}, string, import("vue").PublicProps, Readonly<Props & {
    values?: string[] | undefined;
    modelValue: string;
    inputValue?: string;
}> & Readonly<{
    onSubmit?: ((val: string, suggestion?: any) => any) | undefined;
    onBlur?: ((val: FocusEvent) => any) | undefined;
    onInput?: ((val: InputEvent) => any) | undefined;
    "onUpdate:values"?: ((value: string[] | undefined) => any) | undefined;
    "onUpdate:modelValue"?: ((value: string) => any) | undefined;
    "onUpdate:inputValue"?: ((value: string) => any) | undefined;
    onKeydown?: ((val: KeyboardEvent) => any) | undefined;
    onFocus?: ((val: FocusEvent) => any) | undefined;
    onIndicatorClick?: ((val: MouseEvent) => any) | undefined;
}>, {
    disabled: boolean;
    readonly: boolean;
    border: boolean;
    unstyle: boolean;
    valid: boolean;
    suggestions: any[];
    updateOnlyOnSubmit: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
    label?: ((props: {
        label: string | undefined;
        id: string;
        isOpen: boolean;
        valid: boolean;
        disabled: boolean;
        readonly: boolean;
        emitSubmit: (val: any) => void;
    }) => any) | undefined;
    default?: ((props: {
        id: string;
        isOpen: boolean;
        valid: boolean;
        disabled: boolean;
        readonly: boolean;
        emitSubmit: (val: any) => void;
    }) => any) | undefined;
    left?: ((props: {
        id: string;
        isOpen: boolean;
        valid: boolean;
        disabled: boolean;
        readonly: boolean;
        emitSubmit: (val: any) => void;
    }) => any) | undefined;
    input?: ((props: {
        suggestionsIndicatorClickHandler: (e: MouseEvent) => void;
        id: string;
        isOpen: boolean;
        valid: boolean;
        disabled: boolean;
        readonly: boolean;
        emitSubmit: (val: any) => void;
        class: undefined;
        canEdit: boolean;
        "aria-autocomplete": "both" | undefined;
        "aria-controls": string | undefined;
        role: string | undefined;
        "aria-expanded": boolean | undefined;
        "aria-activedescendant": string | undefined;
        border: boolean;
        isValid: boolean;
        onKeydown: (e: KeyboardEvent) => void;
        onBlur: (e: FocusEvent) => void;
        onFocus: (e: FocusEvent) => void;
        modelValue: string;
        "onUpdate:modelValue": (e: string) => void;
        onSubmit: (e: string) => void;
    }) => any) | undefined;
    indicator?: ((props: {
        isOpen: boolean;
        suggestionsIndicatorClickHandler: (e: MouseEvent) => void;
    }) => any) | undefined;
    values?: ((props: {
        id: string;
        isOpen: boolean;
        valid: boolean;
        disabled: boolean;
        readonly: boolean;
        emitSubmit: (val: any) => void;
        class: undefined;
        hasSlotRight: boolean;
        label: string | undefined;
        border: boolean;
        values: string[] | undefined;
        "onUpdate:values": (e: string[]) => string[];
    }) => any) | undefined;
    right?: ((props: {
        id: string;
        isOpen: boolean;
        valid: boolean;
        disabled: boolean;
        readonly: boolean;
        emitSubmit: (val: any) => void;
    }) => any) | undefined;
    suggestions?: ((props: {
        id: string;
        isOpen: boolean;
        valid: boolean;
        disabled: boolean;
        readonly: boolean;
        emitSubmit: (val: any) => void;
        class: undefined;
        suggestions: any[] | undefined;
        allowOpenEmpty: boolean;
        restrictToSuggestions: boolean;
        suggestionLabel: ((item: any) => string) | undefined;
        suggestionsFilter: ((input: string | number, items: any[]) => any[]) | undefined;
        modelValue: string;
        inputValue: string;
        isValid: boolean;
        "onUpdate:inputValue": (e: string) => string;
        onSubmit: (e: string, suggestion: any) => void;
        "onUpdate:isOpen": (e: boolean) => void;
        "onUpdate:activeSuggestion": (e: number) => number;
    }) => any) | undefined;
    'suggestion-item'?: ((props: {
        item: any;
        index: number;
    }) => any) | undefined;
}>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
//# sourceMappingURL=LibInput.vue.d.ts.map