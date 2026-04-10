<template>
<Transition>
	<div
		v-if="currentVisibility !== 'hidden'"
		:class="twMerge(`
			progress-bar
			w-[200px]
			whitespace-nowrap
			overflow-x-scroll
			scrollbar-hidden
			rounded-sm
			flex
			relative
			text-sm
			min-w-[50px]
			after:shadow-inner
			after:shadow-black/50
			after:content-['']
			after:absolute
			after:inset-0
			after:pointer-events-none
			after:z-2
			after:transition-all
			before:content-['']
			before:shadow-inner
			before:shadow-black/50
			before:rounded-sm
			before:bg-bars-gradient
			before:animate-slideBgInf
			before:[background-size:15px_15px]
			before:absolute
			before:w-[var(--progress)]
			before:top-0 before:bottom-0 before:left-0
			before:transition-all
			before:z-1
			before:duration-500
		`, currentVisibility === 'pseudo' && `
			after:opacity-0
			before:opacity-0
		`, ($attrs as any).class)"
		:data-value="progress"
		role="progressbar"
		:aria-valuenow="clampNumber(progress, clamp[0] ?? 0, clamp[1] ?? 100)"
		:aria-valuemin="clamp[0] ?? 0"
		:aria-valuemax="clamp[1] ?? 100"
		:aria-label="label"
		v-bind="{ ...$attrs, class: undefined }"
		:style="`--progress: ${clampNumber(progress, clamp[0] ?? 0, clamp[1] ?? 100)}%;`"
	>
		<div
			class="progress-bar--label-wrapper relative flex-1 z-3"
			aria-hidden="true"
		>
			<span class="before:content-vertical-holder"/>

			<Transition v-if="currentVisibility === 'visible'">
				<slot>
					<div
						class="
						progress-bar--bottom-label
						text-black
						dark:text-white
						absolute
						inset-0
						flex
						justify-center
						px-2
					"
					>
						<div class="truncate">
							{{ label ?? "" }}
						</div>
					</div>
				</slot>
			</Transition>
			<Transition v-if="currentVisibility === 'visible'">
				<slot>
					<div
						class="
						progress-bar--top-label
						pointer-events-none
						absolute
						inset-0
						flex
						justify-center
						transition-all
						duration-500
						text-white
						[clip-path:inset(0_calc(100%-var(--progress))_0_0)]
						px-2
					"
					>
						<div class="truncate">
							{{ label ?? "" }}
						</div>
					</div>
				</slot>
			</Transition>
		</div>
	</div>
</Transition>
</template>

<script setup lang="ts">
import { clampNumber } from "@alanscodelog/utils/clampNumber"
import { unreachable } from "@alanscodelog/utils/unreachable"
import type { HTMLAttributes } from "vue"
import { ref, useAttrs, watch } from "vue"

import type { TailwindClassProp } from "../../types/index.js"
import { twMerge } from "../../utils/twMerge.js"

defineOptions({
	name: "WProgressBar",
	inheritAttrs: false
})

const $attrs = useAttrs()
const props = withDefaults(defineProps<
	& /** @vue-ignore */ Omit<HTMLAttributes, "class">
	& /** @vue-ignore */ TailwindClassProp
	& {
		label?: string
		/** A number from 0-100. It is auto-clamped. */
		progress: number
		/** Will auto hide after this given time if progress is 100% or more or less than 0% until progress is set to something else. Disabled (-1) by default. */
		autohideOnComplete?: number
		/**
		 * Do not actually hide the element, just leave an unstyled div,
		 * so the whole layout doesn't change on completion when autohideOnComplete is set.
		 */
		keepSpaceWhenHidden?: boolean
		/**
		 * By default the progress bar is visually clamped to 0-100, even if the value might be something else.
		 * You can change what it's clamped to here, to for example,
		 * show at least a small sliver of the progress bar when it's still 0.
		 */
		clamp?: [start: number, end: number]
	}
>(), {
	autohideOnComplete: -1,
	keepSpaceWhenHidden: false,
	clamp: () => [0, 100]
})

type Visibility = "visible" | "pseudo" | "hidden"
const currentVisibility = ref<Visibility>("visible")
let lastVisibility: Visibility | null = null

function updateVisibility(
	immediate: boolean = false,
	onCleanup?: (cb: () => void) => void
): void {
	const isComplete = props.progress >= 100 || props.progress < 0
	const shouldHide = props.autohideOnComplete > -1 && isComplete

	if (!shouldHide) {
		lastVisibility = null
		currentVisibility.value = "visible"
		return
	}

	const newVisibility: Visibility = props.keepSpaceWhenHidden ? "pseudo" : "hidden"

	if (immediate) {
		currentVisibility.value = newVisibility
		lastVisibility = newVisibility
	} else if (lastVisibility !== newVisibility) {
		lastVisibility = newVisibility
		const timeout = setTimeout(() => {
			currentVisibility.value = newVisibility
		}, props.autohideOnComplete) as any
		if (!onCleanup) unreachable()
		onCleanup(() => clearTimeout(timeout))
	}
}

updateVisibility(true)

watch([
	() => [props.progress, props.keepSpaceWhenHidden, props.autohideOnComplete]
], (_new, _old, onCleanup) => {
	updateVisibility(false, onCleanup)
})
</script>
