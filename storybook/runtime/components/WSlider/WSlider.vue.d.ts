import { type SliderRootProps } from "reka-ui";
import type { HTMLAttributes } from "vue";
import type { BaseInteractiveProps, TailwindClassProp } from "../../types/index.js";
declare const __VLS_export: <T extends number | number[]>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: __VLS_PrettifyLocal<Pick<NonNullable<Awaited<typeof __VLS_setup>>, "attrs" | "emit" | "slots">>, __VLS_exposed?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
    props: import("vue").PublicProps & __VLS_PrettifyLocal<(Pick<BaseInteractiveProps, "disabled" | "readonly"> & Pick<SliderRootProps, "step" | "max" | "min"> & {
        defaultValue?: number | number[];
        rootProps?: Omit<SliderRootProps, "min" | "max" | "step" | "defaultValue" | "modelValue">;
        unit?: string;
        /** Whether to visually highlight the range. Sometimes we might want to turn this off when we have more than 2 values v-modeled as it can be confusing. */
        highlightRange?: boolean;
        wrapperAttrs?: Omit<HTMLAttributes, "class"> & TailwindClassProp;
    } & {
        modelValue: T;
    }) & {
        "onUpdate:modelValue"?: ((value: T) => any) | undefined;
    }> & (typeof globalThis extends {
        __VLS_PROPS_FALLBACK: infer P;
    } ? P : {});
    expose: (exposed: {}) => void;
    attrs: any;
    slots: {};
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
//# sourceMappingURL=WSlider.vue.d.ts.map