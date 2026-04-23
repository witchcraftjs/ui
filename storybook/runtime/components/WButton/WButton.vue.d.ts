import { type ButtonHTMLAttributes } from "vue";
import type { BaseInteractiveProps, TailwindClassProp } from "../../types/index.js";
type __VLS_Props = BaseInteractiveProps & {
    label?: string;
    border?: boolean;
    color?: "warning" | "ok" | "danger" | "primary" | "secondary" | false;
} & /** @vue-ignore */ Omit<ButtonHTMLAttributes, "class" | "color"> & /** @vue-ignore */ TailwindClassProp;
declare var __VLS_1: {
    classes: string;
}, __VLS_3: {}, __VLS_5: {
    label: string;
}, __VLS_7: {};
type __VLS_Slots = {} & {
    label?: (props: typeof __VLS_1) => any;
} & {
    icon?: (props: typeof __VLS_3) => any;
} & {
    default?: (props: typeof __VLS_5) => any;
} & {
    'icon-after'?: (props: typeof __VLS_7) => any;
};
declare const __VLS_base: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {
    color: "warning" | "ok" | "danger" | "primary" | "secondary" | false;
    border: boolean;
    label: string;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
//# sourceMappingURL=WButton.vue.d.ts.map