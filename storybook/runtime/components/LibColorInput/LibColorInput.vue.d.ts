import { type ButtonHTMLAttributes } from "vue";
import type { HsvaColor, RgbaColor } from "../../types/index.js";
import { type LabelProps, type LinkableByIdProps, type TailwindClassProp } from "../shared/props.js";
type RealProps = LabelProps & LinkableByIdProps & {
    allowAlpha?: boolean;
    border?: boolean;
    copyTransform?: (val: HsvaColor, stringVal: string) => any;
};
interface Props extends 
/** @vue-ignore */
Partial<Omit<ButtonHTMLAttributes, "class"> & TailwindClassProp & {
    "aria-label": string;
}>, RealProps {
}
declare const _default: __VLS_WithSlots<import("vue").DefineComponent<Props & {
    modelValue?: RgbaColor;
}, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (value: RgbaColor) => any;
}, string, import("vue").PublicProps, Readonly<Props & {
    modelValue?: RgbaColor;
}> & Readonly<{
    "onUpdate:modelValue"?: ((value: RgbaColor) => any) | undefined;
}>, {
    border: boolean;
    allowAlpha: boolean;
    copyTransform: (val: HsvaColor, stringVal: string) => any;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
    default?: ((props: {}) => any) | undefined;
}>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
//# sourceMappingURL=LibColorInput.vue.d.ts.map