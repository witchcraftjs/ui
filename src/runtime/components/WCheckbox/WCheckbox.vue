<template>
<!-- we don't use a reka component anymore because they render using a button and we can't detect the pre-hydration state with a button -->
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
		<span class="relative inline-flex">
			<input
				:id="finalId"
				type="checkbox"
				:checked="modelValue === true"
				:indeterminate="modelValue === 'indeterminate'"
				:data-state="modelValue === 'indeterminate' ? 'indeterminate' : modelValue === true ? 'checked' : 'unchecked'"
				:data-disabled="disabled || readonly ? '' : undefined"
				:disabled="disabled || readonly"
				:class="!unstyle && twMerge(`
					checkbox
					appearance-none
					peer
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
					checked:border-accent-800/50
					checked:bg-accent-500
					checked:shadow-2xs
					checked:shadow-black/20
					[&:not(:checked)]:inset-shadow-2xs
					[&:not(:checked)]:inset-shadow-black/20
					focus:border-accent-600
					rounded-sm
					relative
					transition-colors
					dark:disabled:bg-neutral-800
					cursor-pointer
					disabled:text-neutral-500
					disabled:bg-neutral-500/50
					disabled:cursor-not-allowed
					disabled:checked:border-neutral-500
				`,
					($attrs as any)?.class
				)"
				v-bind="{ ...$attrs, class: undefined }"
				@change="modelValue = ($event.target as HTMLInputElement).checked as T"
			>

			<span
				class="
					checkbox--indicator
					absolute
					inset-0
					hidden
					items-center
					justify-center
					text-white
					dark:text-white
					pointer-events-none
					peer-checked:flex
					peer-indeterminate:flex
				"
			>
				<WIcon class="scale-110 mt-[1px] ml-[0.5px] [&_path]:stroke-3"><i-lucide-check/></WIcon>
			</span>
		</span>

		<slot/> {{ label }}
	</label>
</div>
</template>

<script setup lang="ts" generic="T extends boolean | 'indeterminate' = boolean">
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
		// autocomplete excluded because of https://github.com/vuejs/core/pull/14237 and https://github.com/vuejs/core/issues/10514
		| "autocomplete"
	>
	& /** @vue-ignore */ TailwindClassProp
>(), {
	border: true
})

const modelValue = defineModel<T>("modelValue", { default: false as T })
const finalId = useFallbackId(props)
usePreHydrationValue(finalId, modelValue)
</script>

