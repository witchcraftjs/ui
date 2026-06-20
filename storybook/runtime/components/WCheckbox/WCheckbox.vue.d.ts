import type { HTMLAttributes, InputHTMLAttributes } from "vue";
import type { BaseInteractiveProps, TailwindClassProp } from "../../types/index.js";
declare const __VLS_export: <T extends boolean | "indeterminate" = boolean>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: __VLS_PrettifyLocal<Pick<NonNullable<Awaited<typeof __VLS_setup>>, "attrs" | "emit" | "slots">>, __VLS_exposed?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
    props: import("vue").PublicProps & __VLS_PrettifyLocal<(BaseInteractiveProps & {
        id?: string;
        label?: string;
        labelAttrs?: Omit<HTMLAttributes, "class"> & TailwindClassProp;
        wrapperAttrs?: Omit<HTMLAttributes, "class"> & TailwindClassProp;
    } & Omit<InputHTMLAttributes, "disabled" | "class" | "readonly" | "autocomplete" | "onSumbit"> & TailwindClassProp & {
        modelValue?: T;
    }) & {
        "onUpdate:modelValue"?: ((value: T) => any) | undefined;
    }> & (typeof globalThis extends {
        __VLS_PROPS_FALLBACK: infer P;
    } ? P : {});
    expose: (exposed: {}) => void;
    attrs: any;
    slots: {
        left?: (props: {}) => any;
    } & {
        default?: (props: {}) => any;
    };
    emit: (event: "update:modelValue", value: T) => void;
}>) => import("vue").VNode & {
    __ctx?: Awaited<typeof __VLS_setup>;
};
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_PrettifyLocal<T> = (T extends any ? {
    [K in keyof T]: T[K];
} : {
    [K in keyof T as K]: T[K];
}) & {};
//# sourceMappingURL=WCheckbox.vue.d.ts.map