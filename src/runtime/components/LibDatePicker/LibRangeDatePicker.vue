<script setup lang="ts">
import { CalendarDate, type DateValue, getLocalTimeZone, ZonedDateTime } from "@internationalized/date"
import type { DateRange } from "reka-ui"
import { DateRangePickerArrow, DateRangePickerCalendar, DateRangePickerCell, DateRangePickerCellTrigger, DateRangePickerContent, DateRangePickerField, DateRangePickerGrid, DateRangePickerGridBody, DateRangePickerGridHead, DateRangePickerGridRow, DateRangePickerHeadCell,DateRangePickerHeader, DateRangePickerHeading, DateRangePickerInput, DateRangePickerNext, DateRangePickerPrev, DateRangePickerRoot, DateRangePickerTrigger } from "reka-ui"
import { onBeforeUnmount, ref, toRaw, useAttrs, watch } from "vue"

import { convertDateWithFallback, getNow,toEmittableDate } from "./helpers.js"

import { useInjectedLocale } from "../../composables/useInjectedLocale.js"
import type { RangeDate } from "../../types/index.js"
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

const date = defineModel<RangeDate>({ required: true })


let justSet = false

const tempDate = ref<{
	start?: CalendarDate | ZonedDateTime
	end?: CalendarDate | ZonedDateTime
}>({})
function updateTempDate(keys: ("start" | "end")[] = ["start", "end"]) {
	const newValue = { ...tempDate.value }
	for (const key of keys) {
		newValue[key] = convertDateWithFallback(date.value?.[key], props)
	}
	// the WHOLE object must be updated due to how the reka date picker works
	tempDate.value = newValue
}

watch(date, () => {
	if (!justSet) {
		updateTempDate()
	} else {
		justSet = false
	}
})

watch(tempDate, () => {
	if (!tempDate.value.start || !tempDate.value.end) return
	justSet = true
	date.value = {
		start: tempDate.value.start ? toEmittableDate(toRaw(tempDate.value.start) as any) : undefined,
		end: tempDate.value.end ? toEmittableDate(toRaw(tempDate.value.end) as any) : undefined
	}
})

watch(() => props.timeZone, () => {
	updateTempDate()
})


const interval = setInterval(() => {
	// update suggested date if none is set
	if (!date.value.start) updateTempDate(["start"])
	if (!date.value.end) updateTempDate(["end"])
}, props.updateInterval)

onBeforeUnmount(() => {
	clearInterval(interval)
})

const locale = useInjectedLocale().timeLocale


</script>

<template>
<DateRangePickerRoot
	:id="id"
	:locale="locale"
	class="root"
	v-model="tempDate as DateRange"
>
	<DateRangePickerField
		v-slot="{ segments }"
		:class="twMerge(`
			container
			flex items-center justify-between
			select-none
			data-[invalid]:border-red-500
			metadata-input-border
			rounded-sm
		`, (attrs as any).class)"
	>
		<div class="segments flex items-center flex-1 overflow-scroll scrollbar-hidden whitespace-nowrap">
			<div :class="twMerge(`start-segment flex items-center`, date.start === undefined && 'text-neutral-400')">
				<template
					v-for="item in segments.start"
					:key="item.part"
				>
					<DateRangePickerInput
						v-if="item.part === 'literal'"
						:part="item.part"
						type="start"
						class="input-literal"
					>
						{{ item.value }}
					</DateRangePickerInput>
					<DateRangePickerInput
						v-else
						type="start"
						:part="item.part"
						class="
						input
						focus-outline-hidden
						border
						border-transparent
						group
					"
					>
						<div
							class="
							group-focus:z-[2]
							group-focus:bg-accent-500/50
							group-focus:rounded-xs
							px-[2px]
						"
						>
							{{ item.value }}
						</div>
					</DateRangePickerInput>
				</template>
			</div>
			<div class="range-separator text-center px-1">
				–
			</div>
			<div :class="twMerge(`end-segment flex items-center`, date.end === undefined && 'text-neutral-400')">
				<template
					v-for="item in segments.end"
					:key="item.part"
				>
					<DateRangePickerInput
						v-if="item.part === 'literal'"
						:part="item.part"
						type="end"
						class="input-literal"
					>
						{{ item.value }}
					</DateRangePickerInput>
					<DateRangePickerInput
						v-else
						type="end"
						:part="item.part"
						class="
						input
						focus-outline-hidden
						border
						border-transparent
						group
					"
					>
						<div
							class="
								group-focus:z-[2]
								group-focus:bg-accent-500/50
								group-focus:rounded-xs
								px-[2px]
							"
						>
							{{ item.value }}
						</div>
					</DateRangePickerInput>
				</template>
			</div>
		</div>
		<DateRangePickerTrigger
			class="
				trigger
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
		</DateRangePickerTrigger>
	</DateRangePickerField>

	<!-- @vue-expect-error to exists -->
	<DateRangePickerContent
		:side-offset="4"
		to="#root"
		class="
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
		<DateRangePickerArrow class="fill-neutral-500"/>
		<DateRangePickerCalendar
			v-slot="{ weekDays, grid }"
			class="p-2 flex flex-col"
		>
			<DateRangePickerHeader class="flex items-center justify-between">
				<DateRangePickerPrev
					class="
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
				</DateRangePickerPrev>
				<DateRangePickerPrev
					class="
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
				</DateRangePickerPrev>

				<DateRangePickerHeading class="min-w-[14ch] text-center"/>
				<DateRangePickerNext
					class="
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
				</DateRangePickerNext>
				<DateRangePickerNext
					class="
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
				</DateRangePickerNext>
			</DateRangePickerHeader>
			<div
				class="
						flex
						flex-col
						pt-4
					"
			>
				<DateRangePickerGrid
					class="border-collapse select-none"
					v-for="month in grid"
					:key="month.value.toString()"
				>
					<DateRangePickerGridHead>
						<DateRangePickerGridRow class="mb-1 flex justify-between">
							<DateRangePickerHeadCell
								class="
										w-6
										rounded-md
										text-xs
										text-accent-500
									"
								v-for="day in weekDays"
								:key="day"
							>
								{{ day }}
							</DateRangePickerHeadCell>
						</DateRangePickerGridRow>
					</DateRangePickerGridHead>
					<DateRangePickerGridBody>
						<DateRangePickerGridRow
							class="flex w-full justify-between my-1"
							v-for="(weekDates, index) in month.rows"
							:key="`weekDate-${index}`"
						>
							<DateRangePickerCell
								:date="weekDate"
								v-for="weekDate in weekDates"
								:key="weekDate.toString()"
							>
								<DateRangePickerCellTrigger
									:day="weekDate"
									:month="month.value"
									class="
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
											data-[selected]:bg-accent-700
											data-[selected]:shadow
											data-[disabled]:text-neutral-500
											data-[selected]:text-white
											data-[unavailable]:pointer-events-none
											data-[unavailable]:text-neutral-500
											data-[unavailable]:line-through
											before:absolute
											before:bottom-[1px]
											before:hidden
											before:rounded-full
											before:w-4
											before:h-[2px]
											before:bg-white
											data-[today]:before:block
											data-[today]:before:bg-accent-500
											data-[selected]:before:bg-white
										"
								/>
							</DateRangePickerCell>
						</DateRangePickerGridRow>
					</DateRangePickerGridBody>
				</DateRangePickerGrid>
			</div>
			<slot v-bind="{tempValue: tempDate}"/>
		</DateRangePickerCalendar>
	</DateRangePickerContent>
</DateRangePickerRoot>
</template>
