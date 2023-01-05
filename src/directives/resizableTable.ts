/* eslint-disable @typescript-eslint/no-use-before-define */
import { castType, override, unreachable } from "@alanscodelog/utils"
import type { Directive } from "vue"

import type { ResizableTableDirectiveOptions } from "../types.js"


type Data = {
	margin: number
	fitWidth: boolean
	grips: Map<HTMLElement, HTMLElement>
	isDragging: boolean
	initialStyle: Record<string, string>
	mouseDownHandler: (e: MouseEvent) => void
	mouseUpHandler: (e: MouseEvent) => void
	mouseLeaveHandler: (e: MouseEvent) => void
	mouseMoveHandler: (e: MouseEvent) => void
	target?: HTMLElement
	offset?: number
}
type RawOpts = { value: Partial<ResizableTableDirectiveOptions> }

type ResizableElement = HTMLElement & Data

const defaultOpts: ResizableTableDirectiveOptions = {
	fitWidth: true,
	margin: "dynamic",
	enabled: true,
}

const resizeHandler = (elements: ResizeObserverEntry[]): void => {
	for (const el of elements) {
		setColWidths(el.target as ResizableElement)
		positionGrips(el.target as ResizableElement)
	}
}
const throttledResizeHandler = resizeHandler
const ro = new ResizeObserver(throttledResizeHandler)
/**
 * Allow a table to be resized along it's columns.
 *
 * ```vue
 * <template>
 * 	<table v-resizable-table="tableOpts">
 * 			<!---->
 * 	</table>
 * </template>
 * <script setup>
 * import {resizeTable} from "@alanscodelog/vue-components"
 * </script>
 * ```
 *
 * This assumes the following:
 * - The table element does NOT have `box-sizing: border-box` and has no border or takes it into acount in the width (e.g. `width: calc(100% - BORDER_WIDTH * 2)`).
 * - The table cells DO have `box-sizing: border-box` or have no borders.
 * - The `.grip` element the directive adds for each column is styled with at least some width.
 *
 * This will set the following styles on the elements:
 *
 * ```scss
 * table {
 * 	table-layout: fixed;
 * 	position: relative;
 * 	min-width: [opts.minWidth * col #] // only if needed, see margin and fitWidth options
 * 	min-width: min-content; // if fitWidth: false
 * 	.grip {
 * 		position: absolute;
 * 		top: 0;
 * 		bottom: 0;
 * 		cursor: col-resize;
 * 	}
 * 	[first row cells] {
 * 		width: [width in px/% depending on opts.fitWidth]
 * 	}
 * }
 * ```
 * Note that they aren't removed if the directive is disabled.
 *
 * Aditionally the following are suggested:
 * - If fitWidth is true, `overflow: hidden` should be set on the table cells to avoid glitches when dragging the last column near the right edge.
 * - The table should have `overflow-x:scroll` even if `fitWidth` is true, since there is some minimum space (margin+grip * col) the table will always occupy.
 *
 * The directive also adds a class after the initial setup `resizable-table-setup`. This is useful to set initial column widths, for example, using flexboxes, then removing those styles when the table is setup.
 *
 * ```scss
 * table:not(.resizable-table-setup) {
 * 	initial styles
 * }
 * ```
 *
 * You can prevent columns from being resized by adding the class `no-resize`. When a column cannot be moved, the `resizable-table-error` class is added to the table element.
 *
 * Also note the `.grip` element added is added to the table. This is so you can have `overflow:hidden` on table cells if you want without the grip getting hidden. But this does mean that if you're styling the table using `:last-child`, to, for example, target table rows, it won't work.
 *
 * # Options
 * See {@link ResizableTableDirectiveOptions}
 */
