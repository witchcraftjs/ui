<script setup lang="ts">
import { getLocalTimeZone } from "@internationalized/date"
import { computed, useAttrs } from "vue"

import LibRangeDatePicker from "./LibRangeDatePicker.vue"
import LibSingleDatePicker from "./LibSingleDatePicker.vue"

import type { RangeDate,SingleDate } from "../../types/index.js"
import { getFallbackId } from "../shared/props.js"

const attrs = useAttrs()

withDefaults(defineProps<{
	showTime?: boolean
	id?: string
	/** The fallback suggested date when the modelValue is undefined (it will not update modelValue, it only serves as a suggestions and is used internally in the temporary value). If ignoring the time element, you should probably use the {@link createNoonTodayUtc} function (`createNonTodayUtc().toDate(())`) in the helpers, otherwise `new Date()` (the default) will do. */
	fallbackDate?: Date
	/** The local user's timezone, defaults to @internationalized/date's getLocalTimeZone(). */
	timeZone?: string
}>(), {
	showTime: false,
	id: undefined,
	fallbackDate: () => new Date(),
	timeZone: getLocalTimeZone()
})
const fallbackId = getFallbackId()

/**
 * modelValue can be undefined or an object with start/end undefined, but it must be passed, otherwise we can't tell the difference between a single date and a range date.
 *
 * In the case of an undefined date, the current date at NOON UTC will be used to avoid the date changing.
 *
 * The @internationalized/date library's fromDate function is used internally to convert the date given (should be UTC) to the local time zone. It's converted back via it's toDate function.
 */
const date = defineModel<SingleDate | RangeDate>({ required: true })
const isRange = computed(() => date.value !== undefined && !(date.value instanceof Date))

</script>

<template>
<component
	:id="id ?? fallbackId"
	v-bind="attrs"
	:use-time="showTime"
	:time-zone="timeZone"
	:fallback-date="fallbackDate"
	:is="isRange ? LibRangeDatePicker : LibSingleDatePicker"
	v-model="date as any"
>
	<template #default="slotProps">
		<slot v-bind="slotProps"/>
	</template>
</component>
</template>
