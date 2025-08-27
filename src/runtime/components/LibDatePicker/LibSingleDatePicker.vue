<script setup lang="ts">
import { type DateValue, getLocalTimeZone } from "@internationalized/date"
import { DatePickerArrow, DatePickerCalendar, DatePickerCell, DatePickerCellTrigger, DatePickerContent, DatePickerField, DatePickerGrid, DatePickerGridBody, DatePickerGridHead, DatePickerGridRow, DatePickerHeadCell, DatePickerHeader, DatePickerHeading, DatePickerInput, DatePickerNext, DatePickerPrev, DatePickerRoot, DatePickerTrigger } from "reka-ui"
import { onBeforeUnmount, ref, toRaw, useAttrs, watch } from "vue"

import { convertDateWithFallback, getNow,toEmittableDate } from "./helpers.js"

import IRadixIconsCalendar from "~icons/radix-icons/calendar"
import IRadixIconsChevronLeft from "~icons/radix-icons/chevron-left"
import IRadixIconsChevronRight from "~icons/radix-icons/chevron-right"
import IRadixIconsDoubleArrowLeft from "~icons/radix-icons/double-arrow-left"
import IRadixIconsDoubleArrowRight from "~icons/radix-icons/double-arrow-right"

import { useInjectedLocale } from "../../composables/useInjectedLocale.js"
import type { SingleDate } from "../../types/index.js"
import { twMerge } from "../../utils/twMerge.js"
import Icon from "../Icon/Icon.vue"

const attrs = useAttrs()

const props = withDefaults(defineProps<{
	useTime?: boolean
	id: string
	fallbackDate?: Date
	timeZone?: string
	updateInterval?: number
}>(), {
	timeZone: getLocalTimeZone(),
	useTime: false,
	fallbackDate: _ => getNow({ withTime: _.useTime ?? false }).toDate(_.timeZone ?? getLocalTimeZone()),
	updateInterval: 10000
})

const locale = useInjectedLocale().timeLocale

const date = defineModel<SingleDate>({ required: true })

let justSet = false
const tempDate = ref()
function updateTempDate() {
	tempDate.value = convertDateWithFallback(date.value, props)
}

updateTempDate()

watch(date, () => {
	if (!justSet) {
		updateTempDate()
	} else {
		justSet = false
	}
})
watch(tempDate, () => {
	justSet = true
	date.value = toEmittableDate(toRaw(tempDate.value as any))
})

watch(() => props.timeZone, () => {
	updateTempDate()
})

const interval = setInterval(() => {
	if (!date.value) {
		// update suggested date if none is set
		updateTempDate()
	}
}, props.updateInterval)

onBeforeUnmount(() => {
	clearInterval(interval)
})

</script>

<template>
<DatePickerRoot
	:id="id"
	:locale="locale"
	class="date-picker--root"
	v-model="tempDate as DateValue"
