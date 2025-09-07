<template>
<div
	:id="id ?? fallbackId"
	:aria-label="t('color-picker.aria')"
	:class="twMerge(`color-picker
			[--slider-size:calc(var(--spacing)_*_4)]
			[--contrast-dark:var(--color-neutral-100)]
			[--contrast-light:var(--color-neutral-800)]
			[--fg:rgb(var(--contrast-dark))]
			[--bg:rgb(var(--contrast-light))]
			max-w-[300px]
			flex flex-col items-center justify-center
			bg-neutral-50
			dark:bg-neutral-950
			gap-3
			p-3
		`,
		invertColors && `
			[--fg:rgb(var(--contrast-light))]
			[--bg:rgb(var(--contrast-dark))]
		`,
		border && `
			border rounded-sm border-neutral-600
		`,
		($attrs as any)?.class
	)"
>
	<div
		:class="`color-picker--all-picker
			no-touch-action
			w-full
			aspect-square
			relative
			flex
			rounded-sm
			focus:border-accent-500
		`"
		@pointerdown="slider.pointerdown($event, 'all')"
		@pointerleave="slider.pointerleave($event)"
	>
		<canvas
			class="size-full shadow-xs shadow-black/50 rounded-sm"
			ref="pickerEl"
		/>
		<div
			aria-live="assertive"
			:aria-description="ariaDescription"
			:aria-label="`${t('color-picker.aria.saturation')}: ${localColor.percent.s}, ${t('color-picker.aria.value')}: ${localColor.percent.s}`"
			:class="`
					color-picker--all-handle
					${handleClasses}
					border-[var(--fg)]
					hover:shadow-black
					active:shadow-black
				`"
			tabindex="0"
			:style="`
					left: calc(${localColor.percent.s}% - var(--slider-size)/2);
					top: calc(${localColor.percent.v}% - var(--slider-size)/2);
					background: ${asRgbaString};
				`"
			@keydown="slider.keydown($event, 'all')"
		/>
	</div>
	<div
		:class="`color-picker--hue-slider ${sliderClasses}`"
		@pointerdown="slider.pointerdown($event, 'hue')"
	>
		<canvas
			class="size-full shadow-xs shadow-black/50 rounded-sm"
			ref="hueSliderEl"
		/>
		<div
			role="slider"
			:aria-valuenow="`${localColor.percent.h}`"
			:aria-valuemin="0"
			:aria-valuemax="100"
			:aria-label="t('color-picker.aria.hue')"
			:aria-description="ariaDescription"
			tabindex="0"
			:class="`
				color-picker--hue-handle
				${handleClasses}
			`"
			:style="`left: calc(${localColor.percent.h}% - var(--slider-size)/2)`"
			@keydown="slider.keydown($event, 'hue')"
		/>
	</div>
	<div
		v-if="allowAlpha"

		:class="`
			color-picker--alpha-slider
			${sliderClasses}
		`"
		@pointerdown="slider.pointerdown($event, 'alpha')"
	>
		<canvas
			class="size-full shadow-xs shadow-black/50 rounded-sm bg-transparency-squares"
			ref="alphaSliderEl"
		/>
		<div
			role="slider"
			:aria-label="t('color-picker.aria.alpha-slider')"
			:aria-valuenow="`${localColor.percent.h}`"
			:aria-valuemin="0"
			:aria-valuemax="100"
			:aria-description="ariaDescription"
			tabindex="0"
			:class="`color-picker--alpha-handle ${handleClasses}`"
			:style="`left: calc(${localColor.percent.a}% - var(--slider-size)/2)`"
			@keydown="slider.keydown($event, 'alpha')"
		/>
	</div>
	<div class="color-picker--footer flex w-full flex-1 gap-2">
		<div
			class=" color-picker--preview-wrapper
				bg-transparency-squares
				relative
				aspect-square
				h-[calc(var(--slider-size)*3)]
				rounded-full
				shadow-xs
			"
		>
			<div
				class="
					color-picker--footer--preview
					size-full
					rounded-full
					border-2
					border-neutral-600
					dark:border-neutral-300
				"
				:style="`background: ${asRgbaString}`"
			/>
		</div>
		<div class="color-picker--input-group flex flex-1 items-center gap-2">
			<slot name="input">
				<lib-simple-input
					:valid="valid"
					class="color-picker--input w-full"
					:aria-label="label"
					v-model="localInputString"
					@input="parseInput"
					@blur="onBlurFixInvalidValue"
				/>
				<lib-button
					class="color-picker--copy-button"
					:aria-label="t('copy')"
					@click="copy(copyTransform?.(localColor.val, localColorString) ?? localColorString)"
				>
					<icon><i-fa6-regular-copy/></icon>
				</lib-button>
			</slot>
		</div>
	</div>
	<slot name="buttons">
		<div class="color-picker--save-cancel-group flex w-full items-center justify-center gap-2">
			<lib-button
				class="color-picker--save-button"
				@click="save()"
			>
				{{ t("save") }}
			</lib-button>
			<lib-button
				class="color-picker--cancel-button"
				@click="emits('cancel')"
			>
				{{ t("cancel") }}
			</lib-button>
		</div>
	</slot>
</div>
</template>

<script setup lang="ts">
/* todo change to colorjsio for less dependencies */
import { castType } from "@alanscodelog/utils/castType"
import { isArray } from "@alanscodelog/utils/isArray"
import { unreachable } from "@alanscodelog/utils/unreachable"
import Color from "colorjs.io"
import { computed, onMounted, reactive, type Ref, ref, type UnwrapRef, useAttrs, watch } from "vue"

import { safeConvertToHsva } from "./utils/safeConvertToHsva.js"
import { safeConvertToRgba } from "./utils/safeConvertToRgba.js"
import { toLowPrecisionRgbaString } from "./utils/toLowPrecisionRgbaString.js"

import IFa6RegularCopy from "~icons/fa-regular/copy"

import { useInjectedI18n } from "../../composables/useInjectedI18n.js"
import { copy } from "../../helpers/copy.js"
import type { HsvaColor, RgbaColor } from "../../types/index.js"
import { twMerge } from "../../utils/twMerge.js"
import Icon from "../Icon/Icon.vue"
import LibButton from "../LibButton/LibButton.vue"
import LibSimpleInput from "../LibSimpleInput/LibSimpleInput.vue"
import { getFallbackId, type LabelProps, type LinkableByIdProps } from "../shared/props.js"

defineOptions({
	name: "LibColorPicker"
})

const $attrs = useAttrs()

const t = useInjectedI18n()

const sliderClasses = `
	slider
	no-touch-action
	h-4
	w-full
	relative
	flex
