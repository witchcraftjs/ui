<template>
	<!--
	- aria-labelledby needs to be disabled when the input is disabled otherwise the label is read twice
	- we have to be careful not to show the label and the placeholder at the same time otherwise they are both read
 -->
	<div class="input-root"
		:role="suggestions ? 'combobox' : 'input'"
		tabindex="-1"
		:class="{ ...mainClasses, ...stateClasses }"
		:aria-description="values !== undefined ? `Multi Value Input ${disabled ? 'Disabled' : ''}` : undefined"
		:aria-expanded="isOpen"
		ref="parentEl"
		v-detect-flex="{ condition: false }"
	>
		<!-- v-detect-flex="{condition: label && labelType !== 'none' || isOpen && openable}" -->
		<label v-if="label && labelType !== 'none'"
			:id="`${id}-label`"
			class="label"
			:for="id"
		>
			<slot/>{{ label }}
		</label>
		<div class="w-main">
			<div class="w-input-w-dropdown">
				<div class="w-input" aria-hidden="true">
					<input v-if="!recorder"
						:id="id"
						class="w-input_input"
						type="text"
						aria-autocomplete="list"
						:aria-labelledby="disabled ? undefined : `${id}-label`"
						:aria-label="disabled ? label : undefined"
						:aria-description="values !== undefined && !disabled && !readonly ? 'Press enter to add value.' : undefined"
						:aria-controls="`${id}-suggestions`"
						:aria-activedescendant="`${id}-suggestion-${activeSuggestion}`"
						:placeholder="labelType == 'none' ? label : undefined"
						:value="tempValue"
						:disabled="disabled"
						:readonly="readonly"
						v-bind="$attrs"
						@keydown="handleKeydown"
						@input="handleInput"
						@focus="handleFocus"
						@blur="handleBlur"
					>
					<span v-if="!recorder" class="w-input_input-space-holder">{{ tempValue }}</span>
					<!--
					We use a custom element for the recorder so we don't have to deal with the input event.
					contenteditable=false is because of storybook, it's shortcuts enterfere when not using real input elements
					-->
					<div v-if="recorder"
						:id="id"
						class="recorder"
						:tabindex="disabled ? -1 : 0"
						:aria-labelledby="disabled ? undefined : `${id}-label`"
						:aria-label="disabled ? label : undefined"
						readonly="true"
						:aria-description="canEdit ? recordingTitle : ''"
						:title="canEdit ? recordingTitle : ''"
						ref="inputEl"
						@blur="handleBlurRecorder($event)"
						@click="handleClickRecorder($event)"
					>
						<div v-if="canEdit" class="recorder_indicator" ref="recorderIndicatorEl"/>
						<div class="recorder_value">
							{{ recording ? recordingValue : tempValue }}
						</div>
					</div>
				</div>

				<div
					v-if="suggestions"
					class="dropdown_indicator"
					@click="toggleSuggestions()"
				>
					<fa :icon="'solid chevron-up'"/>
				</div>
			</div>
			<div v-if="values && values?.length > 0"
				class="values"
				:aria-label="`Values for ${label}`"
				:tabindex="disabled ? -1 : 0"
			>
				<!-- eslint-disable-next-line vue/no-template-shadow -->
				<div class="values_w-value" v-for="(value) of values" :key="value">
					<span class="values_value">{{ value }}</span>
					<button :aria-label="`Remove ${value}`"
						role="button"
						class="values_remove-value"
						:tabindex="disabled || readonly ? -1 : 0"
						:disabled="readonly || disabled"
						type="submit"
						@click="canEdit && removeValue(value)"
						@keydown.space="canEdit && removeValue(value)"
						@keydown.enter="canEdit && removeValue(value)"
					>
						<fa :icon="'solid times'"/>
					</button>
				</div>
			</div>
		</div>
		<div v-if="isOpen && openable"
			:id="`${id}-suggestions`"
			class="suggestions detect-flex-ignore"
			role="listbox"
		>
			<!-- v-for="(item, index) in suggestionsList" -->
			<div :id="`${id}-suggestion-${index}`"
				role="suggestion"
				:class="index === activeSuggestion ? 'suggestions_suggestion active' : 'suggestions_suggestion'"
				:aria-selected="index === activeSuggestion ? true : false"
				tabindex="-1"
				v-for="(item, index) in fullSuggestionsList"
				:key="item"
				@click="handleSuggestionClick(index)"
				@mouseover="activeSuggestion = index"
			>
				<!--tabindex is for blur handler-->
				<slot name="item" :item="item" :index="index"/>
			</div>
		</div>
	</div>
