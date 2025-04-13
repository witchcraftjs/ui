import { type LabelHTMLAttributes } from "vue";
import { type BaseInteractiveProps, type LabelProps, type LinkableByIdProps, type TailwindClassProp } from "../shared/props.js";
type RealProps = LinkableByIdProps & LabelProps & BaseInteractiveProps & {
    unstyled?: boolean;
    valid?: boolean;
};
interface Props extends 
/** @vue-ignore */
Partial<Omit<LabelHTMLAttributes, "class"> & TailwindClassProp>, RealProps {
}
declare const _default: __VLS_WithSlots<import("vue").DefineComponent<Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<Props> & Readonly<{}>, {
    disabled: boolean;
    id: string;
    readonly: boolean;
    border: boolean;
    unstyle: boolean;
    unstyled: boolean;
    valid: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
    default?: ((props: {}) => any) | undefined;
}>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
//# sourceMappingURL=LibLabel.vue.d.ts.map