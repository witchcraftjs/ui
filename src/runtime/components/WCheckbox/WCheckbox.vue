<template>
<div
	:class="twMerge(`
		checkbox--wrapper
		flex
		items-center
		gap-1
	`,
		(disabled || readonly) && `
			cursor-not-allowed
			text-neutral-500
		`,

		wrapperAttrs?.class
	)"
	v-bind="{ ...wrapperAttrs, class: undefined }"
	ref="el"
>
	<slot name="left"/>
	<label
		:class="twMerge(`
			checkbox--label
			flex
			items-center
			gap-1
		`,
			labelAttrs?.class
		)"
		v-bind="{ ...labelAttrs, class: undefined }"
	>
		<CheckboxRoot
			:id="finalId"
			:disabled="disabled || readonly"
			:class="!unstyle && twMerge(`
				checkbox
				flex
				items-center
				justify-center
				focus-outline-no-offset
				m-0
				h-[1.2em]
				w-[1.2em]
				aspect-square
				bg-neutral-500/10
				text-white
				dark:text-white
				border
				border-neutral-500
				data-[state=checked]:border-accent-800/50
				data-[state=checked]:bg-accent-500
				data-[state=checked]:shadow-2xs
				data-[state=checked]:shadow-black/20
				data-[state=unchecked]:inset-shadow-2xs
				data-[state=unchecked]:inset-shadow-black/20
				focus:border-accent-600
				rounded-sm
				relative
				transition-colors
				dark:disabled:bg-neutral-800
				cursor-pointer
				disabled:text-neutral-500
				disabled:bg-neutral-500/50
				disabled:cursor-not-allowed
				disabled:data-[state=checked]:border-neutral-500
			`,
				($attrs as any)?.class
			)"
			v-bind="{ ...$attrs, class: undefined }"

			v-model="modelValue"
		>
			<CheckboxIndicator class="checkbox--indicator">
				<WIcon class="scale-110 mt-[2px] ml-[0.5px] [&_path]:stroke-3"><i-lucide-check/></WIcon>
			</CheckboxIndicator>
		</CheckboxRoot>

		<slot/> {{ label }}
	</label>
</div>
</template>

<script setup lang="ts">
import { CheckboxIndicator, CheckboxRoot } from "reka-ui"
import type { HTMLAttributes, InputHTMLAttributes } from "vue"
import { useAttrs } from "vue"

import ILucideCheck from "~icons/lucide/check"

import { useFallbackId } from "../../composables/useFallbackId.js"
import { usePreHydrationValue } from "../../composables/usePreHydrationValue.js"
import type { BaseInteractiveProps, TailwindClassProp } from "../../types/index.js"
import { twMerge } from "../../utils/twMerge.js"
import WIcon from "../WIcon/WIcon.vue"

const $attrs = useAttrs()

defineOptions({
	name: "WCheckbox",
	inheritAttrs: false
})

const props = withDefaults(defineProps<
	& BaseInteractiveProps
	& {
		id?: string
		label?: string
		labelAttrs?: Omit<HTMLAttributes, "class"> & TailwindClassProp
		wrapperAttrs?: Omit<HTMLAttributes, "class"> & TailwindClassProp
	}
	& /** @vue-ignore */Omit<
		InputHTMLAttributes,
		"class" | "readonly" | "disabled" | "onSumbit"
	// https://github.com/vuejs/core/pull/14237
		| "autocomplete"
	>
	& /** @vue-ignore */ TailwindClassProp
>(), {
	border: true
})

const modelValue = defineModel<boolean | "indeterminate">("modelValue", { default: false })
const finalId = useFallbackId(props)
usePreHydrationValue(finalId, modelValue)
</script>