</template>
<script lang="ts">
export default {
	name: "lib-input",
	inheritAttrs: false,
}
</script>
<script setup lang="ts">

import { keys } from "@alanscodelog/utils"
import { computed, getCurrentInstance, onBeforeUnmount, type PropType, ref, useAttrs, useSlots, watch, watchPostEffect } from "vue"

import { detectFlex } from "../../directives/detectFlex.js"
import { vModel } from "../../helpers/vModel.js"
import fa from "../fa/Fa.vue"

/* #region base */
const vDetectFlex = detectFlex()
const $slots = useSlots()
const $attrs = useAttrs()
/* eslint-disable @typescript-eslint/unified-signatures */
const emits = defineEmits<{
	(e: "update:modelValue", val: string): void
	(e: "update:values", val: string): void
	// (e: "update:recording", val: boolean | undefined): void
	/** Recorder is blurred */
	(e: "recorder:blur", $event: FocusEvent): void
	/** Recorder is clicked. The component's indicator and recorder elements are passed to help filter out those clicks. */
	(e: "recorder:click", { event, indicator, input }: { event: MouseEvent, indicator: HTMLElement, input: HTMLElement }): void
	(e: "update:tempValue", val: string): void
	/* User presses enter. Not emitted when multiple values are used. */
	(e: "submit", val: string): void
}>()
/* eslint-enable @typescript-eslint/unified-signatures */

const props = defineProps({
	modelValue: { type: String as PropType<string>, required: true },
	/** Create a "tag" input where the user can press enter and the value is added to the array and `value` cleared. */
	values: { type: Array as PropType<string[]>, required: false, default: undefined },
	/** If values is used, prevents adding of duplicate values. Also prevents suggesting values that have already been added. */
	preventDuplicateValues: { type: Boolean as PropType<boolean>, required: false, default: true },
	/** The id for the input. Uses vue's uid (`getCurrentInstance().uid`) if none provided. */
	id: { type: String as PropType<string>, required: false, default: () => getCurrentInstance()!.uid.toString() },
	/** The label for the input. */
	label: { type: String as PropType<string>, required: false, default: "" },
	disabled: { type: Boolean as PropType<boolean>, required: false, default: false },
	readonly: { type: Boolean as PropType<boolean>, required: false, default: false },
	labelType: { type: String as PropType<"regular" | "top" | "none">, required: false, default: "regular" },
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	inputAttrs: { type: Object as PropType<{}>, required: false, default: () => { } },
	/**
	 * Puts the element into recording mode if true. See {@link props.recorder}.
	 */
	recording: { type: Boolean as PropType<boolean>, required: false, default: false },
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
	 * Note that the component does not handle the setting of `recording`, `modelValue`, `values`, or `recordingValue` at all and has no mechanism for cancelling a recording. It is left to the recorder listeners and to any `recorder:*` handlers to determine what to do.
	 */
	recorder: { type: Object as PropType<undefined | Record<string, any>>, required: false, default: undefined },
	/**
	 * A list of autocomplete suggestions. Can be a simple list of strings, or more complicated, like a list of objects. In the case of objects, you'll want to specify `suggestionsValue`.
	 *
	 * Each item is passed to the suggestion slot via the `items` prop. You can access it like:
	 * ```
	 * <lib-input>
	 * 	<div #item={item}>
	 * 		{{item}}
	 * 	</div>
	 * </lib-input>
	 * ```
	 */
	suggestions: { type: Array as PropType<any[] | undefined>, required: false, default: undefined },
	/** A function that specifies how to extract the label from a suggestion when it's an object, e.g. `(item) => item.label`. By default, if none is passed, it's assumed suggestions is a list of strings. */
	suggestionLabel: { type: Function as PropType<(item: any) => string>, required: false, default: (item: any) => item },
	/**
	 * Whether to restrict the value to the suggestions list or merely use it to suggest values.
	 *
	 * This stops v-modeling of what the user is typing when there is a value that does not match any values in the suggestions list. `update:modelValue` will only be emitted when they type/select/click a valid option.
	 *
	 * When the input is partially valid (it partially matches an option in the seggestions list), if the user presses enter or focuses away, the last selected suggestion is set as the value.
	 *
	 * When the input is completely invalid, the `errored` class is added to the component and the input goes red. If the user focuses away or tries to press enter anyways, the value is reset to the last valid value.
	 *
	 * Aditionally when the input is invalid, the user can open the dropdown menu (it won't auto open) to view all the suggestions.
	 */
	restrictToSuggestions: { type: Boolean as PropType<boolean>, required: false, default: false },
	/** A function to filter the suggestions based on the current input. If none is given, will attempt to filter by the label using a basic case insentitive `includes` search. */
	suggestionsFilter: { type: Function as PropType<undefined | ((input: string, items: any[]) => any[])>, required: false, default: undefined },
	border: { type: Boolean as PropType<boolean>, required: false, default: true },
})


