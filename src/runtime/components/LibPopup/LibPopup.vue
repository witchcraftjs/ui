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
		useBackdrop && useDialogForBackdrop && `bg-transparent
			p-0
			backdrop:bg-transparent
		`,
		modelValue && useBackdrop && !useDialogForBackdrop && `
			fixed
			inset-0
		`,
		$attrs.class as any
	)"
	v-bind="{...$attrs, class:undefined}"
	:is="useDialogForBackdrop ? 'dialog' : 'div'"
	ref="dialogEl"
	@mousedown.self="handleMouseup"
>
	<div v-if="modelValue"
		:class="`fixed ${props.avoidRepositioning ? 'transition-[top,left]' : ''}`"
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
import { onMounted, nextTick, ref, useAttrs, watch , type HTMLAttributes } from "vue"
import { getFallbackId, type LinkableByIdProps,type TailwindClassProp } from "../shared/props.js"

import { twMerge } from "../../utils/twMerge.js"
import { castType } from "@alanscodelog/utils/castType.js"
import { isArray } from "@alanscodelog/utils/isArray.js"
import type { IPopupReference, PopupPosition, PopupPositioner, PopupPositionModifier, SimpleDOMRect } from "../../types/index.js"

const fallbackId = getFallbackId()
// eslint-disable-next-line no-use-before-define
const props = withDefaults(defineProps<Props>(), {
	useBackdrop: true,
	useDialogForBackdrop: false,
	// vue is getting confused when the prop type can also be a function
	preferredHorizontal: () => ["center-most", "either"] satisfies Props["preferredHorizontal"],
	preferredVertical: () => ["top", "bottom", "either"] satisfies Props["preferredVertical"] ,
	avoidRepositioning: false,
})
const $attrs = useAttrs()
defineOptions({ name: "lib-popup" })


const dialogEl = ref<HTMLDialogElement | null>(null)
const popupEl = ref<IPopupReference | null>(null)
const buttonEl = ref<IPopupReference | null>(null)
const backgroundEl = ref<IPopupReference | null>(null)

const pos = ref<PopupPosition>({} as any)
const modelValue = defineModel<boolean>({ default: false })
let isOpen = false


/**
 * We don't have access to the dialog backdrop and without extra styling, it's of 0 width/height, positioned in the center of the screen, with margins taking up all the space.
 *
 * This returns a modified rect that makes more logical sense.
 */
