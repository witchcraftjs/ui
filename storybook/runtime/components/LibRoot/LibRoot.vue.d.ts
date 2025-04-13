import { type Theme } from "metamorphosis";
import { type ComponentPublicInstance } from "vue";
import { twMerge } from "../../utils/twMerge.js";
import TestControls from "../TestControls/TestControls.vue";
declare const $attrs: import("vue").Ref<Record<"attrs" | `${string}Attrs`, Record<string, any>>, Record<"attrs" | `${string}Attrs`, Record<string, any>>>;
type __VLS_Props = {
    theme?: Theme;
    outline?: boolean;
    forceOutline?: boolean;
    testWrapperMode?: boolean;
    id?: string;
    /** You can set a ref to the root element by passing :getRef="_ => el = _" */
    getRef?: (el: HTMLElement | null) => void;
    /** True by default, should be passed import.meta.client if using nuxt, or false when running server side. */
    isClientSide?: boolean;
    useBuiltinTranslations?: boolean;
};
declare function handleRef(_: Element | ComponentPublicInstance | null): void;
declare const showOutline: import("vue").ComputedRef<boolean>;
declare const darkMode: import("vue").Ref<boolean, boolean>;
declare const __VLS_ctx: InstanceType<__VLS_PickNotAny<typeof __VLS_self, new () => {}>>;
declare var __VLS_4: {};
type __VLS_Slots = __VLS_PrettifyGlobal<__VLS_OmitStringIndex<typeof __VLS_ctx.$slots> & {
    default?: (props: typeof __VLS_4) => any;
}>;
declare const __VLS_self: import("vue").DefineComponent<__VLS_Props, {
    twMerge: typeof twMerge;
    TestControls: typeof TestControls;
    $attrs: typeof $attrs;
    handleRef: typeof handleRef;
    showOutline: typeof showOutline;
    darkMode: typeof darkMode;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {
    theme: Theme;
    id: string;
    isClientSide: boolean;
    useBuiltinTranslations: boolean;
    outline: boolean;
    forceOutline: boolean;
    testWrapperMode: boolean;
    getRef: (el: HTMLElement | null) => void;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_component: import("vue").DefineComponent<__VLS_Props, {
    darkMode: import("../../composables/useDarkMode.js").DarkModeState & import("../../composables/useDarkMode.js").DarkModeCommands;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {
    theme: Theme;
    id: string;
    isClientSide: boolean;
    useBuiltinTranslations: boolean;
    outline: boolean;
    forceOutline: boolean;
    testWrapperMode: boolean;
    getRef: (el: HTMLElement | null) => void;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
//# sourceMappingURL=LibRoot.vue.d.ts.map