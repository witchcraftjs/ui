import type { ControlVar } from "metamorphosis/ControlVar";
import type { InterpolatedVars } from "metamorphosis/InterpolatedVars";
import { type Ref } from "vue";
/**
 * Wraps an InterpolatedVars instance to provide Vue-compatible reactive wrappers for values, stops, and options supporting v-model.
 * ```ts
 * const interpolated = new InterpolatedVars("spacing", Units.px, [v1, v2])
 * const { values, stops, options, interpolatedMap } = useMetamorphosisInterpolatedVars(interpolated)
 * // In template:
 * // <input v-model="options.steps" type="number" />
 * ```
 */
export declare function useMetamorphosisInterpolatedVars<TUnit extends Record<string, any> = Record<string, any>>(
/** The plain InterpolatedVars instance. */
interpolatedVars: InterpolatedVars<TUnit>): {
    /** Direct access to the raw InterpolatedVars instance. */
    instance: InterpolatedVars<TUnit>;
    /** Readonly ref containing the generated raw interpolated array. */
    value: Ref<InterpolatedVars<TUnit>["value"]>;
    /** Writable array ref for the underlying ControlVars. Compatible with v-model. */
    values: Ref<ControlVar<any, TUnit>[]>;
    /** Writable array ref for the stop positions. Returns undefined if evenly spaced. Compatible with v-model. */
    stops: Ref<number[] | undefined>;
    /** A custom ref wrapping a proxy, allowing both full object replacement and deep property mutation via v-model. */
    options: Ref<InterpolatedVars<TUnit>["options"]>;
    /** Read-only ref containing the generated key-to-css map object. */
    interpolated: Ref<Record<string, string>>;
};
//# sourceMappingURL=useMetamorphosisInterpolatedVars.d.ts.map