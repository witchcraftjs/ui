<template>
<div :id="id ?? fallbackId"
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
		`
	)"
>
	<div
		:class="`picker
			no-touch-action
			w-full
			aspect-square
			relative
			flex
			rounded-sm
			focus:border-accent-500
		`"
		@pointerdown="slider.pointerdown($event, 'picker')"
		@pointerleave="slider.pointerleave($event)"
	>
		<canvas
			class="size-full shadow-xs shadow-black/50 rounded-sm"
			ref="pickerEl"
		/>
		<div
			aria-live="assertive"
			:aria-description="ariaDescription"
			:class="`
					handle ${handleClasses}
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
			@keydown="slider.keydown($event, 'picker')"
		>
			<aria :value="`${t('color-picker.aria.saturation')}: ${localColor.percent.s}, ${t('color-picker.aria.value')}: ${localColor.percent.s}`"/>
		</div>
	</div>
	<div
		:class="`hue-slider ${sliderClasses}`"
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
			:class="`handle ${handleClasses} bg-neutral-50`"
			:style="`left: calc(${localColor.percent.h}% - var(--slider-size)/2)`"
			@keydown="slider.keydown($event, 'hue')"
		/>
	</div>
	<div
		v-if="allowAlpha"

		:class="`alpha-slider ${sliderClasses}`"
		@keydown="slider.keydown($event, 'alpha')"
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
			:class="`handle ${handleClasses} bg-neutral-50`"
			:style="`left: calc(${localColor.percent.a}% - var(--slider-size)/2)`"
		/>
	</div>
	<div class="color-group flex w-full flex-1 gap-2">
		<div class=" color-wrapper
				bg-transparency-squares
				relative
				aspect-square
				h-[calc(var(--slider-size)*3)]
				rounded-full
				shadow-xs
			"
		>
			<!-- <input class="color-input" :value="localColorString" @input="parseInput"> -->
			<div class="color
					size-full
					rounded-full
					border-2
					border-neutral-600
					dark:border-neutral-300
				"
				:style="`background: ${asRgbaString}`"
			/>
		</div>
		<div class="color-controls flex flex-1 items-center gap-2">
			<slot name="input">
				<lib-simple-input
					class="w-full"
					:aria-label="label"
					v-model="localInputString"
					@input="parseInput"
					@blur="onBlurFixInvalidValue"
				/>
				<lib-button :aria-label="t('copy')" @click="copy()">
					<icon><i-fa6-regular-copy/></icon>
				</lib-button>
			</slot>
		</div>
		<!-- <lib-button @click="emits('update:modelValue', localColor.val)">Save</lib-button> -->
	</div>
	<slot name="buttons">
		<div class="save-cancel-group flex w-full items-center justify-center gap-2">
			<lib-button @click="save()">{{ t("save") }}</lib-button>
			<lib-button @click="emits('cancel')">{{ t("cancel") }}</lib-button>
		</div>
	</slot>
</div>
</template>

<script setup lang="ts">
/* todo change to colorjsio for less dependencies */
import { castType } from "@alanscodelog/utils/castType.js"
import { clampNumber } from "@alanscodelog/utils/clampNumber.js"
import { isArray } from "@alanscodelog/utils/isArray.js"
import { unreachable } from "@alanscodelog/utils/unreachable.js"
import Color from "colorjs.io"
import { computed, onMounted, type PropType, reactive, type Ref, ref, type UnwrapRef,watch } from "vue"

import { useInjectedI18n } from "../../composables/useInjectedI18n.js"
import type { HsvaColor, RgbaColor } from "../../types/index.js"
import { twMerge } from "../../utils/twMerge.js"
import aria from "../Aria/Aria.vue"
import Icon from "../Icon/Icon.vue"
import LibButton from "../LibButton/LibButton.vue"
import LibSimpleInput from "../LibSimpleInput/LibSimpleInput.vue"
import { getFallbackId, type LabelProps , type LinkableByIdProps } from "../shared/props.js"

defineOptions({
	name: "lib-color-picker",
})

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


const ariaDescription = t("color-picker.aria.description")

