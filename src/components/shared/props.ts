import { getCurrentInstance, type PropType } from "vue"


export const linkableByIdProps = () => ({
	/**
	 * The id for the input. Uses vue's uid (`getCurrentInstance().uid`) if none provided.
	 *
	 * For components that are not inputs, the id passed to inputs should be shared with the corresponding label/suggestions/etc component to connect them.
	 */
	id: { type: String as PropType<string>, required: false, default: () => getCurrentInstance()!.uid.toString() },
} as const)

export const linkableByIdPropsDefault = (): string => getCurrentInstance()!.uid.toString()


export const labelProp = {
	/** For the label. Note the component might or might not support an actual label element. If none is supported, this is used for the `aria-label`. */
	label: { type: String as PropType<string>, required: false, default: "" },
}

export const suggestionsProps = {

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
	suggestions: { type: Array as PropType<any[] | undefined>, required: false, default: undefined },
	/** A function that specifies how to extract the label from a suggestion when it's an object, e.g. `(item) => item.label`. By default, if none is passed, it's assumed suggestions is a list of strings. */
	suggestionLabel: { type: Function as PropType<(item: any) => string>, required: false, default: undefined },
	/**
	 * Whether to restrict the value to the suggestions list or merely use it to suggest values.
	 *
	 * This stops v-modeling of what the user is typing when there is a value that does not match any values in the suggestions list. `update:modelValue` will only be emitted when they type/select/click a valid option.
	 *
	 * When the input is partially valid (it partially matches an option in the suggestions list), if the user presses enter or focuses away, the last selected suggestion is set as the value.
	 *
	 * When the input is completely invalid, the `errored` class is added to the component and the input goes red. If the user focuses away or tries to press enter anyways, the value is reset to the last valid value.
	 *
	 * Additionally when the input is invalid, the user can open the dropdown menu (it won't auto open) to view all the suggestions.
	 */
	restrictToSuggestions: { type: Boolean as PropType<boolean>, required: false, default: false },
	/** A function to filter the suggestions based on the current input. If none is given, will attempt to filter by the label using a basic case insensitive `includes` search. */
	suggestionsFilter: { type: Function as PropType<undefined | ((input: string | number, items: any[]) => any[])>, required: false, default: undefined },
	allowOpenEmpty: { type: Boolean as PropType<boolean>, required: false, default: true },
} as const

export const baseInteractiveProps = {
	unstyle: { type: Boolean as Function as PropType<boolean>, required: false, default: false },
	disabled: { type: Boolean as Function as PropType<boolean>, required: false, default: false },
	readonly: { type: Boolean as Function as PropType<boolean>, required: false, default: false },
	border: { type: Boolean as Function as PropType<boolean>, required: false, default: true },
} as const

export type BaseInteractiveProps = {
	disabled?: boolean
	readonly?: boolean
	border?: boolean
}
export const baseInteractivePropsDefaults = {
	disabled: false,
	readonly: false,
	border: true,
}

export const multiValueProps = {
	/**
	 * If values is used, for components that handle multiple values, prevents adding of duplicate values.
	 *
	 * For other components, it prevents suggesting values that have already been added.
	 */
	preventDuplicateValues: { type: Boolean as PropType<boolean>, required: false, default: true },
} as const