if (props.suggestions && !$slots.item) {
	throw new Error("`item` slot must be used if using `suggestions` prop.")
}
if (props.recorder && props.suggestions) {
	throw new Error("Cannot use recorder with suggestions.")
}

/* #regionend */
/* #region Variables */
const inputEl = ref<HTMLInputElement | null>(null)
const recorderIndicatorEl = ref<HTMLInputElement | null>(null)
const parentEl = ref<HTMLInputElement | null>(null)
const canEdit = computed(() => !props.disabled && !props.readonly)
const tempValue = ref(props.modelValue)
const value = vModel("modelValue", props, emits)
const values = vModel("values", props, emits)
watch([value], ([val]) => {
	tempValue.value = val
})
const recording = vModel("recording", props, emits)


const mainClasses = computed(() => ({
	[`label-${props.labelType}`]: true,
	border: props.border,
	"tag-input": values.value !== undefined,
}))
const stateClasses = computed(() => ({
	disabled: props.disabled,
	readonly: props.readonly,
	open: isOpen.value,
	recording: recording.value,
	errored: !isValidSuggestion.value,
	editable: canEdit.value,
	openable: suggestionAvailable.value,
}))
/* #regionend */
/* #region Multiple Values */
const removeValue = (val: string): void => {
	const copy = [...values.value!]
	copy.splice(copy.indexOf(val), 1)
	values.value = copy
}

const addValue = (): void => {
	if (tempValue.value === "") return
	if (!(props.preventDuplicateValues && values.value?.includes(tempValue.value))) {
		values.value = [...values.value!, tempValue.value]
	}
	value.value = ""
	tempValue.value = ""
}
/* #regionend */
/* #region Recorder */
const boundListeners: Record<string, any> = {}

const unbindListeners = (): void => {
	for (const key of keys(boundListeners)) {
		inputEl.value?.removeEventListener(key, boundListeners[key])
		delete boundListeners[key]
	}
}

watchPostEffect(() => {
	if (!canEdit.value) {
		unbindListeners()
		return
	}
	if (props.recording) {
		if (!props.recorder) {
			throw new Error("Record is true but recorder object missing.")
		}
		for (const key of keys(props.recorder)) {
			inputEl.value?.addEventListener(key, props.recorder[key], { passive: false })
			boundListeners[key] = props.recorder[key]
		}
	} else {
		unbindListeners()
		if (props.recorder && keys(boundListeners).length > 0) {
			// if we just blur the input then we can't shift+tab backwards
			// this way we can go forwards or backwards without actually focusing since parentEl is not focusable
			parentEl.value?.focus()
		}
	}
})

