<template>
<div
	v-if="$modelValue && $modelValue?.length > 0"
	role="list"
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
		($attrs as any)?.class)
	"
	:data-disabled="disabled"
	:data-read-only="readonly"
	:aria-label="label ? `Values for ${label}` : undefined"
	v-bind="{ ...$attrs, class: undefined }"
	@keydown="handleKeydown"
>
	<div
		role="listitem"
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
				leading-none
				focus-outline
				outlined:outline-offset-0
			`,
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
			itemAttrs?.class
		)"
		:tabindex="canEdit ? (activeIndex === index ? 0 : -1) : undefined"
		v-for="(value, index) of $modelValue"
		:key="value"
		ref="itemRefs"
		@keydown.ctrl.c.prevent="copy(value.toString())"
		@focus="activeIndex = index"
	>
		<span class="multivalues--label truncate">{{ value }}</span>
		<lib-button
			class="multivalues--remove-button !p-0 text-sm !leading-none"
			:aria-label="`Remove ${value}`"
			:border="false"
			:disabled="disabled || readonly"
			tabindex="-1"
			@click="removeVal(value)"
		>
			<icon><i-lucide-x/></icon>
		</lib-button>
	</div>
</div>
</template>

<script setup lang="ts" generic="T extends string | number">
import { removeIfIn } from "@alanscodelog/utils/removeIfIn"
import { computed, type HTMLAttributes, nextTick, ref, useAttrs } from "vue"

import ILucideX from "~icons/lucide/x"

import { copy } from "../../helpers/copy.js"
import type { BaseInteractiveProps, TailwindClassProp } from "../../types/index.js"
import { twMerge } from "../../utils/twMerge.js"
import Icon from "../Icon/Icon.vue"
import LibButton from "../LibButton/LibButton.vue"

defineOptions({
	name: "LibMultiValues",
	inheritAttrs: false
})

const $attrs = useAttrs()
const props = withDefaults(defineProps<
	& BaseInteractiveProps
	& {
		label?: string
		border?: boolean
		itemAttrs?: Omit<HTMLAttributes, "class"> & TailwindClassProp
	}
	& /** @vue-ignore */ Omit<HTMLAttributes, "class">
	& /** @vue-ignore */ TailwindClassProp
>(), {
	border: true
})

const canEdit = computed(() => !props.disabled && !props.readonly)
const $modelValue = defineModel<T[]>({ default: () => [] })
const itemRefs = ref<HTMLElement[]>([])
const activeIndex = ref(0)


function removeVal(value: T) {
	if (!canEdit.value) return
	removeIfIn($modelValue.value, value)

	if ($modelValue.value.length > 0) {
		if (activeIndex.value >= $modelValue.value.length) {
			activeIndex.value = $modelValue.value.length - 1
		}
		nextTick(() => {
			itemRefs.value[activeIndex.value]?.focus()
		})
	}
}

function handleKeydown(e: KeyboardEvent) {
	if (props.disabled) return

	const len = $modelValue.value.length
	if (len === 0) return

	if (e.key === "ArrowRight") {
		activeIndex.value = (activeIndex.value + 1) % len
		itemRefs.value[activeIndex.value]?.focus()
		e.preventDefault()
	} else if (e.key === "ArrowLeft") {
		activeIndex.value = (activeIndex.value - 1 + len) % len
		itemRefs.value[activeIndex.value]?.focus()
		e.preventDefault()
	} else if (e.key === "Delete" || e.key === "Backspace") {
		if (canEdit.value) {
			removeVal($modelValue.value[activeIndex.value]!)
			e.preventDefault()
		}
	} else if (e.key === "Home") {
		activeIndex.value = 0
		itemRefs.value[activeIndex.value]?.focus()
		e.preventDefault()
	} else if (e.key === "End") {
		activeIndex.value = len - 1
		itemRefs.value[activeIndex.value]?.focus()
		e.preventDefault()
	}
}
</script>

