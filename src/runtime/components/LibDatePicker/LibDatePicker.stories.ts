/* eslint-disable @typescript-eslint/naming-convention */
import { CalendarDate, fromDate, getLocalTimeZone, toTimeZone } from "@internationalized/date"
import type { Meta, StoryObj } from "@storybook/vue3"
import { computed, ref } from "vue"

import { createNoonUtcDate } from "../../helpers/createNoonUtcDate.js"
import * as components from "../index.js"

function html(strings: TemplateStringsArray, ...values: any[]): string {
	return String.raw(strings, ...values)
}

type ExtraTestArgs = {
	_slot?: string
	_timeZone?: string
}
const singleMeta: Meta<typeof components.LibDatePicker> = {
	component: components.LibDatePicker,
	title: "Components/DatePicker",
	args: {
		...{
			_slot: "",
			_timeZone: getLocalTimeZone()
		} satisfies ExtraTestArgs as any
	}
}

export default singleMeta
type Story = StoryObj<typeof components.LibDatePicker> & { args?: ExtraTestArgs }

function toUTC(m: Date, timeZone: string) {
	return toTimeZone(fromDate(m, timeZone), "UTC").toAbsoluteString()
}
export const Primary: Story = {
	render: args => {
		const extraArgs = args as ExtraTestArgs
		return {
			components: {
				...components
			},
			setup: () => {
				const modelValue = ref(args.modelValue)
				const timeZone = ref(extraArgs._timeZone)
				const debugUtcDate = computed(() => {
					const m = modelValue.value
					const z = timeZone.value!
					return m instanceof Date
						? toUTC(m, z)
						: typeof m === "object"
							? `Start: ${m.start ? toUTC(m.start,	z) : "undefined"}, End: ${m.end ? toUTC(m.end,	z) : "undefined"}`
							: "undefined"
				})
				return { args, getLocalTimeZone, modelValue, timeZone, debugUtcDate }
			},
			template: `
			<div>Date: {{modelValue ?? "undefined"}}</div>
			<div>Date UTC: {{debugUtcDate}}</div>
			<div>Detected timezone (via @internationalized/date): {{getLocalTimeZone()}}</div>
			<LibTimeZonePicker
				v-model="timeZone"
				label="Override Time Zone"
				wrapper-class="[&_.suggestions]:max-h-[200px] [&_.suggestions]:overflow-y-auto"
			/> 
			<div>
				This component has no border, added here to see it's size.
			</div>
			<div class="border border-neutral-500">
				<LibDatePicker v-bind="args" v-model="modelValue" :time-zone="timeZone">
					${extraArgs._slot}
				</LibDatePicker>
			</div>
		`
		}
	}
}

export const DateRange: Story = {
	...Primary,
	args: {
		modelValue: { start: undefined, end: undefined }
	}
}

export const IconTriggerFirst: Story = {
	...Primary,
	args: {
		...Primary.args,
		class: "[&_.date-picker--trigger]:order-first"
	}
}

export const BottomSlot: Story = {
	...Primary,
	args: {
		_slot: html`
			<template #default="slotProps">
				<LibButton>Custom content can be added here.</LibButton>
				<p class="break-all">
					Content has access to the internal temporary/suggested date value and can change it (e.g. set it to today).
				</p>	
				<p>Temp value:</p>
				{{ slotProps.tempValue }} 
			</template>
		`
	}
}

export const DateWithTime: Story = {
	...Primary,
	args: {
		...Primary.args,
		showTime: true
	}
}
export const WithDifferentFallbackDate: Story = {
	...Primary,
	args: {
		...Primary.args,
		fallbackDate: createNoonUtcDate(new CalendarDate(2000, 1, 1)).toDate()
	}
}
