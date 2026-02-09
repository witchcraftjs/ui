import { type HTMLAttributes } from "vue";
import { type BaseInteractiveProps, type LabelProps, type LinkableByIdProps, type SuggestionsEmits, type SuggestionsProps, type WrapperProps } from "../shared/props.js";
type WrapperTypes = Partial<WrapperProps<"item", HTMLAttributes, {
    /** Tailwind classes. */
    class?: string;
}>>;
type RealProps = LinkableByIdProps & LabelProps & BaseInteractiveProps & {
    /** Return true to prevent the keydown event from being handled. */
    filterKeydown?: (e: KeyboardEvent) => boolean;
    /** Return true to prevent the blur event from being handled. */
    filterBlur?: (e: MouseEvent) => boolean;
    /** Return true to prevent the focus event from being handled. */
    filterFocus?: (e: FocusEvent) => boolean;
};
interface Props extends 
/** @vue-ignore */
Partial<Omit<HTMLAttributes, "class" | "onSubmit"> & {
    /** Tailwind classes. */
    class?: string;
}>, 
/** @vue-ignore */
WrapperTypes, RealProps {
}
declare const _default: typeof __VLS_export;
export default _default;
declare const __VLS_export: <TSuggestion extends string | object, TValue extends string | string[]>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: __VLS_PrettifyLocal<Pick<NonNullable<Awaited<typeof __VLS_setup>>, "attrs" | "emit" | "slots">>, __VLS_exposed?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
    props: import("vue").PublicProps & __VLS_PrettifyLocal<(Props & SuggestionsProps<TSuggestion> & {
        /**
         * The final valid value. This is *not* the value you want to share with the input. If `restrictToSuggestions` is true this will not update on any invalid values that `inputValue` might be set to.
         *
         * If suggestions are objects, this will be the string returned by the `suggestionLabel` prop.
         */
        modelValue: TValue;
        /**
         * If the element is bound to an input, this is the value that the input should be sharing.
         *
         * It allows the component to read even invalid output, and also to reset that invalid output when either modelValue is set to a new value, or when the component is closed via cancel.
         */
        inputValue?: string;
        open?: boolean;
    }) & {
        onSubmit?: ((val: string, suggestion?: any, wasRemoved?: boolean | undefined) => any) | undefined;
        "onUpdate:isOpen"?: ((val: boolean) => any) | undefined;
        "onUpdate:activeSuggestion"?: ((val: number) => any) | undefined;
        "onUpdate:modelValue"?: ((value: TValue) => any) | undefined;
        "onUpdate:open"?: ((value: boolean) => any) | undefined;
        "onUpdate:inputValue"?: ((value: string) => any) | undefined;
    }> & (typeof globalThis extends {
        __VLS_PROPS_FALLBACK: infer P;
    } ? P : {});
    expose: (exposed: import("vue").ShallowUnwrapRef<{
        suggestions: {
            list: any[] | undefined;
            filtered: any[] | undefined;
            active: number;
            available: boolean;
            moreThanOneAvailable: boolean;
            hasExactlyMatching: TSuggestion | undefined;
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
        /** A simple keydown handler that can be passed to an input to control the component while still focused inside it. */
        inputKeydownHandler: (e: KeyboardEvent) => void;
        /** A blur handler for the input that controls the component. This also takes care of making clicking on a suggestion work, since otherwise if canOpen is set to false in the blur handler, no click event will fire. */
        inputBlurHandler: (e: MouseEvent) => void;
        /** A focus handler for the input that controls the component. */
        inputFocusHandler: (e: FocusEvent) => void;
    }>) => void;
    attrs: any;
    slots: {
        item?: (props: {
            item: any;
            index: number;
            isSelected: boolean;
        }) => any;
    };
    emit: SuggestionsEmits<false> & (((event: "update:modelValue", value: TValue) => void) & ((event: "update:open", value: boolean) => void) & ((event: "update:inputValue", value: string) => void));
}>) => import("vue").VNode & {
    __ctx?: Awaited<typeof __VLS_setup>;
};
type __VLS_PrettifyLocal<T> = (T extends any ? {
    [K in keyof T]: T[K];
} : {
    [K in keyof T as K]: T[K];
}) & {};
//# sourceMappingURL=LibSuggestions.vue.d.ts.map