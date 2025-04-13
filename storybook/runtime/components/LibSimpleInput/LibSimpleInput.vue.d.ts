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
Partial<Omit<InputHTMLAttributes, "class" | "readonly" | "disabled" | "onSubmit" | "onInput"> & TailwindClassProp>, RealProps {
}
declare const _default: <T>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: __VLS_PrettifyLocal<Pick<NonNullable<Awaited<typeof __VLS_setup>>, "attrs" | "emit" | "slots">>, __VLS_expose?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
    props: __VLS_PrettifyLocal<Pick<Partial<{}> & Omit<{
        readonly onSubmit?: ((val: T) => any) | undefined;
        readonly onInput?: ((val: InputEvent) => any) | undefined;
        readonly "onUpdate:modelValue"?: ((value: T) => any) | undefined;
    } & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, never>, "onInput" | "onSubmit" | "onUpdate:modelValue"> & (Props & {
        modelValue: T;
    }) & Partial<{}>> & import("vue").PublicProps;
    expose(exposed: import("vue").ShallowUnwrapRef<{}>): void;
    attrs: any;
    slots: {};
    emit: {
        (e: "submit", val: T): void;
        (e: "input", val: InputEvent): void;
    } & ((evt: "update:modelValue", value: T) => void);
}>) => import("vue").VNode & {
    __ctx?: Awaited<typeof __VLS_setup>;
};
export default _default;
type __VLS_PrettifyLocal<T> = {
    [K in keyof T]: T[K];
} & {};
//# sourceMappingURL=LibSimpleInput.vue.d.ts.map