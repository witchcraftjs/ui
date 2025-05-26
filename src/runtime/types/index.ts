import type { ErrorW } from "@alanscodelog/utils"
import { type Ref } from "vue"

export type ResizableOptions = {
	/**
	 * Defaults to true.
	 *
	 * ### true
	 * The directive will shrink/expand the columns when the table is resized and will use percentage widths on the table cells. This disables resizing of the last column (from the right handle).
	 *
	 * Additionally because of the way `table-layout:fixed` works, a min-width cannot be set on the elements via css, so instead, if the table shrinks past `opts.margin * col #`, `min-width` is set on the table until it's resized larger.
	 *
	 * Note that by definition, the columns are not resizable when this happens.
	 *
	 * ### false
	 *
	 * The table can be resized past it's normal width and uses pixel widths on the table cells. You might want to set `overscroll-x: scroll` on a parent wrapping element.
	 *
	 * This will set the table width to `min-content`, else it doesn't work. Note that it does this after the initial reading/setting of sizes so you can, for example, layout the table with `width: 100%`.
	 */
	fitWidth: boolean
	/**
	 * The minimum width a column can have.
	 *
	 * Can be a number, or "dynamic". When dynamic, the directive attempts to get the width of `.grip` and multiplies it times 3.
	 */
	margin: "dynamic" | number
	/**
	 * Whether resizing is enabled.
	 *
	 * Can be turned off and all listeners, grips, etc, will be removed.
	 *
	 * Note that element styles set are not removed.
	 */
	enabled: boolean
	/** The number of columns. It will be assumed the first colCount elements are the initial widths of the table columns. */
	colCount: number
	/**
	 * A ref that gets filled in with the element width string values by the directive.
	 *
	 * It can then be used as needed by the component.
	 */
	widths: Ref<string[]>
	/** The selector to use for the cells. "tr > td" by default. */
	selector: string
}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type TableColConfig<T = {}> = Record<keyof T, { name?: string, resizable?: boolean }>

export type ResizeCallback = (_rect: DOMRectReadOnly, el: Element) => void

export type FileInputError = ErrorW<{ file: File, isValidMimeType: boolean, isValidExtension: boolean }>

export type HsvaColor = { h: number, s: number, v: number, a?: number }
export type RgbaColor = { r: number, g: number, b: number, a?: number }

export type Point = { x: number, y: number }

export type ScrollNearContainerEdgesOptions = {
	containerEl: Ref< HTMLElement | null>
	/** Margin inside contianer that allows scrolling. 10 by default. */
	scrollMargin?: number
	/** Margin around container that still allows scrolling. 0 by defualt. */
	outerScrollMargin?: number
	/**
		* Controls the scrolling speed.
		*
		*  Scroll happens faster the nearer to the outer edge the cursor.
		*
		* This is calculated as a percent (0 near the inner edge, and 1 near the outer edge), which is then multiplied by this multiplier, since moving by less than 1 pixel is quite slow. The default is 4.
		*/
	fastPixelMultiplier?: number
	/** @deprecated Use fastPixelMultiplier instead. */
	fastPixelAmount?: number
	useTimer?: boolean
	timerInterval?: number
}
// eslint-disable-next-line @typescript-eslint/naming-convention
export type SimpleDOMRect = Omit<DOMRect, "toJSON">
 
// eslint-disable-next-line @typescript-eslint/naming-convention
export interface IPopupReference { getBoundingClientRect: () => SimpleDOMRect }
export type PopupPosition = { x: number, y: number, maxWidth?: number, maxHeight?: number }
export type PopupSpaceInfo = {
	left: number
	right: number
	leftLeft: number
	rightRight: number
	leftFromCenter: number
	rightFromCenter: number
	topFromCenter: number
	bottomFromCenter: number
	top: number
	bottom: number
}
export type PopupPositioner = (
	/** Reference is only undefined, if you did not specify a button element or use the exposed setReference. The function is still called, because there are other ways you might want to still position the popup (e.g. center-screen or some similar variation). */
	reference: SimpleDOMRect | undefined,
	popup: SimpleDOMRect | DOMRect,
	bg: SimpleDOMRect | DOMRect,
	space: PopupSpaceInfo
) => number

export type PopupPositionModifier = (
	pos: PopupPosition,
/** This will only be called with the reference element as undefined when one of the preferred positions is center-screen or it's a function. */
	reference: SimpleDOMRect | undefined,
	popup: SimpleDOMRect | DOMRect,
	bg: SimpleDOMRect | DOMRect,
	space: PopupSpaceInfo
) => PopupPosition

export type SingleDate = Date | undefined

export type RangeDate = {
	start?: SingleDate
	end?: SingleDate
}
