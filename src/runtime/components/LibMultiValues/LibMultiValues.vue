<template>
<div
	v-if="$values && $values?.length > 0"
	:class="twMerge(`
		values
		group
		flex
		flex-initial
		items-center
		justify-center
		gap-1
		overflow-x-scroll
		scrollbar-hidden
	`,
		($ as any)?.class)
	"
	:data-disabled="disabled"
	:data-read-only="readonly"
	:aria-label="`Values for ${label}`"
	:tabindex="disabled ? -1 : 0"
	v-bind="{...$, class:undefined}"
>
	<div
		:data-border="border"
		:class="twMerge(`
				value_wrapper
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
		v-for="(value) of $values"
		:key="value"
		@keydown.ctrl.c.prevent="copy(value.toString())"
	>
		<span class="value_label truncate">{{ value }}</span>
		<lib-button
			class="!p-0 text-sm !leading-none"
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
import { removeIfIn } from "@alanscodelog/utils/removeIfIn.js"
import { computed, type HTMLAttributes } from "vue"

import { useDivideAttrs } from "../../composables/useDivideAttrs.js"
import { copy } from "../../helpers/copy.js"
import { twMerge } from "../../utils/twMerge.js"
import Icon from "../Icon/Icon.vue"
import LibButton from "../LibButton/LibButton.vue"
import { type BaseInteractiveProps, baseInteractivePropsDefaults,type LabelProps, type MultiValueProps, type TailwindClassProp, type WrapperProps } from "../shared/props.js"


defineOptions({
	name: "lib-multi-values",
	inheritAttrs: false,
})

const $ = useDivideAttrs(["item"] as const)
// eslint-disable-next-line no-use-before-define
const props = withDefaults(defineProps<Props>(), {
	...baseInteractivePropsDefaults
})


const canEdit = computed(() => !props.disabled && !props.readonly)
const $values = defineModel<T[]>("values", { default: () => []})

const removeVal = (value: T) => {
	if (!canEdit.value) return
	removeIfIn($values.value, value)
}
</script>

<script lang="ts">
type WrapperTypes = Partial<WrapperProps<"item",HTMLAttributes>>

type RealProps =
	& LabelProps
	& BaseInteractiveProps
	& MultiValueProps
	& {
		border?: boolean
	}
interface Props
	extends
	/** @vue-ignore */
	Partial<Omit<HTMLAttributes,"class"> & TailwindClassProp>,
	/** @vue-ignore */
	WrapperTypes,
	RealProps
{}

</script>

