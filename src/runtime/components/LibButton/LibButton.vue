<template>
<button
	:id="id ?? fallbackId"
	:class="!($attrs as any).unstyle && twMerge(`
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
			transition-all
			bg-neutral-100
			dark:bg-neutral-900
			shadow-[0_1px_1px_0]
			shadow-neutral-950/20
			hover:shadow-[0_1px_3px_0]
			hover:shadow-neutral-950/30
			hover:border-neutral-300

			relative
			after:absolute
			after:rounded
			after:inset-0
			after:content
			after:shadow-[0_1px_0_0_inset]
			after:shadow-bg/20
			hover:after:shadow-bg/60
			dark:after:shadow-bg/10
			dark:hover:after:shadow-bg/50
			after:pointer-events-none
			after:mix-blend-overlay

			active:shadow-inner
			active:shadow-fg/20
			active:border-transparent
			border
			border-neutral-400
			disabled:border-neutral-200
			disabled:bg-neutral-50

			dark:hover:shadow-accent-950/30
			dark:active:shadow-fg/40
			dark:active:border-neutral-900
			dark:bg-neutral-800
			dark:border-neutral-900
			dark:disabled:border-neutral-800
			dark:disabled:bg-neutral-900
		`,
		border && ( !color || color === `secondary` ) && `
			after:shadow-bg/90
			hover:after:shadow-bg
			dark:after:shadow-bg/20
			dark:hover:after:shadow-bg/90
		`,
		!border && color === `primary` && `
			font-bold
			hover:text-accent-50
		`,
		!border && color === `ok` && `
			text-ok-600 hover:text-ok-500
			dark:text-ok-600 dark:hover:text-ok-500
		`,
		!border && color === `warning` && `
			text-warning-500 hover:text-warning-300
			dark:text-warning-600 dark:hover:text-warning-400
		`,
		!border && color === `danger` && `
			text-danger-500 hover:text-danger-300
			dark:text-danger-600 dark:hover:text-danger-400
		`,
		!border && color === `secondary` && `
			text-accent-700 hover:text-accent-500
			dark:text-accent-600 dark:hover:text-accent-400
		`,
		!border && color === `primary` && `
			text-accent-700 hover:text-accent-500
			dark:text-accent-600 dark:hover:text-accent-400
		`,
		border && color === `ok` && `
			text-ok-950
			hover:text-ok-800
			bg-ok-400
			border-ok-500
			hover:border-ok-600
			hover:shadow-ok-900/50

			dark:text-ok-100
			dark:hover:text-ok-200
			dark:bg-ok-700
			dark:border-ok-800
			dark:hover:border-ok-900
			dark:hover:shadow-ok-900/30
		`,
		border && color === `warning` && `
			text-warning-950
			hover:text-warning-900
			bg-warning-300
			border-warning-400
			hover:border-warning-400
			hover:shadow-warning-900/50

			dark:text-warning-100
			dark:hover:text-warning-200
			dark:bg-warning-700
			dark:border-warning-700
			dark:hover:shadow-warning-900/25
		`,
		border && color === `danger` && `
			text-danger-950
			hover:text-danger-900
			bg-danger-400
			border-danger-500
			hover:border-danger-500
			hover:shadow-danger-900/50

			dark:text-danger-100
			dark:hover:text-danger-200
			dark:bg-danger-900
			dark:border-danger-950
			dark:hover:shadow-ranger-500/10
		`,
		border && color === `secondary` && `
			text-accent-800
			dark:text-accent-400
		`,
		border && color === `primary` && `
			text-bg
			hover:text-bg
			bg-accent-600
			border-accent-700
			hover:border-accent-800
			hover:shadow-accent-950/30

			dark:text-bg
			dark:bg-accent-600
			dark:hover:text-accent-200
			dark:border-accent-800
			dark:hover:border-accent-700
			dark:hover:shadow-accent-900/50
		`,
		($attrs as any)?.class
	)"
	:type="$attrs.type as any ?? 'submit'"
	:tabindex="0"
	:disabled="disabled"
	:data-border="border"
	:data-color="color"
	:aria-disabled="disabled"
	v-bind="{
		...autoTitle,
		...$attrs,
		class: undefined,
		...ariaLabel,
	}"
>
	<label :id="`label-${id ?? fallbackId}`" class="label pointer-events-none flex flex-1 items-center justify-center gap-1">
		<slot name="icon"/>
		<slot
			v-bind="{ label}"
		>
			<span v-if="label && !isBlank(label!)">
				{{ label }}
			</span>
		</slot>
		<slot name="icon-after"/>
	</label>
</button>
</template>

<script setup  lang="ts">
import { isBlank } from "@alanscodelog/utils/isBlank.js"
import { keys } from "@alanscodelog/utils/keys.js"
import { pick } from "@alanscodelog/utils/pick.js"
import type { MakeRequired } from "@alanscodelog/utils/types"
import { type ButtonHTMLAttributes,computed, type HTMLAttributes, type PropType,useAttrs } from "vue"

import { useAriaLabel } from "../../composables/useAriaLabel.js"
import { useDivideAttrs } from "../../composables/useDivideAttrs.js"
import { twMerge } from "../../utils/twMerge.js"
import { type BaseInteractiveProps, baseInteractiveProps, baseInteractivePropsDefaults, getFallbackId,type LabelProps, type LinkableByIdProps, type TailwindClassProp, type WrapperProps } from "../shared/props.js"


const $attrs = useAttrs()


defineOptions({
	name: "lib-button",
})

const fallbackId = getFallbackId()

// eslint-disable-next-line no-use-before-define
const props = withDefaults(defineProps<Props>(), {
	color: false,
	label: "",
	...baseInteractivePropsDefaults
})


const ariaLabel = useAriaLabel(props, fallbackId)
const autoTitle = computed(() => ({
	title: props.autoTitleFromAria
		? ($attrs["aria-label"] ?? props.label) as string
		: undefined,
}))

</script>

<script lang="ts">

type RealProps =
	& LinkableByIdProps
	& LabelProps
	& BaseInteractiveProps
	& {
		border?: boolean
		color?: "warning" | "ok" | "danger" | "primary" | "secondary" | false
		label?: string
		autoTitleFromAria?: boolean
	}

interface Props
	extends
	/** @vue-ignore */
	Partial<Omit<ButtonHTMLAttributes,"class" | "color" | "disabled">
	& TailwindClassProp
	& {
		// why is this not already a part of button?
		"aria-label": string
	}>,
	RealProps {}
</script>
