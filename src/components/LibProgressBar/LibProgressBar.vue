<template>
<Transition>
	<div v-if="!hide"
		:id="id"
		:class="twMerge(`
			w-[200px]
			whitespace-nowrap
			overflow-x-scroll
			scrollbar-hidden
			rounded
			flex
			text-fg
			relative
			before:content-['']
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
			before:shadow-inner
			before:shadow-black/50
			before:rounded
			before:bg-bars-gradient
			before:bars-bg-accent-700
			before:bars-fg-accent-800
			before:bars-angle-[-45deg]
			before:animate-[slide_10s_linear_infinite]
			before:[background-size:15px_15px]
			before:absolute
			before:w-[var(--progress)]
			before:top-0 before:bottom-0 before:left-0
			before:transition-all
			before:z-1
			before:duration-500
		`,psuedoHide && `
			after:opacity-0
			before:opacity-0
			`, ($attrs as any).class)"
		max="100"
		:value="progress"
		:title="label"
		v-bind="{...$attrs, class:undefined}"
		:style="`--progress: ${clampVal(progress, clamp[0] ?? 0, clamp[1] ?? 100)}%;`"
	>
		<div class="label-wrapper relative flex-1">
			<span class="before:content-vertical-holder"/>
			<Transition>
				<slot>
					<label v-if="!psuedoHide"
						:for="id"
						class="
							text-bg
							absolute inset-0  flex
							justify-center
						"
					>
						<div class="truncate">
							{{ label ?? "" }}
						</div>
					</label>
				</slot>
			</Transition>

			<Transition>
				<slot>
					<label
						v-if="!psuedoHide"
						class="
							contrast-label
							pointer-events-none
							absolute
							inset-0
							flex justify-center  transition-all
							duration-500
							[clip-path:inset(0_0_0_var(--progress))]
							dark:hidden
						"
					>
						<div class="truncate">
							{{ label ?? "" }}
						</div>
					</label>
				</slot>
			</Transition>
		</div>
	</div>
</Transition>
</template>
<script setup  lang="ts">
/* eslint-disable @typescript-eslint/no-unused-vars */
import { isBlank } from "@alanscodelog/utils"
import { computed, getCurrentInstance, onBeforeUnmount, onMounted, type PropType, reactive, type Ref, ref, watch } from "vue"

import { twMerge } from "../../helpers/twMerge.js"
import { baseInteractiveProps, linkableByIdProps } from "../shared/props.js"

// TODO move to utils
const clampVal = (n: number, min: number, max: number) => Math.min(Math.max(n, min), max)

defineOptions({
	name: "lib-progress-bar",
	inheritAttrs: false,
})


const props = defineProps({
	...linkableByIdProps(),
	...baseInteractiveProps,
	progress: { type: Number, required: true },
	label: { type: String, required: false, default: undefined },
	/** Will auto hide after this given time if progress is 100% or more or less than 0% until progress is set to something else. Disabled (-1) by default. */
	autohideOnComplete: { type: Number, required: false, default: -1 },
	/**
	 * Do not actually hide the element, just leave an unstyled div,
	 * so the whole layout doesn't change on completion when autohideOnComplete is set.
	 */
	keepSpaceWhenHidden: { type: Boolean, required: false, default: false },
	/**
	 * By default the progress bar is visually clamped to 0-100, even if the value might be something else.
	 * You can change what it's clamped to here, to for example,
	 * show at least a small sliver of the progress bar when it's still 0.
	 */
	clamp: { type: Array as any as PropType<[start:number, end:number]>, required: false, default: () => [0, 100]},
})

const el = ref<null | HTMLElement>(null)
const hide = ref<boolean>(false)
const psuedoHide = ref<boolean>(false)
let timeout: number
let type: number
if (props.autohideOnComplete > -1 && (props.progress >= 100 || props.progress < 0)) {
	if (props.keepSpaceWhenHidden) {
		hide.value = false
		psuedoHide.value = true
	} else {
		hide.value = true
		psuedoHide.value = false
	}
}

watch([
	() => props.progress,
	() => props.keepSpaceWhenHidden,
	() => props.autohideOnComplete,
], () => {
	if (props.autohideOnComplete > -1 && (props.progress >= 100 || props.progress < 0)) {
		if (props.keepSpaceWhenHidden) {
			if (type === 1) return
			clearTimeout(timeout)
			type = 1
			timeout = setTimeout(() => {
				type = 0
				hide.value = false
				psuedoHide.value = true
			}, props.autohideOnComplete) as any
		} else {
			if (type === 2) return
			clearTimeout(timeout)
			type = 2
			timeout = setTimeout(() => {
				type = 0
				hide.value = true
				psuedoHide.value = false
			}, props.autohideOnComplete) as any
		}
	} else {
		clearTimeout(timeout)
		hide.value = false
		psuedoHide.value = false
	}
}, { immediate: false })

</script>