`

const handleClasses = `
	handle
	h-[var(--slider-size)]
	w-[var(--slider-size)]
	shadow-xs
	shadow-black/50
	border-2 border-neutral-700
	rounded-full
	absolute
	cursor-pointer
	outline-hidden
	focus:border-accent-500
	active:border-accent-500
	hover:border-accent-500
`
const emits = defineEmits<{
	(e: "save", val: RgbaColor): void
	(e: "cancel"): void
}>()

const props = withDefaults(defineProps<
	LabelProps
	& LinkableByIdProps
	& {
		allowAlpha?: boolean
		/**
		 * The precision of the rgba string representation of the color. Defaults to 3. Extra trailing zeros are removed for a prettier number.
		 *
		 * Does not affect the number saved unless the user manually edits the color.
		 *
		 * Ignored if `customRepresentation` is set.
		 */
		stringPrecision?: number
		/** Allows overriding the string representation of the color. Useful for using a different representation than rgba (e.g. hex). The fromStringToHsva part is rarely needed as the colorjs.io library can normally parse the color. Returning undefined signals an error. */
		customRepresentation?: {
			fromHsvaToString: (hsva: HsvaColor, includeAlpha: boolean) => string
			fromStringToHsva?: (string: string) => HsvaColor | undefined
		}
		border?: boolean
		/** Modify what the user copies to the clipboard. */
		copyTransform?: (val: HsvaColor, stringVal: string) => any
		valid?: boolean
	}>(), {
	allowAlpha: true,
	border: true,
	stringPrecision: 3,
	copyTransform: (_val: HsvaColor, stringVal: string) => stringVal,
	customRepresentation: undefined,
	valid: true
})

const ariaDescription = t("color-picker.aria.description")
const fallbackId = getFallbackId()

const $value = defineModel<RgbaColor>({ required: false, default: () => ({ r: 0, g: 0, b: 0 }) })
const $tempValue = defineModel<RgbaColor | undefined>("tempValue", { required: false, default: () => (undefined) })

const pickerEl = ref<HTMLCanvasElement | null>(null)
const hueSliderEl = ref<HTMLCanvasElement | null>(null)
const alphaSliderEl = ref<HTMLCanvasElement | null>(null)

type Config = Record<string, {
	el: Ref<HTMLCanvasElement>
	xKey?: keyof HsvaColor
	yKey?: keyof HsvaColor
	xSteps?: number
	ySteps?: number
}>

const config: Config = {
	hue: {
		el: hueSliderEl as Ref<HTMLCanvasElement>,
		xKey: "h",
		xSteps: 360
	},
	alpha: {
		el: alphaSliderEl as Ref<HTMLCanvasElement>,
		xSteps: 1,
		xKey: "a"
	},
	all: {
		el: pickerEl as Ref<HTMLCanvasElement>,
		xSteps: 100,
		ySteps: 100,
		xKey: "s",
		yKey: "v"
	}
}

const localColor = reactive<Record<"percent" | "val", HsvaColor>>({
	percent: {
		h: 0, s: 0, v: 0, a: 0
	},
	val: {
		h: 0, s: 0, v: 0, a: 0
	}
})

const asRgba = computed(() => {
	const rgba = safeConvertToRgba(localColor.val, props.allowAlpha)
	if (!rgba) unreachable()
	return rgba
})
const asRgbaString = computed(() => {
	const rgba = asRgba.value
	if (!rgba) unreachable()
	return `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`
})
const localColorString = computed(() => {
	if (props.customRepresentation) {
		return props.customRepresentation.fromHsvaToString({ ...localColor.val }, props.allowAlpha)
	}
	return toLowPrecisionRgbaString(asRgba.value, props.allowAlpha, props.stringPrecision)
})

const localInputString = ref(localColorString.value)
// fixes the localInputString not updating when the user inputs an invalid value
function onBlurFixInvalidValue() {
	if (localInputString.value !== localColorString.value) {
		localInputString.value = localColorString.value
	}
}

function updatePicker(el: HTMLCanvasElement, hue: number): void {
	const ctx = el.getContext("2d")!
	const { height, width } = el
	ctx.clearRect(0, 0, width, height)

	const gradient = ctx.createLinearGradient(0, 0, 0, height)
	gradient.addColorStop(0, "white")
	gradient.addColorStop(1, "black")
	const gradientColor = ctx.createLinearGradient(0, 0, width, 0)
	gradientColor.addColorStop(0, `hsla(${hue} 100% 50% / 0)`)
	gradientColor.addColorStop(1, `hsla(${hue} 100% 50% /1)`)

	ctx.fillStyle = gradient
	ctx.fillRect(0, 0, width, height)
	ctx.fillStyle = gradientColor
	ctx.globalCompositeOperation = "multiply"
	ctx.fillRect(0, 0, width, height)
	ctx.globalCompositeOperation = "source-over"
}

function updateSlider(el: HTMLCanvasElement, stops: ((i: number) => string) | string[], length: number = 360): void {
	const ctx = el.getContext("2d")!
	const { height, width } = el
	ctx.clearRect(0, 0, width, height)

	const end = isArray(stops) ? stops.length - 1 : length

	const gradient = ctx.createLinearGradient(0, 0, width, 0)

	for (let i = 0; i < end + 1; i++) {
		const stop = stops instanceof Function ? stops(i) : stops[i]
		if (stop === undefined) unreachable()
		gradient.addColorStop(i / end, stop)
	}

	ctx.fillStyle = gradient
	ctx.fillRect(0, 0, width, height)
}

function getVal(x: number, width: number, steps: number = 100, accuracy: number = 100, reverse = false): { val: number, percent: number } {
	const percent = (x / width)
	const unrounded = percent * steps

	const val = Math.round(unrounded * accuracy) / accuracy
	const percentVal = steps === accuracy ? val : Math.round(percent * 100 * accuracy) / accuracy
	const res = { val, percent: percentVal }
	if (reverse) res.val = steps - val
	return res
}

type Types = keyof UnwrapRef<Config>
const elDragging = ref<Types | "">("")
let dragging = false

function moveHandle(e: { clientX: number, clientY: number }, type: string) {
	requestAnimationFrame(() => {
		if (type === "") return
		const el = config[type]?.el.value
		if (!el || !config[type]) return
		const { x, y, width, height } = el.getBoundingClientRect()

		const info = config[type]
		if (info.xKey !== undefined) {
			let newPosX = e.clientX - x
			newPosX = newPosX < 0 ? 0 : newPosX > width ? width : newPosX
			const newX = getVal(newPosX, width, info.xSteps ?? 100)

			localColor.percent[info.xKey] = newX.percent
			localColor.val[info.xKey] = newX.val
		}

		if (info.yKey !== undefined) {
			let newPosY = e.clientY - y
			newPosY = newPosY < 0 ? 0 : newPosY > height ? height : newPosY
			const newY = getVal(newPosY, height, info.ySteps ?? 100, 100, true)

			localColor.percent[info.yKey] = newY.percent
			localColor.val[info.yKey] = newY.val
		}
	})
}
const slider = {
	keydown: (e: KeyboardEvent, type: Types) => {
		castType<HTMLElement | undefined>(e.target)
		if (e.target?.getBoundingClientRect) {
			if (["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown"].includes(e.key)) {
				e.preventDefault()
				const { x, y, width, height } = e.target.getBoundingClientRect()
				let xDiff = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0
				let yDiff = e.key === "ArrowUp" ? -1 : e.key === "ArrowDown" ? 1 : 0
				if (e.shiftKey) { xDiff *= 10 }
				if (e.shiftKey) { yDiff *= 10 }
				moveHandle({ clientX: x + (width / 2) + xDiff, clientY: y + (height / 2) + yDiff }, type)
			}
			if (e.key === "Enter") {
				e.preventDefault()
				save()
			}
		}
	},
	pointerdown: (e: PointerEvent, type: Types) => {
		const focusTargetClass = `#${props.id ?? fallbackId} .color-picker--${type}-handle`
		const focusTarget = document.querySelector(focusTargetClass)
		// allows enter to work when the user drags any slider as the even will be captured by the keydown listener
		if (focusTarget instanceof HTMLElement) focusTarget.focus()

		if (dragging) return
		e.preventDefault()
		elDragging.value = type
		dragging = true
		document.addEventListener("pointermove", slider.pointermove)
		document.addEventListener("pointerup", slider.pointerup)
		moveHandle(e, elDragging.value)
	},
	pointerleave: (e: PointerEvent) => {
		if (dragging) {
			e.preventDefault()
		}
	},
	pointermove: (e: PointerEvent) => {
		e.preventDefault()
		moveHandle(e, elDragging.value)
	},
	pointerup: (e: PointerEvent) => {
		e.preventDefault()
		dragging = false
		elDragging.value = ""
		document.removeEventListener("pointermove", slider.pointermove)
		document.removeEventListener("pointerup", slider.pointerup)
	}
}
function updateSliders(_: HsvaColor): void {
	if (alphaSliderEl.value) {
		// https://colorjs.io/docs/output#get-a-displayable-css-color-value
		const color = new Color("hsv", [_.h, _.s, _.v], _.a).to("hsl")
		const hsl0 = color.clone()
		hsl0.alpha = 0
		const hsl1 = color.clone()
		hsl1.alpha = 1
		updateSlider(alphaSliderEl.value, [hsl0.toString(), hsl1.toString()])
	}
	updateSlider(hueSliderEl.value!, i => `hsl(${i} 100% 50%)`)
	updatePicker(pickerEl.value!, _.h)
}

