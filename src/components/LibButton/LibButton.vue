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
			focus-outline
			disabled:shadow-none
			disabled:text-neutral-500
			disabled:cursor-default
			text-neutral-950
			hover:text-accent-700
			`,
			!color && `active:text-neutral-800` /* todo for colors */,
			border && `
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
			`,
			!border && color === `primary` && `
				font-bold
				hover:text-accent-50
			`,
			color === `ok` && ` text-ok-600 hover:text-ok-500`,
			color === `warning` && ` text-warning-500 hover:text-warning-300`,
			color === `danger` && ` text-danger-500 hover:text-danger-300 `,
			color === `secondary` && ` text-accent-700 hover:text-accent-500`,
			color === `primary` && ` text-accent-700 hover:text-accent-500`,
			border && color === `ok` && `
				text-ok-950
				hover:text-ok-800
				bg-ok-400
				border-ok-700
				hover:border-ok-600
				`,
			border && color === `warning` && `
				text-warning-950
				hover:text-warning-800
				bg-warning-300
				border-warning-700
				hover:border-warning-600
				`,
			border && color === `danger` && `
				text-danger-950
				hover:text-danger-800
				bg-danger-300
				border-danger-700
				hover:border-danger-600
				`,
			border && color === `secondary` && `
				text-accent-800
				hover:text-accent-700
				border-accent-700
				hover:border-accent-600
				bg-neutral-50
			`,
			border && color === `primary` && `
				text-white
				hover:text-white
				bg-accent-600
				hover:bg-accent-500
				border-accent-700
				hover:border-accent-600
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