export const fallthroughEventProps = {
	onCopy: { type: Function as PropType<(e: ClipboardEvent) => any>, required: false, default: undefined },
	onCut: { type: Function as PropType<(e: ClipboardEvent) => any>, required: false, default: undefined },
	onPaste: { type: Function as PropType<(e: ClipboardEvent) => any>, required: false, default: undefined },

	// composition events
	onCompositionend: { type: Function as PropType<(e: CompositionEvent) => any>, required: false, default: undefined },
	onCompositionstart: { type: Function as PropType<(e: CompositionEvent) => any>, required: false, default: undefined },
	onCompositionupdate: { type: Function as PropType<(e: CompositionEvent) => any>, required: false, default: undefined },

	// drag drop events
	onDrag: { type: Function as PropType<(e: DragEvent) => any>, required: false, default: undefined },
	onDragend: { type: Function as PropType<(e: DragEvent) => any>, required: false, default: undefined },
	onDragenter: { type: Function as PropType<(e: DragEvent) => any>, required: false, default: undefined },
	onDragexit: { type: Function as PropType<(e: DragEvent) => any>, required: false, default: undefined },
	onDragleave: { type: Function as PropType<(e: DragEvent) => any>, required: false, default: undefined },
	onDragover: { type: Function as PropType<(e: DragEvent) => any>, required: false, default: undefined },
	onDragstart: { type: Function as PropType<(e: DragEvent) => any>, required: false, default: undefined },
	onDrop: { type: Function as PropType<(e: DragEvent) => any>, required: false, default: undefined },

	// focus events
	onFocus: { type: Function as PropType<(e: FocusEvent) => any>, required: false, default: undefined },
	onFocusin: { type: Function as PropType<(e: FocusEvent) => any>, required: false, default: undefined },
	onFocusout: { type: Function as PropType<(e: FocusEvent) => any>, required: false, default: undefined },
	onBlur: { type: Function as PropType<(e: FocusEvent) => any>, required: false, default: undefined },

	// form events
	onChange: { type: Function as PropType<(e: Event) => any>, required: false, default: undefined },
	onBeforeinput: { type: Function as PropType<(e: Event) => any>, required: false, default: undefined },
	onInput: { type: Function as PropType<(e: Event) => any>, required: false, default: undefined },
	onReset: { type: Function as PropType<(e: Event) => any>, required: false, default: undefined },
	onSubmit: { type: Function as PropType<(e: Event) => any>, required: false, default: undefined },
	onInvalid: { type: Function as PropType<(e: Event) => any>, required: false, default: undefined },

	// image events
	onLoad: { type: Function as PropType<(e: Event) => any>, required: false, default: undefined },
	onError: { type: Function as PropType<(e: Event) => any>, required: false, default: undefined },

	// keyboard events
	onKeydown: { type: Function as PropType<(e: KeyboardEvent) => any>, required: false, default: undefined },
	onKeypress: { type: Function as PropType<(e: KeyboardEvent) => any>, required: false, default: undefined },
	onKeyup: { type: Function as PropType<(e: KeyboardEvent) => any>, required: false, default: undefined },

	// mouse events
	onAuxclick: { type: Function as PropType<(e: MouseEvent) => any>, required: false, default: undefined },
	onClick: { type: Function as PropType<(e: MouseEvent) => any>, required: false, default: undefined },
	onContextmenu: { type: Function as PropType<(e: MouseEvent) => any>, required: false, default: undefined },
	onDblclick: { type: Function as PropType<(e: MouseEvent) => any>, required: false, default: undefined },
	onMousedown: { type: Function as PropType<(e: MouseEvent) => any>, required: false, default: undefined },
	onMouseenter: { type: Function as PropType<(e: MouseEvent) => any>, required: false, default: undefined },
	onMouseleave: { type: Function as PropType<(e: MouseEvent) => any>, required: false, default: undefined },
	onMousemove: { type: Function as PropType<(e: MouseEvent) => any>, required: false, default: undefined },
	onMouseout: { type: Function as PropType<(e: MouseEvent) => any>, required: false, default: undefined },
	onMouseover: { type: Function as PropType<(e: MouseEvent) => any>, required: false, default: undefined },
	onMouseup: { type: Function as PropType<(e: MouseEvent) => any>, required: false, default: undefined },

	// media events
	onAbort: { type: Function as PropType<(e: Event) => any>, required: false, default: undefined },
	onCanplay: { type: Function as PropType<(e: Event) => any>, required: false, default: undefined },
	onCanplaythrough: { type: Function as PropType<(e: Event) => any>, required: false, default: undefined },
	onDurationchange: { type: Function as PropType<(e: Event) => any>, required: false, default: undefined },
	onEmptied: { type: Function as PropType<(e: Event) => any>, required: false, default: undefined },
	onEncrypted: { type: Function as PropType<(e: Event) => any>, required: false, default: undefined },
	onEnded: { type: Function as PropType<(e: Event) => any>, required: false, default: undefined },
	onLoadeddata: { type: Function as PropType<(e: Event) => any>, required: false, default: undefined },
	onLoadedmetadata: { type: Function as PropType<(e: Event) => any>, required: false, default: undefined },
	onLoadstart: { type: Function as PropType<(e: Event) => any>, required: false, default: undefined },
	onPause: { type: Function as PropType<(e: Event) => any>, required: false, default: undefined },
	onPlay: { type: Function as PropType<(e: Event) => any>, required: false, default: undefined },
	onPlaying: { type: Function as PropType<(e: Event) => any>, required: false, default: undefined },
	onProgress: { type: Function as PropType<(e: Event) => any>, required: false, default: undefined },
	onRatechange: { type: Function as PropType<(e: Event) => any>, required: false, default: undefined },
	onSeeked: { type: Function as PropType<(e: Event) => any>, required: false, default: undefined },
	onSeeking: { type: Function as PropType<(e: Event) => any>, required: false, default: undefined },
	onStalled: { type: Function as PropType<(e: Event) => any>, required: false, default: undefined },
	onSuspend: { type: Function as PropType<(e: Event) => any>, required: false, default: undefined },
	onTimeupdate: { type: Function as PropType<(e: Event) => any>, required: false, default: undefined },
	onVolumechange: { type: Function as PropType<(e: Event) => any>, required: false, default: undefined },
	onWaiting: { type: Function as PropType<(e: Event) => any>, required: false, default: undefined },

	// selection events
	onSelect: { type: Function as PropType<(e: Event) => any>, required: false, default: undefined },

	// UI events
	onScroll: { type: Function as PropType<(e: UIEvent) => any>, required: false, default: undefined },

	// touch events
	onTouchcancel: { type: Function as PropType<(e: TouchEvent) => any>, required: false, default: undefined },
	onTouchend: { type: Function as PropType<(e: TouchEvent) => any>, required: false, default: undefined },
	onTouchmove: { type: Function as PropType<(e: TouchEvent) => any>, required: false, default: undefined },
	onTouchstart: { type: Function as PropType<(e: TouchEvent) => any>, required: false, default: undefined },

	// pointer events
	onPointerdown: { type: Function as PropType<(e: PointerEvent) => any>, required: false, default: undefined },
	onPointermove: { type: Function as PropType<(e: PointerEvent) => any>, required: false, default: undefined },
	onPointerup: { type: Function as PropType<(e: PointerEvent) => any>, required: false, default: undefined },
	onPointercancel: { type: Function as PropType<(e: PointerEvent) => any>, required: false, default: undefined },
	onPointerenter: { type: Function as PropType<(e: PointerEvent) => any>, required: false, default: undefined },
	onPointerleave: { type: Function as PropType<(e: PointerEvent) => any>, required: false, default: undefined },
	onPointerover: { type: Function as PropType<(e: PointerEvent) => any>, required: false, default: undefined },
	onPointerout: { type: Function as PropType<(e: PointerEvent) => any>, required: false, default: undefined },

	// wheel events
	onWheel: { type: Function as PropType<(e: WheelEvent) => any>, required: false, default: undefined },

	// animation events
	onAnimationstart: { type: Function as PropType<(e: AnimationEvent) => any>, required: false, default: undefined },
	onAnimationend: { type: Function as PropType<(e: AnimationEvent) => any>, required: false, default: undefined },
	onAnimationiteration: { type: Function as PropType<(e: AnimationEvent) => any>, required: false, default: undefined },

	// transition events
	onTransitionend: { type: Function as PropType<(e: TransitionEvent) => any>, required: false, default: undefined },
	onTransitionstart: { type: Function as PropType<(e: TransitionEvent) => any>, required: false, default: undefined },
} as const