const $value = defineModel<RgbaColor>({ required: false, default: () => ({ r: 0, g: 0, b: 0 }) })

const fallbackId = getFallbackId()
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
	 *
	 *
	 *
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
}>(), {
	allowAlpha: true,
	border: true,
	stringPrecision: 3,
	copyTransform: (_val: HsvaColor, stringVal: string) => stringVal,
	customRepresentation: undefined
})


const emits = defineEmits<{
	(e: "save", val: RgbaColor): void
	(e: "cancel"): void
}>()

const pickerEl = ref<HTMLCanvasElement | null>(null)
const hueSliderEl = ref<HTMLCanvasElement | null>(null)
const alphaSliderEl = ref<HTMLCanvasElement | null>(null)

type Config = Record<string, { el: Ref<HTMLCanvasElement>, xKey?: keyof HsvaColor, yKey?: keyof HsvaColor, xSteps?: number, ySteps?: number }>
const config: Config = {
	hue: {
		el: hueSliderEl as Ref<HTMLCanvasElement>,
		xKey: "h",
		xSteps: 360,
	},
	alpha: {
		el: alphaSliderEl as Ref<HTMLCanvasElement>,
		xSteps: 1,
		xKey: "a",
	},
	picker: {
		el: pickerEl as Ref<HTMLCanvasElement>,
		xSteps: 100,
		ySteps: 100,
		xKey: "s",
		yKey: "v",
	},
}
const localColor = reactive<Record<"percent" | "val", HsvaColor>>({
	percent: {
		h: 0, s: 0, v: 0, a: 0,
	},
	val: {
		h: 0, s: 0, v: 0, a: 0,
	},
})

function truncate(val: number, precision: number): string {
	const str = val.toFixed(precision)
	const float = parseFloat(str) // removes trailing zeros
	return float.toString()
}
function toLowPrecisionRgbaString(rgba: RgbaColor, withAlpha: boolean, precision: number) {
	const r = truncate(rgba.r, precision)
	const g = truncate(rgba.g, precision)
	const b = truncate(rgba.b, precision)
	const a = rgba.a !== undefined
		? truncate(rgba.a, precision)
		: undefined
	return withAlpha ? `rgba(${r}, ${g}, ${b}, ${a})` : `rgb(${r}, ${g}, ${b})`
}


