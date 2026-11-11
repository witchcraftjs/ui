import type { AuthProviderStyle, TailwindClassProp } from "../../types/index.js";
type __VLS_Props = {
    /** List of provider names to render buttons for. */
    providers: string[];
    providerStyles?: Record<string, Partial<AuthProviderStyle>>;
} & /** @vue-ignore */ TailwindClassProp;
declare var __VLS_20: {
    class: string;
    iconClass: string;
};
type __VLS_Slots = {} & {
    extra?: (props: typeof __VLS_20) => any;
};
declare const __VLS_base: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    login: (provider: string) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    onLogin?: ((provider: string) => any) | undefined;
}>, {
    providerStyles: Record<string, Partial<AuthProviderStyle>>;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
//# sourceMappingURL=WAuth.vue.d.ts.map