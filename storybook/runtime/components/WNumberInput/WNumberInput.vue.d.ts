import type { NumberFieldInputProps, NumberFieldRootEmits, NumberFieldRootProps } from "reka-ui";
import type { HTMLAttributes, InputHTMLAttributes } from "vue";
import type { EmitsToProps, TailwindClassProp } from "../../types/index.js";
declare const __VLS_export: import("vue").DefineComponent<{
    id?: string;
    max?: NumberFieldRootProps["max"];
    min?: NumberFieldRootProps["min"];
    step?: NumberFieldRootProps["step"];
    isValid?: (value: any) => boolean;
    inputProps?: NumberFieldInputProps & Omit<InputHTMLAttributes, "class"> & TailwindClassProp;
    rootProps?: NumberFieldRootProps & EmitsToProps<NumberFieldRootEmits> & Omit<HTMLAttributes, "class"> & TailwindClassProp;
    modelValue: number;
}, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (value: number) => any;
}, string, import("vue").PublicProps, Readonly<{
    id?: string;
    max?: NumberFieldRootProps["max"];
    min?: NumberFieldRootProps["min"];
    step?: NumberFieldRootProps["step"];
    isValid?: (value: any) => boolean;
    inputProps?: NumberFieldInputProps & Omit<InputHTMLAttributes, "class"> & TailwindClassProp;
    rootProps?: NumberFieldRootProps & EmitsToProps<NumberFieldRootEmits> & Omit<HTMLAttributes, "class"> & TailwindClassProp;
    modelValue: number;
}> & Readonly<{
    "onUpdate:modelValue"?: ((value: number) => any) | undefined;
}>, {
    max: number;
    min: number;
    isValid: (value: any) => boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
//# sourceMappingURL=WNumberInput.vue.d.ts.map