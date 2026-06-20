import type { ControlVar } from "metamorphosis";
import { type Ref } from "vue";
/**
 * Wraps a ControlVar instance to provide a Vue-compatible reactive wrapper supporting direct mutation and v-model.
 *
 * ```ts
 * const rawVar = new ControlVar(Units.num, 42)
 * const { ref, css } = useMetamorphosisControlVar(rawVar)
 * ```
 * ```vue
 * <input v-model.number="ref" type="number" />
 * ```
 */
export declare function useMetamorphosisControlVar<TVal extends Record<string, any> | string | number | boolean, TUnit extends TVal extends Record<string, any> ? TVal : Record<"_", any>>(
/** The plain ControlVar instance. */
controlVar: ControlVar<TVal, TUnit>): {
    /** Direct access to the raw ControlVar instance. */
    instance: ControlVar<TVal, TUnit>;
    /** Writable ref targeting the underlying primitive value, or the internal key wrapper. Compatible with v-model. */
    ref: Ref<TVal extends Record<string, any> ? TUnit : any>;
    /** Read-only ref containing the generated CSS string. */
    css: Ref<string>;
};
//# sourceMappingURL=useMetamorphosisControlVar.d.ts.map