import { getCurrentInstance, type PropType } from "vue"

export interface LinkableByIdProps {
	/**
	 * The id for the input. Uses vue's uid (`getCurrentInstance().uid`) if none provided.
	 *
	 * For components that are not inputs, the id passed to inputs should be shared with the corresponding label/suggestions/etc component to connect them.
	 */

	id?: string
}

export const getFallbackId = (): string => getCurrentInstance()!.uid.toString()

export interface LabelProps {
/** For the label. Note the component might or might not support an actual label element. If none is supported, this is used for the `aria-label`. */
	label?: string
}

export type SuggestionsProps = {
	/**
	 * A list of autocomplete suggestions. Can be a simple list of strings, or more complicated, like a list of objects. In the case of objects, you'll want to specify `suggestionsValue`.
	 *
	 * Each item is passed to the suggestion slot via the `items` prop. You can access it like:
	 * ```
	 * <div #item={item}>
	 * 	{{item}}
	 * </div>
	 * ```
	 */
	suggestions?: any[]
	/** A function that specifies how to extract the label from a suggestion when it's an object, e.g. `(item) => item.label`. By default, if none is passed, it's assumed suggestions is a list of strings. */
	suggestionLabel?: (item: any) => string
	/**
	 * Whether to restrict the value to the suggestions list or merely use it to suggest values. Default is false.
	 *
	 * This stops v-modeling of what the user is typing when there is a value that does not match any values in the suggestions list. `update:modelValue` will only be emitted when they type/select/click a valid option.
	 *
	 * When the input is partially valid (it partially matches an option in the suggestions list), if the user presses enter or focuses away, the last selected suggestion is set as the value.
	 *
	 * When the input is completely invalid, the `errored` class is added to the component and the input goes red. If the user focuses away or tries to press enter anyways, the value is reset to the last valid value.
	 *
	 * Additionally when the input is invalid, the user can open the dropdown menu (it won't auto open) to view all the suggestions.
	 */
	restrictToSuggestions?: boolean
	/** A function to filter the suggestions based on the current input. If none is given, will attempt to filter by the label using a basic case insensitive `includes` search. */
	suggestionsFilter?: (input: string | number, items: any[]) => any[]
	/** Allows opening the input dropdown when it's empty. Default is true. */
	allowOpenEmpty?: boolean
}


export const baseInteractiveProps = {
	unstyle: { type: Boolean as Function as PropType<boolean>, required: false, default: false },
	disabled: { type: Boolean as Function as PropType<boolean>, required: false, default: false },
	readonly: { type: Boolean as Function as PropType<boolean>, required: false, default: false },
	border: { type: Boolean as Function as PropType<boolean>, required: false, default: true },
} as const

export type BaseInteractiveProps = {
	/** Default is false. */
	disabled?: boolean
	/** Default is false. */
	readonly?: boolean
	/** Default is true. */
	border?: boolean
	/** Removes styles from the component. Default is false. */
	unstyle?: boolean
}
export const baseInteractivePropsDefaults = {
	disabled: false,
	readonly: false,
	border: true,
	unstyle: false,
}


export type MultiValueProps = {
	/**
	 * If values is used, for components that handle multiple values, prevents adding of duplicate values.
	 *
	 * For other components, it prevents suggesting values that have already been added.
	 *
	 * Default is true.
	 */
	preventDuplicateValues?: boolean
}

/**
	* @internal
	*  For easily typing attributes created by useDivideAttrs. See readme.
	*
	* By default overrides the `class` prop to only take a string (to pass to tailwing).
	*/
export type WrapperProps<TPrefix extends string, T, TOverrides extends Record<string, any> | never = TailwindClassProp> = {
	[P in keyof T as P extends keyof TOverrides
		? never
		: P extends string
		? `${TPrefix}${Capitalize<P>}`
		: never
	]: T[P];
} & {
	[P in keyof TOverrides as P extends string
		? `${TPrefix}${Capitalize<P>}`
		: never
	]: TOverrides[P];
}

export type TailwindClassProp = {
	/** Tailwind classes. */
	class?: string | false
}
