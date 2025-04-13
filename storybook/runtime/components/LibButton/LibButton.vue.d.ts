import { type ButtonHTMLAttributes } from "vue";
import { type BaseInteractiveProps, type LabelProps, type LinkableByIdProps, type TailwindClassProp } from "../shared/props.js";
type RealProps = LinkableByIdProps & LabelProps & BaseInteractiveProps & {
    border?: boolean;
    color?: "warning" | "ok" | "danger" | "primary" | "secondary" | false;
    label?: string;
    autoTitleFromAria?: boolean;
};
interface Props extends 
/** @vue-ignore */
Partial<Omit<ButtonHTMLAttributes, "class" | "color" | "disabled"> & TailwindClassProp & {
    "aria-label": string;
}>, RealProps {
}
declare const _default: __VLS_WithSlots<import("vue").DefineComponent<Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<Props> & Readonly<{}>, {
    color: "warning" | "ok" | "danger" | "primary" | "secondary" | false;
    disabled: boolean;
    label: string;
    readonly: boolean;
    border: boolean;
    unstyle: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
    icon?: ((props: {}) => any) | undefined;
    default?: ((props: {
        label: string;
    }) => any) | undefined;
    'icon-after'?: ((props: {}) => any) | undefined;
}>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
//# sourceMappingURL=LibButton.vue.d.ts.map