import { type InputHTMLAttributes } from "vue";
import { type BaseInteractiveProps, type LabelProps, type LinkableByIdProps, type TailwindClassProp } from "../shared/props.js";
type RealProps = LinkableByIdProps & LabelProps & BaseInteractiveProps & {
    placeholder?: InputHTMLAttributes["placeholder"];
    disabled?: InputHTMLAttributes["disabled"];
    id?: InputHTMLAttributes["id"];
    type?: InputHTMLAttributes["type"];
    valid?: boolean;
};
interface Props extends 
/** @vue-ignore */
Partial<Omit<InputHTMLAttributes, "class" | "readonly" | "disabled" | "onSubmit" | "onInput" | "autocomplete"> & TailwindClassProp>, RealProps {
}
declare const _default: typeof __VLS_export;
export default _default;
declare const __VLS_export: <T>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: __VLS_PrettifyLocal<Pick<NonNullable<Awaited<typeof __VLS_setup>>, "attrs" | "emit" | "slots">>, __VLS_exposed?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
    props: import("vue").PublicProps & __VLS_PrettifyLocal<(Props & {
        modelValue: T;
    }) & {
        onInput?: ((val: InputEvent) => any) | undefined;
        onSubmit?: ((val: T) => any) | undefined;
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
type __VLS_PrettifyLocal<T> = (T extends any ? {
    [K in keyof T]: T[K];
} : {
    [K in keyof T as K]: T[K];
}) & {};
//# sourceMappingURL=LibSimpleInput.vue.d.ts.map