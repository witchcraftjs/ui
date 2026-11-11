import { type PaginationRootProps } from "reka-ui";
import { type HTMLAttributes } from "vue";
import type { TailwindClassProp } from "../../types/index.js";
type __VLS_Props = /** @vue-ignore */ Omit<HTMLAttributes, "class"> & /** @vue-ignore */ TailwindClassProp & Pick<PaginationRootProps, "defaultPage" | "siblingCount" | "itemsPerPage"> & {
    route: string;
    customRoute?: (route: string, i: number) => {
        i: number;
        href: string;
    };
    total: number;
};
type __VLS_ModelProps = {
    "current": number;
};
type __VLS_PublicProps = __VLS_Props & __VLS_ModelProps;
declare var __VLS_22: {}, __VLS_35: {}, __VLS_48: {
    value: number;
}, __VLS_62: {}, __VLS_75: {};
type __VLS_Slots = {} & {
    first?: (props: typeof __VLS_22) => any;
} & {
    prev?: (props: typeof __VLS_35) => any;
} & {
    page?: (props: typeof __VLS_48) => any;
} & {
    next?: (props: typeof __VLS_62) => any;
} & {
    last?: (props: typeof __VLS_75) => any;
};
declare const __VLS_base: import("vue").DefineComponent<__VLS_PublicProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:current": (value: number) => any;
} & {
    "link-click": (event: MouseEvent, payload: {
        i: number;
        href: string;
    }) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_PublicProps> & Readonly<{
    "onLink-click"?: ((event: MouseEvent, payload: {
        i: number;
        href: string;
    }) => any) | undefined;
    "onUpdate:current"?: ((value: number) => any) | undefined;
}>, {
    defaultPage: number;
    siblingCount: number;
    itemsPerPage: number;
    customRoute: (route: string, i: number) => {
        i: number;
        href: string;
    };
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
//# sourceMappingURL=WPagination.vue.d.ts.map