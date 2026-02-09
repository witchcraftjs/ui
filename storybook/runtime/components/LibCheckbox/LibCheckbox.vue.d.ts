import { type HTMLAttributes, type InputHTMLAttributes } from "vue";
import { type BaseInteractiveProps, type LabelProps, type LinkableByIdProps, type TailwindClassProp, type WrapperProps } from "../shared/props.js";
type WrapperTypes = Partial<WrapperProps<"label", HTMLAttributes, {
    /** Tailwind classes. */
    class?: string;
}>>;
type RealProps = LinkableByIdProps & LabelProps & BaseInteractiveProps & {
    unstyle?: boolean;
};
interface Props extends 
/** @vue-ignore */
Partial<Omit<InputHTMLAttributes, "class" | "readonly" | "disabled" | "onSumbit" | "autocomplete"> & TailwindClassProp>, WrapperTypes, RealProps {
}
declare const _default: typeof __VLS_export;
export default _default;
declare const __VLS_export: __VLS_WithSlots<import("vue").DefineComponent<Props & {
    modelValue?: boolean;
}, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (value: boolean) => any;
} & {
    submit: (val: boolean) => any;
}, string, import("vue").PublicProps, Readonly<Props & {
    modelValue?: boolean;
}> & Readonly<{
    onSubmit?: ((val: boolean) => any) | undefined;
    "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
}>, {
    disabled: boolean;
    readonly: boolean;
    border: boolean;
    unstyle: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
    left?: (props: {}) => any;
} & {
    default?: (props: {}) => any;
}>;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
//# sourceMappingURL=LibCheckbox.vue.d.ts.map