onBeforeUnmount(() => {
	unbindListeners()
})

const handleBlurRecorder = (e: FocusEvent): void => {
	if (!canEdit.value) return
	if (props.recorder) {
		// recording.value = false
		emits("recorder:blur", e)
	}
}

const handleClickRecorder = (e: MouseEvent): void => {
	if (!canEdit.value) return
	// toggle if clicking on the recording indicator, otherwise only allow starting recording, so if needed, clicks can be recorded
	if (props.recorder) {
		emits("recorder:click", { event: e, indicator: recorderIndicatorEl.value!, input: inputEl.value! })
	}
}
/* #regionend */
/* #region Autocomplete */

let isFocused = false
const isOpen = ref(false)
const activeSuggestion = ref<number>(-1)
const suggestionsFilter = computed(() => {
	if (props.suggestionsFilter) return props.suggestionsFilter
	else {
		return (input: string, items: string[]) => input === ""
			? [...items]
			: items.filter(item => props.suggestionLabel(item).toLowerCase().includes(input.toLowerCase()))
	}
})

const suggestionsList = computed(() => {
	if (props.suggestions) {
		const res = suggestionsFilter.value(tempValue.value, props.suggestions)
		return res
	}
	return undefined
})
const fullSuggestionsList = computed(() => {
	if (props.suggestions) {
		const res = (suggestionAvailable.value ? suggestionsList.value : props.suggestions)!
		return props.preventDuplicateValues && props.values ? res.filter(suggestion => !values.value?.includes(props.suggestionLabel(suggestion))) : res
	}
	return undefined
})
const suggestionAvailable = computed<boolean>(() => (suggestionsList.value?.length ?? 0) > 0)
const moreThanOneSuggestionAvailable = computed<boolean>(() => (suggestionsList.value?.length ?? 0) > 1)
const exactlyMatchingSuggestion = computed(() => props.suggestions?.find(suggestion => tempValue.value === props.suggestionLabel(suggestion)))

const isValidSuggestion = computed(() => !props.restrictToSuggestions || suggestionAvailable.value)
const openable = computed(() =>
	moreThanOneSuggestionAvailable.value ||
	(
		!exactlyMatchingSuggestion.value &&
		suggestionAvailable.value
	) ||
	(
		!isValidSuggestion.value &&
		!suggestionAvailable.value
	),
)

const handleInput = (e: Event): void => {
	if (canEdit.value) {
		if (!props.restrictToSuggestions || exactlyMatchingSuggestion.value) {
			value.value = (e.target as any).value
			tempValue.value = (e.target as any).value
		} else {
			tempValue.value = (e.target as any).value
		}
	}
}

const closeSuggestions = (): void => {
	isOpen.value = false
	activeSuggestion.value = -1
}
const openSuggestions = (): void => {
	isOpen.value = true
	activeSuggestion.value = 0
}
const toggleSuggestions = (): void => {
	if (!canEdit.value || !openable.value) return
	// if (!canEdit.value || !openable.value) return
	isOpen.value ? closeSuggestions() : openSuggestions()
}
const setSuggestion = (num: number): void => {
	const val = props.suggestionLabel(fullSuggestionsList.value![num])
	value.value = val
	tempValue.value = val
	closeSuggestions()
}

watchPostEffect(() => {
	if (!canEdit.value) {
		closeSuggestions()
		return
	}
	if (suggestionAvailable.value) {
		if (isFocused && !exactlyMatchingSuggestion.value) {
			openSuggestions()
		}
	} else {
		closeSuggestions()
	}
})

const handleFocus = (_e: FocusEvent): void => {
	isFocused = true
	if (moreThanOneSuggestionAvailable.value) {
		openSuggestions()
	} else {
		closeSuggestions()
	}
}

