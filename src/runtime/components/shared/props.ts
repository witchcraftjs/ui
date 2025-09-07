import { useId } from "vue"

import type { PopupPositioner, PopupPositionModifier } from "../../types"

export interface LinkableByIdProps {
	/**
	 * The id for the input. Uses vue's useId if none provided.
	 *
	 * For components that are not inputs, the id passed to inputs should be shared with the corresponding label/suggestions/etc component to connect them.
	 */

	id?: string
}

export const getFallbackId = (): string => useId()
export interface ButtonProps {
	border?: boolean
	color?: "warning" | "ok" | "danger" | "primary" | "secondary" | false
	autoTitleFromAria?: boolean
}

export interface LabelProps {
/** For the label. Note the component might or might not support an actual label element. If none is supported, this is used for the `aria-label`. */
	label?: string
}

export type SuggestionsProps<T = any> = {
	/**
	 * A list of autocomplete suggestions. Can be a simple list of strings, or more complicated, like a list of objects. In the case of objects, you'll want to specify `suggestionsLabel`.
	 *
	 * Each item is passed to the suggestion slot via the `items` prop. You can access it like:
	 * ```
	 * <div #item={item}>
	 * 	{{item}}
	 * </div>
	 * ```
	 */
	suggestions?: T[]
	/** A function that specifies how to extract the label from a suggestion when it's an object, e.g. `(item) => item.label`. By default, if none is passed, it's assumed suggestions is a list of strings. */
	suggestionLabel?: (item: T) => string
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
	/**
	 * Usually when using autosuggest, we only want to update the modelValue when the user submits the input.
	 * This happens by default if using `restrictToSuggestions`, but not if not restricting them.
	 *
	 * This can be worked around by listening a bit differently to events, but this is a common use case so there's now an option that automatically does this.
	 *
	 * By default it's false.
	 */
	updateOnlyOnSubmit?: boolean
	/** A function to filter the suggestions based on the current input. If none is given, will attempt to filter by the label using a basic case insensitive `includes` search. */
	suggestionsFilter?: (input: string | number, items: T[]) => any[]
	/** Allows opening the input dropdown when it's empty. Default is true. */
	allowOpenEmpty?: boolean
	/** Whether the suggestions dropdown can be opened. Default is true. */
	canOpen?: boolean
	/** Whether the suggestions dropdown can be closed. Default is true. */
	canClose?: boolean
	/** Whether the input is valid. Default is true. */
	isValid?: boolean
	/**
	 * A function to determine which selection to auto select. By default, the start of the string must match and the longest match is used. If the input is 0 length, the first element is selected.
	 *
	 * You can implement custom behavior here like fuzzy matching. Note that an exactly matching selection is always picked (the function will not be called).
	 */
	suggestionSelector?: (suggestions: T[], input: string) => number
	/** In the case modelValue is an array of values, whether to show the selected values in the suggestions list. Default is true so users can deselect from the list as well. If false, the checkboxes will also not be shown. */
	showSelectedValues?: boolean
}
export type SuggestionsOptions<T> = SuggestionsProps<T>

export interface SuggestionsEmits<TMultivalue extends boolean = false> {
	(e: "submit", val: string, suggestion?: any, wasRemoved?: boolean): void
	(e: "update:isOpen", val: boolean): void
	(e: "update:activeSuggestion", val: TMultivalue extends true ? number[] : number): void
}

export interface PopupProps {
	/**
	 * Whether to use the dialog element instead of a regular backdrop. While using the dialog element would be ideal, css variables won't be applied to it, tailwind themes will fail, etc, if the css variables are not applied to `::backdrop`.
	 *
	 * Using a div ends up easier to setup.
	 *
	 * The default is now false.
	 */
	useDialogForBackdrop?: false
	/** Wether to use a backdrop (clicking it will close the popup), or not (use is allowed to click elsewhere. */
	useBackdrop?: boolean
	/**
	 * The preferred horizontal positioning of the popup. The first position in the array to fit is used.
	 *
	 * All elements need to have box-sizing: border-box set. Also note that while the component should work with dynamic popup sizes, in practice there's issues with the positioning being slightly off. Giving the popup element a static size is better. If you need margins around the popup, this can be done with a wrapper element + padding.
	 *
	 * The positions `right`/`left`/`top`/`bottom` are relative to the opposite side of the button element so as to try not to cover the triggering button.
	 *
	 * So positioning `right` and `left` look like this:
	 *
	 * ```
	 * // right
	 *         [button]
	 *         [----popup----]
	 *
	 * // left
	 *         [button]
	 *  [----popup----]
	 * ```
	 *
	 * Positions `*-most` try to position the popup as close to that side of the screen as possible, otherwise limiting the popup to that edge. For example:
	 *
	 * ```
	 * [--------------screen---------------]
	 * // right-most
	 *           [button]
	 *                   [----popup----]
	 * // near the edge:
	 *                 [button]
	 *                      [----popup----]
	 * ```
	 *
	 * There is also the `center-screen` position, which centers the popup on the screen.
	 *
	 * These last two (`*-most` and `center-screen`) are greedy, they will always find a position that fits. Positions listed after are ignored.
	 *
	 * You can also specify a function instead which is given some additional information regarding the space around the button reference element. It should a number for the x position (or y, if preferredVertical).
	 *
	 * If you only need to slightly modify	the position, you can use the `modifyPosition` option instead.
	 */
	preferredHorizontal?: ("center" | "right" | "left" | "either" | "center-screen" | "right-most" | "left-most" | "center-most")[] | PopupPositioner
	/** See `preferredHorizontal`. */
	preferredVertical?: ("top" | "bottom" | "center" | "either" | "center-screen" | "top-most" | "bottom-most" | "center-most")[] | PopupPositioner
	/**
	 * When the user scrolls or resizes, normally the entire popup position is recomputed, taking into account the preferred positioning.
	 *
	 * This can cause it to shift around.
	 *
	 * Set this to true to only shift the popup depending on how much the button element moved and avoid recalculating the best position.
	 */
	avoidRepositioning?: boolean
	/**
	 * Allows modifying the calculated position, to for example, clamp it.
	 */
	modifyPosition?: PopupPositionModifier
	canClose?: boolean
}

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

// see https://github.com/nuxt/module-builder/issues/649
// export const baseInteractivePropsDefaults = {
// 	disabled: false,
// 	readonly: false,
// 	border: true,
// 	unstyle: false,
// }

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
