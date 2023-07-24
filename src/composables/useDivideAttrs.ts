import { keys } from "@alanscodelog/utils"

/**
 * Allows users to more easily pass attributes to different parts of a component. Suppose a component has an input and a wrapper and you want most attributes to go to the input, but any that start with `wrapper` to go to the wrapper.
 *
 * You can do:
 *
 * ```ts
 * const {$attrs, wrapperAttrs} = useDivideAttrs(useAttrs(), ["wrapper"])
 * ```
 * This will correctly remove the start of the key. So if the user passes:
 * ```vue
 * <your-component regular-attr wrapper-attr wrapperAttrs/>
 * ```
 * You will get:
 *
 * ```ts
 * {
	* $attrs: { regular-attr: true },
	* wrapperAttrs: { attr: true, Attrs: true },
 * }
 * ```
 *
 *
 */
export const useDivideAttrs = <T extends readonly string[]>(attrs: Record<string, any>, divisionKeys: T): Record<`${T[number]}Attrs` | "$attrs", any> => {
	const res: any = { $attrs: {} }
	for (const attrKey of keys(attrs)) {
		for (const key of divisionKeys) {
			res[`${key}Attrs`] = res[`${key}Attrs`] ?? {}
			if (attrKey.startsWith(`${key}-`)) {
				res[`${key}Attrs`][attrKey.slice(key.length + 1)] = attrs[attrKey]
			} else if (attrKey.startsWith(key)) {
				res[`${key}Attrs`][attrKey.slice(key.length)] = attrs[attrKey]
			} else {
				res.$attrs[attrKey] = attrs[attrKey]
			}
		}
	}
	return res
}
