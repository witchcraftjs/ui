import type { HTMLAttributes } from "vue";
import type { TailwindClassProp } from "../../types/index.js";
type __VLS_Props = /** @vue-ignore */ Omit<HTMLAttributes, "class"> & /** @vue-ignore */ TailwindClassProp & {
    label?: string;
    /** A number from 0-100. It is auto-clamped. */
    progress: number;
    /** Will auto hide after this given time if progress is 100% or more or less than 0% until progress is set to something else. Disabled (-1) by default. */
    autohideOnComplete?: number;
    /**
     * Do not actually hide the element, just leave an unstyled div,
     * so the whole layout doesn't change on completion when autohideOnComplete is set.
     */
    keepSpaceWhenHidden?: boolean;
    /**
     * By default the progress bar is visually clamped to 0-100, even if the value might be something else.
     * You can change what it's clamped to here, to for example,
     * show at least a small sliver of the progress bar when it's still 0.
     */
    clamp?: [start: number, end: number];
};
declare var __VLS_13: {}, __VLS_21: {};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_13) => any;
} & {
    default?: (props: typeof __VLS_21) => any;
};
declare const __VLS_base: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {
    autohideOnComplete: number;
    keepSpaceWhenHidden: boolean;
    clamp: [start: number, end: number];
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
//# sourceMappingURL=WProgressBar.vue.d.ts.map