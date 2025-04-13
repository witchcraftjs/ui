import { type TableHTMLAttributes } from "vue";
import type { ResizableOptions, TableColConfig } from "../../types/index.js";
import type { TailwindClassProp } from "../shared/props.js";
type T = any;
type RealProps = {
    resizable?: Partial<ResizableOptions>;
    values?: T[];
    itemKey?: keyof T | ((item: T) => string);
    /** Let's the table know the shape of the data since values might be empty. */
    cols?: (keyof T)[];
    rounded?: boolean;
    border?: boolean;
    cellBorder?: boolean;
    header?: boolean;
    colConfig?: TableColConfig<T>;
};
interface Props extends 
/** @vue-ignore */
Partial<Omit<TableHTMLAttributes, "class" | "readonly" | "disabled"> & TailwindClassProp>, RealProps {
}
declare const _default: <T>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: __VLS_PrettifyLocal<Pick<NonNullable<Awaited<typeof __VLS_setup>>, "attrs" | "emit" | "slots">>, __VLS_expose?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
    props: __VLS_PrettifyLocal<Pick<Partial<{}> & Omit<{} & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, never>, never> & Props & Partial<{}>> & import("vue").PublicProps;
    expose(exposed: import("vue").ShallowUnwrapRef<{}>): void;
    attrs: any;
    slots: {
        [x: `header-${string}`]: ((props: {
            colKey: string | number | symbol;
            style: string;
            class: string;
        }) => any) | undefined;
        [x: string]: ((props: {
            class: string;
            item: any;
            value: any;
        }) => any) | undefined;
        [x: number]: ((props: {
            class: string;
            item: any;
            value: any;
        }) => any) | undefined;
        [x: symbol]: ((props: {
            class: string;
            item: any;
            value: any;
        }) => any) | undefined;
    };
    emit: {};
}>) => import("vue").VNode & {
    __ctx?: Awaited<typeof __VLS_setup>;
};
export default _default;
type __VLS_PrettifyLocal<T> = {
    [K in keyof T]: T[K];
} & {};
//# sourceMappingURL=LibTable.vue.d.ts.map