/* eslint-disable @typescript-eslint/no-use-before-define */
import { castType, override, throttle, unreachable } from "@alanscodelog/utils"
import type { Directive, Ref } from "vue"

import { globalResizeObserver } from "../globalResizeObserver.js"
import type { ResizableOptions, ResizeCallback } from "../types.js"


const observer = globalResizeObserver
type Data = {
	margin: number
	fitWidth: boolean
	colCount: number
	grips: Map<HTMLElement, number>
	isDragging: boolean
	mouseDownHandler: (e: MouseEvent) => void
	mouseUpHandler: (e: MouseEvent) => void
	mouseLeaveHandler: (e: MouseEvent) => void
	mouseMoveHandler: (e: MouseEvent) => void
	target?: HTMLElement
	offset?: number
	widths: Ref<string[]>
	selector: string
}
const elMap = new WeakMap<HTMLElement, Data>()
type RawOpts = { value: Partial<ResizableOptions> }

type ResizableElement = HTMLElement

const defaultOpts: Omit<ResizableOptions, "colCount" | "widths" | "selector"> = {
	fitWidth: true,
	margin: "dynamic",
	enabled: true,
}

const callback: ResizeCallback = (_rect, el): void => {
	setColWidths(el as ResizableElement)
	positionGrips(el as ResizableElement)
}
const throttledCallback = throttle(callback)
/**
 * Allow a table like element to be resized along it's columns.
 *
 * ```vue
 * <template>
 * 	<div v-resizable-cols="opts">
 * 			<!---->
 * 	</div>
 * </template>
 * <script setup>
 * import {resizeCols} from "@alanscodelog/vue-components"
 * </script>
 * ```
 *
 * This assumes the following:
 * - The `.grip` element the directive adds for each column is styled with at least some width.
 * - The containing element must not have any borders. Use a wrapper if you need them.
 *
 * This will set the following styles on the elements:
 *
 * ```css
 * el {
 * 	min-width: [opts.minWidth * col #] // only if needed, see margin and fitWidth options
 * 	min-width: min-content; // if fitWidth: false
 * 	.grip {
 * 		position: absolute;
 * 		top: 0;
 * 		bottom: 0;
 * 		cursor: col-resize;
 * 	}
 * 	[cells] {
 * 		none
 * 	}
 * }
 * ```
 * Note that they aren't removed if the directive is disabled.
 *
 * It does NOT set the widths on the cells. It used to, but for maximum flexibility a ref with an array should be passed to be populated by the widths calculated.
 *
 * Additionally the following are suggested:
 * - If fitWidth is true, `overflow: hidden` should be set on the column elements to avoid glitches when dragging the last column near the right edge.
 * - The root element should have `overflow-x:scroll` even if `fitWidth` is true, since there is some minimum space (margin+grip * col) the element will always occupy.
 *
 * The directive also adds a class after the initial setup `resizable-cols-setup`. This is useful to set initial column widths, for example, using flexboxes, then removing those styles when the element is setup. You can also check if the passed widths array is still of 0 length.
 *
 * ```css
 * el:not(.resizable-cols-setup) {
 * 	initial styles
 * }
 * ```
 *
 * You can prevent columns from being resized by adding the class `no-resize`. When a column cannot be moved, the `resizable-cols-error` class is added to the element.
 *
 * Also note the `.grip` element added is added to the root element. This is so you can have `overflow:hidden` on cells if you want without the grip getting hidden. But this does mean that if you're styling the cells using `:last-child`, to, for example, target table rows, won't work, you'll need `:last-of-type`.
 *
 * # Options
 * See {@link ResizableOptions}
 */
