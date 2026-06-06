<template>
<div
	class="
	metamorphosis-interpolated
	metamorphosis-interpolated--color
	grid
	w-full
	grid-cols-[1fr_auto_min-content]
	items-center
	gap-2
	[--_slider-size:calc(var(--spacing)*_4)]
"
>
	<!-- Row 1, Col 1 -->
	<!-- space for pickers -->
	<div class="h-4"/>

	<!-- Row 1, Col 2 -->
	<div/>
	<!-- Row 1, Col 3 -->
	<div/>

	<!-- Row 2, Col 1 -->
	<div
		class="
			metamorphosis-interpolated--track
			relative
			h-[var(--slider-size,var(--_slider-size))]
			w-full
			rounded-sm
			bg-neutral-200
			dark:bg-neutral-700
		"
		ref="trackEl"
	>
		<div
			class="
				metamorphosis-interpolated--gradient
				absolute
				inset-0
				rounded-sm
			"
			:style="gradientBackground"
		/>

		<template
			v-for="(controlVar, index) in values"
			:key="`${controlVar.unit}-${JSON.stringify(controlVar.value)}`"
		>
			<!-- Handle (slider) -->
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
				`"
				:style="`left: calc(${getStopPercent(index)}% - var(--slider-size,var(--_slider-size))/2)`"
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
			<!-- Picker (positioned above the track, same horizontal position as handle) -->
			<div
				class="absolute"
				:style="{
					left: `calc(${getStopPercent(index)}% - var(--slider-size,var(--_slider-size))/2)`,
					top: 'calc(-1 * (var(--_slider-size) + var(--spacing) * 2))'
				}"
			>
				<WMetamorphosisControl :control-var="controlVar"/>
			</div>
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
			class="metamorphosis-interpolated--remove-button"
			aria-label="Remove stop"
			:disabled="(!allowSwitchingStopsMode && (!stops || stops.length <=2)) || (allowSwitchingStopsMode && !stops)"
			:border="false"
			@click="removeStop"
		>
			<WIcon><i-lucide-minus/></WIcon>
		</WButton>
	</div>
	<div v-else/>

	<!-- Row 3, Col 1 -->
	<div class="metamorphosis-interpolated--preview-swatches flex w-full gap-1">
		<div
			class="flex-1 h-3 rounded-sm"
			:style="`background:${css}`"
			:title="`${key}: ${css}`"
			v-for="(css, key) in interpolated"
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
			:disabled="options.steps <= 1"
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
import WMetamorphosisControl from "./WMetamorphosisControl.vue"

import { useMetamorphosisInterpolatedVars } from "../../composables/useMetamorphosisInterpolatedVars.js"
import WButton from "../WButton/WButton.vue"
import WIcon from "../WIcon/WIcon.vue"

defineOptions({
	name: "WMetamorphosisInterpolatedColors"
})

const props = withDefaults(defineProps<MetamorphosisInterpolatedVarsProps>(), {
	allowSwitchingStopsMode: true,
	allowModifyingSteps: true
})

const { instance, values, stops, options, interpolated } = useMetamorphosisInterpolatedVars(props.interpolatedVars)


const trackEl = ref<HTMLDivElement | null>(null)

let dragging = false
let draggingIndex = -1
const lastDraggedIndex = ref(-1)

function getStopPercent(index: number): number {
	const stopsValue = stops.value
	if (stopsValue === undefined) {
		// Evenly spaced: distribute across 0-100%
		const count = values.value.length
		return (index / (count - 1)) * 100
	}
	return stopsValue[index]! * 100
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
	requestAnimationFrame(() => {
		const el = trackEl.value
		if (!el) return
		const { x, width } = el.getBoundingClientRect()
		let posX = e.clientX - x
		posX = posX < 0 ? 0 : posX > width ? width : posX
		const percent = posX / width

		instance.set("stop", draggingIndex, percent)
		draggingIndex = stops.value!.findIndex(s => s === percent)
	})
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
	} else if (e.key === "ArrowDown") {
		e.preventDefault()
		const next = index < values.value.length - 1 ? index + 1 : 0
		lastDraggedIndex.value = next
	} else if (e.key === "ArrowUp") {
		e.preventDefault()
		const prev = index > 0 ? index - 1 : values.value.length - 1
		lastDraggedIndex.value = prev
	}
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
	const opts = instance.options
	const interpolatedValue = opts.interpolator({
		start: prevCv!,
		end: nextCv!,
		percent: 0.5,
		state: {},
		step: 0,
		totalSteps: 1,
		steps: opts.steps,
		keyName: "",
		name: instance.name,
		exclude: opts.exclude,
		roundTo: opts.roundTo
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
		// delete first, go forward to new first
		lastDraggedIndex.value = 0
	} else if (indexToDelete === oldLength - 1) {
		// delete last, go backward
		lastDraggedIndex.value = Math.max(0, newLength - 1)
	} else {
		// delete middle, prefer next stop, but skip if it's the last (edge)
		const nextIndex = indexToDelete
		if (nextIndex < newLength - 1) {
			lastDraggedIndex.value = nextIndex
		} else {
			// next would be the last edge, go back instead
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

const gradientBackground = computed(() => {
	const entries = values.value.map((cv, i) => ({
		css: cv.css,
		pos: getStopPercent(i)
	}))
	if (entries.length === 0) return ""
	const gradientStops = entries.map(e => `${e.css} ${e.pos}%`)
	return `background: linear-gradient(to right, ${gradientStops.join(", ")})`
})
</script>
