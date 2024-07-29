<!-- Popover API WHEN :sob:
	#awaiting https://developer.mozilla.org/en-US/docs/Web/API/Popover_API#browser_compatibility -->
<template>
<slot name="button"
	:extract-el="(_:any)=> buttonEl = _"
/>
<!-- <Transition> -->
<component
	:id="id ?? fallbackId"
	:class="twMerge(
		useBackdrop && `bg-transparent
			p-0
			backdrop:bg-transparent
		`,
		$attrs.class as any
	)"
	v-bind="{...$attrs, class:undefined}"
	:is="useBackdrop ? 'dialog' : 'div'"
	ref="dialogEl"
	@mousedown.self="handleMouseup"
>
	<div v-if="useBackdrop || modelValue"
		class="scrollbar-hidden fixed overflow-scroll"
		:style="`
		top:${pos.y}px;
		left:${pos.x}px;
		${pos.maxWidth ? `max-width:${pos.maxWidth}px` : ''}
		${pos.maxHeight ? `max-height:${pos.maxHeight}px` : ''}
		`"
	>
		<slot
			name="popup"
			:position="pos"
			:extract-el="(_:any) => popupEl = _"
		/>
	</div>
</component>
	<!-- </Transition> -->
</template>

<script setup lang="ts">
// eslint-disable-next-line simple-import-sort/imports
import { onMounted, type PropType, ref, useAttrs, watch , type HTMLAttributes } from "vue"
import { getFallbackId, type LinkableByIdProps,type TailwindClassProp } from "../shared/props.js"

import { twMerge } from "../../helpers/twMerge.js"
import { castType } from "@alanscodelog/utils"

const fallbackId = getFallbackId()
// eslint-disable-next-line no-use-before-define
const props = withDefaults(defineProps<Props>(), {
	useBackdrop: true,
	preferredHorizontal: () => ["center", "right", "left", "either"],
	preferredVertical: () => ["top", "bottom", "either"],
})
const $attrs = useAttrs()
defineOptions({ name: "lib-popup" })

// todo, can we have transitions?
const dialogEl = ref<HTMLDialogElement | null>(null)
const popupEl = ref<HTMLElement | null>(null)
const buttonEl = ref<HTMLElement | null>(null)

const pos = ref<{ x: number, y: number, maxWidth?: number, maxHeight?: number }>({} as any)
const modelValue = defineModel<boolean>({ default: false })
let isOpen = false


/**
 * We don't have access to the dialog backdrop and without extra styling, it's of 0 width/height,
 * positioned in the center of the screen, with margins taking up all the space.
 *
 * This returns a modified rect that makes more logical sense. It's also available when we aren't using the dialog element.
 */
const getVeilBoundingRect = (el: HTMLElement): Omit<DOMRect, "toJSON"> => {
	const rect = el.getBoundingClientRect()
	return {
		x: 0,
		y: 0,
		width: rect.left + rect.right,
		height: rect.top + rect.bottom,
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
	}
}
const recompute = (): void => {
	requestAnimationFrame(() => {
		const allAreCenterScreen = props.preferredHorizontal[0] === "center-screen" && props.preferredVertical[0] === "center-screen"
		if ((!buttonEl.value && !allAreCenterScreen) || !popupEl.value || !dialogEl.value) {
			pos.value = {} as any
			return
		}
		const finalPos: { x: number, y: number, maxWidth?: number, maxHeight?: number } = {} as any

		const el = buttonEl.value?.getBoundingClientRect()
		const veil = getVeilBoundingRect(props.useBackdrop ? dialogEl.value : document.body)
		const popup = popupEl.value.getBoundingClientRect()

		const space = {
			left: 0,
			right: 0,
			leftFromCenter: 0,
			rightFromCenter: 0,
			top: 0,
			bottom: 0,
		}
		if (el) {
			space.left = (el.x + el.width) - veil.x
			space.right = (veil.x + veil.width) - (el.x + el.width)
			space.leftFromCenter = (el.x + (el.width / 2)) - veil.x
			space.rightFromCenter = (veil.x + veil.width) - (el.x + (el.width / 2))
			space.top = el.y - veil.y
			space.bottom = (veil.y + veil.height) - (el.y + el.height)
		}

		const { preferredHorizontal, preferredVertical } = props
		let maxWidth: number | undefined
		let maxHeight: number | undefined
		/* eslint-disable no-labels */
		outerloop:
		for (const type of preferredHorizontal) {
			switch (type) {
				case "center-screen":
					if (popup.width < veil.width) {
						finalPos.x = (veil.width / 2) - (popup.width / 2)
					} else {
						finalPos.x = 0
						maxWidth = finalPos.x
					}
					break
				case "center":
					castType<DOMRect>(el)
					if (space.leftFromCenter >= (popup.width / 2) &&
						space.rightFromCenter >= (popup.width / 2)) {
						finalPos.x = el.x + (el.width / 2) - (popup.width / 2)
						break outerloop
					}
					// todo temp fix when it's too wide, will prefer left
					if (((space.rightFromCenter + space.leftFromCenter) <= popup.width)) {
						finalPos.x = 0
						break outerloop
					}
					break
				case "right":
					castType<DOMRect>(el)
					if (space.right >= popup.width) {
						finalPos.x = el.x; break outerloop
					}
					break
				case "left":
					castType<DOMRect>(el)
					if (space.left >= popup.width) {
						finalPos.x = (el.x + el.width) - popup.width; break outerloop
					}
					break
				case "either": {
					castType<DOMRect>(el)
					if (space.right >= space.left) {
						finalPos.x = el.x; break outerloop
					} else { finalPos.x = (el.x + el.width) - popup.width; break outerloop }
				}
			}
		}
		outerloop:
		for (const type of preferredVertical) {
			switch (type) {
				case "center-screen":
					if (popup.height < veil.height) {
						finalPos.y = (veil.height / 2) - (popup.height / 2)
					} else {
						finalPos.y = 0
						maxHeight = finalPos.y
					}
					break
				case "top":
					castType<DOMRect>(el)
					if (space.top >= popup.height) {
						finalPos.y = el.y - popup.height; break outerloop
					}
					break
				case "bottom":
					castType<DOMRect>(el)
					if (space.bottom >= popup.height) {
						finalPos.y = el.y + el.height; break outerloop
					}
					break
				case "either": {
					castType<DOMRect>(el)
					if (space.top >= space.bottom) {
						finalPos.y = el.y - popup.height; break outerloop
					} else { finalPos.y = el.y + el.height; break outerloop }
				}
			}
		}
		finalPos.maxWidth = maxWidth ?? veil.width - finalPos.x
		finalPos.maxHeight = maxHeight ?? veil.height - finalPos.y
		/* eslint-enable no-labels */
		pos.value = finalPos
	})
}

const show = () => {
	if (!isOpen) {
		isOpen = true
		modelValue.value = isOpen
		if (props.useBackdrop) dialogEl.value?.showModal()
		recompute()
	}
}

const close = () => {
	if (isOpen) {
		isOpen = false
		modelValue.value = isOpen
		pos.value.maxWidth = undefined
		if (props.useBackdrop) dialogEl.value?.close()
	}
}

const toggle = () => {
	if (!isOpen) show()
	else close()
}

const bindListeners = () => {
	window.addEventListener("resize", recompute)
}
const unbindListeners = () => {
	window.removeEventListener("resize", recompute)
}

watch([modelValue, popupEl], () => {
	if (modelValue.value) {
		show()
		recompute()
		bindListeners()
	} else {
		close()
		unbindListeners()
	}
})


const handleMouseup = ($event: MouseEvent) => {
	$event.preventDefault()
	toggle()
}
onMounted(() => {
	recompute()
})

defineExpose({
	recompute,
})

</script>
<script lang="ts">

type RealProps =
& LinkableByIdProps
& {
	useBackdrop?: boolean
	preferredHorizontal?: ("center" | "right" | "left" | "either" | "center-screen")[]
	preferredVertical?: ("top" | "bottom" | "either" | "center-screen")[]
}

interface Props
	extends
	/** @vue-ignore */
	Partial<Omit<HTMLAttributes,"class"> & TailwindClassProp>,
	RealProps { }
</script>
