<template>
<div
	:class="twMerge(`input wrapper
			grow
			flex
			flex-wrap
			`,
		disabled && `
			text-neutral-400
		`,
		($.wrapperAttrs as any)?.class,
	)"
	tabindex="-1"
	v-bind="{...$.wrapperAttrs, class:undefined}"
	@blur="canOpen = false"
>
	<slot name="label" v-bind="{ ...slotProps, label }">
		<lib-label v-if="label || $slots.default"
			:id="id ?? fallbackId"
			:disabled="disabled"
			:readonly="readonly"
			:valid="valid"
		>
			<slot v-bind="slotProps">
				{{ label }}
			</slot>
		</lib-label>
		<!-- Allow blurring when clicking the blank part of a label. -->
		<div class="flex-1"/>
	</slot>
	<!-- These are mostly copies of the classes on LibSimpleInput except made to work with disabled/readonly/etc manually since a div cannot have these states. -->
	<div
		:data-border="border"
		:data-invalid="!valid"
		:data-disabled="disabled"
		:data-read-only="readonly"
		:data-is-open="isOpen"
		v-bind="{...$['inner-wrapperAttrs'], class:undefined}"
		:class="twMerge(`inner-wrapper
				relative
				flex
				flex-1
				basis-[100%]
				flex-wrap
				rounded
				gap-2
				px-2
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
			($['inner-wrapperAttrs'] as any)?.class,
		)"
	>
		<slot name="left" v-bind="slotProps"/>
		<slot name="input" v-bind="{ ...inputProps, ...slotProps, suggestionsIndicatorClickHandler }">
			<lib-simple-input
				:class="twMerge(
					`p-0`,
					!$slots.left && `-ml-2 pl-2`,
					!$slots.right && (!$values || $values.length === 0) && !suggestions && `-mr-2 -pr-2`,
					($.attrs as any)?.class,
				)"
				v-bind="inputProps"
			/>
		</slot>
		<slot name="indicator" v-bind="{isOpen, suggestionsIndicatorClickHandler }">
			<div
				v-if="suggestions"
				:data-is-open="isOpen"
				:class="twMerge(
					`flex flex-col justify-center`,
				)"
				@click="suggestionsIndicatorClickHandler"
			>
				<icon :class="isOpen && `rotate-180`"> <i-fa6-solid-chevron-up/> </icon>
			</div>
		</slot>
		<slot
			name="values"
			v-bind="{...multivaluesProps, ...slotProps}"
		>
			<template v-if="$values && $values.length > 0">
				<lib-multi-values
					:class="twMerge(`
							grow-[9000]
							justify-space-between
							py-1
						`,
						!$slots.right && `
							-mr-1
						`,
						($.multivaluesAttrs as any)?.class,
					)"
					v-bind="multivaluesProps"
				/>
			</template>
		</slot>
		<slot name="right" v-bind="slotProps"/>

		<slot v-if="suggestions" name="suggestions" v-bind="{...suggestionProps, ...slotProps}">
			<!-- todo 1px needs to be abstracted to var -->
			<lib-suggestions
				:class="twMerge(`
						absolute
						-inset-x-px
						z-10
						rounded-b
						border-accent-500
						border
						top-full
					`,
					!border && `
						rounded
					`,
					($.suggestionsAttrs as any)?.class,
				)"
				ref="suggestionsComponent"
				v-bind="suggestionProps"
			>
				<template #item="itemSlotProps">
					<slot name="suggestion-item" v-bind="itemSlotProps"/>
				</template>
			</lib-suggestions>
		</slot>
	</div>
</div>
</template>
<script setup lang="ts">
import { pushIfNotIn } from "@alanscodelog/utils/pushIfNotIn.js"
import type { MakeRequired } from "@alanscodelog/utils/types"
import { computed, defineProps,type HTMLAttributes,type InputHTMLAttributes, type PropType, ref, useSlots, watch,withDefaults } from "vue"

import { useDivideAttrs } from "../../composables/useDivideAttrs.js"
import { hasModifiers } from "../../helpers/hasModifiers.js"
import { twMerge } from "../../helpers/twMerge.js"
import LibLabel from "../LibLabel/LibLabel.vue"
import LibMultiValues from "../LibMultiValues/LibMultiValues.vue"
import LibSimpleInput from "../LibSimpleInput/LibSimpleInput.vue"
import LibSuggestions from "../LibSuggestions/LibSuggestions.vue"
import { type BaseInteractiveProps, baseInteractivePropsDefaults, getFallbackId,type LabelProps, type LinkableByIdProps, type MultiValueProps, type SuggestionsProps, type TailwindClassProp, type WrapperProps } from "../shared/props.js"


/* #region base */
defineOptions({
	name: "lib-input",
	inheritAttrs: false,
})
const $slots = useSlots()
const emit = defineEmits<{
	(e: "submit", val: string): void
	(e: "input", val: InputEvent): void
	(e: "keydown", val: KeyboardEvent): void
	(e: "blur", val: FocusEvent): void
	(e: "focus", val: FocusEvent): void
}>()

const fallbackId = getFallbackId()

// eslint-disable-next-line no-use-before-define
const props = withDefaults(defineProps<Props>(), {
	valid: true,
	suggestions: undefined,
	...baseInteractivePropsDefaults,
})

const $ = useDivideAttrs(["wrapper", "inner-wrapper", "suggestions", "multivalues"] as const)

const $values = defineModel<string[] | undefined>("values", { default: undefined })
const $modelValue = defineModel<string>({ required: true })


const inputValue = ref<any>($modelValue.value)
const canEdit = computed(() => !props.disabled && !props.readonly)
const suggestionsComponent = ref<typeof LibSuggestions | null>(null)
const activeSuggestion = ref(0)
watch(() => $modelValue.value, () => {
	inputValue.value = $modelValue.value
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
	}
}
const handleInput = (e: InputEvent) => {
	if (canEdit.value) {
		if (!props.restrictToSuggestions) {
			$modelValue.value = (e.target as any)?.value
		} // else suggestions will handle updating modelvalue
		canOpen.value = true
	}
	emit("input", e)
}

const handleKeydown = (e: KeyboardEvent) => {
	if (props.suggestions)(suggestionsComponent.value as any)?.inputKeydownHandler?.(e)

	if ($values.value && e.key === "Enter" && !hasModifiers(e)) {
		props.preventDuplicateValues
			? pushIfNotIn($values.value, [inputValue.value])
			: $values.value.push(inputValue.value)
	}
	if ($values.value && e.key === "Escape" && !hasModifiers(e)) {
		canOpen.value = false
	}
	emit("keydown", e)
}
const handleBlur = (e: FocusEvent) => {
	if (props.suggestions) {
		(suggestionsComponent.value as any)?.inputBlurHandler?.(e)
	}
	canOpen.value = false
	inputValue.value = $modelValue.value
	emit("blur", e)
}
const handleFocus = (e: FocusEvent) => {
	canOpen.value = true
	emit("focus", e)
}

// todo emitting of value changes for isvalid
const inputProps = computed(() => ({
	id: props.id ?? fallbackId,
	border: false,
	disabled: props.disabled,
	readonly: props.readonly,
	valid: isActuallyValid.value,
	onInput: handleInput,
	onKeydown: handleKeydown,
	onBlur: handleBlur,
	onFocus: handleFocus,
	modelValue: inputValue.value,
	"onUpdate:modelValue": (e: string) => {
		inputValue.value = e
	},
	onSubmit: (e: string) => {
		if (!props.restrictToSuggestions) {
			$modelValue.value = e
		}
		isOpen.value = false
		emit("submit", e)
	},
	"aria-autocomplete": props.suggestions !== undefined ? "both" as const : undefined,
	"aria-controls": props.suggestions !== undefined ? `suggestions-${props.id ?? fallbackId}` : undefined,
	role: props.suggestions ? "combobox" : undefined,
	"aria-expanded": props.suggestions !== undefined ? isOpen.value : undefined,
	"aria-activedescendant": isOpen.value ? `suggestion-${props.id ?? fallbackId}-${activeSuggestion.value}` : undefined,
	canEdit: canEdit.value,
	...$.value.attrs,
	class: undefined,
}))

const slotProps = computed(() => ({
	id: props.id ?? fallbackId,
	isOpen: isOpen.value,
	isValid: props.valid ?? isValid.value,
	disabled: props.disabled,
	readonly: props.readonly,
}))

const suggestionProps = computed(() => ({
	id: props.id ?? fallbackId,
	suggestions: props.suggestions,
	allowOpenEmpty: props.allowOpenEmpty,
	restrictToSuggestions: props.restrictToSuggestions,
	suggestionLabel: props.suggestionLabel,
	suggestionsFilter: props.suggestionsFilter,
	modelValue: $modelValue.value.toString(),
	inputValue: inputValue.value,
	canOpen: canOpen.value,
	onSubmit: (e: string) => {
		$modelValue.value = e
		canOpen.value = false
		emit("submit", e)
	},
	"onUpdate:isOpen": (e: boolean) => { isOpen.value = e },
	"onUpdate:isValid": updateIsValid,
	"onUpdate:activeSuggestions": (e: number) => activeSuggestion.value = e,
	"onUpdate:inputValue": (e: string) => inputValue.value = e,
	...$.value.suggestionsAttrs,
	class: undefined,
}))

const multivaluesProps = computed(() => ({
	hasSlotRight: !$slots.right,
	label: props.label,
	border: props.border,
	disabled: props.disabled,
	readonly: props.readonly,
	values: $values.value,
	"onUpdate:values": (e: string[]) => $values.value = e,
	...$.value.multivaluesAttrs,
	class: undefined,
}))
</script>
<script lang="ts">

type WrapperTypes =
	& WrapperProps<"suggestions",HTMLAttributes >
	& WrapperProps<"wrapper", HTMLAttributes >
	& WrapperProps<"inner-wrapper",HTMLAttributes>

type RealProps =
	SuggestionsProps
	& LinkableByIdProps
	& LabelProps
	& BaseInteractiveProps
	& MultiValueProps
& {
	suggestions?: SuggestionsProps["suggestions"]
	valid?: boolean
}

interface Props
	extends
	/** @vue-ignore */
	Partial<Omit<InputHTMLAttributes,"class" | "readonly" | "disabled" | "onSubmit"> & TailwindClassProp>,
	/** @vue-ignore */
	Partial<WrapperTypes>,
	RealProps { }
</script>

