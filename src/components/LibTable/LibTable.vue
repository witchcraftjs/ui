<template>
<!-- Assumes no scrollbars on children -->
<table :class="twMerge(`table
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
			[&_td.br]:rounded-br
			[&_td.bl]:rounded-bl
			[&_td.tr]:rounded-tr
			[&_td.tl]:rounded-tl
		`
	, ($attrs as any).class)"
	v-resizable-cols="resizableOptions"
>
	<thead v-if="header">
		<tr>
			<template v-for="col,i of cols" :key="col">
				<slot :name="`header-${col.toString()}`"
					:class="[
						extraClasses[`-1-${i}`],
						'cell',
						(colInfo as any)[col]?.resizable === false
							? 'no-resize'
							: ''
					].join(' ')"
				>
					<td :class="[
							extraClasses[`-1-${i}`] ,
							'cell',
							(colInfo as any)[col]?.resizable === false
								? 'no-resize'
								: ''
						].join(' ')"
						:style="` width:${widths.length > 0 ? widths[i] : ``}; `"
					>
						{{ (colInfo as any)[col]?.name ?? col }}
					</td>
				</slot>
			</template>
		</tr>
	</thead>
	<tbody>
		<template v-for="item, i of values" :key="item[itemKey]">
			<tr>
				<template v-for="col, j of cols" :key="item[itemKey as keyof typeof item] + col.toString()">
					<slot :name="col" :prop="item[col]" :class="extraClasses[`${i}-${j}`] + ' cell'">
						<td :class="extraClasses[`${i}-${j}`] + ' cell'">
							{{ item[col] }}
						</td>
					</slot>
				</template>
			</tr>
		</template>
	</tbody>
</table>
</template>


<script setup lang="ts" generic="T extends Record<string, any>">
import { keys, type MakeRequired } from "@alanscodelog/utils"
import { computed, type PropType, ref } from "vue"

import { resizableCols as vResizableCols } from "../../directives/resizableCols.js"
import { twMerge } from "../../helpers/twMerge.js"
import type { Options } from "../../types.js"


defineOptions({
	name: "lib-table",
})


const props = defineProps({
	resizable: { type: Object as PropType<Partial<Options>>, required: false, default: () => ({}) },
	/** Let's the table know the shape of the data since values might be empty. */
	values: { type: Object as PropType<T[]>, required: false, default: () => ([] as T[]) },
	itemKey: { type: String as PropType<keyof T>, required: true },
	cols: { type: Object as PropType<(keyof T)[]>, required: true },
	rounded: { type: Boolean, required: false, default: true },
	border: { type: Boolean, required: false, default: true },
	cellBorder: { type: Boolean, required: false, default: true },
	header: { type: Boolean, required: false, default: true },
	colInfo: { type: Object as PropType<Record<keyof T, { name?: string, resizable?: boolean }>>, required: false, default: () => ({}) },
})
const widths = ref([])
const resizableOptions = computed<MakeRequired<Partial<Options>, "colCount" | "widths">>(() => ({
	colCount: props.cols.length,
	widths,
	selector: ".cell",
	...props.resizable,
}))

const getExtraClasses = (row: number, col: number, isHeader: boolean): string[] => {
	/* props.values.length instead of `props.values.length - 1` because we're creating an artificial first row for the header */

	const res = {
		bl: !isHeader && row === props.values.length - 1 && col === 0,
		br: !isHeader && row === props.values.length - 1 && col === props.cols.length - 1,
		tr: (isHeader || !props.header) && row === 0 && col === props.cols.length - 1,
		tl: (isHeader || !props.header) && row === 0 && col === 0,
		"first-row": (isHeader || !props.header) && row === 0,
		"last-row": row === props.values.length - 1,
		"first-col": col === 0,
		"last-col": col === props.cols.length - 1,
	}
	return keys(res).filter(key => res[key])
}

const extraClasses = computed(() => Object.fromEntries([...Array(props.values.length + 1).keys()]
	.map(row => [...Array(props.cols.length).keys()]
		.map(col =>
			[
				`${row - 1}-${col}`,
				getExtraClasses(row <= 0 ? 0 : row - 1, col, row === 0).join(" "),
			]))
	.flat(),
))

</script>