export const resizableTable: Directive = {
	mounted(el: ResizableElement, { value: opts = {} }: RawOpts) {
		const options = override({ ...defaultOpts }, opts) as ResizableTableDirectiveOptions

		if (options.enabled) {
			setupColumns(el, options)
			ro.observe(el)
		}
	},
	updated(el: ResizableElement, { value: opts = {} }: RawOpts) {
		const options = override({ ...defaultOpts }, opts) as ResizableTableDirectiveOptions

		if (el.grips && !options.enabled) {
			teardownColumns(el)
			ro.unobserve(el)
		}

		if (!el.grips && options.enabled) {
			setupColumns(el, options)
			ro.observe(el)
		}
	},
	unmounted(el: ResizableElement) {
		if (el.grips) {
			teardownColumns(el)
			ro.unobserve(el)
		}
	},
}

const setWidth = (col: HTMLElement, amountInPx: number, el: ResizableElement): void => {
	const width = Math.max(el.margin, amountInPx)
	if (el.fitWidth) {
		col.style.width = `${width / el.getBoundingClientRect().width * 100}%`
	} else {
		col.style.width = `${width}px`
	}
}
const getCols = (el: ResizableElement): { col: HTMLElement | null, colNext: HTMLElement | null } => {
	if (!el.target) unreachable()
	let col = el.grips.get(el.target)

	if (!col) unreachable()
	while (col?.classList.contains("no-resize")) {
		col = col?.previousElementSibling as HTMLElement ?? null
	}
	let colNext = (col?.nextElementSibling as HTMLElement) ?? null
	if (el.fitWidth) {
		while (colNext?.classList.contains("no-resize")) {
			colNext = colNext?.nextElementSibling as HTMLElement ?? null
		}
	}
	return { col, colNext }
}

const createMouseDownHandler = (el: ResizableElement) => (e: MouseEvent) => {
	if (!el.isDragging) {
		castType<HTMLElement>(e.target)
		el.target = e.target
		el.isDragging = true
		e.preventDefault()


		const { col, colNext } = getCols(el)
		if (col === null || colNext === null) {
			el.classList.add("resizable-table-error")
		} else {
			document.addEventListener("mousemove", el.mouseMoveHandler)
		}
		const box = col?.getBoundingClientRect()
		if (box) {
			el.offset = e.pageX - (box.x + box.width)
		}

		document.addEventListener("mouseup", el.mouseUpHandler)
	}
}
const createMouseMoveHandler = (el: ResizableElement) => (e: MouseEvent) => {
	if (el.isDragging) {
		e.preventDefault()

		const { col, colNext } = getCols(el)

		if (col !== null) {
			const leftBox = col.getBoundingClientRect()

			const oldWidth = leftBox.width
			const leftBound = leftBox.x
			const rightBox = colNext?.getBoundingClientRect() ?? el.getBoundingClientRect()
			const rightBound = rightBox.x + rightBox.width
			const margin = el.margin
			const pos = e.pageX - el.offset!


			if (el.fitWidth) {
				if (pos > leftBound + margin && pos < rightBound - margin) {
					const newWidth = pos - leftBound
					const diff = oldWidth - newWidth

					if (rightBox.width + diff < margin) {
						el.classList.add("resizable-table-error")
						return
					}

					setWidth(col, newWidth, el)
					setWidth(colNext!, rightBox.width + diff, el)
				}
			} else {
				if (pos > leftBound + margin) {
					const newWidth = pos - leftBound
					setWidth(col, newWidth, el)
				}
			}

			positionGrips(el)
		}
	}
}

const createMouseUpHandler = (el: ResizableElement) => (e: MouseEvent) => {
	if (el.isDragging) {
		e.preventDefault()
		el.isDragging = false
		el.classList.remove("resizable-table-error")
		el.offset = 0
		delete el.target
		document.removeEventListener("mousemove", el.mouseMoveHandler)
		document.removeEventListener("mouseup", el.mouseUpHandler)
		// unfortunately does not work with iframes in storybook but otherwise does work
		document.removeEventListener("mouseleave", el.mouseLeaveHandler)
	}
}

