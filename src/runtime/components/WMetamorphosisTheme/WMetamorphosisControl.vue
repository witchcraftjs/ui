<template>
<template v-if="isColorType !== null">
	<WPopover
		:root-props="{
			class: `
				metamorphosis-control--popover-root
			`,
			...rootProps
		}"
		:content-props="{
			onInteractOutside: closeColorPopover,
			class: `
					[&_.popover--content-inner]:p-0
					[&_.popover--content-inner]:border-0
					[&_.popover--content-inner]:overflow-none
				`
		}"
		v-model="showColorPopover"
	>
		<template #button>
			<WButton
				:border="false"
				:class="`
					metamorphosis-control--button
					border-transparent
					border-2
					outline-hidden
					focus:border-accent-500
					active:border-accent-500
					hover:border-accent-500
					w-4
					h-4
					rounded-sm
					cursor-pointer
				`"
				:style="`background:${css}`"
				@click="showColorPopover = true"
			/>
		</template>
		<template #popover>
			<WColorPicker
				:allow-alpha="hasAlpha"
				:border="false"
				v-model="colorPickerValue"
				@save="saveColor"
				@cancel="cancelColor"
			>
				<template #buttons/>
			</WColorPicker>
		</template>
	</WPopover>
</template>

<template v-else-if="isNumeric">
	<WNumberInput
		v-model="ref"
	/>
</template>

<template v-else>
	<WSimpleInput
		v-model="ref"
	/>
</template>
</template>

<script setup lang="ts">
import Color from "colorjs.io"
import type { ControlVar } from "metamorphosis/ControlVar"
import type { DialogRootEmits, PopoverRootProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { computed, ref as vueRef, watch } from "vue"

import { useMetamorphosisControlVar } from "../../composables/useMetamorphosisControlVar.js"
import type { EmitsToProps, RgbaColor, TailwindClassProp } from "../../types/index.js"
import WButton from "../WButton/WButton.vue"
import WColorPicker from "../WColorPicker/WColorPicker.vue"
import WNumberInput from "../WNumberInput/WNumberInput.vue"
import WPopover from "../WPopover/WPopover.vue"
import WSimpleInput from "../WSimpleInput/WSimpleInput.vue"

defineOptions({
	name: "WMetamorphosisControl"
})

const props = defineProps<{
	/** The ControlVar instance to control. Not that is it not reactive and does not need to be. Mark it raw if possible. */
	controlVar: ControlVar<any, any>
	rootProps?: PopoverRootProps & EmitsToProps<DialogRootEmits> & Omit<HTMLAttributes, "class"> & TailwindClassProp
}>()

const { ref, css } = useMetamorphosisControlVar(props.controlVar)

/**
 * Detects the color space from the CSS string prefix.
 * css.value is like "rgb(204 51 51)" or "hsl(200deg 70% 50%)".
 */
const isColorType = computed(() => {
	const unitName = css.value.toLowerCase()
	const colorSpaces = ["rgb", "hsl", "hwb", "lch", "oklch", "lab", "oklab"]
	for (const space of colorSpaces) {
		if (unitName.startsWith(space)) {
			return space
		}
	}
	return null
})

const isNumeric = computed(() => {
	return typeof ref.value === "number"
})

const hasAlpha = computed(() => {
	return css.value.includes("/")
})

const showColorPopover = vueRef(false)

/**
 * Converts the native ControlVar value to RgbaColor (0-255) for WColorPicker.
 * For RGB: ref.value stores 0-255 directly, just read it.
 * For other spaces: build a Color from native coords, read .srgb for 0-255 output.
 */
const currentRgba = computed((): RgbaColor => {
	const space = isColorType.value
	const result: RgbaColor = (() => {
		if (space === null) {
			return { r: 0, g: 0, b: 0, a: undefined }
		}
		const v = ref.value as Record<string, number | undefined>

		if (space === "rgb") {
			return {
				r: Math.round(v.r ?? 0),
				g: Math.round(v.g ?? 0),
				b: Math.round(v.b ?? 0),
				a: v.a
			}
		}

		// Build Color from native space coords, read .srgb (0-1 normalized sRGB array)
		let coords: [number, number, number]
		let alpha: number | undefined
		if (space === "hsl") {
			coords = [v.h ?? 0, v.s ?? 0, v.l ?? 0]
			alpha = v.a
		} else if (space === "hwb") {
			coords = [v.h ?? 0, v.w ?? 0, v.b ?? 0]
			alpha = v.a
		} else if (space === "lch" || space === "oklch") {
			coords = [v.l ?? 0, v.c ?? 0, v.h ?? 0]
			alpha = v.a
		} else if (space === "lab" || space === "oklab") {
			coords = [v.l ?? 0, v.a ?? 0, v.b ?? 0]
			alpha = v.A
		} else {
			coords = [0, 0, 0]
			alpha = undefined
		}

		const color = new Color(space, coords, alpha ?? 1)
		const rgb = color.srgb
		return {
			r: Math.round((rgb[0] ?? 0) * 255),
			g: Math.round((rgb[1] ?? 0) * 255),
			b: Math.round((rgb[2] ?? 0) * 255),
			a: color.alpha
		}
	})()
	return result
})

const colorPickerValue = vueRef<RgbaColor>({ ...currentRgba.value })

function saveColor(val: RgbaColor) {
	setColorFromRgba(val)
	showColorPopover.value = false
}

function cancelColor() {
	showColorPopover.value = false
}

function closeColorPopover() {
	showColorPopover.value = false
}

/** Converts RgbaColor (0-255) back to native ControlVar value and sets it via ref. */
function setColorFromRgba(val: RgbaColor) {
	const space = isColorType.value!
	if (space === "rgb") {
		ref.value = {
			r: val.r,
			g: val.g,
			b: val.b,
			a: val.a
		}
	} else {
		const color = new Color("srgb", [val.r / 255, val.g / 255, val.b / 255], val.a ?? 1)
		const converted = color.to(space)
		const coords = converted.coords as [number | null, number | null, number | null]
		const c = [
			coords[0] ?? 0,
			coords[1] ?? 0,
			coords[2] ?? 0
		] as [number, number, number]
		const result: Record<string, number | undefined> = {}

		if (space === "hsl") {
			result.h = c[0]
			result.s = c[1]
			result.l = c[2]
		} else if (space === "hwb") {
			result.h = c[0]
			result.w = c[1]
			result.b = c[2]
		} else if (space === "lch" || space === "oklch") {
			result.l = c[0]
			result.c = c[1]
			result.h = c[2]
		} else if (space === "lab" || space === "oklab") {
			result.l = c[0]
			result.a = c[1]
			result.b = c[2]
		}

		if (val.a !== undefined) {
			result[space === "lab" || space === "oklab" ? "A" : "a"] = val.a
		}

		ref.value = result
	}
}

watch(currentRgba, () => {
	colorPickerValue.value = { ...currentRgba.value }
})
</script>
