import { type HTMLAttributes } from "vue";
import type { TailwindClassProp } from "../shared/props.js";
/**
 * Pagination component.
 *
 * Can be passed a slot like so to use a custom link element (like NuxtLink):
 * ```vue
 * <template #link="{ href, i, text, ariaLabel, ariaCurrent}">
 * 	<NuxtLink :to="href" :aria-label="ariaLabel" :aria-current="ariaCurrent ?? false">{{ text ?? i }}</NuxtLink>
 * </template>
 * ```
 */
declare const _default: typeof __VLS_export;
export default _default;
type RealProps = {
    /** The total number of pages. */
    total: number;
    /** The number of the current page. It must be valid, between 0 - total or the component will throw an error. */
    current: number;
    /** The base route/link path for the page. Should end with a forward slash `/`. */
    route: string;
    /**
     * A function to customize the output href and page link number. By default, page 0 is page 1, page 1 is 1, then everything else is normal.
     *
     * This is because usually we have routes like: `/page/1`, `/page/2`, not `/page/0`.
     *
     * You can use this function to customize things further. For example, make `/page/1` just `/`
     */
    customRoute?: (route: string, i: number) => {
        i: number;
        href: string;
    };
    /** How many extra pages to show to each side of the current page. */
    extraPages?: number;
};
interface Props extends 
/** @vue-ignore */
Partial<Omit<HTMLAttributes, "class"> & TailwindClassProp>, RealProps {
}
declare const __VLS_export: __VLS_WithSlots<import("vue").DefineComponent<Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<Props> & Readonly<{}>, {
    customRoute: (route: string, i: number) => {
        i: number;
        href: string;
    };
    extraPages: number;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
    link?: (props: {
        class: string;
        i: number;
        href: string;
        text: string;
        ariaLabel: string;
    }) => any;
} & {
    link?: (props: {
        class: string;
        i: number;
        href: string;
        text: number;
        ariaLabel: string;
    }) => any;
} & {
    link?: (props: {
        i: number;
        href: string;
        ariaLabel: string;
        class: string;
    }) => any;
} & {
    current?: (props: {
        tabindex: string;
        i: number;
        ariaLabel: string;
        aria_current: boolean;
        class: string;
    }) => any;
} & {
    link?: (props: {
        i: number;
        href: string;
        ariaLabel: string;
        class: string;
    }) => any;
} & {
    link?: (props: {
        i: number;
        href: string;
        text: number;
        ariaLabel: string;
        class: string;
    }) => any;
} & {
    link?: (props: {
        i: number;
        href: string;
        text: string;
        ariaLabel: string;
        class: string;
    }) => any;
}>;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
//# sourceMappingURL=LibPagination.vue.d.ts.map