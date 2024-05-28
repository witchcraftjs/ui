<template>
<div
	v-if="$isOpen"
	:id="`suggestions-${id}`"
	class="
			suggestions
			bg-bg
			dark:bg-fg
		"
	:data-open="$isOpen"
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
					px-2
				`,
			index=== activeSuggestion && `bg-accent-200 dark:bg-accent-800`
		)"
		:aria-selected="index === activeSuggestion ? true : false"
		:aria-label="item"
		v-for="(item, index) in fullSuggestionsList"
		:key="item"
		@mouseover="activeSuggestion = index"
		@mousedown="activeSuggestion = index; mousedown = true;"
		@mouseup="activeSuggestion = index; mousedown = false;"
		@click="setSelected()"
	>
		<slot name="item" :item="item" :index="index">
			{{ item }}
		</slot>
	</div>
</div>
</template>
<script setup lang="ts" generic="T extends string | object">

import { isBlank } from "@alanscodelog/utils/isBlank.js"
import { isObject } from "@alanscodelog/utils/isObject.js"
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
	(e: "update:isOpen", val: boolean): void
}>()


const props = defineProps({
	...linkableByIdProps(),
	...suggestionsProps,
	...baseInteractiveProps,
	...multiValueProps,
	canOpen: { type: Boolean as PropType<boolean>, required: false, default: false },
	values: { type: Array as PropType<string[]>, required: false, default: () => []},
})

/**
 * The final valid value. This is *not* the value you want to share with the input. If `restrictToSuggestions` is true this will not update on any invalid values that `inputValue` might be set to.
 */
const $modelValue = defineModel<string>("modelValue", { required: true })
/**
 * If the element is bound to an input, this is the value that the input should be sharing.
 *
 * It allows the component to read even invalid output, and also to reset that invalid output when either modelValue is set to a new value, or when the component is closed via cancel.
 */
const $inputValue = defineModel<string >("inputValue", { default: "" })
const $isValid = defineModel<boolean>("isValid", { required: false, default: true })
const _isOpen = ref(false)
const $isOpen = computed<boolean>({
	get: () => _isOpen.value,
	set: (val: boolean) => {
		_isOpen.value = val
		emits("update:isOpen", val)
	},
})

const activeSuggestionRef = ref<number>(-1)
const activeSuggestion = computed({
	get: () => activeSuggestionRef.value,
	set: (val: number) => {
		activeSuggestionRef.value = val
		emits("update:activeSuggestion", activeSuggestionRef.value)
	},
})


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


const suggestionsFilter = computed(() =>
	props.suggestionsFilter ?? defaultSuggestionsFilter)


const suggestionsList = computed(() => {
	if (props.suggestions) {
		const res = suggestionsFilter.value($inputValue.value, props.suggestions)
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
		$inputValue.value === suggestionLabel.value(suggestion)))

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

const openable = computed(() =>
	props.canOpen && (
		(isBlank($inputValue.value) && props.allowOpenEmpty) ||
		moreThanOneSuggestionAvailable.value ||
		(
			!exactlyMatchingSuggestion.value &&
			suggestionAvailable.value
		) ||
		(
			!isValidSuggestion.value &&
			suggestionAvailable.value
		)
	),
)


const closeSuggestions = (): void => {
	$isOpen.value = false
	mousedown.value = false
	activeSuggestion.value = -1
}
const openSuggestions = (): void => {
	if (!openable.value) return
	$isOpen.value = true
	// see delay close
	if (activeSuggestion.value === -1) {
		if (exactlyMatchingSuggestion.value) {
			activeSuggestion.value = suggestionsList.value?.indexOf(exactlyMatchingSuggestion.value) ?? -1
		} else {
			activeSuggestion.value = 0
		}
	}
	// activeSuggestion.value = 0
}
watch(() => props.canOpen, val => {
	if (!val) {
		closeSuggestions()
	} else {
		openSuggestions()
	}
})
watch(isValidSuggestion, () => {
	$isValid.value = isValidSuggestion.value
	if (!isValidSuggestion.value) {
		openSuggestions()
	}
})
watch(() => $modelValue.value, () => {
	$inputValue.value = getStringValue($modelValue.value)
})
watch(() => $inputValue.value, () => {
	if (props.restrictToSuggestions && !exactlyMatchingSuggestion.value) {
		return
	}
	$modelValue.value = $inputValue.value
	const i = suggestionsList.value?.indexOf(exactlyMatchingSuggestion.value) ?? -1
	if (
		i === -1
		&& props.restrictToSuggestions
		&& exactlyMatchingSuggestion.value !== undefined
	) return
	activeSuggestion.value = i
})
watchPostEffect((): void => {
	if (!openable.value) {
		closeSuggestions()
		return
	}
	if (suggestionAvailable.value) {
		if (!$isOpen.value && (!exactlyMatchingSuggestion.value || moreThanOneSuggestionAvailable.value)) {
			openSuggestions()
		}
	} else if (isValidSuggestion.value) {
		closeSuggestions()
	}
})


function setSuggestion(num: number): void {
	if (fullSuggestionsList.value === undefined) return
	const val = suggestionLabel.value(fullSuggestionsList.value[num])

	$modelValue.value = val
	$inputValue.value = val
	closeSuggestions()
}

// #region Exposed Functions
const setSelected = (submit: boolean = props.values !== undefined): void => {
	if (activeSuggestion.value > -1) {
		// set to active suggestion
		setSuggestion(activeSuggestion.value)
	}
	if (submit) {
		emits("submit", getStringValue($modelValue.value))
	}
}


const inputBlurHandler = (_e: MouseEvent): void => {
	if (!$isOpen.value) return
	// clicked on self, ignore
	if (mousedown.value) {
		mousedown.value = false
		setSelected(true)
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
				$inputValue.value = getStringValue($modelValue.value)
			}
		}
	} else {
		$modelValue.value = $inputValue.value
	}
	if ($isOpen.value) {
		closeSuggestions()
	}
}

const toggleSuggestions = (): void => {
	$isOpen.value ? closeSuggestions() : openSuggestions()
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
	$inputValue.value = getStringValue($modelValue.value)
	closeSuggestions()
}


const inputKeydownHandler = (e: KeyboardEvent): void => {
	if (e.key === "Enter") {
		setSelected(true)
		e.preventDefault()
	} else if (e.key === "Escape") {
		cancel()
		e.preventDefault()
	} else if (!$isOpen.value && ["ArrowDown", "ArrowUp"].includes(e.key) && suggestionAvailable.value) {
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