function updateValueAndPosition(_: HsvaColor): void {
	localColor.percent.h = Math.round((_.h / 360) * 10000) / 100
	localColor.percent.s = _.s
	localColor.percent.v = 100 - _.v
	localColor.percent.a
		= props.allowAlpha
			? _.a !== undefined
				? _.a * 100
				: 1
			: 1
	localColor.val = { ..._, a: props.allowAlpha ? _.a : 1 }
}

function convertAndUpdateAll(rgba: RgbaColor) {
	const hsva = safeConvertToHsva(rgba, props.allowAlpha)
	if (!hsva) return
	updateSliders(hsva)
	updateValueAndPosition(hsva)
}

function save(): void {
	const rgba = safeConvertToRgba(localColor.val, props.allowAlpha)
	if (!rgba) return
	// update(localColor.val, { updatePosition: false, updateValue: false })
	$value.value = rgba
	$tempValue.value = undefined
	emits("save", rgba)
}

function parseInput(e: Event): void {
	const val = (e.target as HTMLInputElement)?.value
	const converted = props.customRepresentation?.fromStringToHsva
		? props.customRepresentation.fromStringToHsva(val)
		: safeConvertToHsva(val, props.allowAlpha)
	if (converted) {
		updateSliders(converted)
		updateValueAndPosition(converted)
	}
}

let disableUpdateTempValue = false

onMounted(() => {
	convertAndUpdateAll($value.value)
	if ($tempValue.value !== undefined) {
		convertAndUpdateAll($tempValue.value)
	}

	const handle = document.querySelector(`#${props.id ?? fallbackId} .color-picker--all-handle`)
	if (handle instanceof HTMLElement) handle.focus()
})

watch($value, () => {
	convertAndUpdateAll($value.value)
})

watch($tempValue, () => {
	if ($tempValue.value !== undefined) {
		disableUpdateTempValue = true
		convertAndUpdateAll($tempValue.value)
		setTimeout(() => { disableUpdateTempValue = false }, 0)
	}
})

watch(localColor, () => {
	updateSliders(localColor.val)
	localInputString.value = localColorString.value
	if (disableUpdateTempValue) return
	const rgba = safeConvertToRgba(localColor.val, props.allowAlpha)
	if (!rgba) return
	$tempValue.value = rgba
})

const invertColors = computed(() => !!(localColor.percent.v < 50 || (localColor.val.a === undefined || localColor.val.a < 0.5)))
</script>
