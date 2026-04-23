import type { HTMLAttributes, InputHTMLAttributes } from "vue";
import type { BaseInteractiveProps, TailwindClassProp } from "../../types/index.js";
type __VLS_Props = BaseInteractiveProps & {
    id?: string;
    label?: string;
    labelAttrs?: Omit<HTMLAttributes, "class"> & TailwindClassProp;
    wrapperAttrs?: Omit<HTMLAttributes, "class"> & TailwindClassProp;
} & /** @vue-ignore */ Omit<InputHTMLAttributes, "class" | "readonly" | "disabled" | "onSumbit" | "autocomplete"> & /** @vue-ignore */ TailwindClassProp;
type __VLS_ModelProps = {
    "modelValue"?: boolean | "indeterminate";
};
type __VLS_PublicProps = __VLS_Props & __VLS_ModelProps;
declare var __VLS_1: {}, __VLS_28: {};
type __VLS_Slots = {} & {
    left?: (props: typeof __VLS_1) => any;
} & {
    default?: (props: typeof __VLS_28) => any;
};
declare const __VLS_base: import("vue").DefineComponent<__VLS_PublicProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (value: boolean | "indeterminate") => any;
}, string, import("vue").PublicProps, Readonly<__VLS_PublicProps> & Readonly<{
    "onUpdate:modelValue"?: ((value: boolean | "indeterminate") => any) | undefined;
}>, {
    border: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
//# sourceMappingURL=WCheckbox.vue.d.ts.map