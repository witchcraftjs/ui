import type { DialogContentEmits, DialogContentProps, DialogRootEmits, DialogRootProps } from "reka-ui";
import type { EmitsToProps, HTMLAttributes } from "vue";
import type { TailwindClassProp } from "../../types/index.js";
type __VLS_Props = {
    title?: string;
    description?: string;
    backdropClass?: string;
    /** Overrides reka-ui's DialogContentProps */
    contentProps?: DialogContentProps & EmitsToProps<DialogContentEmits> & Omit<HTMLAttributes, "class"> & TailwindClassProp;
    /** Overrides reka-ui's DialogRootProps */
    rootProps?: DialogRootProps & EmitsToProps<DialogRootEmits> & Omit<HTMLAttributes, "class"> & TailwindClassProp;
    /** Overrides teleport target. */
    to?: string;
};
type __VLS_ModelProps = {
    modelValue?: boolean;
};
type __VLS_PublicProps = __VLS_Props & __VLS_ModelProps;
declare var __VLS_16: {}, __VLS_30: {
    class: string;
}, __VLS_38: {}, __VLS_40: {}, __VLS_48: {}, __VLS_56: {}, __VLS_64: {};
type __VLS_Slots = {} & {
    button?: (props: typeof __VLS_16) => any;
} & {
    backdrop?: (props: typeof __VLS_30) => any;
} & {
    popup?: (props: typeof __VLS_38) => any;
} & {
    title?: (props: typeof __VLS_40) => any;
} & {
    description?: (props: typeof __VLS_48) => any;
} & {
    extra?: (props: typeof __VLS_56) => any;
} & {
    close?: (props: typeof __VLS_64) => any;
};
declare const __VLS_base: import("vue").DefineComponent<__VLS_PublicProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (value: boolean) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_PublicProps> & Readonly<{
    "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
}>, {
    to: string;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
//# sourceMappingURL=WPopup.vue.d.ts.map