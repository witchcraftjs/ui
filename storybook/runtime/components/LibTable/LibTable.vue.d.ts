import { type VirtualizerOptions } from "@tanstack/vue-virtual";
import { type TableHTMLAttributes } from "vue";
import type { ResizableOptions, TableColConfig } from "../../types/index.js";
import type { TailwindClassProp } from "../shared/props.js";
type T = any;
type RealProps = {
    resizable?: Partial<ResizableOptions>;
    values?: T[];
    /** Let's the table know the shape of the data since values might be empty. */
    cols?: (keyof T)[];
    rounded?: boolean;
    border?: boolean;
    cellBorder?: boolean;
    /** Disables the header. This also sets the selector to `tr:first-child > td` instead to avoid issues with the vResizableCols directive. */
    header?: boolean;
    colConfig?: TableColConfig<T>;
    /**
     * See tanstack/vue-virtual {@link https://tanstack.com/virtual/latest/docs/api/virtualizer}
     *
     * The defaults are:
     *
     * - enabled: false
     * - method: "fixed"
     * - overscan: (50 if fixed, 10 if dynamic)
     * - estimateSize: () => { return 33 }
     *
     * This also has an additional option, `method`, which can be set to `fixed` or `dynamic` (experimental).
     *
     * Notes:
     *
     * - Because of how virtualization works, initial layout (before .resizable-cols-setup class is applied) will only have access to the headers and not the rows. This can cause cols to look very small, especially if using resizable.fitWidth false.
     *
     * ### Fixed
     *
     * `fixed` is the default and will set the height of ALL items to the height of the first item onMounted (tanstack does not do this and if your estimateSize if off, the scrolling is weird).
     *
     * Since the table now truncates rows by default, they will always be the same height unless you change the inner styling. In fixed mode, `forceRecalculateFixedVirtualizer` is exposed if you need to force re-calculation.
     *
     * If using slots, be sure to at least pass the `class` slot prop to the td element. `style` with width is also supplied but is not required if you're displaying the table as a table.
     *
     * ### Dynamic (experimental)
     *
     * In `dynamic` mode we use tanstack's measureElement method. This is more expensive, but it will work with any heights.
     *
     * Dynamic mode also requires the table displays itself using grid and flex post setup as otherwise dynamic mode doesn't work.
     *
     * You don't need to do anything unless using slots. If using slots, pass the given `ref` slot prop to ref (internally this is tanstack's measureElement) and the class and style slot props at the very least:
     * ```vue
     * <template #[`${colName}`]="slotProps">
     * 	<td
     * 		:ref="slotProps.ref"
     * 		:class="slotProps.class"
     * 		:style="slotProps.style"
     * 	>
     * 		{{ slotProps.value }}
     * 	</td>
     * </template>
     * ```
     */
    virtualizerOptions?: Partial<VirtualizerOptions<any, any>> & {
        method?: "fixed" | "dynamic";
    };
    /** Whether to enable sticky header styles. This requires `border:false`. This moves the border to the wrapper and styles a straight border between the scroll bar and the rounded border. */
    stickyHeader?: boolean;
    /** Which key to use for the rows (only if not using virtualization). */
    itemKey?: keyof T | ((item: T) => string);
};
interface Props extends 
/** @vue-ignore */
Partial<Omit<TableHTMLAttributes, "class" | "readonly" | "disabled"> & TailwindClassProp>, RealProps {
}
declare const _default: typeof __VLS_export;
export default _default;
declare const __VLS_export: <T>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: __VLS_PrettifyLocal<Pick<NonNullable<Awaited<typeof __VLS_setup>>, "attrs" | "emit" | "slots">>, __VLS_exposed?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
    props: import("vue").PublicProps & __VLS_PrettifyLocal<Props> & (typeof globalThis extends {
        __VLS_PROPS_FALLBACK: infer P;
    } ? P : {});
    expose: (exposed: import("vue").ShallowUnwrapRef<{
        forceRecalculateFixedVirtualizer: () => void;
    }>) => void;
    attrs: any;
    slots: {
        [x: `header-${string}`]: ((props: {
            colKey: string | number | symbol;
            config: any;
            style: {
                width: undefined;
            };
            class: string | undefined;
        }) => any) | undefined;
    } & {
        [x: string]: ((props: {
            class: string | undefined;
            style: {
                width: undefined;
            };
            item: any;
            value: any;
        }) => any) | undefined;
        [x: number]: ((props: {
            class: string | undefined;
            style: {
                width: undefined;
            };
            item: any;
            value: any;
        }) => any) | undefined;
        [x: symbol]: ((props: {
            class: string | undefined;
            style: {
                width: undefined;
            };
            item: any;
            value: any;
        }) => any) | undefined;
    };
    emit: {};
}>) => import("vue").VNode & {
    __ctx?: Awaited<typeof __VLS_setup>;
};
type __VLS_PrettifyLocal<T> = (T extends any ? {
    [K in keyof T]: T[K];
} : {
    [K in keyof T as K]: T[K];
}) & {};
//# sourceMappingURL=LibTable.vue.d.ts.map