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
declare const _default: <TSuggestion extends string | object, TValue extends string | string[]>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: __VLS_PrettifyLocal<Pick<NonNullable<Awaited<typeof __VLS_setup>>, "attrs" | "emit" | "slots">>, __VLS_expose?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
    props: __VLS_PrettifyLocal<Pick<Partial<{}> & Omit<{
        readonly onSubmit?: ((val: string, suggestion?: any, wasRemoved?: boolean | undefined) => any) | undefined;
        readonly "onUpdate:isOpen"?: ((val: boolean) => any) | undefined;
        readonly "onUpdate:activeSuggestion"?: ((val: number) => any) | undefined;
        readonly "onUpdate:modelValue"?: ((value: TValue) => any) | undefined;
        readonly "onUpdate:open"?: ((value: boolean) => any) | undefined;
        readonly "onUpdate:inputValue"?: ((value: string) => any) | undefined;
    } & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, never>, "onSubmit" | "onUpdate:modelValue" | "onUpdate:open" | "onUpdate:isOpen" | "onUpdate:activeSuggestion" | "onUpdate:inputValue"> & (Props & SuggestionsProps<TSuggestion> & {
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
    }) & {}> & import("vue").PublicProps;
    expose(exposed: import("vue").ShallowUnwrapRef<{
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
    }>): void;
    attrs: any;
    slots: {
        item?: (props: {
            item: any;
            index: number;
            isSelected: boolean;
        }) => any;
    };
    emit: SuggestionsEmits<false> & (((evt: "update:modelValue", value: TValue) => void) & ((evt: "update:open", value: boolean) => void) & ((evt: "update:inputValue", value: string) => void));
}>) => import("vue").VNode & {
    __ctx?: Awaited<typeof __VLS_setup>;
};
export default _default;
type __VLS_PrettifyLocal<T> = {
    [K in keyof T as K]: T[K];
} & {};
//# sourceMappingURL=LibSuggestions.vue.d.ts.map