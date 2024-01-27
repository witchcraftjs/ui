<template>
<input
	:id="id"
	:class="twMerge(`
			input
			flex-1
			grow-[999999]
			rounded
			px-1
			focus-outline
			min-w-[2rem]
			bg-inherit
			placeholder:text-neutral-400
			placeholder:focus:text-accent-300
			read-only:bg-neutral-50
			read-only:text-neutral-800
			read-only:placeholder:select-none
			read-only:placeholder:text-opacity-0
			read-only:focus:placeholder:text-opacity-0
			disabled:placeholder:text-nuetral-400
			disabled:cursor-unset
			disabled:bg-neutral-50
			disabled:text-neutral-400
			dark:read-only:bg-neutral-950
			dark:read-only:text-neutral-200
			dark:disabled:placeholder:text-nuetral-600
			dark:disabled:bg-neutral-950
			dark:disabled:text-neutral-500
		`,
		type === `text` && `
			min-w-[10ch]
			w-full
		`,
		type === `number` && `
			w-12
			placeholder:text-transparent
			appearance-none
		`,
		border && `
			border
			border-neutral-500
			focus:border-accent-500
			disabled:border-neutral-400
			dark:disabled:border-neutral-600
		`,
		!valid && `
			placeholder:text-danger-700
			border-danger-700
			outlined:!ring-danger-700
			text-danger-800
			dark:text-danger-400
			dark:placeholder:text-danger-700
			dark:border-danger-600
		`,
		$attrs.class as any
	)"
	:data-border="border"
	:data-invalid="!valid"
	:type="type"
	:placeholder="placeholder"
	:disabled="disabled"
	:readonly="readonly"
	ref="inputEl"
	v-model="modelValue"
	v-bind="{...$attrs, class:undefined, ...listeners, ...ariaLabel}"
	@keydown.enter="emits('submit', modelValue)"
>
</template>
<script lang="ts" generic="T">
</script>
<script setup lang="ts">
import { computed, type PropType, useAttrs } from "vue"

import { keys } from "@alanscodelog/utils/keys"
import { pick } from "@alanscodelog/utils/pick"

import { useAriaLabel } from "../../composables/useAriaLabel.js"
import { twMerge } from "../../helpers/twMerge.js"
import { baseInteractiveProps, fallthroughEventProps, labelProp, linkableByIdProps } from "../shared/props.js"


defineOptions({
	name: "lib-simple-input",
	inheritAttrs: false,
})

const props = defineProps({
	placeholder: { type: String as PropType<string>, required: false, default: "" },
	type: { type: String as PropType<string>, required: false, default: "text" },
	valid: { type: Boolean as PropType<boolean>, required: false, default: true },
	...labelProp,
	...linkableByIdProps(),
	...baseInteractiveProps,
	...fallthroughEventProps,
})
// @ts-expect-error vue experimental stuff
const modelValue = defineModel<T>({ required: true })

const emits = defineEmits<{
	// (e: "update:modelValue", val: any): void
	/* User presses enter.*/
	(e: "submit", val: any): void
}>()
const $attrs = useAttrs()
const listeners = computed(() => pick(props, keys(fallthroughEventProps) as any) as any)
const ariaLabel = useAriaLabel(props)


// const props = withDefaults(defineProps<
// 	InputHTMLAttributes &
// 	{
// 		modelValue: string
// 		placeholder?: string
// 		id: string
// 	}
// >(), {
// 	id: linkableByIdPropsDefault,
// 	placeholder: "",

</script>

