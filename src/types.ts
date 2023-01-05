export type ResizableTableDirectiveOptions = {
	/**
	 * Defaults to true.
	 *
	 * ### true
	 * The directive will shrink/expand the columns when the table is resized and will use percentage widths on the table cells. This disables resizing of the last column.
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
}
