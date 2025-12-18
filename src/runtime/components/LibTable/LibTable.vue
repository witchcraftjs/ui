<template>
<!-- Assumes no scrollbars on children -->
<table
	:class="twMerge(`table
		table-fixed
		border-separate
		border-spacing-0
		overflow-x-scroll
		scrollbar-hidden
		[&_.grip]:w-[5px]
		relative
		w-full
		box-content
		[&_thead]:font-bold
		[&_td]:p-1
		[&_td]:overflow-x-hidden
		[&.resizable-cols-error]:cursor-not-allowed
		[&.resizable-cols-error]:user-select-none
		`,
		cellBorder && `
			[&_td]:border-neutral-500
			[&_td:not(.last-row)]:border-b
			[&_td:not(.first-col)]:border-l
		`,
		border && `
			[&_thead_td]:bg-neutral-200
			[&_td]:border-neutral-500
			dark:[&_thead_td]:bg-neutral-800
			dark:[&_td]:border-neutral-500
			[&_td.first-row]:border-t
			[&_td.last-row]:border-b
			[&_td.last-col]:border-r
			[&_td.first-col]:border-l
		`,
		rounded &&`
			[&_td.br]:rounded-br-sm
			[&_td.bl]:rounded-bl-sm
			[&_td.tr]:rounded-tr-sm
			[&_td.tl]:rounded-tl-sm
		`,
		($attrs as any).class)"
	v-resizable-cols="resizableOptions"
>
	<thead
		v-if="header"
		class="table--header"
	>
		<tr class="table--row">
			<template
				v-for="col, i of cols"
				:key="col"
			>
				<slot
					:name="`header-${col.toString()}`"
					:class="[
						extraClasses[`-1-${i}`],
						'cell table--header-cell',
						(colConfig as any)[col]?.resizable === false
							? 'no-resize'
							: ''
					].join(' ')"
					:style="`width:${widths.length > 0 ? widths[i] : ``}; `"
					:col-key="col"
					:config="(colConfig as any)[col]"
				>
					<td
						:class="[
							extraClasses[`-1-${i}`],
							'cell table--header-cell',
							(colConfig as any)[col]?.resizable === false
								? 'no-resize'
								: ''
						].join(' ')"
						:style="`width:${widths.length > 0 ? widths[i] : ``}; `"
					>
						{{ (colConfig as any)[col]?.name ?? col }}
					</td>
				</slot>
			</template>
		</tr>
	</thead>
	<tbody class="table--body">
		<template
			v-for="item, i of values"
			:key="typeof itemKey === 'function' ? itemKey(item) : item[itemKey]"
		>
			<tr class="table--row">
				<template
					v-for="col, j of cols"
					:key="(typeof itemKey === 'function' ? itemKey(item) : item[itemKey]) + col.toString()"
				>
					<slot
						:name="col"
						:item="item"
						:value="item[col]"
						:class="extraClasses[`${i}-${j}`] + 'table--cell cell'"
					>
						<td :class="extraClasses[`${i}-${j}`] + 'table--cell cell'">
							{{ item[col] }}
						</td>
					</slot>
				</template>
			</tr>
		</template>
	</tbody>
</table>
</template>

<!-- generic="T extends Record<string, any> -->"
<script setup lang="ts" generic="T">
import type { MakeRequired } from "@alanscodelog/utils"
import { keys } from "@alanscodelog/utils/keys"
import { computed, ref, type TableHTMLAttributes } from "vue"

import { vResizableCols } from "../../directives/vResizableCols.js"
import type { ResizableOptions, TableColConfig } from "../../types/index.js"
import { twMerge } from "../../utils/twMerge.js"
import type { TailwindClassProp } from "../shared/props.js"

defineOptions({
	name: "LibTable"
})

const props = withDefaults(defineProps<Props>(), {
	resizable: () => ({}),
	values: () => [] as T[],
	itemKey: "",
	cols: () => [] as (keyof T)[],
	rounded: true,
	border: true,
	cellBorder: true,
	header: true,
	colConfig: () => ({})
})

const widths = ref([])
const resizableOptions = computed<MakeRequired<Partial<ResizableOptions>, "colCount" | "widths">>(() => ({
	colCount: props.cols.length,
	widths,
	selector: ".cell",
	...props.resizable
}))

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

const extraClasses = computed(() => Object.fromEntries([...Array(props.values.length + 1).keys()]
	.map(row => [...Array(props.cols.length).keys()]
		.map(col =>
			[
				`${row - 1}-${col}`,
				" " +	getExtraClasses(row <= 0 ? 0 : row - 1, col, row === 0).join(" ") + " "
			]))
	.flat()
))
</script>

<script lang="ts">
// generic isn't working here :/
type T = any

type RealProps = {
	resizable?: Partial<ResizableOptions>
	values?: T[]
	itemKey?: keyof T | ((item: T) => string)
	/** Let's the table know the shape of the data since values might be empty. */
	cols?: (keyof T)[]
	rounded?: boolean
	border?: boolean
	cellBorder?: boolean
	header?: boolean
	colConfig?: TableColConfig<T>
}
interface Props
	extends
	/** @vue-ignore */
	Partial<Omit<TableHTMLAttributes, "class" | "readonly" | "disabled"> & TailwindClassProp>,
	RealProps { }
</script>
