import { type DialogContentEmits, type DialogRootEmits, type PopoverContentProps, type PopoverRootProps } from "reka-ui";
import type { HTMLAttributes } from "vue";
import type { EmitsToProps, PopupConstrainToProps, TailwindClassProp } from "../../types/index.js";
type __VLS_Props = PopupConstrainToProps & {
    backdropClass?: string;
    showBackdrop?: boolean;
    showArrow?: boolean;
    animationDirection?: "use-side" | "use-align" | "left" | "right" | "up" | "down" | "show" | "none";
    /** Overrides teleport target. */
    to?: string;
    /** Overrides reka-ui's PopoverRootProps */
    rootProps?: PopoverRootProps & EmitsToProps<DialogRootEmits> & Omit<HTMLAttributes, "class"> & TailwindClassProp;
    /** Overrides reka-ui's PopoverContentProps */
    contentProps?: PopoverContentProps & EmitsToProps<DialogContentEmits> & Omit<HTMLAttributes, "class"> & TailwindClassProp;
};
type __VLS_ModelProps = {
    modelValue?: boolean;
};
type __VLS_PublicProps = __VLS_Props & __VLS_ModelProps;
declare var __VLS_16: {}, __VLS_36: {};
type __VLS_Slots = {} & {
    button?: (props: typeof __VLS_16) => any;
} & {
    popover?: (props: typeof __VLS_36) => any;
};
declare const __VLS_base: import("vue").DefineComponent<__VLS_PublicProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (value: boolean) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_PublicProps> & Readonly<{
    "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
}>, {
    constrainWidthTo: number | "trigger" | "available" | string | null;
    constrainHeightTo: number | "trigger" | "available" | string | null;
    showBackdrop: boolean;
    showArrow: boolean;
    animationDirection: "use-side" | "use-align" | "left" | "right" | "up" | "down" | "show" | "none";
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
//# sourceMappingURL=WPopover.vue.d.ts.map