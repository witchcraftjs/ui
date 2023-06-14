<template>
	<div
		v-if="isOpen"
		:id="`suggestions-${id}`"
		class="
			suggestions
			bg-bg
			dark:bg-fg
		"
		:data-open="isOpen"
		role="listbox"
		ref="el"
		v-bind="$attrs"
	>
		<!-- Click event is just in case, it should not really be triggered. We can do click selections via the blur handler. -->
		<div :id="`suggestion-${id}-${index}`"
			role="option"
			:data-is-active-suggestions="index === activeSuggestion"
			:class="twMerge(`
					px-1
					user-select-none
					cursor-pointer
				`,
				index=== activeSuggestion && `bg-accent-200 dark:bg-accent-800`
			)"
			:aria-selected="index === activeSuggestion ? true : false"
			:aria-label="item"
			v-for="(item, index) in fullSuggestionsList"
			:key="item"
			@mouseover="activeSuggestion = index"
			@mousedown="activeSuggestion = index; mousedown = true;"
			@mouseup="activeSuggestion = index; mousedown = true;"
			@click="setSelected()"
		>
			<slot name="item" :item="item" :index="index">
				{{ item }}
			</slot>
		</div>
	</div>
</template>
<script setup lang="ts" generic="T extends string | object">

import { isBlank, isObject } from "@alanscodelog/utils"
import { computed, type PropType, ref, useAttrs, watch, watchPostEffect } from "vue"

import { twMerge } from "../../helpers/twMerge.js"
import { baseInteractiveProps, linkableByIdProps, multiValueProps, suggestionsProps } from "../shared/props.js"


defineOptions({
	name: "lib-suggestions",
	inheritAttrs: false,
})

const $attrs = useAttrs()
 
const emits = defineEmits<{
	(e: "update:activeSuggestion", val: number): void
	(e: "submit", val: string): void
	(e: "update:isValid", val: boolean): void
	(e: "update:isOpen", val: boolean): void
}>()


const props = defineProps({
	isValid: { type: Boolean as PropType<boolean>, required: false, default: true },
	...linkableByIdProps(),
	...suggestionsProps,
	...baseInteractiveProps,
	...multiValueProps,
	values: { type: Array as PropType<string[]>, required: false, default: () => []},
	canOpen: { type: Boolean as PropType<boolean>, required: false, default: false },
})
/**
 * The final valid value. This is *not* the value you want to share with the input. If `restrictToSuggestions` is true this will not update on any invalid values that `inputValue` might be set to.
 */
const modelValue = defineModel<string>("modelValue", { required: true })
/**
 * If the element is bound to an input, this is the value that the input should be sharing.
 *
 * It allows the component to read even invalid output, and also to reset that invalid output when either modelValue is set to a new value, or when the component is close via cancel.
 */
const inputValue = defineModel<string >("inputValue", { default: "" })
const isOpen = ref(false)

if (typeof props.suggestions?.[0] === "object" && !props.suggestionLabel && !props.suggestionsFilter) {
	throw new Error("`suggestionLabel` or `suggestionsFilter` must be passed if suggestions are objects.")
}


/* #regionend */
/* #region Variables */
const el = ref<HTMLElement | null>(null)
const mousedown = ref(false)


const defaultSuggestionsLabel = (item: any): string => item

const suggestionLabel = computed(() =>
	props.suggestionLabel ?? defaultSuggestionsLabel,
)

const getStringValue = (val: string | object): string => isObject(val) ? suggestionLabel.value(val) : val as string // wat ???
const defaultSuggestionsFilter = (input: string, items: T[]): T[] => input === ""
		? [...items]
		: items.filter(item => suggestionLabel.value(item).toLowerCase().includes(input.toLowerCase()))

const activeSuggestionRef = ref<number>(-1)
const activeSuggestion = computed({
	get: () => activeSuggestionRef.value,
	set: (val: number) => {
		activeSuggestionRef.value = val
		emits("update:activeSuggestion", activeSuggestionRef.value)
	},
})


const suggestionsFilter = computed(() =>
	props.suggestionsFilter ?? defaultSuggestionsFilter)


const suggestionsList = computed(() => {
	if (props.suggestions) {
		const res = suggestionsFilter.value(inputValue.value, props.suggestions)
		return res
	}
	return undefined
})

const suggestionAvailable = computed<boolean>(() =>
	(suggestionsList.value?.length ?? 0) > 0)

const moreThanOneSuggestionAvailable = computed<boolean>(() =>
	(suggestionsList.value?.length ?? 0) > 1)

const exactlyMatchingSuggestion = computed(() =>
	props.suggestions?.find(suggestion =>
		inputValue.value === suggestionLabel.value(suggestion)))

const isValidSuggestion = computed(() =>
	!props.restrictToSuggestions || suggestionAvailable.value)


const fullSuggestionsList = computed(() => {
	if (props.suggestions) {
		const res = (suggestionAvailable.value
			? suggestionsList.value
			: props.suggestions)!

		if (props.restrictToSuggestions && !isValidSuggestion.value) return res
		if (props.preventDuplicateValues && props.values) {
			return res.filter(suggestion => !props.values?.includes(suggestionLabel.value(suggestion)))
		}
		return res
	}
	return undefined
})


const closeSuggestions = (): void => {
	isOpen.value = false
	mousedown.value = false
	emits("update:isOpen", isOpen.value)
	activeSuggestion.value = -1
}
const openSuggestions = (): void => {
	if (!props.canOpen) return
	isOpen.value = true
	emits("update:isOpen", isOpen.value)
	// see delay close
	if (activeSuggestion.value === -1) activeSuggestion.value = 0
	// activeSuggestion.value = 0
}
watch(isValidSuggestion, () => {
	emits("update:isValid", isValidSuggestion.value)
	if (!isValidSuggestion.value) {
		openSuggestions()
	}
})
watch(() => modelValue.value, () => {
	inputValue.value = getStringValue(modelValue.value)
})
watch(() => inputValue.value, () => {
	if (props.restrictToSuggestions) {
		if (exactlyMatchingSuggestion.value !== undefined) {
			modelValue.value = inputValue.value
		}
	} else {
		modelValue.value = inputValue.value
	}
})


const openable = computed(() =>
	(isBlank(inputValue.value) && props.allowOpenEmpty) ||
		moreThanOneSuggestionAvailable.value ||
		(
			!exactlyMatchingSuggestion.value &&
			suggestionAvailable.value
		) ||
		(
			!isValidSuggestion.value &&
			suggestionAvailable.value
		),
)


const setSuggestion = (num: number): void => {
	if (fullSuggestionsList.value === undefined) return
	const val = suggestionLabel.value(fullSuggestionsList.value[num])

	modelValue.value = val
	inputValue.value = val
	closeSuggestions()
}
const setSelected = (): void => {
	if (activeSuggestion.value > -1) {
		// set to active suggestion
		setSuggestion(activeSuggestion.value)
	}
	if (props.values) {
		emits("submit", getStringValue(modelValue.value))
	}
}


// #region Exposed Functions
const inputBlurHandler = (_e: MouseEvent): void => {
	if (!isOpen.value) return
	// clicked on self, ignore
	if (mousedown.value) {
		mousedown.value = false
		setSelected()
		return
	}


	// not always working, sometimes things one is selecting the input node :/
	// if (el.value!.contains(e.relatedTarget as Node)) {
	// 	setSelected()
	// 	return
	// }
	if (props.restrictToSuggestions) {
		if (!exactlyMatchingSuggestion.value) {
			if (activeSuggestion.value > -1) {
				setSuggestion(activeSuggestion.value)
			} else {
				inputValue.value = getStringValue(modelValue.value)
			}
		}
	} else {
		modelValue.value = inputValue.value
	}
	if (isOpen.value) {
		closeSuggestions()
	}
}

const toggleSuggestions = (): void => {
	isOpen.value ? closeSuggestions() : openSuggestions()
}


const prevSuggestion = (): void => {
	if (!suggestionAvailable.value) return
	if (activeSuggestion.value > 0) {
		activeSuggestion.value--
	} else if (fullSuggestionsList.value) {
		activeSuggestion.value = fullSuggestionsList.value.length - 1
	}
}
const nextSuggestion = (): void => {
	if (!suggestionAvailable.value || !fullSuggestionsList.value) return
	if (activeSuggestion.value >= fullSuggestionsList.value.length - 1) {
		activeSuggestion.value = 0
	} else {
		activeSuggestion.value++
	}
}

const cancel = (): void => {
	inputValue.value = getStringValue(modelValue.value)
	closeSuggestions()
}

watchPostEffect((): void => {
	if (!openable.value) {
		closeSuggestions()
		return
	}
	if (suggestionAvailable.value) {
		if (!exactlyMatchingSuggestion.value || moreThanOneSuggestionAvailable.value) {
			openSuggestions()
		}
	} else if (isValidSuggestion.value) {
		closeSuggestions()
	}
})

const inputKeydownHandler = (e: KeyboardEvent): void => {
	if (e.key === "Enter") {
		setSelected()
		e.preventDefault()
	} else if (e.key === "Escape") {
		cancel()
		e.preventDefault()
	} else if (!isOpen.value && ["ArrowDown", "ArrowUp"].includes(e.key) && suggestionAvailable.value) {
		openSuggestions()
		e.preventDefault()
	} else if (e.key === "ArrowUp") {
		prevSuggestion()
		e.preventDefault()
	} else if (e.key === "ArrowDown") {
		nextSuggestion()
		e.preventDefault()
	}
}


defineExpose({
	nextSuggestion,
	prevSuggestion,
	cancel,
	setSelected,
	toggleSuggestions,
	closeSuggestions,
	openSuggestions,
	/** A simple keydown handler that can be passed to an input to control the component while still focused inside it. */
	inputKeydownHandler,
	/** A blur handler for the input that controls the component. This also takes care of making clicking on a suggestion work, since otherwise if canOpen is set to false in the blur handler, no click event will fire. */
	inputBlurHandler,
})

</script>
