import type { Theme } from "metamorphosis/Theme";
import { type Ref } from "vue";
/**
 * Wraps a Theme instance to provide Vue-compatible reactive wrappers for CSS output and registered entries.
 * ```ts
 * const theme = new Theme({ bg, fg, accent })
 * const { theme, css, entries } = useMetamorphosisTheme(theme)
 * ```
 */
export declare function useMetamorphosisTheme(
/** The plain Theme instance. */
theme: Theme<any>): {
    /** Direct access to the raw Theme instance. */
    instance: Theme<any>;
    /** Read-only ref containing the computed CSS variable map. */
    css: Ref<Theme<any>["css"]>;
    /** Read-only. */
    value: Ref<Theme<any>["value"]>;
};
//# sourceMappingURL=useMetamorphosisTheme.d.ts.map