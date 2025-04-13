declare module "vue" {
    interface GlobalComponents {
        DevOnly: any;
    }
}
declare const _default: __VLS_WithSlots<import("vue").DefineComponent<{
    show?: boolean;
}, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<{
    show?: boolean;
}> & Readonly<{}>, {
    show: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
    default?: (((props: {}) => any) & ((props: {}) => any)) | undefined;
}>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
//# sourceMappingURL=LibDevOnly.vue.d.ts.map