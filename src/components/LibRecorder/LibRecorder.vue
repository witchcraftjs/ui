<template>
	<!--
	We use a custom element for the recorder so we don't have to deal with the input event.
	contenteditable=false is because of storybook, it's shortcuts interfere when not using real input elements
	-->
	<div
		:id="id"
		:class="twMerge(`recorder
			flex items-center
			gap-2
			px-2
			grow-[999999]
			focus-outline-no-offset
			rounded
		`,
			border &&`
			border border-neutral-500
			focus:border-accent-500
		`,

			(disabled || readonly) && `
			text-neutral-400
		`,
			(disabled || readonly) && border && `
			bg-neutral-50
			border-neutral-400
		`
			, ($attrs as any).class)"
		:aria-disabled="disabled"
		:aria-readonly="readonly"
		:tabindex="disabled ? -1 : 0"
		:title="recording ? recordingTitle : tempValue"
		contenteditable="false"
		ref="recorderEl"
		v-bind="{...ariaLabel, ...$attrs, class:undefined}"
		@blur="handleBlurRecorder($event)"
		@click="handleClickRecorder($event)"
		@keydown.space.prevent="handleClickRecorder($event)"
	>
		<!-- :aria-description="recording ? recordingTitle : ''" -->
		<div
			:class="twMerge(`recorder-indicator
				inline-block
				bg-red-700
				rounded-full
				w-[1em]
				h-[1em]
				shrink-0
				hover:bg-red-500
			`,
				recording && `
				animate-[animation-blink_1s_infinite]
				bg-red-500
			`,
				(disabled || readonly) && `
				bg-neutral-500
			`
			)"
			ref="recorderIndicatorEl"
		/>
		<div class="recorder-value truncate after:content-vertical-holder">
			{{ recording ? recordingValue : tempValue }}
		</div>
	</div>
</template>
<script setup lang="ts">
import { keys } from "@alanscodelog/utils"
import { computed, onBeforeUnmount, onMounted, type PropType, ref, watch, watchPostEffect } from "vue"

import { twMerge } from "../../helpers/twMerge.js"
import { useAriaLabel } from "../../mixins/useAriaLabel.js"
import { baseInteractiveProps, labelProp, linkableByIdProps } from "../shared/props.js"


defineOptions({
	name: "lib-recorder",
	inheritAttrs: false,
})

const emits = defineEmits<{
	/** Recorder is blurred */
	(e: "recorder:blur", $event: FocusEvent): void
	/** Recorder is clicked. The component's indicator and recorder elements are passed to help filter out those clicks. */
	(e: "recorder:click", { event, indicator, input }: { event: MouseEvent | KeyboardEvent, indicator: HTMLElement, input: HTMLElement }): void
	/* User presses enter. Not emitted when multiple values are used. */
	(e: "focus:parent"): void
}>()

const props = defineProps({
	...linkableByIdProps(),
	...baseInteractiveProps,
	...labelProp,
	/** A value to display while recording. */
	recordingValue: { type: String as PropType<string>, required: false, default: "Recording" },
	/** A title to display on the input div while recording. Is also used as the aria-description. */
	recordingTitle: { type: String as PropType<string>, required: false, default: "" },
	/**
	 * If a recorder object is passed, the input goes into recorder mode. Recording can then be started/stopped by setting `recording`.
	 *
	 * The recorder object is a series of event listeners to attach to the input div while recording is started.
	 *
	 * The listeners are then unbound when recording is set to false again.
	 *
	 * Note that the component does not handle the setting of `recording`, `modelValue`,  or `recordingValue` at all and has no mechanism for cancelling a recording. It is left to the recorder listeners and any `recorder:*` handlers to determine what to do.
	 */
	recorder: { type: Object as PropType<undefined | Record<string, any>>, required: false, default: undefined },
})
/**
 * Puts the element into recording mode if true. See {@link props.recorder}.
 */
const recording = defineModel<boolean>("recording", { required: false, default: false })

/** The final value of the recorder. For intermediate values while recording, pass a recorder and set an appropriate recording value. */
const modelValue = defineModel<string>({ required: true })


const recorderEl = ref<HTMLInputElement | null>(null)
const recorderIndicatorEl = ref<HTMLInputElement | null>(null)
const canEdit = computed(() => !props.disabled && !props.readonly)
const tempValue = ref(modelValue.value)
watch(props, () => {
	tempValue.value = modelValue.value
})
const ariaLabel = useAriaLabel(props)

const boundListeners: Record<string, any> = {}

const unbindListeners = (): void => {
	for (const key of keys(boundListeners)) {
		recorderEl.value?.removeEventListener(key, boundListeners[key])
		delete boundListeners[key]
	}
}
const bindListeners = (): void => {
	if (!props.recorder) {
		throw new Error("Record is true but recorder object missing.")
	}
	for (const key of keys(props.recorder)) {
		recorderEl.value?.addEventListener(key, props.recorder[key], { passive: false })
		boundListeners[key] = props.recorder[key]
	}
}

watchPostEffect(() => {
	if (!canEdit.value) {
		unbindListeners()
		recording.value = false
		return
	}
	if (recording.value) {
		bindListeners()
	} else {
		unbindListeners()
		if (props.recorder && keys(boundListeners).length > 0) {
			// if we just blur the input then we can't shift+tab backwards
			// this way we can go forwards or backwards without actually focusing since parentEl is not focusable
			// parentEl.value?.focus()
			emits("focus:parent")
		}
	}
})

onBeforeUnmount(() => {
	unbindListeners()
})
onMounted(() => {
	if (recording.value) {
		bindListeners()
	}
})

const handleBlurRecorder = (e: FocusEvent): void => {
	if (!canEdit.value) return
	if (props.recorder) {
		emits("recorder:blur", e)
	}
}

const handleClickRecorder = (e: MouseEvent | KeyboardEvent): void => {
	if (!canEdit.value) return
	recorderEl.value?.focus()
	// toggle if clicking on the recording indicator, otherwise only allow starting recording, so if needed, clicks can be recorded
	if (props.recorder) {
		emits("recorder:click", { event: e, indicator: recorderIndicatorEl.value!, input: recorderEl.value! })
	}
}

</script>
