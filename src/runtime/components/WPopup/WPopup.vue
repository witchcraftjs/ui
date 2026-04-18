<template>
<DialogRoot
	v-bind="rootProps"
	v-model:open="modelValue"
>
	<DialogTrigger
		v-if="$slots.button"
		as-child
	>
		<slot name="button"/>
	</DialogTrigger>

	<DialogPortal :to="to">
		<DialogOverlay
			as-child
		>
			<slot
				name="backdrop"
				class="popup--backdrop absolute inset-0 bg-black/50"
			>
				<div
					class="popup--backdrop absolute inset-0 bg-black/50"
				/>
			</slot>
		</DialogOverlay>


		<DialogContent
			v-bind="{ ...contentProps, class: undefined }"
			:class="twMerge(`
				popup--content
				z-100
				focus:outline-none
				fixed
				top-1/2
				left-1/2
				-translate-x-1/2
				-translate-y-1/2
				animate-contentShow
				max-w-[100dvw]
				max-h-[100dvh]
				overflow-auto
				scrollbar-hidden
				p-5
			`, contentProps?.class)"
		>
			<div
				:class="twMerge(`
					popup--content-inner
					flex
					flex-col
					bg-neutral-100
					dark:bg-neutral-800
					rounded-md
				`)"
			>
				<slot name="popup"/>
			</div>
		</DialogContent>
	</DialogPortal>
</DialogRoot>
</template>

<script setup lang="ts">
import type {
	DialogContentEmits,
	DialogContentProps,
	DialogRootEmits,
	DialogRootProps } from "reka-ui"
import { DialogContent, DialogOverlay, DialogPortal, DialogRoot, DialogTrigger } from "reka-ui"
import type { EmitsToProps, HTMLAttributes } from "vue"

import type { TailwindClassProp } from "../../types/index.js"
import { twMerge } from "../../utils/twMerge.js"

defineOptions({ name: "WPopup", inheritAttrs: false })

withDefaults(defineProps<
	& {
		backdropClass?: string
		/** Overrides reka-ui's DialogContentProps */
		contentProps?: DialogContentProps & EmitsToProps<DialogContentEmits> & Omit<HTMLAttributes, "class"> & TailwindClassProp
		/** Overrides reka-ui's DialogRootProps */
		rootProps?: DialogRootProps & EmitsToProps<DialogRootEmits> & Omit<HTMLAttributes, "class"> & TailwindClassProp
		/** Overrides teleport target. */
		to?: string
	}
>(), {
	to: "#root"
})

const modelValue = defineModel<boolean>({ default: false })
</script>
