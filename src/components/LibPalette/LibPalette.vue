<template>
	<div :class="classes">
		<div class="row" v-for="hue, name of config.hues.value" :key="name">
			<div class="name">
				{{ name }}
			</div>
			<div class="swatches">
				<div
					:title="getHsl(hue, i)"
					class="swatch"
					:style="`background: ${getHsl(hue,i)};`"
					v-for="i in config.steps"
					:key="i"
				/>
			</div>
		</div>
		<lib-debug>
			{
			<template v-for="hue, name of config.hues.value" :key="name">
				<template
					v-for="i in config.steps"
					:key="i"
				>
					<!-- {{`--c${name.charAt(0).toUpperCase() + name.slice(1)}${i}: ${getHSL(hue,i)};\n`}} -->
					{{ `c${name.charAt(0).toUpperCase() + name.slice(1)}${i}: "${getHsl(hue,i)}",\n` }}
				</template>
			</template>
			}
		</lib-debug>
	</div>
</template>

<script lang="ts">

export default {
	name: "lib-palette",
}
</script>

<script setup lang="ts">
import { computed, PropType } from "vue"

import LibDebug from "../LibDebug/LibDebug.vue"


const props = defineProps({
	/** The id for the input. Uses vue's uid (`getCurrentInstance().uid`) if none provided. */
	background: { type: String as PropType<string>, required: false, default: "white" },
	config: {
		type: Object as PropType<Config>,
		required: false,
		default: () => {
			const config: Config = {
				steps: 10,
				luminance: {
					value: 50,
					amount: 9,
					upperVarianceAmount: 2,
					upperVarianceStep: 3,
					lowerVarianceAmount: -1,
					lowerVarianceStep: 3,
				},
				saturation: {
					value: 70,
					amount: -1,
					upperVarianceAmount: 2,
					upperVarianceStep: 3,
					lowerVarianceAmount: 15,
					lowerVarianceStep: 3,
				},
				hues: {
					upperVarianceAmount: -0.5,
					upperVarianceStep: 1,
					lowerVarianceAmount: -0.5,
					lowerVarianceStep: 1,
					value: {
						red: 0,
						pink: 339,
						purple: 272,
						blue: 211,
						cyan: 188,
						green: 100,
						yellow: 39,
						orange: 24,
						gray: -1,
					},
				},
			}
			return config
		},
	},
})


type PartConfig<T = number> = {
	value: T
	amount: number
	upperVarianceAmount: number
	upperVarianceStep: number
	lowerVarianceAmount: number
	lowerVarianceStep: number
}
type Config = {
	steps: number
	luminance: PartConfig
	saturation: PartConfig
	hues: Omit<PartConfig<Record<string, number>>, "count" | "amount"> & {
	}
}

const classes = computed(() => ({
	palette: true,
}))

// const range = (start: number, stop: number, step: number) =>
// 	Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + (i * step))


const hueCount = computed(() => Object.keys(props.config.hues.value).length)

const calculateVariant = (value: number, steps: number, step: number, stepAmount: number,
	{
		lowerVarianceAmount,
		upperVarianceStep,
		upperVarianceAmount,
		lowerVarianceStep,
	}: Pick<PartConfig, "lowerVarianceAmount" | "upperVarianceStep" | "upperVarianceAmount" | "lowerVarianceStep">,
	reverse: boolean = false,
): number => {
	let highOffset = ((upperVarianceStep - steps) + step) + 1
	let lowOffset = lowerVarianceStep - step
	highOffset = highOffset > 0 ? highOffset : 0
	lowOffset = lowOffset > 0 ? lowOffset : 0
	if (lowOffset > 0 && highOffset > 0) {
		// eslint-disable-next-line no-console
		console.warn("low hue variance step clashes with high hue variance step")
	}

	const amount = ((steps / 2) - step) * stepAmount

	const totalAmount = amount - (lowOffset * lowerVarianceAmount) - (highOffset * upperVarianceAmount)
	const res = value + (reverse ? -totalAmount : totalAmount)
	return res
}
const getHue = (hue: number, step: number): number => calculateVariant(hue, hueCount.value, step, 1, props.config.hues)
const getSat = (step: number): number => calculateVariant(props.config.saturation.value, props.config.steps, step, props.config.saturation.amount, props.config.saturation, true)
const getLum = (step: number): number => calculateVariant(props.config.luminance.value, props.config.steps, step, props.config.luminance.amount, props.config.luminance)

const getHsl = (hue: number, step: number): string =>
	hue >= 0
	? `hsl(${getHue(hue, step - 1)}, ${getSat(step - 1)}%, ${getLum(step - 1)}%)`
	: `hsl(${getHue(hue, step - 1)}, 0%, ${getLum(step - 1)}%)` // gray


const swatchWidth = computed(() => (100) / props.config.steps)


</script>

<style lang="scss" scoped>
.palette {
	@include flex-row(wrap, null, center);
	padding: var(--paddingM);
	background: v-bind(background);
}
.row {
	@include flex(1, 0, 100%);
	@include flex-row(wrap, space-between, center);
}

.name {
	@include flex(1, 0, 100%);
	color:white;
	mix-blend-mode: difference;
}
.swatches {
	@include flex(1, 0, 100%);
	@include flex-row(nowrap, space-between, center);
	border-radius: 5px;
	overflow:hidden;
}

.swatch {
	width: calc(v-bind(swatchWidth) * 1%);
	// margin: 0 var(--paddingM);
	aspect-ratio: 1 / 1;
}
</style>
