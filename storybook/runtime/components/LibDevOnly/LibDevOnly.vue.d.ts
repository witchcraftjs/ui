export interface Props {
    show?: boolean;
}
declare module "vue" {
    interface GlobalComponents {
        DevOnly: any;
    }
}
declare const _default: typeof __VLS_export;
export default _default;
declare const __VLS_export: __VLS_WithSlots<import("vue").DefineComponent<{
    show?: boolean;
}, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<{
    show?: boolean;
}> & Readonly<{}>, {
    show: boolean;
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
//# sourceMappingURL=LibDevOnly.vue.d.ts.map