const createGrip = (): HTMLElement => {
	const grip = document.createElement("div")
	grip.style.position = "absolute"
	grip.style.cursor = "col-resize"
	grip.style.top = "0"
	grip.style.bottom = "0"
	grip.classList.add("grip")
	return grip
}
const removeGrips = (el: HTMLElement): void => {
	const grips = Array.from(el.querySelectorAll(".grip") ?? [])
	for (const grip of grips) {
		el.removeChild(grip)
	}
}
const getTestGripSize = (el: ResizableElement): number => {
	const testGrip = createGrip()
	el.appendChild(testGrip)
	const dynamicMinWidth = testGrip.getBoundingClientRect().width * 3
	el.removeChild(testGrip)
	return dynamicMinWidth
}
const setupColumns = (el: ResizableElement, opts: ResizableTableDirectiveOptions): void => {
	el.style.position = "relative"
	el.style.tableLayout = "fixed"
	el.grips = new Map()
	el.isDragging = false
	el.mouseDownHandler = createMouseDownHandler(el)
	el.mouseMoveHandler = createMouseMoveHandler(el)
	el.mouseUpHandler = createMouseUpHandler(el)
	el.mouseLeaveHandler = createMouseUpHandler(el)
	el.fitWidth = opts.fitWidth

	const gripWidth = getTestGripSize(el)
	el.margin = opts.margin === "dynamic" ? gripWidth : opts.margin

	const header = Array.from(el.querySelector("tr, th")?.children ?? [])

	const len = header.length
	setColWidths(el, header)
	el.style.width = el.fitWidth ? "" : "min-content"
	for (let i = 0; i < len; i++) {
		const col = header[i]

		if (opts.fitWidth && i === len - 1) continue

		const grip: HTMLElement = createGrip()
		grip.addEventListener("mousedown", el.mouseDownHandler)
		el.appendChild(grip)
		el.grips.set(grip, col as HTMLElement)
	}
	positionGrips(el)
	el.classList.add("resizable-table-setup")
}

const positionGrips = (el: ResizableElement): void => {
	let xPos = 0
	for (const grip of el.grips.keys()) {
		const col = el.grips.get(grip)!
		const colBox = col.getBoundingClientRect()
		const gripBox = grip.getBoundingClientRect()

		grip.style.left = `${xPos + colBox.width - (gripBox.width / 2)}px`
		xPos += colBox.width
	}
}

const setColWidths = (el: ResizableElement, children?: Element[]): void => {
	const header = children ?? Array.from(el.querySelector("tr, th")?.children ?? [])
	const len = header.length
	let width = 0
	const minTotalWidth = len * el.margin
	for (let i = 0; i < len; i++) {
		const col = header[i]
		castType<HTMLElement>(col)
		/**
		 * only works if parent table does NOT use `box-sizing:border-box` and either has no border or does `width: calc(100% - BORDERWIDTH*2)`
		 *
		 * child must use `box-sizing:border-box` if using border
		 */
		const colBox = col.getBoundingClientRect()

		setWidth(col, colBox.width, el)
		width += col.getBoundingClientRect().width
	}

	if (width < minTotalWidth) {
		el.style.minWidth = `${minTotalWidth}px`
	} else {
		el.style.minWidth = ""
	}
}

const teardownColumns = (el: HTMLElement & Partial<Data>): void => {
	el.style.position = ""
	el.removeEventListener("mousedown", el.mouseDownHandler!)
	document.removeEventListener("mousemove", el.mouseMoveHandler!)
	document.removeEventListener("mouseup", el.mouseUpHandler!)
	delete el.mouseDownHandler
	delete el.mouseMoveHandler
	delete el.mouseUpHandler
	delete el.grips
	delete el.isDragging
	delete el.offset
	delete el.fitWidth
	delete el.margin
	delete el.target
	el.classList.remove("resizable-table-setup")
	removeGrips(el)
}
