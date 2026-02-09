import { type HTMLAttributes, type InputHTMLAttributes } from "vue";
import { type BaseInteractiveProps, type LabelProps, type LinkableByIdProps, type SuggestionsProps, type TailwindClassProp, type WrapperProps } from "../shared/props.js";
type WrapperTypes = WrapperProps<"suggestions", HTMLAttributes> & WrapperProps<"wrapper", HTMLAttributes> & WrapperProps<"inner-wrapper", HTMLAttributes>;
type RealProps = SuggestionsProps & LinkableByIdProps & LabelProps & BaseInteractiveProps & {
    suggestions?: SuggestionsProps["suggestions"];
    valid?: boolean;
};
interface Props extends 
/** @vue-ignore */
Partial<Omit<InputHTMLAttributes, "class" | "readonly" | "disabled" | "onSubmit" | "autocomplete"> & TailwindClassProp>, 
/** @vue-ignore */
Partial<WrapperTypes>, RealProps {
}
declare const _default: typeof __VLS_export;
export default _default;
declare const __VLS_export: __VLS_WithSlots<import("vue").DefineComponent<Props & {
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
            $open: boolean;
            open: () => void;
            close: () => void;
            enterSelected: (doClose?: boolean) => void;
            enterIndex: (num: number, doClose?: boolean) => void;
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
            $open: boolean;
            open: () => void;
            close: () => void;
            enterSelected: (doClose?: boolean) => void;
            enterIndex: (num: number, doClose?: boolean) => void;
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
            $open: boolean;
            open: () => void;
            close: () => void;
            enterSelected: (doClose?: boolean) => void;
            enterIndex: (num: number, doClose?: boolean) => void;
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
    "update:modelValue": (value: string) => any;
    "update:inputValue": (value: string) => any;
    "update:values": (value: string[] | undefined) => any;
} & {
    input: (val: InputEvent) => any;
    blur: (val: FocusEvent) => any;
    submit: (val: string, suggestion?: any) => any;
    focus: (val: FocusEvent) => any;
    keydown: (val: KeyboardEvent) => any;
    indicatorClick: (val: MouseEvent) => any;
}, string, import("vue").PublicProps, Readonly<Props & {
    values?: string[] | undefined;
    modelValue: string;
    inputValue?: string;
}> & Readonly<{
    onInput?: ((val: InputEvent) => any) | undefined;
    onBlur?: ((val: FocusEvent) => any) | undefined;
    onSubmit?: ((val: string, suggestion?: any) => any) | undefined;
    "onUpdate:modelValue"?: ((value: string) => any) | undefined;
    onFocus?: ((val: FocusEvent) => any) | undefined;
    onKeydown?: ((val: KeyboardEvent) => any) | undefined;
    "onUpdate:inputValue"?: ((value: string) => any) | undefined;
    "onUpdate:values"?: ((value: string[] | undefined) => any) | undefined;
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
    label?: (props: {
        label: string | undefined;
        id: string;
        isOpen: boolean;
        valid: boolean;
        disabled: boolean;
        readonly: boolean;
        emitSubmit: (val: any, _wasRemoved: boolean) => void;
    }) => any;
} & {
    default?: (props: {
        id: string;
        isOpen: boolean;
        valid: boolean;
        disabled: boolean;
        readonly: boolean;
        emitSubmit: (val: any, _wasRemoved: boolean) => void;
    }) => any;
} & {
    left?: (props: {
        id: string;
        isOpen: boolean;
        valid: boolean;
        disabled: boolean;
        readonly: boolean;
        emitSubmit: (val: any, _wasRemoved: boolean) => void;
    }) => any;
} & {
    input?: (props: {
        suggestionsIndicatorClickHandler: (e: MouseEvent) => void;
        id: string;
        isOpen: boolean;
        valid: boolean;
        disabled: boolean;
        readonly: boolean;
        emitSubmit: (val: any, _wasRemoved: boolean) => void;
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
    }) => any;
} & {
    indicator?: (props: {
        isOpen: boolean;
        suggestionsIndicatorClickHandler: (e: MouseEvent) => void;
    }) => any;
} & {
    values?: (props: {
        id: string;
        isOpen: boolean;
        valid: boolean;
        disabled: boolean;
        readonly: boolean;
        emitSubmit: (val: any, _wasRemoved: boolean) => void;
        class: undefined;
        hasSlotRight: boolean;
        label: string | undefined;
        border: boolean;
        modelValue: string[] | undefined;
        "onUpdate:modelValue": (e: string[]) => string[];
    }) => any;
} & {
    right?: (props: {
        id: string;
        isOpen: boolean;
        valid: boolean;
        disabled: boolean;
        readonly: boolean;
        emitSubmit: (val: any, _wasRemoved: boolean) => void;
    }) => any;
} & {
    suggestions?: (props: {
        id: string;
        isOpen: boolean;
        valid: boolean;
        disabled: boolean;
        readonly: boolean;
        emitSubmit: (val: any, _wasRemoved: boolean) => void;
        class: undefined;
        suggestions: any[] | undefined;
        allowOpenEmpty: boolean;
        restrictToSuggestions: boolean;
        suggestionLabel: ((item: any) => string) | undefined;
        suggestionsFilter: ((input: string | number, items: any[]) => any[]) | undefined;
        modelValue: string | string[];
        inputValue: string;
        isValid: boolean;
        "onUpdate:inputValue": (e: string) => string;
        onSubmit: (e: string, suggestion?: any, wasRemoved?: boolean) => void;
        "onUpdate:modelValue": (e: string | string[]) => void;
        "onUpdate:isOpen": (e: boolean) => void;
        "onUpdate:activeSuggestion": (e: number) => number;
    }) => any;
} & {
    'suggestion-item'?: (props: {
        item: any;
        index: number;
        isSelected: boolean;
    }) => any;
}>;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
//# sourceMappingURL=LibInputDeprecated.vue.d.ts.map