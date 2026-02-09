import { type HTMLAttributes } from "vue";
import type { BaseInteractiveProps, LabelProps, TailwindClassProp, WrapperProps } from "../shared/props.js";
type WrapperTypes = Partial<WrapperProps<"item", HTMLAttributes>>;
type RealProps = LabelProps & BaseInteractiveProps & {
    border?: boolean;
};
interface Props extends 
/** @vue-ignore */
Partial<Omit<HTMLAttributes, "class"> & TailwindClassProp>, 
/** @vue-ignore */
WrapperTypes, RealProps {
}
declare const _default: typeof __VLS_export;
export default _default;
declare const __VLS_export: <T extends string | number>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: __VLS_PrettifyLocal<Pick<NonNullable<Awaited<typeof __VLS_setup>>, "attrs" | "emit" | "slots">>, __VLS_exposed?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
    props: import("vue").PublicProps & __VLS_PrettifyLocal<(Props & {
        modelValue?: T[];
    }) & {
        "onUpdate:modelValue"?: ((value: T[]) => any) | undefined;
    }> & (typeof globalThis extends {
        __VLS_PROPS_FALLBACK: infer P;
    } ? P : {});
    expose: (exposed: {}) => void;
    attrs: any;
    slots: {};
    emit: (event: "update:modelValue", value: T[]) => void;
}>) => import("vue").VNode & {
    __ctx?: Awaited<typeof __VLS_setup>;
};
type __VLS_PrettifyLocal<T> = (T extends any ? {
    [K in keyof T]: T[K];
} : {
    [K in keyof T as K]: T[K];
}) & {};
//# sourceMappingURL=LibMultiValues.vue.d.ts.map