export const resizableCols: Directive = {
	mounted(el: ResizableElement, { value: opts = {} }: RawOpts) {
		const options = override({ ...defaultOpts }, opts) as ResizableOptions

		if (options.enabled) {
			setupColumns(el, options)
			observer.observe(el, throttledCallback)
		}
	},
	updated(el: ResizableElement, { value: opts = {} }: RawOpts) {
		const options = override({ ...defaultOpts }, opts) as ResizableOptions
		const hasGrips = elMap.has(el) && elMap.get(el)!.grips
		if (hasGrips && !options.enabled) {
			teardownColumns(el)
			observer.unobserve(el, throttledCallback)
		}

		if (!hasGrips && options.enabled) {
			setupColumns(el, options)
			observer.observe(el, throttledCallback)
		}
	},
	unmounted(el: ResizableElement) {
		const hasGrips = elMap.has(el) && elMap.get(el)!.grips
		if (hasGrips) {
			teardownColumns(el)
			globalResizeObserver.unobserve(el, throttledCallback)
		}
	},
}


const setWidth = (col: HTMLElement, amountInPx: number, el: ResizableElement): void => {
	const $el = getElInfo(el)
	const width = Math.max($el.margin, amountInPx)

	const index = getColEls(el).findIndex(_ => col === _)
	if ($el.fitWidth) {
		$el.widths.value[index] = `${width / getBox(el).width * 100}%`
	} else {
		$el.widths.value[index] = `${width}px`
	}
}


const getBox = (el: Element): { x: number, width: number } => {
	const rect = el.getBoundingClientRect()
	// the numbers need to be rounded or else the columns will start to shift
	// rounding rect.width is bettwe than just using clientWidth which does not include the scrollbar
	return { x: Math.round(rect.x), width: Math.round(rect.width) }
}
const getCols = (el: ResizableElement): { col: HTMLElement | null, colNext: HTMLElement | null } => {
	const $el = getElInfo(el)
	if (!$el.target) unreachable()
	let col = getColEls(el)[$el.grips.get($el.target)!]

	if (!col) unreachable()
	while (col?.classList.contains("no-resize")) {
		col = col?.previousElementSibling as HTMLElement ?? null
	}
	let colNext = (col?.nextElementSibling as HTMLElement) ?? null
	if ($el.fitWidth) {
		while (colNext?.classList.contains("no-resize")) {
			colNext = colNext?.nextElementSibling as HTMLElement ?? null
		}
	}
	return { col, colNext }
}

