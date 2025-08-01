<template>
<div
	v-if="$open"
	:id="`suggestions-${id ?? fallbackId}`"
	:class="twMerge(`
			suggestions
			bg-bg
			dark:bg-fg
			dark:text-bg
		`,
		($.attrs as any)?.class
	)"
	:data-open="$open"
	role="listbox"
	ref="el"
	v-bind="{...$.attrs, class:undefined}"
>
	<!-- Click event is just in case, it should not really be triggered. We can do click selections via the blur handler. -->
	<div :id="`suggestion-${id ?? fallbackId}-${index}`"
		role="option"
		:class="twMerge(`
			suggestions--item
			user-select-none
			cursor-pointer
			px-2
		`,
			index=== suggestions.active && `
				bg-accent-200
				dark:bg-accent-800/70
			`,
			($.itemAttrs as any)?.class
		)"
		v-bind="{...$.itemAttrs, class:undefined}"
		:aria-selected="index === suggestions.active ? true : false"
		:aria-label="suggestions.getLabel(item)"
		v-for="(item, index) in suggestions.filtered"
		:key="item"
		@mouseover="suggestions.active = index"
		@mousedown.prevent
		@mouseup="suggestions.enterIndex(index, !Array.isArray($modelValue))"
	>
		<slot name="item"
			:item="item"
			:index="index"
			:is-selected="Array.isArray($modelValue) ? $modelValue.includes(item) : $modelValue === item"
		>
			<div class="flex gap-2 nowrap">
				<lib-checkbox
					v-if="Array.isArray($modelValue) && showSelectedValues"
					:model-value="$modelValue.includes(item)"
					@mousedown.prevent
				/>
				<div> {{ item }} </div>
			</div>
		</slot>
	</div>
</div>
</template>


<script setup lang="ts" generic="TSuggestion extends string | object, TValue extends string|string[]">

import { type HTMLAttributes,reactive, ref } from "vue"

import { useDivideAttrs } from "../../composables/useDivideAttrs.js"
import { useSuggestions } from "../../composables/useSuggestions.js"
import { hasModifiers } from "../../helpers/hasModifiers.js"
import { twMerge } from "../../utils/twMerge.js"
import LibCheckbox from "../LibCheckbox/LibCheckbox.vue"
import { type BaseInteractiveProps, baseInteractivePropsDefaults, getFallbackId,type LabelProps, type LinkableByIdProps, type SuggestionsEmits, type SuggestionsProps, type WrapperProps } from "../shared/props.js"

defineOptions({
	name: "lib-suggestions",
	inheritAttrs: false,
})

const $ = useDivideAttrs(["item"] as const)

const emits = defineEmits<SuggestionsEmits>()

const fallbackId = getFallbackId()
const props = withDefaults(defineProps<Props & SuggestionsProps<TSuggestion>>(), {
	isValid: true,
	canOpen: true,
	filterKeydown: undefined,
	...baseInteractivePropsDefaults
})
/**
 * The final valid value. This is *not* the value you want to share with the input. If `restrictToSuggestions` is true this will not update on any invalid values that `inputValue` might be set to.
 *
 * If suggestions are objects, this will be the string returned by the `suggestionLabel` prop.
 */
const $modelValue = defineModel<TValue>("modelValue", { required: true })
/**
 * If the element is bound to an input, this is the value that the input should be sharing.
 *
 * It allows the component to read even invalid output, and also to reset that invalid output when either modelValue is set to a new value, or when the component is closed via cancel.
 */
const $inputValue = defineModel<string >("inputValue", { default: "" })

const $open = defineModel<boolean>("open", { default: false })


if (typeof props.suggestions?.[0] === "object" && !props.suggestionLabel && !props.suggestionsFilter) {
	throw new Error("`suggestionLabel` or `suggestionsFilter` must be passed if suggestions are objects.")
}

const el = ref<HTMLElement | null>(null)

const suggestions = reactive(useSuggestions<TSuggestion, TValue extends string[] ? true : false>(
	$inputValue,
	$modelValue as any,
	$open,
	emits,
	props
))

const inputKeydownHandler = (e: KeyboardEvent): void => {
	if (props.filterKeydown?.(e)) return
	if (hasModifiers(e)) return
	if (e.key === "Enter") {
		suggestions.enterSelected(!Array.isArray($modelValue))
		e.preventDefault()
	} else if (e.key === "Escape") {
		suggestions.cancel()
		e.preventDefault()
	} else if (!$open.value && ["ArrowDown", "ArrowUp", "PageUp", "PageDown"].includes(e.key) && suggestions.available) {
		suggestions.open()
		e.preventDefault()
		if (e.key === "PageUp") {
			suggestions.first()
		} else if (e.key === "PageDown") {
			suggestions.last()
		}
	} else if (e.key === "ArrowUp") {
		suggestions.prev()
		e.preventDefault()
	} else if (e.key === "ArrowDown") {
		suggestions.next()
		e.preventDefault()
	} else if (e.key === "PageUp") {
		suggestions.first()
		e.preventDefault()
	} else if (e.key === "PageDown") {
		suggestions.last()
		e.preventDefault()
	}
}
const inputBlurHandler = (e: MouseEvent): void => {
	if (props.filterBlur?.(e)) return
	
	if (!$open.value) return

	if (props.restrictToSuggestions) {
		suggestions.cancel()
	} else {
		if (!Array.isArray($modelValue.value)) {
			$modelValue.value = $inputValue.value as any
		}
	}
	if ($open.value) {
		suggestions.close()
	}
}
const inputFocusHandler = (e: FocusEvent): void => {
	if (props.filterFocus?.(e)) return
	suggestions.open()
}

defineExpose({
	suggestions,
	el,
	/** A simple keydown handler that can be passed to an input to control the component while still focused inside it. */
	inputKeydownHandler,
	/** A blur handler for the input that controls the component. This also takes care of making clicking on a suggestion work, since otherwise if canOpen is set to false in the blur handler, no click event will fire. */
	inputBlurHandler,
	/** A focus handler for the input that controls the component. */
	inputFocusHandler,
})

</script>

<script lang="ts">
type WrapperTypes = Partial<WrapperProps<"item",HTMLAttributes, {
	/** Tailwind classes. */
	class?: string
}>>

type RealProps =
	& LinkableByIdProps
	& LabelProps
	& BaseInteractiveProps
	& {
		/** Return true to prevent the keydown event from being handled. */
		filterKeydown?: (e: KeyboardEvent) => boolean
		/** Return true to prevent the blur event from being handled. */
		filterBlur?: (e: MouseEvent) => boolean
		/** Return true to prevent the focus event from being handled. */
		filterFocus?: (e: FocusEvent) => boolean
	}

interface Props
	extends
	/** @vue-ignore */
	Partial<Omit<HTMLAttributes,"class" | "onSubmit"> & {
		/** Tailwind classes. */
		class?: string
	}>,
	/** @vue-ignore */
	WrapperTypes,
	RealProps
{}

</script>
