<template>
<div
	class="
	metamorphosis-interpolated
	metamorphosis-interpolated--number
	grid
	w-full
	grid-cols-[1fr_auto_min-content]
	items-center
	gap-2
	[--_slider-size:calc(var(--spacing)*_4)]
	[--_chart-size:calc(var(--spacing)*_12)]
"
>
	<!-- Row 1, Col 1 -->
	<!-- unlike color picker, since the handles can control y value, we only need control over min/max values -->
	<div
		class="
			metamorphosis-interpolated--min-max-controls
			flex
			w-full
			gap-2
			justify-between
			[&_.number-input--decrement]:pl-0
			[&_.number-input--increment]:pr-0
		"
	>
		<WNumberInput
			:input-props="{
				placeholder: 'Min',
				class: 'basis-[4ch]'
			}"
			v-model="minValue"
		/>
		<WNumberInput
			:input-props="{
				placeholder: 'Max',
				class: 'basis-[4ch]'
			}"
			v-model="maxValue"
		/>
	</div>

	<!-- Row 1, Col 2 -->
	<div/>

	<!-- Row 1, Col 3 -->
	<div/>

	<!-- Row 2, Col 1 -->
	<div
		class="
			metamorphosis-interpolated--track
			relative
			h-[var(--chart-size,var(--_chart-size))]
			w-full
			rounded-sm
			bg-neutral-200
			dark:bg-neutral-700
		"
		ref="trackEl"
	>
		<svg
			class="absolute inset-0 w-full h-full rounded-sm overflow-hidden"
			viewBox="0 0 100 100"
			preserveAspectRatio="none"
		>
			<polygon
				:points="barChartPoints"
				class="fill-neutral-800 dark:fill-neutral-200"
			/>
		</svg>

		<template
			v-for="(_, index) in values"
			:key="`handle-${index}`"
		>
			<div
				v-if="stops !== undefined || forceDisplayStopHandles"
				role="slider"
				:aria-label="`Stop ${index + 1}`"
				:aria-valuenow="Math.round(getStopPercent(index))"
				:aria-valuemin="0"
				:aria-valuemax="100"
				:tabindex="0"
				:class="`
					metamorphosis-interpolated--handle
					metamorphosis-interpolated--handle-circle
					handle
					absolute
					h-[var(--slider-size,var(--_slider-size))]
					w-[var(--slider-size,var(--_slider-size))]
					cursor-pointer
					rounded-full
					border-2
					shadow-xs
					shadow-black/50
					outline-hidden
					focus:border-accent-500
					active:border-accent-500
					hover:border-accent-500
					translate-y-[50%]
				`"
				:style="handleStyle(index)"
				@pointerdown="onPointerDown($event, index)"
				@keydown="onKeydown($event, index)"
			/>
			<!-- show small line indicators when there are more than 2 values and they're not at either end -->
			<div
				v-else-if="values && values.length >2 && getStopPercent(index) !== 0 && getStopPercent(index) !== 100"
				class="
					handle
					metamorphosis-interpolated--handle
					metamorphosis-interpolated--handle-line
					absolute
					top-1
					bottom-1
					w-0.5
					bg-white
					dark:bg-neutral-300
					shadow-xs
					shadow-black/50
					translate-x-[-1px]
				"
				:style="`left: ${getStopPercent(index)}%`"
			/>
		</template>
	</div>

	<!-- Row 2, Col 2 -->
	<div
		v-if="allowSwitchingStopsMode ?? true"
		class="flex items-center h-3"
	>
		<WButton
			class="metamorphosis-interpolated--add-button"
			aria-label="Add stop"
			:border="false"
			@click="addStop"
		>
			<WIcon><i-lucide-plus/></WIcon>
		</WButton>
	</div>
	<div v-else/>

	<!-- Row 2, Col 3 -->
	<div
		v-if="allowSwitchingStopsMode ?? true"
		class="flex items-center"
	>
		<WButton
			:disabled="(!allowSwitchingStopsMode && (!stops || stops.length <=2)) || (allowSwitchingStopsMode && !stops)"
			class="metamorphosis-interpolated--remove-button"
			aria-label="Remove stop"
			:border="false"
			@click="removeStop"
		>
			<WIcon><i-lucide-minus/></WIcon>
		</WButton>
	</div>
	<div v-else/>

	<!-- Row 3, Col 1 -->
	<div class="metamorphosis-interpolated--bar-chart flex w-full gap-1 h-[var(--slider-size,var(--_slider-size))] items-end">
		<div
			class="flex-1 rounded-sm bg-neutral-800 dark:bg-neutral-200"
			:style="`height: ${bar.height}%`"
			:title="`${key}: ${bar.value}`"
			v-for="(bar, key) in barChart"
			:key="key"
		/>
	</div>

	<!-- Row 3, Col 2 -->
	<div
		v-if="allowModifyingSteps"
		class="flex items-center gap-1"
	>
		<WButton
			class="metamorphosis-interpolated--step-add-button"
			aria-label="Increase steps"
			:border="false"
			@click="incrementSteps"
		>
			<WIcon><i-lucide-plus/></WIcon>
		</WButton>
	</div>
	<div v-else/>

	<!-- Row 3, Col 3 -->
	<div
		v-if="allowModifyingSteps"
		class="flex items-center"
	>
		<WButton
			:disabled="options.steps <= 2"
			class="metamorphosis-interpolated--step-remove-button"
			aria-label="Decrease steps"
			:border="false"
			@click="decrementSteps"
		>
			<WIcon><i-lucide-minus/></WIcon>
		</WButton>
	</div>
	<div v-else/>
</div>
</template>

<script setup lang="ts">
import { ControlVar } from "metamorphosis/ControlVar"
import { computed, onBeforeUnmount, ref } from "vue"

import type { MetamorphosisInterpolatedVarsProps } from "./types.js"

import { useMetamorphosisInterpolatedVars } from "../../composables/useMetamorphosisInterpolatedVars.js"
import WButton from "../WButton/WButton.vue"
import WIcon from "../WIcon/WIcon.vue"
import WNumberInput from "../WNumberInput/WNumberInput.vue"

defineOptions({
	name: "WMetamorphosisInterpolatedNumber"
})

const props = withDefaults(defineProps<MetamorphosisInterpolatedVarsProps>(), {
	allowSwitchingStopsMode: true,
	allowModifyingSteps: true
})

const {
	// avoice using instance directly if at all possible
	instance,
	interpolated,
	value,
	values,
	stops,
	options
} = useMetamorphosisInterpolatedVars(props.interpolatedVars)

const trackEl = ref<HTMLDivElement | null>(null)

const minValue = ref(0)
const maxValue = ref(100)

let dragging = false
let draggingIndex = -1
const lastDraggedIndex = ref(-1)

function getStopPercent(index: number): number {
	const stopsValue = stops.value
	if (stopsValue === undefined) {
		const count = values.value.length
		return (index / (count - 1)) * 100
	}
	return stopsValue[index]! * 100
}

function getNumericValue(cv: ControlVar<any, any>): number {
	const v = cv.value
	return typeof v === "number" ? v : typeof v === "object" && v !== null ? (v._ ?? 0) : 0
}

function setNumericValue(index: number, newValue: number) {
	const cv = values.value[index]
	if (!cv) return
	// Clamp to min/max
	const clamped = Math.max(minValue.value, Math.min(maxValue.value, newValue))
	cv.value = { _: clamped }
}

function handleStyle(index: number) {
	const left = `left: calc(${getStopPercent(index)}% - var(--slider-size,var(--_slider-size))/2)`
	const cv = values.value[index]!
	const numVal = getNumericValue(cv)
	const range = maxValue.value - minValue.value || 1
	const valuePercent = ((numVal - minValue.value) / range) * 100
	const clampedPercent = Math.max(0, Math.min(100, valuePercent))
	const bottomPercent = clampedPercent
	return `${left}; bottom: ${bottomPercent}%`
}

let abortController: AbortController | undefined
function onPointerDown(e: PointerEvent, index: number) {
	if (!stops.value) {
		if (props.forceDisplayStopHandles) {
			addStop() // does not actually add a stop in this situation but will neatly convert to stops
		} else {
			return
		}
	}
	abortController?.abort()
	abortController = new AbortController()
	if (dragging) return
	e.preventDefault()
	dragging = true
	draggingIndex = index
	lastDraggedIndex.value = index
	document.addEventListener("pointermove", onPointerMove, { signal: abortController.signal })
	document.addEventListener("pointerup", onPointerUp, { signal: abortController.signal })
}

function onPointerMove(e: PointerEvent) {
	e.preventDefault()
	if (draggingIndex < 0) return
	const el = trackEl.value
	if (!el) return
	const rect = el.getBoundingClientRect()
	let posX = e.clientX - rect.x
	let posY = e.clientY - rect.y
	posX = Math.max(0, Math.min(rect.width, posX))
	posY = Math.max(0, Math.min(rect.height, posY))
	const xPercent = posX / rect.width
	const yPercent = posY / rect.height

	instance.set("stop", draggingIndex, xPercent)
	draggingIndex = stops.value!.findIndex(s => s === xPercent)

	const range = maxValue.value - minValue.value || 1
	const newValue = maxValue.value - yPercent * range
	setNumericValue(draggingIndex, newValue)
}

function onPointerUp() {
	dragging = false
	draggingIndex = -1
	abortController?.abort()
}

onBeforeUnmount(() => {
	abortController?.abort()
})

function onKeydown(e: KeyboardEvent, index: number) {
	const step = e.shiftKey ? 10 : 1
	if (e.key === "ArrowRight") {
		e.preventDefault()
		moveHandleByStep(index, step)
		lastDraggedIndex.value = index
	} else if (e.key === "ArrowLeft") {
		e.preventDefault()
		moveHandleByStep(index, -step)
		lastDraggedIndex.value = index
	} else if (e.key === "ArrowUp" || e.key === "ArrowDown") {
		e.preventDefault()
		const cv = values.value[index]!
		const range = maxValue.value - minValue.value || 1
		const currentVal = getNumericValue(cv)
		const stepValue = (step / 100) * range
		setNumericValue(index, currentVal + (stepValue * (e.key === "ArrowUp" ? 1 : -1)))
		lastDraggedIndex.value = index
	}
}

function moveHandleByStep(index: number, step: number) {
	const el = trackEl.value
	if (!el) return
	const { width } = el.getBoundingClientRect()
	const currentPercent = getStopPercent(index)
	const currentPx = (currentPercent / 100) * width
	const newPx = Math.max(0, Math.min(width, currentPx + step))
	const newPercent = newPx / width

	instance.set("stop", index, newPercent)
}

function addStop() {
	// in here and removeStop are the only times we use direct instance.set because when the length changes we need to set both and same time and composable can't do that
	if (props.allowSwitchingStopsMode && !stops.value) {
		// switch from stopless to stops without creating a stop
		const count = values.value.length
		instance.set("values-stops", values.value, Array.from({ length: count }, (_, i) => i / (count - 1)))
		return
	}
	const currentValues = values.value
	const midIndex = Math.floor(currentValues.length / 2)

	const prevCv = currentValues[midIndex - 1] ?? currentValues[0]
	const nextCv = currentValues[midIndex] ?? currentValues[currentValues.length - 1]
	const interpolatedValue = options.value.interpolator({
		start: prevCv!,
		end: nextCv!,
		percent: 0.5,
		state: {},
		step: 0,
		totalSteps: 1,
		steps: options.value.steps,
		keyName: "",
		name: instance.name,
		exclude: options.value.exclude,
		roundTo: options.value.roundTo
	})
	const newCv = new ControlVar(prevCv!.unit, interpolatedValue)

	const newValues = [...currentValues.slice(0, midIndex), newCv, ...currentValues.slice(midIndex)]

	let newStops = stops.value
	if (newStops !== undefined) {
		newStops = [...newStops]
		const prevStop = stops.value![midIndex - 1] ?? 0
		const nextStop = stops.value![midIndex] ?? 1
		newStops.splice(midIndex, 0, (prevStop + nextStop) / 2)
	} else {
		// Switch from evenly spaced to custom stops
		const count = newValues.length
		newStops = Array.from({ length: count }, (_, i) => i / (count - 1))
	}

	instance.set("values-stops", newValues, newStops)
	lastDraggedIndex.value = midIndex
}

function removeStop() {
	if ((props.allowSwitchingStopsMode ?? true) && values.value.length <= 2) {
		stops.value = undefined
		return
	}

	const indexToDelete = lastDraggedIndex.value >= 0 ? lastDraggedIndex.value : values.value.length - 1
	const oldLength = values.value.length
	const newValues = [...values.value]
	newValues.splice(indexToDelete, 1)

	let newStops = stops.value
	if (newStops !== undefined) {
		newStops = [...newStops]
		newStops.splice(indexToDelete, 1)
	}

	instance.set("values-stops", newValues, newStops)
	const newLength = newValues.length
	if (indexToDelete === 0) {
		lastDraggedIndex.value = 0
	} else if (indexToDelete === oldLength - 1) {
		lastDraggedIndex.value = Math.max(0, newLength - 1)
	} else {
		const nextIndex = indexToDelete
		if (nextIndex < newLength - 1) {
			lastDraggedIndex.value = nextIndex
		} else {
			lastDraggedIndex.value = Math.max(0, indexToDelete - 1)
		}
	}
}

function incrementSteps() {
	options.value.steps += 1
}

function decrementSteps() {
	if (options.value.steps - 1 <= 1) return
	options.value.steps -= 1
}

const barChart = computed(() => {
	const vals = value.value
	const stringValues = Object.values(interpolated.value)
	const result: Record<string, { height: number, value: string }> = {}
	for (let i = 0; i < vals.length; i++) {
		result[`stop-${i}`] = {
			height: vals[i]!._!,
			value: stringValues[i]!
		}
	}
	return result
})

const barChartPoints = computed(() => {
	const vals = values.value
	if (vals.length === 0) return ""
	const numericVals = vals.map(cv => getNumericValue(cv))
	const range = maxValue.value - minValue.value || 1
	const heights = numericVals.map(v => ((v - minValue.value) / range) * 100)
	const clampedHeights = heights.map(h => Math.max(0, Math.min(100, h)))

	const firstY = 100 - clampedHeights[0]!
	const midPoints = vals.map((_, i) => {
		const x = getStopPercent(i)
		const y = 100 - clampedHeights[i]!
		return `${x},${y}`
	})
	const lastY = 100 - clampedHeights[clampedHeights.length - 1]!
	const lastX = getStopPercent(vals.length - 1)
	const points = [
		`0,${firstY}`,
		...midPoints,
		`${lastX},${lastY}`,
		`100,${lastY}`,
		`100,100`,
		`0,100`
	].join(" ")
	return points
})
</script>
