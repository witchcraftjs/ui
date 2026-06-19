<template>
<div
	:class="twMerge(`
		slider--wrapper
		flex
		flex-col
		items-center
		w-full
		gap-1
		[--_thumb-size:calc(var(--spacing)*3.5)]
		[--_track-size:calc(var(--spacing)*1.5)]
	`)"
	v-bind="{ ...wrapperAttrs, calss: undefined }"
>
	<!-- modelValueWrapper is cast as any because slider root supports it being undefined, which is not possible how this is coded, an creates havoc -->
	<SliderRoot
		v-slot="{ modelValue: slotValue }"
		:min="min"
		:max="max"
		:step="step"
		:disabled="disabled || readonly"
		:default-value="typeof defaultValue === 'number' ? [defaultValue] : defaultValue"
		:class="twMerge(`
				slider--root
				relative
				flex
				items-center
				select-none
				touch-none
				w-full
				h-[var(--thumb-size,var(--_thumb-size))]
			`, ($attrs as any)?.class)"
		v-model="modelValueWrapper as any"
		v-bind="{ thumbAlignment: 'overflow', ...$attrs, ...rootProps, class: undefined }"
	>
		<SliderTrack
			:class="`
					slider--track
					relative
					grow
					h-[var(--track-size,var(--_track-size))]
					rounded-full
					bg-neutral-300
					dark:bg-neutral-600
					inset-shadow-sm
					inset-shadow-black/20
				`"
		>
			<SliderRange
				:class="twMerge(`
						slider--range
						absolute
						h-full
						rounded-full
					`,
					!disabled && !readonly && highlightRange && `
						bg-[linear-gradient(to_bottom,var(--color-accent-300)_5%,var(--color-accent-500)_10%,var(--color-accent-500)_80%,var(--color-accent-800)_100%)]
						shadow-sm
						shadow-black/20
					`,
					readonly && `bg-neutral-500 dark:bg-neutral-500`
				)"
			/>
		</SliderTrack>

		<!-- @vue-expect-error blur/focus can be defined -->
		<SliderThumb
			:class="twMerge(`
					slider--thumb
					w-4
					flex
					flex-col
					items-center
					gap-1
					outline-hidden
				`

			)"
			v-for="(val, i) in slotValue"
			:key="i"
			@focus="setDragging(true)"
			@blur="setDragging(false)"
		>
			<WTooltip
				:content="`${val} ${unit}`"
				:root-props="{
					open: isDragging,
					delayDuration: 0,
					skipDelayDuration: true
				}"
				:content-props="{
					updatePositionStrategy: 'always',
					class: `
						slider--indicator
						pointer-events-none
						text-xs
						font-medium
						bg-white
						dark:bg-neutral-600
						rounded
						px-1
						py-0.5
						shadow-sm
						shadow-black/20
						z-100
					`
				}"
				:unstyle="true"
			>
				<template #default>
					<div
						:class="twMerge(
							`
								slider--thumb
								cursor-pointer
								w-[var(--thumb-size,var(--_thumb-size))]
								h-[var(--thumb-size,var(--_thumb-size))]
								rounded-full
								shadow-md
								outline-1
								outline-solid!
								outline-black/20
								bg-radial-[at_30%_30%]
								from-white
								to-neutral-300
								dark:from-neutral-200
								dark:to-neutral-400
								from-50%
							`,
							(!disabled && !readonly) && `
								active:shadow-accent-600
								focus:shadow-lg
								focus:shadow-accent-600
								[.outlined_.slider--thumb:focus_&]:outline-accent-600
								[.outlined_.slider--thumb:focus_&]:outline-2
								[.outlined_.slider--thumb:active_&]:outline-2
							`,
							disabled && `hidden`,
							readonly && `
								bg-neutral-100
								dark:bg-neutral-400
								cursor-not-allowed
							`
						)"
					/>
				</template>
			</WTooltip>
		</SliderThumb>
	</SliderRoot>
	<div
		class="
			slider--limits
			flex
			justify-between
			w-full
			px-1
		"
	>
		<span
			class="
			text-xs
			text-neutral-500
		"
		>{{ min }} {{ unit }}</span>
		<span
			class="
				text-xs
				text-neutral-500
			"
		>{{ max }} {{ unit }}</span>
	</div>
</div>
</template>

<script setup lang="ts" generic="T extends number | number[]">
import {
	SliderRange,
	SliderRoot,
	type SliderRootProps,
	SliderThumb,
	SliderTrack } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { computed, ref } from "vue"

import type { BaseInteractiveProps, TailwindClassProp } from "../../types/index.js"
import { twMerge } from "../../utils/twMerge.js"
import WTooltip from "../WTooltip/WTooltip.vue"

defineOptions({
	name: "WSlider",
	inheritAttrs: false
})

const props = withDefaults(defineProps<
	Pick<BaseInteractiveProps, "disabled" | "readonly">
	& Pick<SliderRootProps, "min" | "max" | "step">
	& {
		defaultValue?: number | number[]
		rootProps?: Omit<SliderRootProps, "min" | "max" | "step" | "defaultValue" | "modelValue">
		unit?: string
		/** Whether to visually highlight the range. Sometimes we might want to turn this off when we have more than 2 values v-modeled as it can be confusing. */
		highlightRange?: boolean
		wrapperAttrs?: Omit<HTMLAttributes, "class"> & TailwindClassProp
	}
>(), {
	min: 0,
	max: 100,
	step: 1,
	unit: "",
	highlightRange: true
})

const modelValue = defineModel<T>()

const modelValueWrapper = computed<number[]>({
	get: () => typeof modelValue.value === "number" ? [modelValue.value] : modelValue.value as number[],
	set: (val: any) => {
		if (val === undefined) throw new Error("Invalid model value undefined")
		modelValue.value = typeof modelValue.value === "number" ? val[0]! : [...val]
	}
})

const isDragging = ref(false)
function setDragging(val: boolean) {
	if (props.disabled || props.readonly) return
	isDragging.value = val
}
</script>
