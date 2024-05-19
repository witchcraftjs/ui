<!-- Popover API WHEN :sob:
	#awaiting https://developer.mozilla.org/en-US/docs/Web/API/Popover_API#browser_compatibility -->
<template>
<slot name="button"
	:extract-el="(_:any)=> buttonEl = _"
/>
<!-- <Transition> -->
<component
	:id="id"
	:class="twMerge(
		useBackdrop && `bg-transparent
			p-0
			backdrop:bg-transparent
		`,

		attrs.class
	)"
	v-bind="{...attrs, class:undefined}"
	:is="useBackdrop ? 'dialog' : 'div'"
	ref="dialogEl"
	@mousedown="useBackdrop ? mousedown = true : undefined"
	@mouseup.self="useBackdrop && handleMouseup"
>
	<div v-if="useBackdrop || modelValue" class="scrollbar-hidden fixed overflow-scroll" :style="`top:${pos.y}px;left:${pos.x}px;${pos.maxWidth ? `max-width:${pos.maxWidth}px` : ''}`">
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
import { onMounted, type PropType, ref, watch } from "vue"

import { twMerge } from "../../helpers/twMerge.js"
import { linkableByIdProps } from "../shared/props.js"


const props = defineProps({
	...linkableByIdProps(),
	useBackdrop: { type: Boolean, required: false, default: true },
	preferredHorizontal: { type: Array as PropType<("center" | "right" | "left" | "either")[]>, default: () => ["center", "right", "left", "either"]},
	preferredVertical: { type: Array as PropType<("top" | "bottom" | "either")[]>, default: () => ["top", "bottom", "either"]},
})
const attrs = useAttrs()
defineOptions({ name: "lib-popup" })

// todo, can we have transitions?
const dialogEl = ref<HTMLDialogElement | null>(null)
const popupEl = ref<HTMLElement | null>(null)
const buttonEl = ref<HTMLElement | null>(null)

const pos = ref<{ x: number, y: number, maxWidth?: number }>({} as any)
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
		if (!buttonEl.value || !popupEl.value || !dialogEl.value) {
			pos.value = {} as any
			return
		}
		const finalPos: { x: number, y: number, maxWidth: number } = {} as any

		const el = buttonEl.value.getBoundingClientRect()
		const veil = getVeilBoundingRect(props.useBackdrop ? dialogEl.value : document.body)
		const popup = popupEl.value.getBoundingClientRect()

		const spaceLeft = (el.x + el.width) - veil.x
		const spaceRight = (veil.x + veil.width) - el.x
		const spaceLeftFromCenter = (el.x + (el.width / 2)) - veil.x
		const spaceRightFromCenter = (veil.x + veil.width) - (el.x + (el.width / 2))
		const spaceTop = el.y - veil.y
		const spaceBottom = (veil.y + veil.height) - (el.y + el.height)

		const { preferredHorizontal, preferredVertical } = props
		/* eslint-disable no-labels */
		outerloop:
		for (const type of preferredHorizontal) {
			switch (type) {
				case "center":
					if (spaceLeftFromCenter >= (popup.width / 2) &&
						spaceRightFromCenter >= (popup.width / 2)) {
						finalPos.x = el.x + (el.width / 2) - (popup.width / 2)
						break outerloop
					}
					// todo temp fix when it's too wide, will prefer left
					if (((spaceRightFromCenter + spaceLeftFromCenter) <= popup.width)) {
						finalPos.x = 0
						break outerloop
					}
					break
				case "right":
					if (spaceRight >= popup.width) {
						finalPos.x = el.x; break outerloop
					}
					break
				case "left":
					if (spaceLeft >= popup.width) {
						finalPos.x = (el.x + el.width) - popup.width; break outerloop
					}
					break
				case "either": {
					if (spaceRight >= spaceLeft) {
						finalPos.x = el.x; break outerloop
					} else { finalPos.x = (el.x + el.width) - popup.width; break outerloop }
				}
			}
		}
		outerloop:
		for (const type of preferredVertical) {
			switch (type) {
				case "top":
					if (spaceTop >= popup.height) {
						finalPos.y = el.y - popup.height; break outerloop
					}
					break
				case "bottom":
					if (spaceBottom >= popup.height) {
						finalPos.y = el.y + el.height; break outerloop
					}
					break
				case "either": {
					if (spaceTop >= spaceBottom) {
						finalPos.y = el.y - popup.height; break outerloop
					} else { finalPos.y = el.y + el.height; break outerloop }
				}
			}
		}
		finalPos.maxWidth = veil.width - finalPos.x
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

watch([() => modelValue.value, () => popupEl.value], () => {
	if (modelValue.value) {
		show()
		recompute()
		bindListeners()
	} else {
		close()
		unbindListeners()
	}
})


const mousedown = ref(false)
const handleMouseup = ($event: MouseEvent) => {
	$event.preventDefault()
	if (mousedown.value) {
		toggle()
		mousedown.value = false
	}
}
onMounted(() => {
	recompute()
})

defineExpose({
	recompute,
})

</script>

