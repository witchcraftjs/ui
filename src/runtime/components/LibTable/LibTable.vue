<template>
<!--
	- moving the border to the wrapper is to hide the little bits of border sticking out
	added back the right straight border otherwise the scrollbar looks ass
	this is ever so slightly visible if there is no scrollbar

	- relative is for the sticky header in dynamic mode

	- dynamic mode REQUIRES grid since otherwise the transforms don't work because of how tanstack calculates them
	- tried pre-calculating the transforms to take into account the previous elements (e.g. virtual.start - (height of previous rows)) but this was way to slow and buggy
-->
<div
	:class="twMerge(`
		table--container
		overflow-auto
	`,
		hasScrollbar.vertical && `has-scrollbar-vertical`,
		hasScrollbar.horizontal && `has-scrollbar-horizontal`,
		stickyHeader && `
		[&_thead]:sticky
		[&_thead]:top-0
		[&_thead]:z-1
		[&_.grip]:z-2
	`,
		isPostSetup && `resizable-cols-setup`,
		border && `
		border
		border-neutral-500
	`,
		border && cellBorder && `
		[&.has-scrollbar-horizontal_.last-row]:border-b
		[&.has-scrollbar-horizontal_.last-row]:border-neutral-500
		[&.has-scrollbar-vertical_.last-col]:border-r
		[&.has-scrollbar-vertical_.last-col]:border-neutral-500
	`,
		(!resizableOptions.fitWidth || stickyHeader) && `
		[&_td.tr]:rounded-tr-none!
		[&_td.br]:rounded-br-none!
	`,
		// this combo prevents the x-scrollbar from showing up when it shouldn't
		// and max-w-fit allows the border to shrink with the table columns
		resizableOptions.fitWidth === false && `
		[&_.grip]:last:translate-x-[-5px]
		mr-1
		max-w-fit
	`,
		rounded &&`
		rounded-md
	`,
		mergedVirtualizerOpts.enabled && mergedVirtualizerOpts.method === 'dynamic' && `
		relative
		`,
		($attrs as any).wrapperClass)"
	ref="parentRef"
>
	<div
		class="table--inner-container"
		:style="{
			...(mergedVirtualizerOpts.enabled
				? { height: `${totalSize}px` }
				: {})
		}"
	>
		<!-- https://github.com/TanStack/virtual/issues/640#issuecomment-2795731690 -->
		<table
			:style="{
				...(stickyHeader && mergedVirtualizerOpts.enabled
					? { '--table-sticky-fix': `${totalSize-tableHeight}px` }
					: {}),
				...($attrs as any).style ?? {}
			}"
			:class="twMerge(`
				table
				table-fixed
				border-separate
				border-spacing-0
				scrollbar-hidden
				[&_.grip]:w-[5px]
				relative
				w-full
				box-content
				[&_thead]:font-bold
				[&_td]:p-1
				[&_th]:p-1
				[&.resizable-cols-error]:cursor-not-allowed
				[&.resizable-cols-error]:user-select-none
				[&_thead_th]:bg-neutral-200
				dark:[&_thead_th]:bg-neutral-800
			`,
				isPostSetup && mergedVirtualizerOpts.enabled && mergedVirtualizerOpts.method === 'dynamic' && `
				grid
			`,
				stickyHeader && mergedVirtualizerOpts.enabled && mergedVirtualizerOpts.method === 'fixed' && `
				after:inline-block
				after:h-(--table-sticky-fix)
			`,
				cellBorder && `
				[&_td]:border-neutral-500
				[&_td:not(.last-row)]:border-b
				[&_td:not(.first-col)]:border-l
				[&_th]:border-neutral-500
				[&_th:not(.last-row)]:border-b
				[&_th:not(.first-col)]:border-l
			`,
				!cellBorder && `
				[&_.grip]:hover:bg-neutral-300
				dark:[&_.grip]:hover:bg-neutral-700
			`,
				($attrs as any).class)"
			v-resizable-cols="resizableOptions"
		>
			<thead
				v-if="header"
				:class="twMerge(
					`table--header`,
					isPostSetup && mergedVirtualizerOpts.enabled && mergedVirtualizerOpts.method === 'dynamic' && `
						grid
						top-0
					`
				)"
			>
				<tr
					:class="twMerge(
						`table--row`,
						isPostSetup && mergedVirtualizerOpts.enabled && mergedVirtualizerOpts.method === 'dynamic'
							&& `flex w-full`
					)"
				>
					<template
						v-for="col, i of cols"
						:key="col"
					>
						<slot
							:name="`header-${col.toString()}`"
							:class="classes[`-1-${i}`]"
							:style="{ width: widths[i] }"
							:col-key="col"
							:config="(colConfig as any)[col]"
						>
							<th
								:class="classes[`-1-${i}`]"
								:style="{ width: widths[i] }"
							>
								{{ (colConfig as any)[col]?.name ?? col }}
							</th>
						</slot>
					</template>
				</tr>
			</thead>
			<tbody
				:class="twMerge(
					`table--body`,
					isPostSetup && mergedVirtualizerOpts.enabled && mergedVirtualizerOpts.method === 'dynamic' && `
						grid
						relative
					`
				)"
				:style="{
					...(mergedVirtualizerOpts.enabled && mergedVirtualizerOpts.method === 'dynamic'
						? { height: `${totalSize}px` }
						: {})
				}"
			>
				<template
					v-for="(virtual, index) in virtualList"
					:key="virtual.key"
				>
					<tr
						:class="twMerge(`
								table--row
							`,
							isPostSetup && mergedVirtualizerOpts.enabled && mergedVirtualizerOpts.method === 'dynamic' && `
								flex
								absolute
								w-full
							`,
							isPostSetup && mergedVirtualizerOpts.enabled && ` will-change-transform `
						)"
						:style="{
							...(mergedVirtualizerOpts.enabled
								? {
									transform: mergedVirtualizerOpts.method === 'fixed'
										? `translateY(${virtual.start - index * virtual.size!}px)`
										: `translateY(${virtual.start}px)`,
									height: virtual.size
								}
								: {})
						}"
						:data-index="virtual.index"
						:ref="measureElement"
					>
						<template
							v-for="col, j of cols"
							:key="virtual.key + '-' + col.toString()"
						>
							<slot
								:name="col"
								:item="values[virtual.index]"
								:value="values[virtual.index][col]"
								:style="{ width: widths[j] }"
								:class="classes[`${virtual.index}-${j}`]"
							>
								<td
									:style="{ width: widths[j] }"
									:class="classes[`${virtual.index}-${j}`]"
								>
									{{ values[virtual.index][col] }}
								</td>
							</slot>
						</template>
					</tr>
				</template>
			</tbody>
		</table>
	</div>
</div>
</template>

<!-- generic="T extends Record<string, any> -->"
<script setup lang="ts" generic="T">
import type { MakeRequired } from "@alanscodelog/utils"
import { keys } from "@alanscodelog/utils/keys"
import { throttle } from "@alanscodelog/utils/throttle"
import { useVirtualizer, type VirtualizerOptions } from "@tanstack/vue-virtual"
import { computed, onMounted, ref, type TableHTMLAttributes } from "vue"

import { useGlobalResizeObserver } from "../../composables/useGlobalResizeObserver.js"
import { vResizableCols } from "../../directives/vResizableCols.js"
import type { ResizableOptions, TableColConfig } from "../../types/index.js"
import { twMerge } from "../../utils/twMerge.js"
import type { TailwindClassProp } from "../shared/props.js"

defineOptions({
	name: "LibTable",
	inheritAttrs: false
})

const props = withDefaults(defineProps<Props>(), {
	resizable: () => ({}),
	values: () => [] as T[],
	cols: () => [] as (keyof T)[],
	rounded: true,
	border: true,
	cellBorder: true,
	header: true,
	colConfig: () => ({}),
	virtualizerOptions: () => ({ }),
	enableStickyHeader: false,
	itemKey: ""
})

const widths = ref([])


const isPostSetup = ref(false)
const resizableOptions = computed<MakeRequired<Partial<ResizableOptions>, "colCount" | "widths">>(() => ({
	colCount: props.cols.length,
	widths,
	selector: ".cell",
	...props.resizable,
	onSetup: el => {
		isPostSetup.value = true
		if (props.resizable.onSetup) {
			props.resizable.onSetup(el)
		}
	},
	onTeardown: el => {
		isPostSetup.value = false
		if (props.resizable.onTeardown) {
			props.resizable.onTeardown(el)
		}
	}
}))


const parentRef = ref<HTMLElement | null>(null)
const mergedVirtualizerOpts = computed(() => {
	return {
		// we have to put the defaults here as they can't reference local variables
		count: props.values.length,
		getScrollElement: () => parentRef.value,
		estimateSize: () => { return 33 },
		overscan: props.virtualizerOptions?.overscan ?? (props.virtualizerOptions?.method === "dynamic" ? 10 : 50),
		method: "fixed",
		enabled: false,
		...props.virtualizerOptions
	} satisfies Partial<VirtualizerOptions<any, any>> & { method: "fixed" | "dynamic" }
})

const rowVirtualizer = useVirtualizer(mergedVirtualizerOpts)

const virtualList = computed(() => {
	return mergedVirtualizerOpts.value.enabled
		? rowVirtualizer.value.getVirtualItems()
		: props.values.map((_, i) => ({
				index: i,
				size: undefined,
				start: 0,
				end: 0,
				key: typeof props.itemKey === "function"
					? props.itemKey(_)
					: props.itemKey
						? props.values[props.itemKey as keyof typeof props.values]
						: i
			}))
})

const totalSize = computed(() => rowVirtualizer.value.getTotalSize())

function measureElement(el: any): void {
	if (!el || !mergedVirtualizerOpts.value.enabled) return
	if (mergedVirtualizerOpts.value?.method === "dynamic") {
		rowVirtualizer.value.measureElement(el)
	}
}

function forceRecalculateFixedVirtualizer() {
	if (mergedVirtualizerOpts.value?.method === "dynamic" || !mergedVirtualizerOpts.value.enabled) return
	if (!parentRef.value) {
		throw new Error("forceRecalculateFixedVirtualizer cannot be called before the table is mounted.")
	}
	const height = parentRef.value.querySelector("td")?.getBoundingClientRect().height
	if (!height) return
	for (let i = 0; i < props.values.length; i++) {
		rowVirtualizer.value.resizeItem(i, height)
	}
}

const tableHeight = ref(0)
function updateTableHeight(): void {
	if (!parentRef.value) return
	const el = parentRef.value.querySelector("tbody")
	if (!el) return
	if (tableHeight.value === el.getBoundingClientRect().height) return
	tableHeight.value = el.getBoundingClientRect().height
}
const throttledUpdateTableHeight = throttle(updateTableHeight, 100, { leading: true })


onMounted(() => {
	throttledUpdateTableHeight()
	forceRecalculateFixedVirtualizer()
	useGlobalResizeObserver(parentRef, onResize)
})


const hasScrollbar = ref({ vertical: false, horizontal: false })
function onResize(): void {
	const el = parentRef.value
	if (!el) return
	hasScrollbar.value = {
		vertical: el.scrollHeight > el.clientHeight,
		horizontal: el.scrollWidth > el.clientWidth
	}
	if (hasScrollbar.value.vertical) {
		throttledUpdateTableHeight()
	}
}

/* props.values.length instead of `props.values.length - 1` because we're creating an artificial first row for the header */
const getExtraClasses = (row: number, col: number, isHeader: boolean): string[] => {
	const res = {
		bl: !isHeader && row === props.values.length - 1 && col === 0,
		br: !isHeader && row === props.values.length - 1 && col === props.cols.length - 1,
		tr: (isHeader || !props.header) && row === 0 && col === props.cols.length - 1,
		tl: (isHeader || !props.header) && row === 0 && col === 0,
		"first-row": (isHeader || !props.header) && row === 0,
		"last-row": row === props.values.length - 1,
		"first-col": col === 0,
		"last-col": col === props.cols.length - 1
	}
	return keys(res).filter(key => res[key])
}

const classes = computed(() => {
	const res: Record<string, string> = {}
	const headerTdClass = `table--header-cell cell truncate`
	const bodyTdClass = `table--cell cell truncate`
	for (let i = -1; i < props.values.length + 1; i++) {
		for (let j = 0; j < props.cols.length; j++) {
			const col = props.cols[j]!
			const colConfig = props.colConfig[col]
			const key = `${i}-${j}`
			res[key] = twMerge(
				getExtraClasses(i, j, i === -1).join(" "),
				i === -1 ? headerTdClass : bodyTdClass,
				i === -1 ? colConfig?.resizable === false && `no-resize` : undefined,
				i !== -1 && mergedVirtualizerOpts.value.enabled && mergedVirtualizerOpts.value.method === "dynamic" && `flex`
			)
		}
	}
	return res
})

defineExpose({
	forceRecalculateFixedVirtualizer
})
</script>

<script lang="ts">
// generic isn't working here :/
type T = any

type RealProps = {
	resizable?: Partial<ResizableOptions>
	values?: T[]
	/** Let's the table know the shape of the data since values might be empty. */
	cols?: (keyof T)[]
	rounded?: boolean
	border?: boolean
	cellBorder?: boolean
	header?: boolean
	colConfig?: TableColConfig<T>
	/**
	 * See tanstack/vue-virtual {@link https://tanstack.com/virtual/latest/docs/api/virtualizer}
	 *
	 * The defaults are:
	 *
	 * - enabled: false
	 * - method: "fixed"
	 * - overscan: (50 if fixed, 10 if dynamic)
	 * - estimateSize: () => { return 33 }
	 *
	 * This also has an additional option, `method`, which can be set to `fixed` or `dynamic` (experimental).
	 *
	 * Notes:
	 *
	 * - Because of how virtualization works, initial layout (before .resizable-cols-setup class is applied) will only have access to the headers and not the rows. This can cause cols to look very small, especially if using resizable.fitWidth false.
	 *
	 * ### Fixed
	 *
	 * `fixed` is the default and will set the height of ALL items to the height of the first item onMounted (tanstack does not do this and if your estimateSize if off, the scrolling is weird).
	 *
	 * Since the table now truncates rows by default, they will always be the same height unless you change the inner styling. In fixed mode, `forceRecalculateFixedVirtualizer` is exposed if you need to force re-calculation.
	 *
	 * If using slots, be sure to at least pass the `class` slot prop to the td element. `style` with width is also supplied but is not required if you're displaying the table as a table.
	 *
	 * ### Dynamic (experimental)
	 *
	 * In `dynamic` mode we use tanstack's measureElement method. This is more expensive, but it will work with any heights.
	 *
	 * Dynamic mode also requires the table displays itself using grid and flex post setup as otherwise dynamic mode doesn't work.
	 *
	 * You don't need to do anything unless using slots. If using slots, pass the given `ref` slot prop to ref (internally this is tanstack's measureElement) and the class and style slot props at the very least:
	 * ```vue
	 * <template #[`${colName}`]="slotProps">
	 * 	<td
	 * 		:ref="slotProps.ref"
	 * 		:class="slotProps.class"
	 * 		:style="slotProps.style"
	 * 	>
	 * 		{{ slotProps.value }}
	 * 	</td>
	 * </template>
	 * ```
	 */
	virtualizerOptions?: Partial<VirtualizerOptions<any, any>> & { method?: "fixed" | "dynamic" }
	/** Whether to enable sticky header styles. This requires `border:false`. This moves the border to the wrapper and styles a straight border between the scroll bar and the rounded border. */
	stickyHeader?: boolean
	/** Which key to use for the rows (only if not using virtualization). */
	itemKey?: keyof T | ((item: T) => string)
}
interface Props
	extends
	/** @vue-ignore */
	Partial<Omit<TableHTMLAttributes, "class" | "readonly" | "disabled"> & TailwindClassProp>,
	RealProps { }
</script>
