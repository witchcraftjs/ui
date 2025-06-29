<template>
<div
	:class="twMerge(`
		checkbox--wrapper
		flex
		items-center
		gap-1
	`,
		($.wrapperAttrs as any)?.class
	)"
	v-bind="{ ...$.wrapperAttrs, class: undefined }"
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
			($.labelAttrs as any)?.class
		)"
		v-bind="{ ...$.labelAttrs, class: undefined }"
		:for="id ?? fallbackId"
	>
		<input
			:id="id ?? fallbackId"
			:class="!($attrs as any).unstyle && twMerge(`
				checkbox
				focus-outline-no-offset
				m-0
				p-[0.4em]
				bg-bg
				dark:bg-fg
				appearance-none
				border
				border-neutral-500
				focus:border-accent-600
				rounded-sm
				aspect-square
				relative
				checked:after:content
				checked:after:absolute
				checked:after:w-full
				checked:after:h-full
				checked:after:border-2
				checked:after:border-bg
				dark:checked:after:border-fg
				checked:after:rounded-sm
				checked:after:top-0
				checked:after:left-0
				checked:after:bg-accent-700
				disabled:border-neutral-500
				disabled:checked:after:bg-neutral-700
			`, !disabled && `cursor-pointer`,
				($.attrs as any).class
			)"
			type="checkbox"
			:disabled="disabled"
			ref="inputEl"
			v-model="$value"
			v-bind="{...$.attrs, class: undefined}"
		>
		<slot/> {{ label }}
	</label>
</div>
</template>
<script setup  lang="ts">
import { keys } from "@alanscodelog/utils/keys.js"
import { omit } from "@alanscodelog/utils/omit.js"
import { pick } from "@alanscodelog/utils/pick.js"
import type { MakeRequired } from "@alanscodelog/utils/types"
import { computed, type HTMLAttributes, type InputHTMLAttributes,type PropType, ref, useAttrs, useSlots } from "vue"

import { useDivideAttrs } from "../../composables/useDivideAttrs.js"
import { usePreHydrationValue } from "../../composables/usePreHydrationValue.js"
import { twMerge } from "../../utils/twMerge.js"
import { type BaseInteractiveProps, baseInteractivePropsDefaults, getFallbackId,type LabelProps, type LinkableByIdProps, type TailwindClassProp, type WrapperProps } from "../shared/props.js"

defineOptions({
	name: "lib-checkbox",
	inheritAttrs: false,
})

const $ = useDivideAttrs(["label", "wrapper"])
const $slots = useSlots()
/* todo multi states */

const fallbackId = getFallbackId()
// eslint-disable-next-line no-use-before-define
const props = withDefaults(defineProps<Props>(), {
	...baseInteractivePropsDefaults,
})


const emits = defineEmits<{
	/* User presses enter.*/
	(e: "submit", val: boolean): void
}>()

const el = ref<null | HTMLElement>(null)
const inputEl = ref<null | HTMLElement>(null)
const $value = defineModel<boolean>("modelValue", { default: false })

usePreHydrationValue(props.id ?? fallbackId, $value)
</script>

<script lang="ts">

type WrapperTypes = Partial<WrapperProps<"label",HTMLAttributes, {
	/** Tailwind classes. */
	class?: string
}>>

type RealProps =

	& LinkableByIdProps
	& LabelProps
	& BaseInteractiveProps
	& {
		unstyle?: boolean
	}

interface Props
	extends
	/** @vue-ignore */
	Partial<Omit<
		InputHTMLAttributes,
		"class" | "readonly" | "disabled" | "onSumbit"
	> & TailwindClassProp>,
	/** @vue-ignore */
	WrapperTypes,
	RealProps
{}
</script>
