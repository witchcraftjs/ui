<template>
<PopoverRoot
	v-model:open="modelValue"
	v-bind="rootProps"
>
	<PopoverAnchor
		v-if="$slots.button"
		as-child
	>
		<slot name="button"/>
	</PopoverAnchor>

	<PopoverPortal :to="to">
		<transition>
			<div
				v-if="showBackdrop && modelValue"
				:class="twMerge(`popover--backdrop absolute inset-0 bg-black/50`, backdropClass)"
				@click="modelValue = false"
			/>
		</transition>

		<PopoverContent
			v-bind="{
				disableOutsidePointerEvents: false,
				side: 'bottom',
				sideFlip: true,
				align: 'center',
				sideOffset: 0,
				alignOffset: 0,
				avoidCollisions: true,
				prioritizePosition: false,
				sticky: 'always',
				collisionPadding: 10,
				positionStrategy: 'absolute',
				...contentProps,
				style: undefined
			}"
			:style="contentStyle"
			:class="twMerge(`
				popover--content-wrapper
				focus:outline-none
				overflow-auto
				scrollbar-hidden
			`,
				animationDirection === `use-side` && `
				data-[side=top]:animate-slideInUp
				data-[side=bottom]:animate-slideInDown
				data-[side=left]:animate-slideInLeft
				data-[side=right]:animate-slideInRight
			`,
				animationDirection === `use-align` && (contentProps?.side === 'top' || contentProps?.side === 'bottom' || !contentProps?.side) && `
					data-[align=start]:animate-slideInLeft
					data-[align=end]:animate-slideInRight
					data-[align=center]:animate-contentShow
				`,
				animationDirection === `use-align` && (contentProps?.side === 'left' || contentProps?.side === 'right' || !contentProps?.side) && `
					data-[align=start]:animate-slideInDown
					data-[align=end]:animate-slideInUp
					data-[align=center]:animate-contentShow
				`,
				animationDirection === `left` && `
					animate-slideInLeft
				`,
				animationDirection === `right` && `
					animate-slideInRight
				`,
				animationDirection === `up` && `
					data-[side=top]:animate-slideInUp
				`,
				animationDirection === `down` && `
					animate-slideInDown
				`,
				animationDirection === `show` && `
					animate-contentShow
				`,
				contentProps?.class)"
		>
			<div
				:class="twMerge(`
						popover--content
						flex
						flex-col
						bg-neutral-50
						dark:bg-neutral-900
						rounded-sm
						p-2
						text-sm
						shadow-sm
						shadow-black/30
						border
						border-black/30
						whitespace-pre-wrap
						overflow-auto
					`)"
			>
				<slot name="popover"/>
			</div>

			<PopoverArrow
				:class="twMerge(`
					popover--arrow
					-mt-px
					fill-neutral-50
					dark:fill-neutral-800
					drop-shadow-[0_2px_1px_rgba(0,0,0,0.3)]
					relative
					stroke-black/30
				`)"
			/>
		</PopoverContent>
	</PopoverPortal>
</PopoverRoot>
</template>

<script setup lang="ts">
import {
	type DialogContentEmits,
	type DialogRootEmits,
	PopoverAnchor,
	PopoverArrow,
	PopoverContent,
	type PopoverContentProps,
	PopoverPortal,
	PopoverRoot,
	type PopoverRootProps
} from "reka-ui"
import type { HTMLAttributes } from "vue"

import { usePopupConstrainToStyle } from "../../composables/usePopupConstrainToStyle.js"
import type { EmitsToProps, PopupConstrainToProps, TailwindClassProp } from "../../types/index.js"
import { twMerge } from "../../utils/twMerge.js"

/** Wrapper around reka-ui's `Popover` component. */
defineOptions({
	name: "WPopover",
	inheritAttrs: false
})


const props = withDefaults(defineProps<
	& PopupConstrainToProps
	& {
		backdropClass?: string
		/* If true, a backdrop is shown behind the popover. Whether interaction is allowed outside the popover is still determined by `disableOutsidePointerEvents`. */
		showBackdrop?: boolean
		animationDirection?: "use-side" | "use-align" | "left" | "right" | "up" | "down" | "show" | "none"
		/** Overrides teleport target. */
		to?: string
		/** Overrides reka-ui's PopoverRootProps */
		rootProps?: PopoverRootProps & EmitsToProps<DialogRootEmits> & Omit<HTMLAttributes, "class"> & TailwindClassProp
		/** Overrides reka-ui's PopoverContentProps */
		contentProps?: PopoverContentProps & EmitsToProps<DialogContentEmits> & Omit<HTMLAttributes, "class"> & TailwindClassProp
	}
>(), {
	showBackdrop: false,
	constrainWidthTo: 400,
	constrainHeightTo: "available",
	animationDirection: "use-side",
	to: "#root"
})

const modelValue = defineModel<boolean>({ default: false })

const contentStyle = usePopupConstrainToStyle("popover", props, [props?.contentProps?.style])
</script>