const getDialogBoundingRect = (): SimpleDOMRect => ({
	x: 0,
	y: 0,
	width: window.innerWidth,
	height: window.innerHeight,
	top: 0,
	bottom: 0,
	left: 0,
	right: 0,
})
let lastButtonElPos: SimpleDOMRect | undefined
const recompute = (force: boolean = false): void => {
	requestAnimationFrame(() => {
		const horzHasCenterScreen = isArray(props.preferredHorizontal)
		&& props.preferredHorizontal[0] === "center-screen"
		const vertHasCenterScreen = isArray(props.preferredVertical)
		&& props.preferredVertical[0] === "center-screen"
		
		const canBePositionedWithoutButton =
		(horzHasCenterScreen || typeof props.preferredHorizontal === "function")
		&& (vertHasCenterScreen || typeof props.preferredVertical === "function")
		if (!popupEl.value || !dialogEl.value || (!buttonEl.value && !canBePositionedWithoutButton)) {
			pos.value = {} as any
			return
		}
		const el = buttonEl.value?.getBoundingClientRect()
		const bg = backgroundEl.value?.getBoundingClientRect() ?? (
			props.useBackdrop
				? getDialogBoundingRect()
				: document.body.getBoundingClientRect()
		)
		const popup = popupEl.value.getBoundingClientRect()

		let finalPos: { x: number, y: number, maxWidth?: number, maxHeight?: number } = {} as any


		if (!force && modelValue.value && props.avoidRepositioning && buttonEl.value && lastButtonElPos) {
			const shiftX = buttonEl.value.getBoundingClientRect().x - lastButtonElPos.x
			const shiftY = buttonEl.value.getBoundingClientRect().y - lastButtonElPos.y

			pos.value.x += shiftX
			pos.value.y += shiftY
			lastButtonElPos = el
			return
		}

		const space = {
			left: 0,
			right: 0,
			leftLeft: 0,
			rightRight: 0,
			leftFromCenter: 0,
			rightFromCenter: 0,
			topFromCenter: 0,
			bottomFromCenter: 0,
			top: 0,
			bottom: 0,
		}
		if (el) {
			space.left = (el.x + el.width) - bg.x
			space.leftLeft = el.x - bg.x
			space.right = (bg.x + bg.width) - (el.x + el.width)
			space.rightRight = bg.x + bg.width - el.x
			space.leftFromCenter = (el.x + (el.width / 2)) - bg.x
			space.rightFromCenter = (bg.x + bg.width) - (el.x + (el.width / 2))
			space.topFromCenter = (el.y + (el.height / 2)) - bg.y
			space.bottomFromCenter = (bg.y + bg.height) - (el.y + (el.height / 2))
			space.top = el.y - bg.y
			space.bottom = (bg.y + bg.height) - (el.y + el.height)
		}
		const { preferredHorizontal, preferredVertical } = props
		let maxWidth: number | undefined
		let maxHeight: number | undefined
		if (typeof preferredHorizontal === "function") {
			finalPos.x = preferredHorizontal(el, popup, bg, space)
		} else {
			/* eslint-disable no-labels */
			outerloop:
			for (const type of preferredHorizontal) {
				switch (type) {
					case "center-screen":
						if (popup.width < bg.width) {
							finalPos.x = (bg.width / 2) - (popup.width / 2)
						} else {
							finalPos.x = 0
							maxWidth = finalPos.x
						}
						break
					case "center-most":
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
						if (type === "center-most") {
							if (space.leftFromCenter < space.rightFromCenter) {
								finalPos.x = el.x + (el.width / 2) - space.leftFromCenter; break outerloop
							} else {
								finalPos.x = el.x + (el.width / 2) + space.rightFromCenter - popup.width; break outerloop
							}
						}
						break
					case "left-most":
						castType<DOMRect>(el)
						if (space.left >= popup.width) {
							finalPos.x = el.x - popup.width; break outerloop
						} else {
							finalPos.x = 0; break outerloop
						}
					case "right-most":
						castType<DOMRect>(el)
						if (space.right >= popup.width) {
							finalPos.x = el.x + el.width; break outerloop
						} else {
							finalPos.x = bg.x + bg.width - popup.width; break outerloop
						}
				
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
						} else {
							finalPos.x = (el.x + el.width) - popup.width
							break outerloop
						}
					}
				}
			}
		}
		if (typeof preferredVertical === "function") {
			finalPos.y = preferredVertical(el, popup, bg, space)
		} else {
			outerloop:
			for (const type of preferredVertical) {
				switch (type) {
					case "center-screen":
						if (popup.height < bg.height) {
							finalPos.y = (bg.height / 2) - (popup.height / 2)
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
					case "top-most":
						castType<DOMRect>(el)
						if (space.top >= popup.height) {
							finalPos.y = el.y - popup.height; break outerloop
						} else {
							finalPos.y = 0; break outerloop
						}
					case "bottom-most":
						castType<DOMRect>(el)
						if (space.bottom >= popup.height) {
							finalPos.y = el.y + el.height; break outerloop
						} else {
							finalPos.y = bg.y + bg.height - popup.height; break outerloop
						}
					case "center-most":
					case "center":
						castType<DOMRect>(el)
						if (space.topFromCenter >= (popup.height / 2) &&
						space.bottomFromCenter >= (popup.height / 2)) {
							finalPos.y = el.y + (el.height / 2) - (popup.height / 2)
							break outerloop
						}
						// todo temp fix when it's too wide, will prefer the top
						if (((space.bottomFromCenter + space.topFromCenter) <= popup.height)) {
							finalPos.y = 0
							break outerloop
						}
						if (type === "center-most") {
							if (space.topFromCenter < space.bottomFromCenter) {
								finalPos.y = el.y + (el.height / 2) - space.topFromCenter; break outerloop
							} else {
								finalPos.y = el.y + (el.height / 2) + space.bottomFromCenter - popup.height; break outerloop
							}
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
		}
		finalPos.maxWidth = maxWidth ?? undefined
		finalPos.maxHeight = maxHeight ?? undefined
		/* eslint-enable no-labels */
		if (props.modifyPosition) {
			finalPos = props.modifyPosition(finalPos, el, popup, bg, space)
		}
		pos.value = finalPos
		lastButtonElPos = el
	})
}

const show = () => {
	if (!isOpen) {
		isOpen = true
		modelValue.value = isOpen
		if (props.useBackdrop && props.useDialogForBackdrop) dialogEl.value?.showModal()
		recompute(true)
	}
}

const close = () => {
	if (isOpen) {
		isOpen = false
		modelValue.value = isOpen
		pos.value.maxWidth = undefined
		if (props.useBackdrop && props.useDialogForBackdrop) dialogEl.value?.close()
	}
}

const toggle = () => {
	if (!isOpen) show()
	else close()
}

const recomputeListener = () => recompute()

const bindListeners = () => {
	window.addEventListener("resize", recomputeListener)
	window.addEventListener("scroll", recomputeListener, true)
}
const unbindListeners = () => {
	window.removeEventListener("resize", recomputeListener)
	window.removeEventListener("scroll", recomputeListener, true)
}

watch([modelValue, popupEl], () => {
	if (modelValue.value) {
		show()
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
	setReference: (el: IPopupReference | null) => {
		buttonEl.value = el
	},
	setBackground: (el: IPopupReference | null) => {
		backgroundEl.value = el
	},

})

</script>
<script lang="ts">

type RealProps =
& LinkableByIdProps
& {
	/**
	 * Whether to use the dialog element instead of a regular backdrop. While using the dialog element would be ideal, css variables won't be applied to it, tailwind themes will fail, etc, if the css variables are not applied to `::backdrop`.
	 *
	 * Using a div ends up easier to setup.
	 *
	 * The default is now false.
	 */
	useDialogForBackdrop?: false
	/** Wether to use a backdrop (clicking it will close the popup), or not (use is allowed to click elsewhere. */
	useBackdrop?: boolean
	/**
	 * The preferred horizontal positioning of the popup. The first position in the array to fit is used.
	 *
	 * All elements need to have box-sizing: border-box set. Also note that while the component should work with dynamic popup sizes, in practice there's issues with the positioning being slightly off. Giving the popup element a static size is better. If you need margins around the popup, this can be done with a wrapper element + padding.
	 *
	 * The positions `right`/`left`/`top`/`bottom` are relative to the opposite side of the button element so as to try not to cover the triggering button.
	 *
	 * So positioning `right` and `left` look like this:
	 *
	 * ```
	 * // right
	 *         [button]
	 *         [----popup----]
	 *
	 * // left
	 *         [button]
	 *  [----popup----]
	 * ```
	 *
	 * Positions `*-most` try to position the popup as close to that side of the screen as possible, otherwise limiting the popup to that edge. For example:
	 *
	 * ```
	 * [--------------screen---------------]
	 * // right-most
	 *           [button]
	 *                   [----popup----]
	 * // near the edge:
	 *                 [button]
	 *                      [----popup----]
	 * ```
	 *
	 * There is also the `center-screen` position, which centers the popup on the screen.
	 *
	 * These last two (`*-most` and `center-screen`) are greedy, they will always find a position that fits. Positions listed after are ignored.
	 *
	 * You can also specify a function instead which is given some additional information regarding the space around the button reference element. It should a number for the x position (or y, if preferredVertical).
	 *
	 * If you only need to slightly modify	the position, you can use the `modifyPosition` option instead.
	 */
	preferredHorizontal?: ("center" | "right" | "left" | "either" | "center-screen" | "right-most" | "left-most" | "center-most")[] | PopupPositioner
	/** See `preferredHorizontal`. */
	preferredVertical?: ("top" | "bottom" | "center" | "either" | "center-screen" | "top-most" | "bottom-most" | "center-most")[] | PopupPositioner
	/**
	 * When the user scrolls or resizes, normally the entire popup position is recomputed, taking into account the preferred positioning.
	 *
	 * This can cause it to shift around.
	 *
	 * Set this to true to only shift the popup depending on how much the button element moved and avoid recalculating the best position.
	 */
	avoidRepositioning?: boolean
	/**
	 * Allows modifying the calculated position, to for example, clamp it.
	 */
	modifyPosition?: PopupPositionModifier
}

interface Props
	extends
	/** @vue-ignore */
	Partial<Omit<HTMLAttributes,"class"> & TailwindClassProp>,
	RealProps { }
</script>
