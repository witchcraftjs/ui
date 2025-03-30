<template>
<div
	v-if="suggestions.isOpen"
	:id="`suggestions-${id ?? fallbackId}`"
	:class="twMerge(`
			suggestions
			bg-bg
			dark:bg-fg
		`,
		($.attrs as any)?.class
	)"
	:data-open="suggestions.isOpen"
	role="listbox"
	ref="el"
	v-bind="{...$.attrs, class:undefined}"
>
	<!-- Click event is just in case, it should not really be triggered. We can do click selections via the blur handler. -->
	<div :id="`suggestion-${id ?? fallbackId}-${index}`"
		role="option"
		:class="twMerge(`
					px-1
					user-select-none
					cursor-pointer
					px-2
				`,
			index=== suggestions.active && `bg-accent-200 dark:bg-accent-800`,
			($.itemAttrs as any)?.class
		)"
		v-bind="{...$.itemAttrs, class:undefined}"
		:aria-selected="index === suggestions.active ? true : false"
		:aria-label="suggestions.getLabel(item)"
		v-for="(item, index) in suggestions.filtered"
		:key="item"
		@mouseover="suggestions.active = index"
		@mousedown.prevent
		@mouseup="suggestions.enterSuggestion(index)"
	>
		<slot name="item" :item="item" :index="index">
			{{ item }}
		</slot>
	</div>
</div>
</template>


<script setup lang="ts" generic="TSuggestion extends string | object">

import { type HTMLAttributes,reactive, ref } from "vue"

import { useDivideAttrs } from "../../composables/useDivideAttrs.js"
import { useSuggestions } from "../../composables/useSuggestions.js"
import { hasModifiers } from "../../helpers/hasModifiers.js"
import { twMerge } from "../../utils/twMerge.js"
import { type BaseInteractiveProps, baseInteractivePropsDefaults, getFallbackId,type LabelProps, type LinkableByIdProps, type MultiValueProps, type SuggestionsEmits, type SuggestionsProps, type WrapperProps } from "../shared/props.js"

defineOptions({
	name: "lib-suggestions",
	inheritAttrs: false,
})

const $ = useDivideAttrs(["item"] as const)

const emits = defineEmits<SuggestionsEmits>()

const fallbackId = getFallbackId()
// eslint-disable-next-line no-use-before-define
const props = withDefaults(defineProps<Props & SuggestionsProps<TSuggestion>>(), {
	isValid: true,
	canOpen: true,
	values: undefined,
	filterKeydown: undefined,
	...baseInteractivePropsDefaults
})

/**
 * The final valid value. This is *not* the value you want to share with the input. If `restrictToSuggestions` is true this will not update on any invalid values that `inputValue` might be set to.
 *
 * If suggestions are objects, this will be the string returned by the `suggestionLabel` prop.
 */
const $modelValue = defineModel<string>("modelValue", { required: true })
/**
 * If the element is bound to an input, this is the value that the input should be sharing.
 *
 * It allows the component to read even invalid output, and also to reset that invalid output when either modelValue is set to a new value, or when the component is closed via cancel.
 */
const $inputValue = defineModel<string >("inputValue", { default: "" })


if (typeof props.suggestions?.[0] === "object" && !props.suggestionLabel && !props.suggestionsFilter) {
	throw new Error("`suggestionLabel` or `suggestionsFilter` must be passed if suggestions are objects.")
}

const el = ref<HTMLElement | null>(null)
const mousedown = ref(false)

const suggestions = reactive(useSuggestions(
	$inputValue,
	$modelValue,
	emits,
	props
))

const inputKeydownHandler = (e: KeyboardEvent): void => {
	if (props.filterKeydown?.(e)) return
	if (hasModifiers(e)) return
	if (e.key === "Enter") {
		suggestions.enterSelected()
		e.preventDefault()
	} else if (e.key === "Escape") {
		suggestions.cancel()
		e.preventDefault()
	} else if (!suggestions.isOpen && ["ArrowDown", "ArrowUp", "PageUp", "PageDown"].includes(e.key) && suggestions.available) {
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
	
	if (!suggestions.isOpen) return

	if (props.restrictToSuggestions) {
		suggestions.cancel()
	} else {
		$modelValue.value = $inputValue.value
	}
	if (suggestions.isOpen) {
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
	& MultiValueProps
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
