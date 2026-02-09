import { type BaseInteractiveProps, type LabelProps, type LinkableByIdProps, type TailwindClassProp } from "../shared/props.js";
import type { HTMLAttributes } from "vue";
type RealProps = LinkableByIdProps & BaseInteractiveProps & LabelProps & {
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
interface Props extends 
/** @vue-ignore */
Partial<Omit<HTMLAttributes, "class"> & TailwindClassProp>, RealProps {
}
declare const _default: typeof __VLS_export;
export default _default;
declare const __VLS_export: __VLS_WithSlots<import("vue").DefineComponent<Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<Props> & Readonly<{}>, {
    disabled: boolean;
    readonly: boolean;
    border: boolean;
    unstyle: boolean;
    autohideOnComplete: number;
    keepSpaceWhenHidden: boolean;
    clamp: [start: number, end: number];
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
    default?: (props: {}) => any;
} & {
    default?: (props: {}) => any;
}>;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
//# sourceMappingURL=LibProgressBar.vue.d.ts.map