const createMouseDownHandler = (el: ResizableElement) => (e: MouseEvent) => {
	const $el = getElInfo(el)
	if (!$el.isDragging) {
		castType<HTMLElement>(e.target)
		$el.target = e.target
		$el.isDragging = true
		e.preventDefault()


		const { col, colNext } = getCols(el)
		if (col === null || colNext === null) {
			el.classList.add("resizable-cols-error")
		} else {
			document.addEventListener("mousemove", $el.mouseMoveHandler)
		}
		const box = getBox(col!)
		if (box) {
			$el.offset = e.pageX - (box.x + box.width)
		}

		document.addEventListener("mouseup", $el.mouseUpHandler)
	}
}
const createMouseMoveHandler = (el: ResizableElement) => (e: MouseEvent) => {
	const $el = getElInfo(el)
	if ($el.isDragging) {
		e.preventDefault()

		const { col, colNext } = getCols(el)

		if (col !== null) {
			const leftBox = getBox(col)

			const oldWidth = leftBox.width
			const leftBound = leftBox.x
			const rightBox = colNext ? getBox(colNext) : getBox(el)

			const rightBound = rightBox.x + rightBox.width
			const margin = $el.margin
			const pos = e.pageX - $el.offset!

			if ($el.fitWidth) {
				if (pos > (leftBound + margin) && pos < (rightBound - margin)) {
					const newWidth = pos - leftBound
					const diff = oldWidth - newWidth

					if (rightBox.width + diff < margin) {
						el.classList.add("resizable-cols-error")
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
	const $el = getElInfo(el)
	if ($el.isDragging) {
		e.preventDefault()
		$el.isDragging = false
		el.classList.remove("resizable-cols-error")
		$el.offset = 0
		delete $el.target
		document.removeEventListener("mousemove", $el.mouseMoveHandler)
		document.removeEventListener("mouseup", $el.mouseUpHandler)
		// unfortunately does not work with iframes in storybook but otherwise does work
		document.removeEventListener("mouseleave", $el.mouseLeaveHandler)
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
	const dynamicMinWidth = getBox(testGrip).width * 3
	el.removeChild(testGrip)
	return dynamicMinWidth
}

const getElInfo = (el: ResizableElement): Data => {
	const $el = elMap.get(el)
	if (!$el) unreachable("El went missing.")
	return $el
}
const getColEls = (el: ResizableElement): HTMLElement[] => {
	const $el = elMap.get(el)
	if (!$el) unreachable("El went missing.")
	return [...el.querySelectorAll(`:scope ${$el.selector ? $el.selector : "tr > td"}`)] as any
}

const setupColumns = (el: ResizableElement, opts: ResizableOptions): void => {
	const gripWidth = getTestGripSize(el)
	const $el: Data = {
		grips: new Map(),
		isDragging: false,
		mouseDownHandler: createMouseDownHandler(el),
		mouseMoveHandler: createMouseMoveHandler(el),
		mouseUpHandler: createMouseUpHandler(el),
		mouseLeaveHandler: createMouseUpHandler(el),
		fitWidth: opts.fitWidth,
		margin: opts.margin === "dynamic" ? gripWidth : opts.margin,
		colCount: opts.colCount,
		widths: opts.widths,
		selector: opts.selector,
	}
	elMap.set(el, $el)
	const els = getColEls(el)

	const headers = els.slice(0, opts.colCount)

	setColWidths(el, headers)
	el.style.width = $el.fitWidth ? "" : "min-content"
	const len = opts.colCount
	for (let i = 0; i < len; i++) {
		if (opts.fitWidth && i === len - 1) continue

		const grip: HTMLElement = createGrip()
		grip.addEventListener("mousedown", $el.mouseDownHandler)
		el.appendChild(grip)
		$el.grips.set(grip, i)
	}
	positionGrips(el)
	el.classList.add("resizable-cols-setup")
}

const positionGrips = (el: ResizableElement): void => {
	let xPos = 0
	const $el = getElInfo(el)
	for (const grip of $el.grips.keys()) {
		const col = $el.grips.get(grip)!
		const colBox = getBox(getColEls(el)[col])
		const gripBox = getBox(grip)

		grip.style.left = `${xPos + colBox.width - (gripBox.width / 2)}px`
		xPos += colBox.width
	}
}

const setColWidths = (el: ResizableElement, children?: Element[]): void => {
	const $el = getElInfo(el)
	const header = children ?? getColEls(el).slice(0, $el.colCount)
	const len = $el.colCount
	let width = 0
	const minTotalWidth = len * $el.margin
	for (let i = 0; i < len; i++) {
		const col = header[i]
		castType<HTMLElement>(col)
		/**
		 * only works if parent table does NOT use `box-sizing:border-box` and either has no border or does `width: calc(100% - BORDERWIDTH*2)`
		 */
		const colBox = getBox(col)

		setWidth(col, colBox.width, el)
		width += getBox(col).width
	}

	if (width < minTotalWidth) {
		el.style.minWidth = `${minTotalWidth}px`
	} else {
		el.style.minWidth = ""
	}
}

const teardownColumns = (el: ResizableElement): void => {
	const $el = getElInfo(el)

	el.removeEventListener("mousedown", $el.mouseDownHandler)
	document.removeEventListener("mousemove", $el.mouseMoveHandler)
	document.removeEventListener("mouseup", $el.mouseUpHandler)
	for (const key of Object.keys($el)) {
		delete $el[key as keyof typeof $el]
	}
	elMap.delete(el)
	el.classList.remove("resizable-cols-setup")
	removeGrips(el)
}