const asRgba = computed(() => {
	const rgba = safeConvertToRgba(localColor.val)
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

watch(localColor, () => {
	localInputString.value = localColorString.value
})

const copy = (): void => {
	if (navigator.clipboard) {
		const text = props.copyTransform?.(localColor.val, localColorString.value)
		navigator.clipboard.writeText(text).catch(() => { })
	}
}

const updatePicker = (el: HTMLCanvasElement, hue: number): void => {
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

const updateSlider = (el: HTMLCanvasElement, stops: ((i: number) => string) | string[], length: number = 360): void => {
	const ctx = el.getContext("2d")!
	const { height, width } = el// .getBoundingClientRect()
	ctx.clearRect(0, 0, width, height)

	const end = isArray(stops) ? stops.length - 1 : length

	const gradient = ctx.createLinearGradient(0, 0, width, 0)

	for (let i = 0; i < end + 1; i++) {
		const stop = stops instanceof Function ? stops(i) : stops[i]
		gradient.addColorStop(i / end, stop)
	}

	ctx.fillStyle = gradient
	ctx.fillRect(0, 0, width, height)
}


const getVal = (x: number, width: number, steps: number = 100, accuracy: number = 100, reverse = false): { val: number, percent: number } => {
	// const stepWidth = width / (steps * accuracy)
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

const moveHandle = (e: { clientX: number, clientY: number }, type: string) => {
	const el = config[type].el.value
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
}
const slider = {
	keydown: (e: KeyboardEvent, type: Types) => {
		castType<HTMLElement | undefined>(e.target)
		if (e.target?.getBoundingClientRect && ["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown"].includes(e.key)) {
			e.preventDefault()
			const { x, y, width, height } = e.target.getBoundingClientRect()
			let xDiff = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0
			let yDiff = e.key === "ArrowUp" ? -1 : e.key === "ArrowDown" ? 1 : 0
			if (e.shiftKey) {xDiff *= 10}
			if (e.shiftKey) {yDiff *= 10}
			moveHandle({ clientX: x + (width / 2) + xDiff, clientY: y + (height / 2) + yDiff }, type)
		}
	},
	pointerdown: (e: PointerEvent, type: Types) => {
		if (dragging) return
		e.preventDefault()
		elDragging.value = type
		dragging = true
		document.addEventListener("pointermove", slider.pointermove)
		document.addEventListener("pointerup", slider.pointerup)
	},
	pointerleave: (e: PointerEvent) => {
		if (dragging) {
			e.preventDefault()
		}
	},
	pointermove: (e: PointerEvent) => {
		if (dragging) {
			e.preventDefault()
			requestAnimationFrame(() => {
				const type = elDragging.value
				moveHandle(e, type)
			})
		}
	},
	pointerup: (e: PointerEvent) => {
		e.preventDefault()
		elDragging.value = ""
		dragging = false
		document.removeEventListener("pointermove", slider.pointermove)
		document.removeEventListener("pointerup", slider.pointerup)
	},
}
const update = (_: HsvaColor, {
	updatePosition = true,
	updateValue = true,
}: {
	updatePosition?: boolean
	updateValue?: boolean
} = {}): void => {
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
	if (updatePosition) {
		localColor.percent.h = Math.round((_.h / 360) * 10000) / 100
		localColor.percent.s = _.s
		localColor.percent.v = 100 - _.v
		localColor.percent.a =
			props.allowAlpha
			? _.a !== undefined
				? _.a * 100
				: 1
			: 1
	}
	if (updateValue) {
		localColor.val = { ..._, a: props.allowAlpha ? _.a : 1 }
	}
}

const parseInput = (e: Event): void => {
	const val = (e.target as HTMLInputElement)?.value
	const converted = props.customRepresentation?.fromStringToHsva
		? props.customRepresentation.fromStringToHsva(val)
		: safeConvertToHsva(val)
	if (converted) update(converted, { updateValue: true, updatePosition: true })
}

function safeConvertToHsva(val: string | RgbaColor): HsvaColor | undefined {
	try {
		const color = typeof val === "string"
			? new Color(val)
			: new Color("srgb", [val.r / 255, val.g / 255, val.b / 255], props.allowAlpha ? val.a : 1)
		const hsv = color.hsv
		const final = {
			h: clampNumber(hsv[0] ?? 0, 0, Number.MAX_SAFE_INTEGER),
			s: clampNumber(hsv[1], 0, 100),
			v: clampNumber(hsv[2], 0, 100),
			a: clampNumber(props.allowAlpha ? color.alpha : 1, 0, 1),
		}
		return final
	} catch (_err) {
		return undefined
	}
}

function safeConvertToRgba(val: string | HsvaColor): RgbaColor | undefined {
	try {
		const color = typeof val === "string"
			? new Color(val)
			: new Color("hsv", [val.h, val.s, val.v], props.allowAlpha ? val.a : 1)
		const rgb = color.srgb
		return {
			r: clampNumber(rgb[0] / 1 * 255, 0, 255),
			g: clampNumber(rgb[1] / 1 * 255, 0, 255),
			b: clampNumber(rgb[2] / 1 * 255, 0, 255),
			a: clampNumber(props.allowAlpha ? color.alpha : 1, 0, 1),
		}
	} catch (_err) {
		return undefined
	}
}

onMounted(() => {
	const hsva = safeConvertToHsva($value.value)
	if (hsva) update(hsva)
})

watch(props, () => {
	const hsva = safeConvertToHsva($value.value)
	if (hsva) update(hsva)
})

watch(localColor, () => {
	update(localColor.val, { updatePosition: false, updateValue: false })
})

const save = (): void => {
	const rgba = safeConvertToRgba(localColor.val)
	if (!rgba) return
	update(localColor.val, { updatePosition: false, updateValue: false })
	$value.value = rgba
	emits("save", rgba)
}

const invertColors = computed(() => !!(localColor.percent.v < 50 || (localColor.val.a === undefined || localColor.val.a < 0.5)))
</script>
