import type { ErrorW } from "@alanscodelog/utils"
import { type Ref } from "vue"


export type Options = {
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
export type ResizeCallback = (rect: DOMRectReadOnly, el: Element) => void

export type FileInputError = ErrorW<{ file: File, isValidMimeType: boolean, isValidExtension: boolean }>

