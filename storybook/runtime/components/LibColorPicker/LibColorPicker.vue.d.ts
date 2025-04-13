import { type Ref, type UnwrapRef } from "vue";
import type { HsvaColor, RgbaColor } from "../../types/index.js";
import { twMerge } from "../../utils/twMerge.js";
import aria from "../Aria/Aria.vue";
import Icon from "../Icon/Icon.vue";
import LibButton from "../LibButton/LibButton.vue";
import LibSimpleInput from "../LibSimpleInput/LibSimpleInput.vue";
import { type LabelProps, type LinkableByIdProps } from "../shared/props.js";
declare const t: import("../../composables/useSetupI18n.js").TranslationFunction;
declare const sliderClasses = "\n\tslider\n\tno-touch-action\n\th-4\n\tw-full\n\trelative\n\tflex\n";
declare const handleClasses = "\n\th-[var(--slider-size)]\n\tw-[var(--slider-size)]\n\tshadow-xs\n\tshadow-black/50\n\tborder-2 border-neutral-700\n\trounded-full\n\tabsolute\n\tcursor-pointer\n\toutline-hidden\n\tfocus:border-accent-500\n\tactive:border-accent-500\n\thover:border-accent-500\n";
declare const ariaDescription: string;
declare const fallbackId: string;
type __VLS_Props = LabelProps & LinkableByIdProps & {
    allowAlpha?: boolean;
    border?: boolean;
    copyTransform?: (val: HsvaColor, stringVal: string) => any;
};
type __VLS_Emit = {
    (e: "save", val: RgbaColor): void;
    (e: "cancel"): void;
};
declare const emits: __VLS_Emit;
declare const pickerEl: Ref<HTMLCanvasElement | null, HTMLCanvasElement | null>;
declare const hueSliderEl: Ref<HTMLCanvasElement | null, HTMLCanvasElement | null>;
declare const alphaSliderEl: Ref<HTMLCanvasElement | null, HTMLCanvasElement | null>;
type Config = Record<string, {
    el: Ref<HTMLCanvasElement>;
    xKey?: keyof HsvaColor;
    yKey?: keyof HsvaColor;
    xSteps?: number;
    ySteps?: number;
}>;
declare const localColor: {
    val: {
        h: number;
        s: number;
        v: number;
        a?: number | undefined;
    };
    percent: {
        h: number;
        s: number;
        v: number;
        a?: number | undefined;
    };
};
declare const localColorString: import("vue").ComputedRef<string>;
declare const localColorStringOpaque: import("vue").ComputedRef<string>;
declare const copy: () => void;
type Types = keyof UnwrapRef<Config>;
declare const slider: {
    keydown: (e: KeyboardEvent, type: Types) => void;
    pointerdown: (e: PointerEvent, type: Types) => void;
    pointerleave: (e: PointerEvent) => void;
    pointermove: (e: PointerEvent) => void;
    pointerup: (e: PointerEvent) => void;
};
declare const parseInput: (e: Event) => void;
declare const save: () => void;
declare const invertColors: import("vue").ComputedRef<boolean>;
type __VLS_PublicProps = __VLS_Props & {
    modelValue?: RgbaColor;
};
declare const __VLS_ctx: InstanceType<__VLS_PickNotAny<typeof __VLS_self, new () => {}>>;
declare var __VLS_4: {}, __VLS_27: {};
type __VLS_Slots = __VLS_PrettifyGlobal<__VLS_OmitStringIndex<typeof __VLS_ctx.$slots> & {
    input?: (props: typeof __VLS_4) => any;
} & {
    buttons?: (props: typeof __VLS_27) => any;
}>;
declare const __VLS_self: import("vue").DefineComponent<__VLS_PublicProps, {
    twMerge: typeof twMerge;
    aria: typeof aria;
    Icon: typeof Icon;
    LibButton: typeof LibButton;
    LibSimpleInput: typeof LibSimpleInput;
    t: typeof t;
    sliderClasses: typeof sliderClasses;
    handleClasses: typeof handleClasses;
    ariaDescription: typeof ariaDescription;
    fallbackId: typeof fallbackId;
    emits: typeof emits;
    pickerEl: typeof pickerEl;
    hueSliderEl: typeof hueSliderEl;
    alphaSliderEl: typeof alphaSliderEl;
    localColor: typeof localColor;
    localColorString: typeof localColorString;
    localColorStringOpaque: typeof localColorStringOpaque;
    copy: typeof copy;
    slider: typeof slider;
    parseInput: typeof parseInput;
    save: typeof save;
    invertColors: typeof invertColors;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (value: RgbaColor) => any;
} & {
    cancel: () => any;
    save: (val: RgbaColor) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_PublicProps> & Readonly<{
    onCancel?: (() => any) | undefined;
    "onUpdate:modelValue"?: ((value: RgbaColor) => any) | undefined;
    onSave?: ((val: RgbaColor) => any) | undefined;
}>, {
    border: boolean;
    allowAlpha: boolean;
    copyTransform: (val: HsvaColor, stringVal: string) => any;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_component: import("vue").DefineComponent<__VLS_PublicProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (value: RgbaColor) => any;
} & {
    cancel: () => any;
    save: (val: RgbaColor) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_PublicProps> & Readonly<{
    onCancel?: (() => any) | undefined;
    "onUpdate:modelValue"?: ((value: RgbaColor) => any) | undefined;
    onSave?: ((val: RgbaColor) => any) | undefined;
}>, {
    border: boolean;
    allowAlpha: boolean;
    copyTransform: (val: HsvaColor, stringVal: string) => any;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
//# sourceMappingURL=LibColorPicker.vue.d.ts.map