const handleBlur = (e: FocusEvent): void => {
	if (!canEdit.value) return
	isFocused = false
	if (parentEl.value!.contains(e.relatedTarget as Node)) return
	if (props.restrictToSuggestions && !exactlyMatchingSuggestion.value) {
		if (activeSuggestion.value > -1) {
			setSuggestion(activeSuggestion.value)
		} else {
			tempValue.value = value.value
		}
	} else {
		value.value = tempValue.value
	}
	if (isOpen.value) {
		closeSuggestions()
	}
}

const handleKeydown = (e: KeyboardEvent): void => {
	if (!canEdit.value) return

	if (e.key === "Enter") {
		if (isOpen.value) {
			if (activeSuggestion.value > -1) {
				// set to active suggestion
				setSuggestion(activeSuggestion.value)
			}
			if (values.value) {
				addValue()
			}
		} else {
			if (!isValidSuggestion.value) {
				// reset to last valid
				tempValue.value = value.value
				return
			}

			if (values.value) {
				addValue()
			} else {
				emits("submit", value.value)
			}
			return
		}
	}

	if (e.key === "Escape") {
		tempValue.value = value.value
		closeSuggestions()
		return
	}

	if (!isOpen.value && ["ArrowDown", "ArrowUp"].includes(e.key) && suggestionAvailable.value) {
		openSuggestions()
		e.preventDefault()
		return
	}
	if (e.key === "ArrowDown" /* && suggestionAvailable.value */) {
		e.preventDefault()
		if (activeSuggestion.value >= fullSuggestionsList.value!.length - 1) {
			activeSuggestion.value = 0
		} else {
			activeSuggestion.value++
		}
		return
	}
	if (e.key === "ArrowUp" /* && suggestionAvailable.value */) {
		e.preventDefault()
		if (activeSuggestion.value > 0) {
			activeSuggestion.value--
		} else {
			activeSuggestion.value = fullSuggestionsList.value!.length - 1
		}
	}
}

const handleSuggestionClick = (index: number): void => {
	setSuggestion(index)
	if (values.value) {
		addValue()
	}
}
/* #regionend */
</script>

<style lang="scss" scoped>
.input-root {
	display: flex;
	position: relative;
	@include flex-row(wrap, null, stretch);
	@include flex(1, 1);

	&.label-top {
		flex-wrap: wrap;
		background: none;
	}

	&.border.editable:not(.label-none) {
		background: var(--bgDisabled);
	}

	&.border {
		border-color: var(--borderNormal);
	}
}


.w-main {
	@include flex(1, 1, auto);
	@include flex-row(wrap, null, stretch);
	max-width: 100%;
	overflow: hidden;
	background: var(--bg);
	@include border;
	@include border-invisible;
	@include border-radius;

	.input-root.label-regular.wrapped :deep() & {
		@include border-radius($amount: 0, $side: "TR");
		@include border-radius($amount: 0, $side: "TL");
	}

	.input-root.label-regular:not(.wrapped) :deep() & {
		@include border-radius($amount: 0, $side: "TL");
		@include border-radius($amount: 0, $side: "BL");
	}

	.input-root.label-regular.open :deep() & {
		@include border-radius($amount: 0, $side: "BR");
	}

	.input-root.label-regular.open.wrapped :deep() & {
		@include border-radius($amount: 0, $side: "BR");
		@include border-radius($amount: 0, $side: "BL");
	}

	.input-root.label-top.open :deep() &,
	.label-none.open :deep() & {
		@include border-radius($amount: 0, $side: "BL");
		@include border-radius($amount: 0, $side: "BR");
	}

	.input-root.border.label-regular.wrapped :deep() & {
		border-top-color: var(--borderNormalSoft);
	}

	.input-root.border.label-regular:not(.wrapped) :deep() & {
		border-left-color: var(--borderNormalSoft);
	}

	.input-root.outline .border:not(.disabled):focus-within :deep() & {
		border-color: var(--borderSoftFocused);
	}

	.input-root.outline .border.label-regular:not(.disabled):focus-within :deep() & {
		background: var(--bgFocused);
	}

	.input-root.border:not(.editable) :deep() & {
		border-color: var(--borderDisabled);
	}

	.input-root.border.errored.editable :deep() &:focus-within {
		background: var(--errorSoft);
		border-color: var(--error);
	}

	.input-root.border :deep() & {
		border-color: var(--borderNormal);
	}
}

