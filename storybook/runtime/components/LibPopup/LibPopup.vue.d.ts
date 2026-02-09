import { type HTMLAttributes } from "vue";
import { type LinkableByIdProps, type TailwindClassProp, type PopupProps } from "../shared/props.js";
import type { IPopupReference } from "../../types/index.js";
type RealProps = LinkableByIdProps & PopupProps;
interface Props extends 
/** @vue-ignore */
Partial<Omit<HTMLAttributes, "class"> & TailwindClassProp>, RealProps {
}
declare const _default: typeof __VLS_export;
export default _default;
declare const __VLS_export: __VLS_WithSlots<import("vue").DefineComponent<Props & {
    modelValue?: boolean;
}, {
    recompute: (force?: boolean) => void;
    setReference: (el: IPopupReference | null) => void;
    setBackground: (el: IPopupReference | null) => void;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (value: boolean) => any;
} & {
    close: () => any;
}, string, import("vue").PublicProps, Readonly<Props & {
    modelValue?: boolean;
}> & Readonly<{
    onClose?: (() => any) | undefined;
    "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
}>, {
    useDialogForBackdrop: false;
    useBackdrop: boolean;
    preferredHorizontal: ("center" | "right" | "left" | "either" | "center-screen" | "right-most" | "left-most" | "center-most")[] | import("../../main.lib.js").PopupPositioner;
    preferredVertical: ("top" | "bottom" | "center" | "either" | "center-screen" | "top-most" | "bottom-most" | "center-most")[] | import("../../main.lib.js").PopupPositioner;
    avoidRepositioning: boolean;
    canClose: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
    button?: (props: {
        extractEl: (_: any) => any;
    }) => any;
} & {
    popup?: (props: {
        position: {
            x: number;
            y: number;
            maxWidth?: number | undefined;
            maxHeight?: number | undefined;
        };
        extractEl: (_: any) => any;
    }) => any;
}>;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
//# sourceMappingURL=LibPopup.vue.d.ts.map