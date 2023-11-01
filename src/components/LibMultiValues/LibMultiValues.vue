<template>
<div
	v-if="values && values?.length > 0"
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
		`, ($attrs as any).class)
	"
	:data-disabled="disabled"
	:data-read-only="readonly"
	:aria-label="`Values for ${label}`"
	:tabindex="disabled ? -1 : 0"
	v-bind="{...$attrs, class:undefined}"
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
					rounded
					border-neutral-400
					border
					focus:border-accent-400
				`,
			border && (disabled || readonly) && `
					border-neutral-200
					focus:border-neutral-200
					dark:border-neutral-800
					dark:focus:border-neutral-800
				`)
		"
		:tabindex="canEdit ? 0 : undefined"
		v-for="(value) of values"
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
			<fa :icon="'solid times'"/>
		</lib-button>
	</div>
</div>
</template>
<script setup lang="ts" generic="T extends string | number">

import { removeIfIn } from "@alanscodelog/utils"
import { computed, useAttrs } from "vue"

import { copy } from "../../helpers/copy.js"
import { twMerge } from "../../helpers/twMerge.js"
import fa from "../fa/Fa.vue"
import libButton from "../LibButton/LibButton.vue"
import { baseInteractiveProps, fallthroughEventProps, labelProp } from "../shared/props.js"


defineOptions({
	name: "lib-multi-values",
	inheritAttrs: false,
})

const $attrs = useAttrs()
const props = defineProps({
	...labelProp,
	...baseInteractiveProps,
	...fallthroughEventProps,
	border: { type: Boolean, required: false, default: true },
})


const canEdit = computed(() => !props.disabled && !props.readonly)
const values = defineModel<T[]>("values", { default: () => []})


const removeVal = (value: T) => {
	if (!canEdit.value) return
	removeIfIn(values.value, value)
}
</script>