.w-input-w-dropdown {
	@include flex-row(nowrap, null, center);
	@include flex(1);
	min-width: 0
}

.w-input {

	@include flex(1, 1, auto);
	padding: var(--paddingXS) calc(var(--paddingXS) + 2px);
	position: relative;
	overflow: hidden;
	@include flex-row();

	.errored.editable &:focus-within {
		color: var(--error);
	}
}

.w-input_input-space-holder {
	min-width: 1em;
	color: blue; //for debugging
	opacity: 0;
	pointer-events: none;
	white-space: nowrap;

	&>span {
		overflow: hidden;
	}

	// make it keep height when empty
	&::after {
		content: "\00a0";
	}
}

.w-input_input {

	min-width: 0;
	position: absolute;
	@include pos(0, 0, 0, 0);
	padding: var(--paddingXS) calc(var(--paddingXS) + 2px);
	// width: calc(100% - (var(--paddingXS)*2 + 4px));
	width: calc(100%);

	.input-root.label-regular :deep() &::placeholder {
		opacity: 0;
	}

	.input-root.label-top :deep() &::placeholder {
		opacity: 0;
	}

	.input-root.label-top.outline :deep() &:focus {
		color: var(--textFocused);
	}

	.input-root.label-none :deep() &::placeholder {
		color: var(--textPlaceholder);
	}

	.outline .input-root:not(.disabled) :deep() &:focus {
		color: var(--textFocused);

		// arghadfgadfg
		&:-webkit-autofill {
			-webkit-text-fill-color: var(--textFocused);
			// font size/family cannot be set, see https://bugs.chromium.org/p/chromium/issues/detail?id=960918
		}

		&::placeholder {
			color: var(--textPlaceholderFocused);
		}
	}

	.outline .input-root.border:not(.disabled):focus-within :deep() & {
		border-color: var(--borderSoftFocused);
		color: var(--textFocused);
	}

	.outline .input-root.border.label-regular:not(.disabled):focus-within :deep() & {
		background: var(--bgFocused);
	}

	.input-root:not(.editable) :deep() &::placeholder,
	.input-root:not(.editable) :deep() & {
		color: var(--textDisabled);
	}
}

.label {
	@include flex-row(nwrap, null, center);

	:slotted(.icon) {
		margin-right: calc(var(--paddingS) + 1px);
	}

	.outline .input-root:not(.disabled):focus-within :deep() & {
		color: var(--textFocused);
	}

	.input-root:not(.editable, .label-none) :deep() & {
		color: var(--textDisabled);
	}

	.input-root:not(.editable, .label-none) :deep() & {
		border-color: var(--borderDisabled);
	}

	.input-root.border :deep() & {
		border-color: var(--borderNormal);
	}

	.input-root.label-regular :deep() & {
		@include flex(1, 1, auto);
		@include flex-row(null, null, center);
		@include border;
		@include border-radius;
		@include border-invisible;

		font-weight: bold;
		overflow: hidden;
		padding: var(--paddingXS) calc(var(--paddingXS) + 2px);
		padding-right: calc(var(--paddingXS) + 3px);
		@include ellipsis;
	}

	.input-root.label-regular.wrapped :deep() & {
		@include border-radius($amount: 0, $side: "BL");
		@include border-radius($amount: 0, $side: "BR");
		border-bottom: none;
	}

	.input-root.label-regular:not(.wrapped) :deep() & {
		@include border-radius($amount: 0, $side: "TR");
		@include border-radius($amount: 0, $side: "BR");
		@include flex(0, 1, auto);
		border-right: none;
	}

	.input-root.label-regular.open :deep() & {
		@include border-radius($amount: 0, $side: "BL");
	}

	.input-root.border.label-regular :deep() & {
		font-weight: normal;
		background: var(--bgNormal);
		border-color: var(--borderNormal);
	}

	.input-root.label-top :deep() & {
		@include border;
		@include border-radius;
		@include border-invisible;
		@include flex($basis: 100%);
		font-size: var(--fontSizeSmall);
		padding-bottom: var(--paddingXS);
		padding-left: calc(var(--paddingXS) + 2px);

		:slotted(.icon) {
			margin-right: calc(var(--paddingXXS) + 1px);
		}
	}

	.input-root.border.label-top :deep() & {
		padding-left: 0;
	}
}

