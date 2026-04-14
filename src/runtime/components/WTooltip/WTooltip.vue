<template>
<TooltipProvider :disabled="disabled">
	<TooltipRoot
		:delay-duration="rootProps?.delayDuration ?? 200"
		:disable-closing-trigger="rootProps?.disableClosingTrigger ?? false"
		v-bind="rootProps"
	>
		<TooltipTrigger
			v-if="triggerWhileDisabled"
			as-child
		>
			<!-- https://reka-ui.com/docs/components/tooltip#displaying-a-tooltip-from-a-disabled-button -->
			<span>
				<slot>
					<WIcon class="text-neutral-500"><i-lucide-info/></WIcon>
				</slot>
			</span>
		</TooltipTrigger>
		<TooltipTrigger v-else>
			<slot>
				<WIcon class="text-neutral-500">
					<i-lucide-info/>
				</WIcon>
			</slot>
		</TooltipTrigger>
		<TooltipPortal
			:to="to"
		>
			<TooltipContent
				:style="contentStyle"
				:class="twMerge(`
					z-100
					tooltip--content-wrapper
					origin-[var(--reka-tooltip-content-transform-origin)]
					data-[side=top]:animate-slideDownAndFade
					data-[side=right]:animate-slideLeftAndFade
					data-[side=bottom]:animate-slideUpAndFade
					data-[side=left]:animate-slideRightAndFade
					bg-neutral-50
					dark:bg-neutral-800
					rounded-sm
					shadow-sm
					shadow-black/30
					border
					border-black/30
					p-2
					overflow-auto
				`,
					contentProps?.class
				) "
				v-bind="{
					collisionPadding: 20,
					side: 'top',
					...contentProps,
					class: undefined,
					style: undefined
				}"
			>
				<div
					class="
						tooltip--content-container
						text-sm
						whitespace-pre-wrap
						flex
						flex-col
						justify-center
					"
				>
					<slot
						name="content"
						v-bind="{ content }"
					>
						{{ content }}
					</slot>
				</div>
				<TooltipArrow
					class="
						tooltip--arrow
						-mt-px
						fill-neutral-50
						dark:fill-neutral-800
						drop-shadow-[0_2px_1px_rgba(0,0,0,0.3)]
						relative
					"
				/>
			</TooltipContent>
		</TooltipPortal>
	</TooltipRoot>
</TooltipProvider>
</template>

<script setup lang="ts">
import { TooltipArrow, TooltipContent, TooltipPortal, TooltipProvider, TooltipRoot, TooltipTrigger } from "reka-ui"

import ILucideInfo from "~icons/lucide/info"

import { usePopupConstrainToStyle } from "../../composables/usePopupConstrainToStyle.js"
import type { PopupConstrainToProps } from "../../types/index.js"
import { twMerge } from "../../utils/twMerge.js"
import WIcon from "../WIcon/WIcon.vue"

const props = withDefaults(defineProps<
	& PopupConstrainToProps
	& {
		delayDuration?: number
		disabled?: boolean
		triggerWhileDisabled?: boolean
		content?: string
		collisionBoundary?: Element | null
		to?: string
		/** Reka's TooltipRoot props */
		rootProps?: any
		/** Reka's TooltipContent props */
		contentProps?: any
	}>(),
{
	delayDuration: 200,
	disabled: false,
	triggerWhileDisabled: false,
	constrainWidthTo: "available",
	constrainHeightTo: "available",
	content: "",
	to: "#root"
})

const contentStyle = usePopupConstrainToStyle("tooltip", props, [props?.contentProps?.style])
</script>

