import { type HTMLAttributes } from "vue";
import { type LinkableByIdProps, type TailwindClassProp } from "../shared/props.js";
import type { IPopupReference, PopupPositioner, PopupPositionModifier } from "../../types/index.js";
type RealProps = LinkableByIdProps & {
    useBackdrop?: boolean;
    /**
     * The preferred horizontal positioning of the popup. The first position in the array to fit is used.
     *
     * All elements need to have box-sizing: border-box set. Also note that while the component should work with dynamic popup sizes, in practice there's issues with the positioning being slightly off. Giving the popup element a static size is better. If you need margins around the popup, this can be done with a wrapper element + padding.
     *
     * The positions `right`/`left`/`top`/`bottom` are relative to the opposite side of the button element so as to try not to cover the triggering button.
     *
     * So positioning `right` and `left` look like this:
     *
     * ```
     * // right
     *         [button]
     *         [----popup----]
     *
     * // left
     *         [button]
     *  [----popup----]
     * ```
     *
     * Positions `*-most` try to position the popup as close to that side of the screen as possible, otherwise limiting the popup to that edge. For example:
     *
     * ```
     * [--------------screen---------------]
     * // right-most
     *           [button]
     *                   [----popup----]
     * // near the edge:
     *                 [button]
     *                      [----popup----]
     * ```
     *
     * There is also the `center-screen` position, which centers the popup on the screen.
     *
     * These last two (`*-most` and `center-screen`) are greedy, they will always find a position that fits. Positions listed after are ignored.
     *
     * You can also specify a function instead which is given some additional information regarding the space around the button reference element. It should a number for the x position (or y, if preferredVertical).
     *
     * If you only need to slightly modify	the position, you can use the `modifyPosition` option instead.
     */
    preferredHorizontal?: ("center" | "right" | "left" | "either" | "center-screen" | "right-most" | "left-most" | "center-most")[] | PopupPositioner;
    /** See `preferredHorizontal`. */
    preferredVertical?: ("top" | "bottom" | "center" | "either" | "center-screen" | "top-most" | "bottom-most" | "center-most")[] | PopupPositioner;
    /**
     * When the user scrolls or resizes, normally the entire popup position is recomputed, taking into account the preferred positioning.
     *
     * This can cause it to shift around.
     *
     * Set this to true to only shift the popup depending on how much the button element moved and avoid recalculating the best position.
     */
    avoidRepositioning?: boolean;
    /**
     * Allows modifying the calculated position, to for example, clamp it.
     */
    modifyPosition?: PopupPositionModifier;
};
interface Props extends 
/** @vue-ignore */
Partial<Omit<HTMLAttributes, "class"> & TailwindClassProp>, RealProps {
}
declare const _default: __VLS_WithSlots<import("vue").DefineComponent<Props & {
    modelValue?: boolean;
}, {
    recompute: (force?: boolean) => void;
    setReference: (el: IPopupReference | null) => void;
    setBackground: (el: IPopupReference | null) => void;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (value: boolean) => any;
}, string, import("vue").PublicProps, Readonly<Props & {
    modelValue?: boolean;
}> & Readonly<{
    "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
}>, {
    useBackdrop: boolean;
    preferredHorizontal: ("center" | "right" | "left" | "either" | "center-screen" | "right-most" | "left-most" | "center-most")[] | PopupPositioner;
    preferredVertical: ("top" | "bottom" | "center" | "either" | "center-screen" | "top-most" | "bottom-most" | "center-most")[] | PopupPositioner;
    avoidRepositioning: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
    button?: ((props: {
        extractEl: (_: any) => any;
    }) => any) | undefined;
    popup?: ((props: {
        position: {
            x: number;
            y: number;
            maxWidth?: number | undefined;
            maxHeight?: number | undefined;
        };
        extractEl: (_: any) => any;
    }) => any) | undefined;
}>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
//# sourceMappingURL=LibPopup.vue.d.ts.map