<template>
	<button
		:id="id"
		:class="!unstyle && twMerge(`
			button
			flex
			cursor-pointer
			items-center
			justify-center
			rounded
			px-1
			hover:cursor-pointer
			[&:hover_*]:cursor-pointer
			focus-outline
			disabled:shadow-none
			disabled:text-neutral-500
			disabled:cursor-default
			text-fg
			hover:text-accent-700
			dark:text-bg
			dark:hover:text-accent-500
			dark:disabled:text-neutral-500
			dark:disabled:hover:text-neutral-500
			`,
			!color && `active:text-neutral-800` /* todo for colors */,
			border && `
				bg-neutral-50
				shadow-sm
				shadow-neutral-950/50
				hover:shadow-md
				hover:shadow-neutral-950/30
				hover:border-neutral-600
				active:shadow-inner
				border
				border-neutral-500
				disabled:border-neutral-200
				disabled:bg-neutral-50
				dark:bg-neutral-950
				dark:border-neutral-700
				dark:disabled:border-neutral-800
				dark:disabled:bg-neutral-950
			`,
			!border && color === `primary` && `
				font-bold
				hover:text-accent-50
			`,
			color === `ok` && `
				text-ok-600 hover:text-ok-500
				dark:text-ok-600 dark:hover:text-ok-500
			`,
			color === `warning` && `
				text-warning-500 hover:text-warning-300
				dark:text-warning-600 dark:hover:text-warning-400
			`,
			color === `danger` && `
				text-danger-500 hover:text-danger-300
				dark:text-danger-600 dark:hover:text-danger-400
			`,
			color === `secondary` && `
				text-accent-700 hover:text-accent-500
				dark:text-accent-600 dark:hover:text-accent-400
			`,
			color === `primary` && `
				text-accent-700 hover:text-accent-500
				dark:text-accent-600 dark:hover:text-accent-400
			`,
			border && color === `ok` && `
				text-ok-950
				hover:text-ok-800
				bg-ok-400
				border-ok-700
				hover:border-ok-600

				dark:text-ok-100
				dark:hover:text-ok-200
				dark:bg-ok-700
				dark:border-ok-900
				dark:hover:border-ok-600
				`,
			border && color === `warning` && `
				text-warning-950
				hover:text-warning-800
				bg-warning-300
				border-warning-700
				hover:border-warning-600

				dark:text-warning-100
				dark:hover:text-warning-200
				dark:bg-warning-700
				dark:border-warning-700
				dark:hover:border-warning-600
			`,
			border && color === `danger` && `
				text-danger-950
				hover:text-danger-800
				bg-danger-300
				border-danger-700
				hover:border-danger-600

				dark:text-danger-100
				dark:hover:text-danger-200
				dark:bg-danger-900
				dark:border-danger-950
				dark:hover:border-danger-700
				`,
			border && color === `secondary` && `
				text-accent-800
				hover:text-accent-700
				border-accent-700
				hover:border-accent-600

				dark:text-accent-500
				dark:hover:text-accent-400
				dark:border-accent-700
				dark:hover:border-accent-600
				dark:bg-neutral-950
			`,
			border && color === `primary` && `
				text-bg
				hover:text-bg
				bg-accent-600
				hover:bg-accent-500
				border-accent-700
				hover:border-accent-600

				dark:text-fg
				dark:hover:text-fg
				dark:bg-accent-500
				dark:hover:bg-accent-600
				dark:border-accent-700
				dark:hover:border-accent-500
			`,
			$attrs.class as any
		)"
		:type="$attrs.type ?? 'submit'"
		:tabindex="0"
		:disabled="disabled"
		:data-border="border"
		:data-color="color"
		:aria-disabled="disabled"
		:aria-labelledby="label ?`label-${id}` : undefined"
		v-bind="{...$attrs, class:undefined, ...listeners}"
	>
		<label
			:id="`label-${id}`"
			class="label pointer-events-none flex items-center justify-center"
		>
			<span v-if="$slots.default"
				class="slot peer flex w-full items-center"
			>
				<slot/>
			</span>
			<span v-if="!isBlank(label)" class=" peer-[.slot]:pl-2">
				{{ label }}
			</span>
		</label>
	</button>
</template>
<script setup  lang="ts">
import { isBlank, keys, pick } from "@alanscodelog/utils"
import { computed, type PropType, useAttrs } from "vue"

import { twMerge } from "../../helpers/twMerge.js"
import { baseInteractiveProps, fallthroughEventProps, labelProp, linkableByIdProps } from "../shared/props.js"


const $attrs = useAttrs()

defineOptions({
	name: "lib-button",
})

const props = defineProps({
	...linkableByIdProps(),
	...labelProp,
	...baseInteractiveProps,
	...fallthroughEventProps,
	readonly: undefined as any,
	color: { type: [String, Boolean] as PropType<"warning" | "ok" | "danger" | "primary" | "secondary" | false>, required: false, default: false },
	unstyle: { type: Boolean, required: false, default: false },
})

const listeners = computed(() => pick(props, keys(fallthroughEventProps) as any) as any)

</script>

