/**
 * Simple debug component for displaying objects and strings with whitespace.
 *
 * In the case of objects, it JSON.stringifies them with a tab character. The tab width can be controlled with the `tab` prop, which will set the `tab-size` css property on the element.
 *
 * The value can be undefined, it will just display undefined.
 */
declare const _default: __VLS_WithSlots<import("vue").DefineComponent<{
    /** The value to debug, can be anything. */
    value?: any;
    /** Sets the tab size in css. Defaults to 3. */
    tab?: number;
    title?: string;
}, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<{
    /** The value to debug, can be anything. */
    value?: any;
    /** Sets the tab size in css. Defaults to 3. */
    tab?: number;
    title?: string;
}> & Readonly<{}>, {
    title: string;
    value: any;
    tab: number;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
    default?: ((props: {}) => any) | undefined;
}>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
//# sourceMappingURL=LibDebug.vue.d.ts.map