>
	<DatePickerField
		v-slot="{ segments }"
		:class="twMerge(`
			date-picker--field
			flex items-center justify-between
			select-none
			data-[invalid]:border-red-500
			metadata-input-border
			rounded-sm
		`,
			(attrs as any).class)
		"
	>
		<div :class="twMerge(`
			date-picker--segment
			flex
			items-center
			overflow-scroll
			scrollbar-hidden
			whitespace-nowrap
		`, date === undefined && 'text-neutral-400')"
		>
			<template
				v-for="item in segments"
				:key="item.part"
			>
				<DatePickerInput
					v-if="item.part === 'literal'"
					:part="item.part"
					class="date-picker--segment-literal"
				>
					{{ item.value }}
				</DatePickerInput>
				<DatePickerInput
					v-else
					:part="item.part"
					class="
						date-range-picker--segment-input
						focus-outline-hidden
						border
						border-transparent
						group
					"
				>
					<div
						class="
							date-picker--segment-value
							group-focus:z-[2]
							group-focus:bg-accent-500/50
							group-focus:rounded-xs
							px-[2px]
						"
					>
						{{ item.value }}
					</div>
				</DatePickerInput>
			</template>
		</div>

		<DatePickerTrigger
			class="
				date-picker--trigger
				px-1
				focus-outline
				rounded-tr-sm
				rounded-br-sm
				bg-bg
				border-l
				border-neutral-300
				dark:border-neutral-700
				dark:bg-neutral-800
			"
		>
			<Icon>
				<i-radix-icons-calendar/>
			</Icon>
		</DatePickerTrigger>
	</DatePickerField>
	<!-- @vue-expect-error to exists-->
	<DatePickerContent
		:side-offset="4"
		:avoid-collisions="true"
		:prioritize-position="true"
		side="bottom"
		to="#root"
		class="
			date-picker--content
			z-100
			mx-2
			rounded-sm
			bg-bg
			dark:bg-neutral-800
			border
			border-neutral-300
			dark:border-neutral-700
			shadow-lg
			will-change-[transform,opacity]
			data-[state=open]:data-[side=top]:animate-slideDownAndFade
			data-[state=open]:data-[side=right]:animate-slideLeftAndFade
			data-[state=open]:data-[side=bottom]:animate-slideUpAndFade
			data-[state=open]:data-[side=left]:animate-slideRightAndFade
			text-fg
			dark:text-neutral-200
		"
	>
		<DatePickerArrow class="date-picker--arrow fill-neutral-500"/>
		<!-- We set some max-width so it's not so hard to style the slot (which otherwise grows the calendar really wide. The min width is the header (4 icons + their padding + 14ch month), hence the complicated formula. -->
		<DatePickerCalendar
			v-slot="{ weekDays, grid }"
			class="
				date-picker--calendar
				p-2
				flex
				flex-col
				max-w-[calc(1.2em*4+var(--spacing)*8+14ch)]
			"
		>
			<DatePickerHeader class="
				date-picker--header
				flex
				items-center
				justify-between
			"
			>
				<DatePickerPrev
					class="
						date-picker--year-prev
						inline-flex
						items-center
						cursor-pointer
						active:scale-125
						justify-center
						rounded-sm
						outlined
						px-1
					"
					:prev-page="(date: DateValue) => date.subtract({ years: 1 })"
				>
					<Icon class="scale-150">
						<i-radix-icons-double-arrow-left/>
					</Icon>
				</DatePickerPrev>
				<DatePickerPrev
					class="
						date-picker--prev
						inline-flex
						items-center
						cursor-pointer
						active:scale-125
						justify-center
						rounded-sm
						outlined
						px-1
					"
				>
					<Icon class="scale-150">
						<i-radix-icons-chevron-left/>
					</Icon>
				</DatePickerPrev>

				<DatePickerHeading class="min-w-[14ch] text-center"/>
				<DatePickerNext
					class="
						date-picker--next
						inline-flex
						items-center
						cursor-pointer
						active:scale-125
						justify-center
						rounded-sm
						outlined
						px-1
					"
				>
					<Icon class="scale-150">
						<i-radix-icons-chevron-right/>
					</Icon>
				</DatePickerNext>
				<DatePickerNext
					class="
						date-picker--year-next
						inline-flex
						items-center
						cursor-pointer
						active:scale-125
						justify-center
						rounded-sm
						outlined
						px-1
					"
					:next-page="(date: DateValue) => date.add({ years: 1 })"
				>
					<Icon class="scale-150">
						<i-radix-icons-double-arrow-right/>
					</Icon>
				</DatePickerNext>
			</DatePickerHeader>
			<div
				class="
					date-picker--grid-wrapper
					flex
					flex-col
					pt-4
				"
			>
				<DatePickerGrid
					class="
						date-picker--grid
						border-collapse
						select-none
					"
					v-for="month in grid"
					:key="month.value.toString()"
				>
					<DatePickerGridHead class="date-picker--grid-head">
						<DatePickerGridRow class="
							date-picker--grid-row
							mb-1
							flex
							justify-between
						"
						>
							<DatePickerHeadCell
								class="
									date-picker--head-cell
									w-6
									rounded-md
									text-xs
									text-accent-500
								"
								v-for="day in weekDays"
								:key="day"
							>
								{{ day }}
							</DatePickerHeadCell>
						</DatePickerGridRow>
					</DatePickerGridHead>
					<DatePickerGridBody class="date-picker--grid-body">
						<DatePickerGridRow
							class="
								date-picker--grid-row
								flex
								w-full
								justify-between
								my-1
							"
							v-for="(weekDates, index) in month.rows"
							:key="`weekDate-${index}`"
						>
							<DatePickerCell
								:date="weekDate"
								class="date-picker--cell"
								v-for="weekDate in weekDates"
								:key="weekDate.toString()"
							>
								<DatePickerCellTrigger
									:day="weekDate"
									:month="month.value"
									class="
										date-picker--cell-trigger
										relative
										flex
										items-center
										justify-center
										whitespace-nowrap
										rounded-sm
										border
										border-transparent
										bg-transparent
										text-sm
										w-6
										h-6
										focus:shadow
										focus-outline
										hover:border-accent-500
										data-[selected]:bg-accent-500
										dark:data-[selected]:bg-accent-500/80
										data-[selected]:shadow
										data-[disabled]:text-neutral-500
										data-[selected]:text-white
										data-[unavailable]:pointer-events-none
										data-[unavailable]:text-neutral-500
										data-[unavailable]:line-through
										data-[outside-view]:text-neutral-500
										before:absolute
										before:bottom-[1px]
										before:hidden
										before:rounded-full
										before:w-4
										before:h-[2px]
										before:bg-white
										data-[today]:before:block
										data-[today]:before:bg-accent-700
										dark:data-[today]:before:bg-accent-300
										data-[selected]:before:bg-white
									"
								/>
							</DatePickerCell>
						</DatePickerGridRow>
					</DatePickerGridBody>
				</DatePickerGrid>
			</div>
			<slot v-bind="{tempValue: tempDate}"/>
		</DatePickerCalendar>
	</DatePickerContent>
</DatePickerRoot>
</template>
