<template>
<!--
	We use a custom element for the recorder so we don't have to deal with the input event.
	contenteditable=false is because of storybook, it's shortcuts interfere when not using real input elements
	-->
<div
	:id="id?? fallbackId"
	:class="twMerge(`recorder
			flex items-center
			gap-2
			px-2
			grow-[999999]
			focus-outline-no-offset
			rounded-sm
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
	@keydown.space.prevent="handleClickRecorder($event, true)"
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
				animate-[blink_1s_infinite]
				bg-red-500
			`,
			(disabled || readonly) && `
				bg-neutral-500
			`
		)"
		ref="recorderIndicatorEl"
	/>
	<div class="recorder-value before:content-vertical-holder truncate">
		{{ recording ? recordingValue : tempValue }}
	</div>
</div>
</template>
<script setup lang="ts">
import { keys } from "@alanscodelog/utils/keys.js"
import { computed, type HTMLAttributes ,onBeforeUnmount, onMounted, type PropType, ref, watch, watchPostEffect } from "vue"

import { useAriaLabel } from "../../composables/useAriaLabel.js"
import { twMerge } from "../../utils/twMerge.js"
import { type BaseInteractiveProps, baseInteractivePropsDefaults, getFallbackId, type LabelProps, type LinkableByIdProps,type TailwindClassProp } from "../shared/props.js"

defineOptions({
	name: "lib-recorder",
	inheritAttrs: false,
})

const emits = defineEmits<{
	/** Recorder is blurred */
	(e: "recorder:blur", $event: FocusEvent): void
	/** Recorder is clicked. The component's indicator and recorder elements are passed to help filter out those clicks. */
	(e: "recorder:click", { event, indicator, input }: { event: MouseEvent | KeyboardEvent, indicator: HTMLElement, input: HTMLInputElement }): void
	/* User presses enter. Not emitted when multiple values are used. */
	(e: "focus:parent"): void
}>()
const fallbackId = getFallbackId()
// eslint-disable-next-line no-use-before-define
const props = withDefaults(defineProps<Props>(), {
	recordingValue: "Recording",
	recordingTitle: "",
	id: undefined,
	binders: undefined,
	recorder: undefined,
	...baseInteractivePropsDefaults
})
/**
 * Puts the element into recording mode if true. See {@link props.recorder}.
 */
const recording = defineModel<boolean>("recording", { required: false, default: false })

/** The final value of the recorder. For intermediate values while recording, pass a recorder and set an appropriate recording value. */
const modelValue = defineModel<string>({ required: true })


const recorderEl = ref<HTMLInputElement | null>(null)
const recorderIndicatorEl = ref<HTMLElement | null>(null)
const canEdit = computed(() => !props.disabled && !props.readonly)
const tempValue = ref(modelValue.value)

watch([() => props.binders, () => props.binders], () => {
	if (recording.value) {
		throw new Error("Component was not designed to allow swapping out of binders/recorders while recording")
	}
})

watch(modelValue, () => {
	tempValue.value = modelValue.value
})
const ariaLabel = useAriaLabel(props)

const boundListeners: Record<string, any> = {}
let isBound = false

const unbindListeners = (): void => {
	if (!isBound) return
	isBound = false
	if (props.recorder) {
		for (const key of keys(boundListeners)) {
			recorderEl.value?.removeEventListener(key, boundListeners[key])
			delete boundListeners[key]
		}
	}
	if (props.binders && recorderEl.value) {
		props.binders.unbind(recorderEl.value as HTMLInputElement)
	}
}
const bindListeners = (): void => {
	if (!props.recorder && !props.binders) {
		throw new Error("Record is true but no recorder or binders props was passed")
	}
	if (props.recorder && props.binders) {
		throw new Error("Recording is true and was passed both a recorder and a binders prop. Both cannot be used at the same time.")
	}
	isBound = true
	if (props.recorder) {
		for (const key of keys(props.recorder)) {
			recorderEl.value?.addEventListener(key, props.recorder[key], { passive: false })
			boundListeners[key] = props.recorder[key]
		}
	}
	if (props.binders && recorderEl.value) {
		props.binders.bind(recorderEl.value as HTMLInputElement)
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
		if ((props.recorder || props.binders) && isBound) {
			unbindListeners()
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
	if (props.recorder || props.binders) {
		emits("recorder:blur", e)
	}
}

const handleClickRecorder = (e: MouseEvent | KeyboardEvent, isSpaceKey: boolean = false): void => {
	if (!canEdit.value) return
	if (!recording.value) {
		recorderEl.value?.focus()
	}
	// toggle if clicking on the recording indicator, otherwise only allow starting recording, so if needed, clicks can be recorded
	if (props.recorder || props.binders) {
		if (isSpaceKey) { return }
		emits("recorder:click", { event: e as MouseEvent, indicator: recorderIndicatorEl.value! as HTMLElement, input: recorderEl.value! as HTMLInputElement })
	}
}

</script>
<script lang="ts">
type RealProps =
& LinkableByIdProps
& BaseInteractiveProps
& LabelProps
& {
	border?: boolean
	/** A value to display while recording. */
	recordingValue?: string
	/** A title to display on the input div while recording. Is also used as the aria-description. */
	recordingTitle?: string
	/**
	 * The recorder object is a series of event listeners to attach to the input div while recording is started. If you need to bind directly to the element, see the `binders` prop.
	 *
	 * The listeners are then unbound when recording is set to false again.
	 *
	 * Note that the component does not handle the setting of `recording` (unless the component is disabled), `modelValue`,  or `recordingValue` at all and has no mechanism for cancelling a recording. It is left to the recorder listeners and any `recorder:*` handlers to determine what to do.
	 */
	recorder?: undefined | Record<string, any>
	/** This provides a way to manually attach/remove event listeners to/from the element. It is an alternative to the `recorder` prop, see it for more details. Both cannot be specified at the same time.*/
	binders?: undefined | { bind: (el: HTMLElement) => void, unbind: (el: HTMLElement) => void }
	/** The id of the element. If not provided, the id will be generated automatically. */
	id?: string
}

interface Props
	extends
	/** @vue-ignore */
	Partial<Omit<HTMLAttributes,"class"> & TailwindClassProp>,
	RealProps
{ }
</script>
