<template>
<div
	:class="twMerge(`input--outer-wrapper
			grow
			flex
			flex-wrap
			`,
		disabled && `
			text-neutral-400
			dark:text-neutral-600
		`,
		($.wrapperAttrs as any)?.class,
	)"
	tabindex="-1"
	v-bind="{...$.wrapperAttrs, class:undefined}"
	ref="inputWrapperEl"
>
	<slot name="label" v-bind="{ ...slotProps, label }">
		<lib-label v-if="label || $slots.default"
			:id="id ?? fallbackId"
			:disabled="disabled"
			:readonly="readonly"
			:valid="valid"
			class="input--label"
		>
			<slot v-bind="slotProps">
				{{ label }}
			</slot>
		</lib-label>
		<!-- Allow blurring when clicking the blank part of a label. -->
		<div class="input--label-spacer flex-1"/>
	</slot>
	<!-- These are mostly copies of the classes on LibSimpleInput except made to work with disabled/readonly/etc manually since a div cannot have these states. -->
	<div
		:data-border="border"
		:data-invalid="!valid"
		:data-disabled="disabled"
		:data-read-only="readonly"
		:data-is-open="isOpen"
		v-bind="{...$['inner-wrapperAttrs'], class:undefined}"
		:class="twMerge(`input--inner-wrapper
				relative
				flex
				flex-1
				basis-[100%]
				flex-wrap
				rounded-sm
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
				outlined:!outline-danger-700
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
					`input--input p-0`,
					!$slots.left && `-ml-2 pl-2`,
					!$slots.right && (!$values || $values.length === 0) && !suggestions && `-mr-2 -pr-2`,
					($.attrs as any)?.class,
				)"
				v-bind="inputProps"
			/>
		</slot>
		<slot name="indicator" v-bind="{isOpen, suggestionsIndicatorClickHandler }">
			<!-- todo, convert to button for accessibility ? -->
			<div
				v-if="suggestions"
				:data-is-open="isOpen"
				:class="twMerge(`input--indicator flex flex-col justify-center`)"
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
							input--multivalues
							grow-[9000]
							justify-space-between
							py-1
						`,
						!$slots.right && `-mr-1`,
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
						input--suggestions
						absolute
						-inset-x-px
						z-10
						rounded-b-sm
						border-accent-500
						border
						top-full
					`,
					!border && `
						rounded-sm
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
import { isBlank } from "@alanscodelog/utils/isBlank.js"
import { isObject } from "@alanscodelog/utils/isObject.js"
import { pushIfNotIn } from "@alanscodelog/utils/pushIfNotIn.js"
import { computed,type HTMLAttributes,type InputHTMLAttributes, nextTick, onBeforeMount, ref, toRef, useSlots, watch } from "vue"
import type { ComponentExposed } from "vue-component-type-helpers"

import { useDivideAttrs } from "../../composables/useDivideAttrs.js"
import { useSuggestionsInputAria } from "../../composables/useSuggestions.js"
import { twMerge } from "../../utils/twMerge.js"
import Icon from "../Icon/Icon.vue"
import LibLabel from "../LibLabel/LibLabel.vue"
import LibMultiValues from "../LibMultiValues/LibMultiValues.vue"
import LibSimpleInput from "../LibSimpleInput/LibSimpleInput.vue"
import LibSuggestions from "../LibSuggestions/LibSuggestions.vue"
import {
	type BaseInteractiveProps,
	baseInteractivePropsDefaults,
	getFallbackId,
	type LabelProps,
	type LinkableByIdProps,
	type SuggestionsProps,
	type TailwindClassProp,
	type WrapperProps,
} from "../shared/props.js"


/* #region base */
defineOptions({
	name: "lib-input",
	inheritAttrs: false,
})
const $slots = useSlots()
const emit = defineEmits<{
	(e: "input", val: InputEvent): void
	(e: "submit", val: string, suggestion?: any): void
	(e: "keydown", val: KeyboardEvent): void
	(e: "blur", val: FocusEvent): void
	(e: "focus", val: FocusEvent): void
	(e: "indicatorClick", val: MouseEvent): void
}>()

const fallbackId = getFallbackId()

// eslint-disable-next-line no-use-before-define
const props = withDefaults(defineProps<Props>(), {
	valid: true,
	suggestions: undefined,
	updateOnlyOnSubmit: false,
	...baseInteractivePropsDefaults,
})

const $ = useDivideAttrs(["wrapper", "inner-wrapper", "suggestions", "multivalues"] as const)

const $values = defineModel<string[] | undefined>("values", { default: undefined })
const $modelValue = defineModel<string>({ required: true })

const fullId = computed(() => props.id ?? fallbackId)

const $inputValue = defineModel<string>("inputValue", { default: "" })
$inputValue.value = $modelValue.value ?? ""

const canEdit = computed(() => !props.disabled && !props.readonly)
const suggestionsComponent = ref<ComponentExposed<typeof LibSuggestions> | null>(null)
const activeSuggestion = ref(0)
watch($modelValue, () => {
	$inputValue.value = $modelValue.value
})
const inputWrapperEl = ref<HTMLElement | null>(null)
const isOpen = ref(false)

const suggestionsIndicatorClickHandler = (e: MouseEvent) => {
	nextTick(() => {
		if (props.suggestions) {
			(suggestionsComponent.value as any)?.suggestions.toggle()
		}
	})
	emit("indicatorClick", e)
}


const handleKeydown = (e: KeyboardEvent) => {
	if (props.suggestions) {
		if (e.key === "Enter" && activeSuggestion.value === -1 && $values.value) {
			pushIfNotIn($values.value, [$inputValue.value])
			$inputValue.value = ""
			$modelValue.value = ""
		} else {
			(suggestionsComponent.value as any)?.inputKeydownHandler?.(e)
			if ($values.value) {
				$modelValue.value = ""
			}
		}
	}
	emit("keydown", e)
}
const handleBlur = (e: FocusEvent) => {
	if (props.suggestions) {
		(suggestionsComponent.value as any)?.inputBlurHandler?.(e)
	}
	emit("blur", e)
}
const handleFocus = (e: FocusEvent) => {
	if (props.suggestions) {
		(suggestionsComponent.value as any)?.inputFocusHandler?.(e)
	}
	emit("focus", e)
}

function addValue(val: string) {
	if ($values.value === undefined) return
	if (isBlank(val)) return
	pushIfNotIn($values.value, [val])
	$inputValue.value = ""
	$modelValue.value = ""
}
const suggestions = toRef(props, "suggestions")
const inputAriaProps = useSuggestionsInputAria(
	fullId,
	isOpen,
	activeSuggestion,
	suggestions,
)
const inputProps = computed(() => ({
	id: fullId.value,
	border: false,
	disabled: props.disabled,
	readonly: props.readonly,
	isValid: props.valid,
	onKeydown: handleKeydown,
	onBlur: handleBlur,
	onFocus: handleFocus,
	modelValue: $inputValue.value,
	"onUpdate:modelValue": (e: string) => {
		$inputValue.value = e
		if (!props.suggestions && !props.updateOnlyOnSubmit && !props.restrictToSuggestions) {
			$modelValue.value = e
		}
	},
	onSubmit: (e: string) => {
		if (!props.suggestions) {
			$modelValue.value = $values.value ? "" : e
			emit("submit", e)
			if ($values.value) {
				addValue(e)
			}
		}
	},
	...inputAriaProps.value,
	canEdit: canEdit.value,
	...$.value.attrs,
	class: undefined,
}))

function slotSubmit(val: any, _wasRemoved: boolean): void {
	emit("submit", val)
}
const slotProps = computed(() => ({
	id: fullId.value,
	isOpen: isOpen.value,
	valid: props.valid,
	disabled: props.disabled,
	readonly: props.readonly,
	emitSubmit: slotSubmit
}))


const suggestionProps = computed(() => ({
	id: fullId.value,
	suggestions: props.suggestions,
	allowOpenEmpty: props.allowOpenEmpty,
	restrictToSuggestions: props.restrictToSuggestions,
	suggestionLabel: props.suggestionLabel,
	suggestionsFilter: props.suggestionsFilter,
	modelValue: $values.value ?? $modelValue.value.toString(),
	inputValue: $inputValue.value,
	isValid: props.isValid,
	"onUpdate:inputValue": (e: string) => $inputValue.value = e,
	onSubmit: (e: string, suggestion?: any, wasRemoved?: boolean) => {
		$modelValue.value = wasRemoved ? "" : e
		emit("submit", e, suggestion)
	},
	"onUpdate:modelValue": (e: string | string[]) => {
		$values.value &&= e as string[]
	},
	"onUpdate:isOpen": (e: boolean) => { isOpen.value = e },
	"onUpdate:activeSuggestion": (e: number) => activeSuggestion.value = e,
	...$.value.suggestionsAttrs,
	class: undefined,
}))

const multivaluesProps = computed(() => ({
	hasSlotRight: !$slots.right,
	label: props.label,
	border: props.border,
	disabled: props.disabled,
	readonly: props.readonly,
	modelValue: $values.value,
	"onUpdate:modelValue": (e: string[]) => $values.value = e,
	...$.value.multivaluesAttrs,
	class: undefined,
}))


defineExpose({
	suggestionsComponent,
	el: inputWrapperEl,
})

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

