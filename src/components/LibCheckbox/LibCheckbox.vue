<template>
<div
	class="flex items-center gap-1"
	ref="el"
>
	<slot name="left"/>
	<label class="flex items-center gap-1" :for="id">
		<input
			:id="id"
			:class="!unstyle && twMerge(`
					focus-outline-no-offset
					m-0
					p-[0.4em]
					bg-bg
					dark:bg-fg
					appearance-none
					border
					border-accent-600
					rounded
					aspect-square
					relative
					checked:after:content
					checked:after:absolute
					checked:after:w-full
					checked:after:h-full
					checked:after:border-2
					checked:after:border-bg
					dark:checked:after:border-fg
					checked:after:rounded
					checked:after:top-0
					checked:after:left-0
					checked:after:bg-accent-700
					disabled:border-neutral-500
					disabled:checked:after:bg-neutral-700
				`, !disabled && `after:cursor-pointer`,$attrs.class as any)"
			type="checkbox"
			:disabled="disabled"
			ref="inputEl"
			v-model="value"
			v-bind="{...$attrs, class: undefined, ...listeners}"
		>
		<slot/> {{ label }}
	</label>
</div>
</template>
<script setup  lang="ts">
/* eslint-disable @typescript-eslint/no-unused-vars */
import { computed, type PropType, ref, useAttrs, useSlots } from "vue"

import { keys } from "@alanscodelog/utils/keys"
import { omit } from "@alanscodelog/utils/omit"
import { pick } from "@alanscodelog/utils/pick"

import { twMerge } from "../../helpers/twMerge.js"
import { baseInteractiveProps, fallthroughEventProps, labelProp, linkableByIdProps } from "../shared/props.js"


defineOptions({
	name: "lib-checkbox",
	inheritAttrs: false,
})

const $attrs = useAttrs()
const $slots = useSlots()
/* todo multi states */
const props = defineProps({
	modelValue: { type: Boolean as PropType<boolean>, required: true },
	...labelProp,
	...linkableByIdProps(),
	...omit(baseInteractiveProps, ["border", "readonly"]),
	...fallthroughEventProps,
	unstyle: { type: Boolean, required: false, default: false },
})

const listeners = computed(() => pick(props, keys(fallthroughEventProps) as any) as any)

 
const emits = defineEmits<{
	(e: "update:modelValue", val: boolean): void
	/* User presses enter.*/
	(e: "submit", val: boolean): void
}>()

const el = ref<null | HTMLElement>(null)
const inputEl = ref<null | HTMLElement>(null)
const value = defineModel<boolean>("modelValue", { default: false })


</script>

