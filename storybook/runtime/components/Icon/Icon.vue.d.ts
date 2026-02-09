import { type HTMLAttributes } from "vue";
/**
 * Just a very simple wrapper for wrapping unplugin-icons in an inline-block div so the icon in the slot take's up a normal line height when it's alone.
 *
 * ```vue
 * 		<icon><i-...></icon>
 * ``
 */
interface Props extends 
/** @vue-ignore */
Partial<Omit<HTMLAttributes, "class">> {
}
declare const _default: typeof __VLS_export;
export default _default;
declare const __VLS_export: __VLS_WithSlots<import("vue").DefineComponent<Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<Props> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
    default?: (props: {}) => any;
}>;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
//# sourceMappingURL=Icon.vue.d.ts.map