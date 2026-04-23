import { type InputHTMLAttributes } from "vue";
import type { BaseInteractiveProps, TailwindClassProp } from "../../types/index.js";
declare const __VLS_export: <T>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: __VLS_PrettifyLocal<Pick<NonNullable<Awaited<typeof __VLS_setup>>, "attrs" | "emit" | "slots">>, __VLS_exposed?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
    props: import("vue").PublicProps & __VLS_PrettifyLocal<(Omit<InputHTMLAttributes, "disabled" | "class" | "type" | "onInput" | "onSubmit" | "readonly" | "autocomplete"> & TailwindClassProp & Pick<BaseInteractiveProps, "border" | "unstyle"> & {
        id?: string;
        label?: string;
        valid?: boolean;
        type?: InputHTMLAttributes["type"];
    } & {
        modelValue: T;
    }) & {
        onSubmit?: ((val: T) => any) | undefined;
        onInput?: ((val: InputEvent) => any) | undefined;
        "onUpdate:modelValue"?: ((value: T) => any) | undefined;
    }> & (typeof globalThis extends {
        __VLS_PROPS_FALLBACK: infer P;
    } ? P : {});
    expose: (exposed: {}) => void;
    attrs: any;
    slots: {};
    emit: {
        (e: "submit", val: T): void;
        (e: "input", val: InputEvent): void;
    } & ((event: "update:modelValue", value: T) => void);
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
//# sourceMappingURL=WSimpleInput.vue.d.ts.map