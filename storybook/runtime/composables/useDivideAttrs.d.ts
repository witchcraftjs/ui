import { type Ref } from "vue";
/**
 * Allows users to more easily pass attributes to different parts of a component. Suppose a component has an input and a wrapper and you want most attributes to go to the input, but any that start with `wrapper` to go to the wrapper.
 *
 * You can do:
 *
 * ```ts
 * const extraAttrs = useDivideAttrs(["wrapper"] as const)
 * ```
 * This will correctly remove the start of the key. So if the user passes:
 * ```vue
 * <your-component regular-attr wrapper-attr wrapperAttrs/>
 * ```
 * You will get a ref like:
 *
 * ```ts
 * extraAttrs.value = {
 * 	attrs: { regular-attr: true },
 * 	wrapperAttrs: { attr: true, Attrs: true },
 * }
 *
 * Additionally attributes are properly reactive, tough this is probably a bit expensive given they weren't meant to be reactive.
 *
 * Note that if using multi-word prefixes, like `inner-wrapper`, they will appear as the key `inner-wrapperAttrs` internally, but users will be able to correctly pass `inner-wrapper-prop`. Aditionally these can be passed down to deeper components, allowing easy wrapping.
 * ```
 */
export declare const useDivideAttrs: <T extends readonly string[]>(divisionKeys: T) => Ref<Record<`${T[number]}Attrs` | "attrs", Record<string, any>>>;
//# sourceMappingURL=useDivideAttrs.d.ts.map