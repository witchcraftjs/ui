import { type HTMLAttributes } from "vue";
import { type BaseInteractiveProps, type LabelProps, type MultiValueProps, type TailwindClassProp, type WrapperProps } from "../shared/props.js";
type WrapperTypes = Partial<WrapperProps<"item", HTMLAttributes>>;
type RealProps = LabelProps & BaseInteractiveProps & MultiValueProps & {
    border?: boolean;
};
interface Props extends 
/** @vue-ignore */
Partial<Omit<HTMLAttributes, "class"> & TailwindClassProp>, 
/** @vue-ignore */
WrapperTypes, RealProps {
}
declare const _default: <T extends string | number>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: __VLS_PrettifyLocal<Pick<NonNullable<Awaited<typeof __VLS_setup>>, "attrs" | "emit" | "slots">>, __VLS_expose?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
    props: __VLS_PrettifyLocal<Pick<Partial<{}> & Omit<{
        readonly "onUpdate:values"?: ((value: T[]) => any) | undefined;
    } & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, never>, "onUpdate:values"> & (Props & {
        values?: T[];
    }) & Partial<{}>> & import("vue").PublicProps;
    expose(exposed: import("vue").ShallowUnwrapRef<{}>): void;
    attrs: any;
    slots: {};
    emit: (evt: "update:values", value: T[]) => void;
}>) => import("vue").VNode & {
    __ctx?: Awaited<typeof __VLS_setup>;
};
export default _default;
type __VLS_PrettifyLocal<T> = {
    [K in keyof T]: T[K];
} & {};
//# sourceMappingURL=LibMultiValues.vue.d.ts.map