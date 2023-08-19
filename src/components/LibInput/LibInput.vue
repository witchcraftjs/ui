<template>
<div
	:class="twMerge(`input
			grow
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
	<!-- These are mostly copies of the classes on LibSimpleInput except made to work with disabled/readonly/etc manually since a div cannot have these states. -->
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
					flex-wrap
					rounded
					gap-2
				`,
			border && `
					bg-inherit
					border
					border-neutral-500
					outlined-within:border-accent-500
				`,
			isOpen && `rounded-b-none`,
			!valid && `
					border-danger-700
					outlined:!ring-danger-700
					text-danger-800
					dark:text-danger-400
					dark:border-danger-600
					`,
			readonly && `
					bg-neutral-50
					text-neutral-800
					dark:bg-neutral-950
					dark:text-neutral-200
					`,
			disabled && `
					bg-neutral-50
					text-neutral-400
					dark:border-neutral-600
					border-neutral-400
				`,
			/* ($slots.left || $slots.right) &&  */`px-2`,
			innerWrapperAttrs.class
		)"
	>
		<slot name="left" v-bind="slotProps"/>
		<slot name="input" v-bind="{ ...inputProps, ...slotProps, suggestionsIndicatorClickHandler }">
			<lib-simple-input
				:id="id"
				:class="twMerge(`p-0`, $attrs.class)"
				v-bind="inputProps"
			/>
		</slot>
		<slot name="indicator px-0" v-bind="{isOpen, suggestionsIndicatorClickHandler }">
			<div
				v-if="suggestions"
				:data-is-open="isOpen"
				:class="twMerge(
					`flex flex-col justify-center`,
					!$slots.right && (!values || values.length === 0 ) && `pr-1`,
					isOpen && `rotate-180`)"
				@click="suggestionsIndicatorClickHandler"
			>
				<fa :icon="'chevron-up'"/>
			</div>
		</slot>
		<slot name="values">
			<template v-if="values && values.length > 0">
				<!-- @vue-expected-error -->
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
			<!-- @vue-expect-error -->
			<lib-suggestions
				class="
							border-accent-500
							absolute
							inset-x-[-1px]
							top-full
							z-10
							rounded-b
							border
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
</div>
</template>
<script setup lang="ts" generic="T extends string|number">
import { computed, type PropType, ref, useAttrs, useSlots, watch } from "vue"

import { useDivideAttrs } from "../../composables/useDivideAttrs.js"
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
// const $attrs = useAttrs()
const emits = defineEmits<{
	(e: "update:modelValue", val: T): void
	(e: "submit", val: T): void
}>()

/**
 * There's three levels of $attrs that can be passed, the outwer wrapper, the inner wrapper, and the input.
 *
 * Unprefixed attributes are passed directly to the input.
 *
 * The others can be passed to by prefixing with `wrapper-` and `inner-wrapper`.
 */
const props = defineProps({
	...linkableByIdProps(),
	...baseInteractiveProps,
	valid: { type: Boolean as PropType<boolean>, required: false, default: true },
	...labelProp,
	...suggestionsProps,
	...multiValueProps,
	...fallthroughEventProps,
})


const {
	$attrs,
	wrapperAttrs,
	"inner-wrapperAttrs": innerWrapperAttrs,
} = useDivideAttrs(useAttrs(), ["wrapper", "inner-wrapper"])

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
const isActuallyValid = computed(() => props.valid ?? isValid.value)


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
	// @ts-expect-error awaiting proper types for defineExpose
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
		// @ts-expect-error awaiting proper types for defineExpose
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
	onSubmit: (e: T) => emits("submit", e),
	"aria-autocomplete": props.suggestions !== undefined ? "both" : undefined,
	"aria-controls": props.suggestions !== undefined ? `suggestions-${props.id}` : undefined,
	role: props.suggestions ? "combobox" : undefined,
	"aria-expanded": props.suggestions !== undefined ? isOpen.value : undefined,
	"aria-activedescendant": isOpen.value ? `suggestion-${props.id}-${activeSuggestion.value}` : undefined,
	canEdit: canEdit.value,
	...$attrs,
	class: undefined,
}))

const slotProps = computed(() => ({
	isOpen: isOpen.value,
	isValid: props.valid ?? isValid.value,
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
