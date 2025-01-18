<template>
<input
	:id="id ?? fallbackId"
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
			pr-0
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
			focus:border-danger-700
			outlined:!ring-danger-700
			text-danger-800
			dark:text-danger-400
			dark:placeholder:text-danger-700
			dark:border-danger-600
		`,
		($attrs as any)?.class
	)"
	:data-border="border"
	:data-invalid="!valid"
	:type="type"
	:placeholder="placeholder"
	:disabled="disabled"
	:readonly="readonly"
	v-model="modelValue"
	v-bind="{...$attrs, class:undefined, ...ariaLabel}"
	@keydown="handleKeydown"
	@input="emit('input', $event as InputEvent)"
>
</template>


<script lang="ts" setup generic="T">
import { keys } from "@alanscodelog/utils/keys.js"
import { pick } from "@alanscodelog/utils/pick.js"
import type { MakeRequired } from "@alanscodelog/utils/types"
import { castType } from "@alanscodelog/utils/utils"
import { getCurrentInstance, type InputHTMLAttributes, type InputTypeHTMLAttribute,toRef,useAttrs } from "vue"

import { useAriaLabel } from "../../composables/useAriaLabel.js"
import { hasModifiers } from "../../helpers/hasModifiers.js"
import { twMerge } from "../../utils/twMerge.js"
import { type BaseInteractiveProps, baseInteractivePropsDefaults, getFallbackId,type LabelProps, type LinkableByIdProps, type TailwindClassProp } from "../shared/props.js"


defineOptions({
	name: "lib-simple-input",
	inheritAttrs: false,
})

const fallbackId = getFallbackId()

// eslint-disable-next-line no-use-before-define
const props = withDefaults(defineProps<Props>(), {
	id: "",
	placeholder: "",
	valid: true,
	label: "",
	type: undefined,
	...baseInteractivePropsDefaults
})

const modelValue = defineModel<T>({ required: true })

const emit = defineEmits<{
	/* User presses enter.*/
	(e: "submit", val: T): void
	(e: "input", val: InputEvent): void
}>()
const $attrs = useAttrs()
const ariaLabel = useAriaLabel(props, fallbackId)

function handleKeydown(e: KeyboardEvent) {
	if (e.key === "Enter" && !hasModifiers(e)) {
		emit("submit", modelValue.value)
	}
}

</script>

<script lang="ts">

type RealProps =
	& LinkableByIdProps
	& LabelProps
	& BaseInteractiveProps
	& {
		placeholder?: InputHTMLAttributes["placeholder"]
		disabled?: InputHTMLAttributes["disabled"]
		id?: InputHTMLAttributes["id"]
		type?: InputHTMLAttributes["type"]
		valid?: boolean
	}

interface Props
	extends
	/** @vue-ignore */
	Partial<Omit<
		InputHTMLAttributes,
		| "class"
		| "readonly"
		| "disabled"
		| "onSubmit"
		| "onInput"
	> & TailwindClassProp>,
	RealProps
{}
</script>