// .label-top .label :slotted(.icon) {
// 	margin-right: calc(var(--paddingXXS) + 1px);
// }


.recorder {
	min-width: 100%;
	width: calc(100% - (var(--paddingXS)*2 + 4px));
	@include flex-row(nowrap, null, center);
	cursor: pointer;

	// .recording :deep() & {
	// 	cursor:unset;
	// }
	.input-root.label-top :deep() &::placeholder {
		opacity: 0;
	}

	.outline .input-root.label-top :deep() &:focus {
		color: var(--textFocused);
	}
}

.recorder_indicator {
	display: inline-block;
	background: var(--recording);
	border-radius: 100%;
	height: 1em;
	width: 1em;
	flex-shrink: 0;
	margin-right: var(--paddingXS);

	&:hover {
		filter: brightness(1.5);
	}

	.input-root.recording :deep() & {
		animation: animation-blink 1s infinite;

		&:hover {
			filter: brightness(1);
		}
	}
}

.recorder_value {
	&::after {
		content: "\00a0";
	}
}

.values {
	@include flex(0, 1, auto);
	@include flex-row(wrap, null, center);
	padding: 0 calc(var(--paddingXS) / 2);
	max-width: fit-content;
}

.values_w-value {
	@include flex(1, 1, 0);
	@include flex-row(nowrap, null, stretch);
	min-width: 0;
	max-width: fit-content;

	@include border;
	@include border-radius(calc(var(--borderRadius) - 2px));
	@include border-invisible();

	overflow: hidden;
	padding: var(--paddingXXS) calc(var(--paddingXXS) + 2px);
	font-size: var(--fontSizeSmall);
	margin: 2px calc(var(--paddingXS) / 2);
}

.values_remove-value {
	padding-left: var(--paddingXS);

	.outline .input-root:not(.disabled) &:focus {
		color: var(--textFocused);
	}

	.input-root.editable :deep() &:hover {
		color: var(--textHover);
		cursor: pointer;
	}

	.input-root.disabled :deep() &,
	.input-root.disabled :deep() & :hover {
		color: var(--textDisabled);
	}

	.input-root.readonly :deep() &,
	.input-root.readonly :deep() & :hover {
		display: none;
	}
}

.values_value {
	white-space: nowrap;
	@include ellipsis;

	.outline .input-root.border.editable:focus-within :deep() & {
		border-color: var(--borderFocused);
	}
}


.suggestions {
	position: absolute;
	@include pos(100%, 0, null, 0);
	@include border;
	@include border-radius($side: "BL");
	@include border-radius($side: "BR");
	@include border-invisible;
	border-top: none;
	z-index: 10;
	overflow: hidden;
	background: var(--bg);

	.input-root.border :deep() & {
		border-color: var(--borderNormal);
	}
}

.suggestions_suggestion {
	padding: var(--paddingXS) calc(var(--paddingXS) + 2px);

	&.active {
		background: var(--bgFocused);
	}
}

.dropdown_indicator {
	@include flex-row(null, center);
	padding-right: calc(var(--paddingXS) + 2px);
	color: var(--textSecondary);

	:deep(svg) {
		transition: transform;
		transition-duration: var(--anim);

		.open & {
			transform: rotate(-180deg);
		}
	}

	.input-root.openable :deep() & {
		cursor: pointer;
	}

	// .r:not(.openable) & {
	// 	cursor: not-allowed;
	// }
}
</style>
