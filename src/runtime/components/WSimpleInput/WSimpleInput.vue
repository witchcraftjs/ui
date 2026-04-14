<template>
<input
	:id="finalId"
	:class="!unstyle && twMerge(`
		simple-input
		flex-1
		grow-[999999]
		rounded-sm
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
			pr-0
		`,
		border && `
			border
			border-neutral-500
			focus:border-accent-500
			disabled:border-neutral-400
			dark:disabled:border-neutral-600
			invalid:border-danger-700
			invalid:focus:border-danger-700
			invalid:dark:border-danger-600
		`,
		border && !valid && `
			dark:border-danger-600
			focus:border-danger-700
			border-danger-700
		`,
		`
			invalid:outline-danger-700
			invalid:text-danger-800
			invalid:dark:text-danger-400
			invalid:placeholder:text-danger-700
			invalid:dark:placeholder:text-danger-700
		`,
		!valid && `
			outlined:!outline-danger-700
			text-danger-800
			dark:text-danger-400
			placeholder:text-danger-700
			dark:placeholder:text-danger-700
		`,
		($attrs as any)?.class
	)"
	:data-border="border"
	:data-invalid="!valid"
	v-model="modelValue"
	v-bind="{
		...$attrs,
		class: undefined
	}"
	@keydown="handleKeydown"
	@input="emit('input', $event as InputEvent)"
>
</template>

<script lang="ts" setup generic="T">
import { type InputHTMLAttributes, useAttrs } from "vue"

import { useFallbackId } from "../../composables/useFallbackId.js"
import { usePreHydrationValue } from "../../composables/usePreHydrationValue.js"
import { hasModifiers } from "../../helpers/hasModifiers.js"
import type { BaseInteractiveProps, TailwindClassProp } from "../../types/index.js"
import { twMerge } from "../../utils/twMerge.js"

defineOptions({
	name: "WSimpleInput",
	inheritAttrs: false
})


const props = withDefaults(defineProps<
	& /** @vue-ignore */ Omit<
		InputHTMLAttributes,
		| "class" | "readonly" | "disabled" | "onSubmit" | "onInput"
		// https://github.com/vuejs/core/pull/14237
		| "autocomplete"
	>
	& /** @vue-ignore */ TailwindClassProp
	& Pick<BaseInteractiveProps, "unstyle" | "border">
	& {
		id?: string
		label?: string
		valid?: boolean
	}
>(), {
	id: "",
	placeholder: "",
	valid: true,
	label: "",
	type: undefined,
	border: true
})
const finalId = useFallbackId(props)

const modelValue = defineModel<T>({ required: true })

const emit = defineEmits<{
	/* User presses enter. */
	(e: "submit", val: T): void
	(e: "input", val: InputEvent): void
}>()
const $attrs = useAttrs()

function handleKeydown(e: KeyboardEvent) {
	if (e.key === "Enter" && !hasModifiers(e)) {
		emit("submit", modelValue.value)
	}
}
usePreHydrationValue(finalId, modelValue)
</script>

