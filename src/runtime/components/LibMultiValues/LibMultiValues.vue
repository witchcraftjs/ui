<template>
<div
	v-if="$modelValue && $modelValue?.length > 0"
	:class="twMerge(`
		multivalues
		group
		flex
		flex-initial
		items-center
		justify-center
		gap-1
		overflow-x-scroll
		scrollbar-hidden
	`,
		($.attrs as any)?.class)
	"
	:data-disabled="disabled"
	:data-read-only="readonly"
	:aria-label="`Values for ${label}`"
	:tabindex="disabled ? -1 : 0"
	v-bind="{ ...$.attrs, class: undefined }"
>
	<div
		:data-border="border"
		:class="twMerge(`
				multivalues--item
				flex-basis-0
				min-w-2
				flex
				max-w-fit
				flex-1
				items-center
				gap-0.5
				overflow-hidden
				px-1
				text-xs
				leading-none`,
			!(disabled || readonly) && `
				group-focus:text-accent-500
				focus:text-accent-500`,
			border && `
				rounded-sm
				border-neutral-400
				border
				focus:border-accent-400
			`,
			border && (disabled || readonly) && `
				border-neutral-200
				focus:border-neutral-200
				dark:border-neutral-800
				dark:focus:border-neutral-800
			`,
			($.itemAttrs as any)?.class
		)"
		:tabindex="canEdit ? 0 : undefined"
		v-for="(value) of $modelValue"
		:key="value"
		@keydown.ctrl.c.prevent="copy(value.toString())"
	>
		<span class="multivalues--label truncate">{{ value }}</span>
		<lib-button
			class="multivalues--remove-button !p-0 text-sm !leading-none"
			:aria-label="`Remove ${value}`"
			:border="false"
			:disabled="disabled || readonly"
			@click="removeVal(value)"
		>
			<icon><i-fa6-solid-xmark/></icon>
		</lib-button>
	</div>
</div>
</template>

<script setup lang="ts" generic="T extends string | number">
import { removeIfIn } from "@alanscodelog/utils/removeIfIn"
import { computed, type HTMLAttributes } from "vue"

import IFa6SolidXmark from "~icons/fa6-solid/xmark"

import { useDivideAttrs } from "../../composables/useDivideAttrs.js"
import { copy } from "../../helpers/copy.js"
import { twMerge } from "../../utils/twMerge.js"
import Icon from "../Icon/Icon.vue"
import LibButton from "../LibButton/LibButton.vue"
import type { BaseInteractiveProps, LabelProps, TailwindClassProp, WrapperProps } from "../shared/props.js"

defineOptions({
	name: "LibMultiValues",
	inheritAttrs: false
})

const $ = useDivideAttrs(["item"] as const)
const props = withDefaults(defineProps<Props>(), {
	unstyle: false, disabled: false, readonly: false, border: true
})

const canEdit = computed(() => !props.disabled && !props.readonly)
const $modelValue = defineModel<T[]>({ default: () => [] })

const removeVal = (value: T) => {
	if (!canEdit.value) return
	removeIfIn($modelValue.value, value)
}
</script>

<script lang="ts">
type WrapperTypes = Partial<WrapperProps<"item", HTMLAttributes>>

type RealProps
	= & LabelProps
		& BaseInteractiveProps
		& {
			border?: boolean
		}
interface Props
	extends
	/** @vue-ignore */
	Partial<Omit<HTMLAttributes, "class"> & TailwindClassProp>,
	/** @vue-ignore */
	WrapperTypes,
	RealProps
{}
</script>
