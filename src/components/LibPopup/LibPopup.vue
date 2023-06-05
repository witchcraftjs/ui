<!-- Popover API WHEN :sob:
	#awaiting https://developer.mozilla.org/en-US/docs/Web/API/Popover_API#browser_compatibility -->
<template>
	<slot name="button"
		:extract-el="(_:any)=> buttonEl = _"
	/>
	<!-- <Transition> -->
	<dialog
		:id="id"
		class="bg-transparent
			p-0
			backdrop:bg-transparent
			"
		ref="dialogEl"
		@mousedown="mousedown = true"
		@mouseup.self.prevent="handleMouseup"
	>
		<div class="fixed" :style="`top:${pos.y}px;left:${pos.x}px`">
			<slot
				name="popup"
				:position="pos"
				:extract-el="(_:any) => popupEl = _"
			/>
		</div>
	</dialog>
	<!-- </Transition> -->
</template>

<script lang="ts">
export default { name: "lib-color-input" }
</script>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue"

import { linkableByIdProps } from "../shared/props.js"

// todo, can be have transtition
const dialogEl = ref<HTMLDialogElement | null>(null)
const popupEl = ref<HTMLElement | null>(null)
const buttonEl = ref<HTMLElement | null>(null)

/* const props =  */defineProps({
	...linkableByIdProps(),
})

const modelValue = defineModel<boolean>({ default: false })
let isOpen = false
const show = () => {
	if (!isOpen) {
		isOpen = true
		modelValue.value = isOpen
		dialogEl.value?.showModal()
		recompute()
	}
}

const close = () => {
	if (isOpen) {
		isOpen = false
		modelValue.value = isOpen
		dialogEl.value?.close()
	}
}

const toggle = () => {
	if (!isOpen) show()
	else close()
}
// todo NEXT convert to props
const preferredHorizontal = ["center", "right", "left", "either"] as const
const preferredVertical = ["top", "bottom", "either"] as const
watch([modelValue, popupEl.value], () => {
	if (modelValue.value) {
		show()
		recompute()
		bindListeners()
	} else {
		close()
		unbindListeners()
	}
})


const bindListeners = () => {
	window.addEventListener("resize", recompute)
}
const unbindListeners = () => {
	window.removeEventListener("resize", recompute)
}

const mousedown = ref(false)
const handleMouseup = ($event: MouseEvent) => {
	$event.preventDefault()
	if (mousedown.value) {
		toggle()
		mousedown.value = false
	}
}

const pos = ref<{ x: number, y: number }>({} as any)
const recompute = (): void => {
	requestAnimationFrame(() => {
		if (!buttonEl.value || !popupEl.value || !dialogEl.value) {
			pos.value = {} as any
			return
		}
		const finalPos: { x: number, y: number } = {} as any

		const el = buttonEl.value.getBoundingClientRect()

		const veil = dialogEl.value.getBoundingClientRect()
		const popup = popupEl.value.getBoundingClientRect()

		const spaceLeft = (el.x + el.width) - veil.x
		const spaceRight = (veil.x + veil.width) - el.x
		const spaceLeftFromCenter = (el.x + (el.width / 2)) - veil.x
		const spaceRightFromCenter = (veil.x + veil.width) - (el.x + (el.width / 2))
		const spaceTop = el.y - veil.y
		const spaceBottom = (veil.y + veil.height) - (el.y + el.height)

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
					} else { finalPos.y = el.y; break outerloop }
				}
			}
		}
		/* eslint-enable no-labels */
		pos.value = finalPos
	})
}
onMounted(() => {
	recompute()
})

defineExpose({
	recompute,
})

</script>

