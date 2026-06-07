<template>
<NumberFieldRoot
	:min="props.min"
	:max="props.max"
	:step="props.step"
	:format-options="{
		...rootProps?.formatOptions
	}"
	:class="twMerge(`
		number-input--root
		flex
		items-center
		justify-center
		metadata-input-border
		rounded-sm
		focus-outline-within
		gap-2
	`,
		!isValid && 'text-danger-500',
		rootProps?.class
	)"
	v-bind="{ ...rootProps, class: undefined }"
	v-model="modelValue"
>
	<NumberFieldDecrement
		class="
			number-input--decrement
			px-1
			flex-1
			hover:bg-neutral-200
			dark:hover:bg-neutral-800
			[&_.button--label]:justify-start
			rounded-bl-sm
			rounded-tl-sm
			cursor-pointer
			disabled:cursor-not-allowed
		"
	>
		<WIcon><i-lucide-minus/></WIcon>
	</NumberFieldDecrement>

	<NumberFieldInput
		:class="twMerge(
			`
				number-input--input
				bg-transparent
				tabular-nums
				text-center
				focus-outline-none
				px-1
				shrink-1
				basis-[20ch]
				grow-0
				min-w-0
				[&::-webkit-outer-spin-button]:appearance-none
				[&::-webkit-inner-spin-button]:appearance-none
				[-moz-appearance:textfield]
			`,
			!isValid && 'text-danger-500',
			inputProps?.class
		)"
		v-bind="{ ...inputProps, class: undefined }"
	/>

	<NumberFieldIncrement
		class="
			number-input--increment
			px-1
			flex-1
			hover:bg-neutral-200
			dark:hover:bg-neutral-800
			[&_.button--label]:justify-end
			rounded-br-sm
			rounded-tr-sm
			cursor-pointer
			disabled:cursor-not-allowed
		"
	>
		<WIcon><i-lucide-plus/></WIcon>
	</NumberFieldIncrement>
</NumberFieldRoot>
</template>

<script setup lang="ts">
import type {
	NumberFieldInputProps,
	NumberFieldRootEmits,
	NumberFieldRootProps
} from "reka-ui"
import {
	NumberFieldDecrement,
	NumberFieldIncrement,
	NumberFieldInput,
	NumberFieldRoot
} from "reka-ui"
import type { HTMLAttributes, InputHTMLAttributes } from "vue"

import type { EmitsToProps, TailwindClassProp } from "../../types/index.js"
import { twMerge } from "../../utils/twMerge.js"
import WIcon from "../WIcon/WIcon.vue"

const props = withDefaults(defineProps<
	& {
		id?: string
		max?: NumberFieldRootProps["max"]
		min?: NumberFieldRootProps["min"]
		step?: NumberFieldRootProps["step"]
		isValid?: (value: any) => boolean
		// autocomplete excluded because of https://github.com/vuejs/core/pull/14237 and https://github.com/vuejs/core/issues/10514
		inputProps?: NumberFieldInputProps & Omit<InputHTMLAttributes, "class" | "autocomplete"> & TailwindClassProp
		rootProps?: NumberFieldRootProps & EmitsToProps<NumberFieldRootEmits> & Omit<HTMLAttributes, "class"> & TailwindClassProp
	}
>(), {
	max: Number.MAX_SAFE_INTEGER,
	min: Number.MIN_SAFE_INTEGER,
	isValid: (value: any) => { return typeof value === "number" && !Number.isNaN(value) }
})

const modelValue = defineModel<number>({ required: true })
</script>
