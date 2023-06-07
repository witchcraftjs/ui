<template>
	<div
		:class="twMerge(`input
			flex
			flex-wrap
			`,
			disabled && `
				text-neutral-400
			`,
			wrapperAttrs.class
		)"
		tabindex="-1"
		v-bind="{...wrapperAttrs, class:undefined}"
		@blur="canOpen = false"
	>
		<slot name="label" v-bind="slotProps">
			<lib-label v-if="label || $slots.default"
				:id="id"
				:type="'top'"
				:disabled="disabled"
				:readonly="readonly"
				:valid="valid"
			>
				<slot v-bind="slotProps">
					{{ label }}
				</slot>
			</lib-label>
		</slot>
		<slot name="outer-left"/>
		<div
			:data-border="border"
			:data-invalid="!valid"
			:data-disabled="disabled"
			:data-read-only="readonly"
			:data-is-open="isOpen"
			v-bind="{...innerWrapperAttrs, class:undefined}"
			:class="twMerge(`wrapper
						relative
						flex
						flex-1
						basis-[max-content]
						gap-2
						flex-wrap
						rounded
					`,
				border && `
						border
						border-neutral-500
						disabled:border-neutral-400
						outlined-within:border-accent-500`,
				isOpen && `rounded-b-none`,
				!valid && `
						placeholder:text-danger-700
						border-danger-700
						text-red-800
						`,
				readonly && `
						bg-neutral-50
						text-neutral-800
						placeholder:select-none
						placeholder:text-opacity-0
						focus:placeholder:text-opacity-0`,
				disabled && `
						placeholder:text-nuetral-400
						bg-neutral-50
						text-neutral-400`,
				($slots.left || $slots.right) && `px-2`,
				innerWrapperAttrs.class
			)"
		>
			<slot name="left" v-bind="slotProps"/>
			<slot name="input" v-bind="{ ...inputProps, ...slotProps, suggestionsIndicatorClickHandler }">
				<lib-simple-input
					:id="id"
					v-bind="inputProps"
				/>
			</slot>
			<slot name="indicator px-0" v-bind="{isOpen, suggestionsIndicatorClickHandler }">
				<div
					v-if="suggestions"
					:data-is-open="isOpen"
					:class="twMerge(`flex flex-col justify-center`, !$slots.right && (!values || values.length === 0 )&& `pr-1`, isOpen && `rotate-180`)"
					@click="suggestionsIndicatorClickHandler"
				>
					<fa :icon="'chevron-up'"/>
				</div>
			</slot>
			<slot name="values">
				<template v-if="values && values.length > 0">
					<!-- @vue-expected-error -->
					<!-- @vue-expect-error todo #awaiting release-->
					<lib-multi-values
						:class="twMerge(`
							grow-[9000]
							justify-space-between
							py-1
						`,
							!$slots.right && `
							-mr-1
						`
						)"
						:label="label"
						:border="border"
						:disabled="disabled"
						:readonly="readonly"
						:values="values"
						@update:values="values = $event"
					/>
				</template>
			</slot>
			<slot name="right" v-bind="slotProps"/>

			<slot v-if="suggestions" name="suggestions" v-bind="suggestionProps">
				<!-- todo 1px needs to be abstracted to var -->
				<lib-suggestions
					class="
							absolute
							inset-x-[-1px]
							top-full
							z-10
							rounded-b
							border
							border-accent-500
						"
					ref="suggestionsComponent"
					v-bind="suggestionProps"
				>
					<template #item="itemSlotProps">
						<slot name="item" v-bind="itemSlotProps"/>
					</template>
				</lib-suggestions>
			</slot>
		</div>
		<slot name="outer-right" v-bind="slotProps"/>
	</div>
</template>
<script setup lang="ts" generic="T extends string|number">
import { computed, type PropType, ref, useAttrs, useSlots, watch } from "vue"

import { addValue } from "../../helpers/addValue.js"
import { hasModifiers } from "../../helpers/hasModifiers.js"
import { twMerge } from "../../helpers/twMerge.js"
import fa from "../fa/Fa.vue"
import LibLabel from "../LibLabel/LibLabel.vue"
import LibMultiValues from "../LibMultiValues/LibMultiValues.vue"
import LibSimpleInput from "../LibSimpleInput/LibSimpleInput.vue"
import LibSuggestions from "../LibSuggestions/LibSuggestions.vue"
import { baseInteractiveProps, fallthroughEventProps, labelProp, linkableByIdProps, multiValueProps, suggestionsProps } from "../shared/props.js"


/* #region base */
defineOptions({
	name: "lib-input",
	inheritAttrs: false,
})
const $slots = useSlots()
const $attrs = useAttrs()
const emits = defineEmits<{
	(e: "update:modelValue", val: T): void
}>()

const props = defineProps({
	...linkableByIdProps(),
	...baseInteractiveProps,
	valid: { type: Boolean as PropType<boolean>, required: false, default: true },
	/** There's three levels of $attrs that can be passed. Usually you will want to pass attributes directly and these will get sent to the input element. But there are also the inner wrapper attributes that contain everything that is styled as part of the "input", and the outer wrapper attributes that also contains the label and any aditional side slots. */
	wrapperAttrs: { type: Object as PropType<any>, required: false, default: () => ({}) },
	/** See wrapperAttrs. */
	innerWrapperAttrs: { type: Object as PropType<any>, required: false, default: () => ({}) },
	...labelProp,
	...suggestionsProps,
	...multiValueProps,
	...fallthroughEventProps,
})
const values = defineModel<T[]>("values", { default: () => []})
const modelValue = defineModel<T>({ required: true })


const inputValue = ref<any>(modelValue.value)
const canEdit = computed(() => !props.disabled && !props.readonly)
const suggestionsComponent = ref<typeof LibSuggestions | null>(null)
const activeSuggestion = ref(0)
watch(() => modelValue.value, () => {
	inputValue.value = modelValue.value
})

const inputWrapperEl = ref<HTMLElement | null>(null)
const isOpen = ref(false)
const canOpen = ref(false)
const isValid = ref(true)
const isActuallyValid = computed(() => props.valid !== undefined ? props.valid : isValid.value)


const updateIsValid = (e: boolean) => {
	isValid.value = e
}

const suggestionsIndicatorClickHandler = () => {
	canOpen.value = !canOpen.value
	if (canOpen.value) {
		const inputEl = inputWrapperEl.value?.querySelector("input, .input") as HTMLElement | null
		inputEl?.focus()
	} else {
		// inputWrapperEl.value?.blur()
	}
}
const handleInput = () => {
	if (canEdit.value) {
		if (!props.restrictToSuggestions) {
			emits("update:modelValue", inputValue.value)
		} // else suggestions will handle updating modelvalue
		canOpen.value = true
	}
}

const handleKeydown = (e: KeyboardEvent) => {
	if (props.suggestions) suggestionsComponent.value?.inputKeydownHandler?.(e)

	if (values && e.key === "Enter" && !hasModifiers(e)) {
		values.value = addValue(inputValue.value, values.value, props.preventDuplicateValues)
	}
	if (values && e.key === "Escape" && !hasModifiers(e)) {
		canOpen.value = false
	}
}
const handleBlur = (e: FocusEvent) => {
	if (props.suggestions) {
		suggestionsComponent.value?.inputBlurHandler?.(e)
	}
	canOpen.value = false
}
const handleFocus = () => {
	canOpen.value = true
}
// todo emitting of value changes for isvalid
const inputProps = computed(() => ({
	border: false,
	disabled: props.disabled,
	readonly: props.readonly,
	// class: inputClasses.value,
	valid: isActuallyValid.value,
	onInput: handleInput,
	onKeydown: handleKeydown,
	onBlur: handleBlur,
	onFocus: handleFocus,
	modelValue: inputValue.value,
	// eslint-disable-next-line @typescript-eslint/naming-convention
	"onUpdate:modelValue": (e: T) => {
		inputValue.value = e
	},
	"aria-autocomplete": props.suggestions !== undefined ? "both" : undefined,
	"aria-controls": props.suggestions !== undefined ? `suggestions-${props.id}` : undefined,
	role: props.suggestions ? "combobox" : undefined,
	"aria-expanded": props.suggestions !== undefined ? isOpen.value : undefined,
	"aria-activedescendant": isOpen.value ? `suggestion-${props.id}-${activeSuggestion.value}` : undefined,
	canEdit: canEdit.value,
	...$attrs,
}))

const slotProps = computed(() => ({
	isOpen: isOpen.value,
	isValid: props.valid !== undefined ? props.valid : isValid.value,
	id: props.id,
}))

const suggestionProps = computed(() => ({
	id: props.id,
	suggestions: props.suggestions,
	allowOpenEmpty: props.allowOpenEmpty,
	restrictToSuggestions: props.restrictToSuggestions,
	suggestionLabel: props.suggestionLabel,
	suggestionsFilter: props.suggestionsFilter,
	modelValue: modelValue.value,
	inputValue: inputValue.value,
	canOpen: canOpen.value,
	// eslint-disable-next-line @typescript-eslint/naming-convention
	"onUpdate:isOpen": (e: boolean) => { isOpen.value = e },
	"onUpdate:isValid": updateIsValid,
	// eslint-disable-next-line @typescript-eslint/naming-convention
	"onUpdate:activeSuggestions": (e: number) => activeSuggestion.value = e,
	// eslint-disable-next-line @typescript-eslint/naming-convention
	"onUpdate:inputValue": (e: T) => inputValue.value = e,
	// eslint-disable-next-line @typescript-eslint/naming-convention
	"onUpdate:modelValue": (e: T) => modelValue.value = e,
}))

</script>
