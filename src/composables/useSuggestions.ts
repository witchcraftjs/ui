/* eslint-disable no-console */
import { isBlank } from "@alanscodelog/utils/isBlank.js"
import { isObject } from "@alanscodelog/utils/isObject.js"
import { computed, type Ref, ref, watch } from "vue"

import { type SuggestionsEmits,type SuggestionsOptions } from "../components/shared/props.js"


/**
 * The logic for the suggestions component.
 *
 * Note that while object suggestions are supported, the `suggestionLabel` prop is required and $inputModel and $modelValue will still be string values (as returned by the suggestionLabel function).
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function useSuggestions<TSuggestion>(
	$inputValue: Ref<string>,
	$modelValue: Ref<string>,
	emit: SuggestionsEmits,
	opts: SuggestionsOptions<TSuggestion>,
	debug: boolean = false
) {
	if (typeof opts.suggestions?.[0] === "object" && !opts.suggestionLabel && !opts.suggestionsFilter) {
		throw new Error("`suggestionLabel` or `suggestionsFilter` must be passed if suggestions are objects.")
	}

	const isOpen = ref(false)
	const activeSuggestion = ref(-1)
	watch(isOpen, val => { emit("update:isOpen", val) })
	watch(activeSuggestion, val => { emit("update:activeSuggestion", val) })
	const defaultSuggestionsLabel = (item: any): string => {
		if (isObject<any>(item)) {
			throw new Error("`suggestionLabel` must be passed if suggestions are objects.")
		}
		return item
	}
	const suggestionLabel = computed(() => opts.suggestionLabel ?? defaultSuggestionsLabel)

	const defaultSuggestionsFilter = (input: string, items: TSuggestion[]): TSuggestion[] => input === ""
		? [...items]
		: items.filter(item => suggestionLabel.value(item).toLowerCase().includes(input.toLowerCase()))
	const suggestionsFilter = computed(() => opts.suggestionsFilter ?? defaultSuggestionsFilter)

	const suggestionsList = computed(() => {
		if (opts.suggestions) {
			const res = suggestionsFilter.value($inputValue.value, opts.suggestions)
			return res
		}
		return undefined
	})

	const suggestionAvailable = computed<boolean>(() =>
		(suggestionsList.value?.length ?? 0) > 0)

	const moreThanOneSuggestionAvailable = computed<boolean>(() =>
		(suggestionsList.value?.length ?? 0) > 1)

	const exactlyMatchingSuggestion = computed(() =>
		opts.suggestions?.find(suggestion =>
			$inputValue.value === suggestionLabel.value(suggestion)))

	const isValidSuggestion = computed(() =>
		((!opts.restrictToSuggestions && opts.isValid) || suggestionAvailable.value))

	const openable = computed(() =>
		opts.canOpen && (
			(isBlank($inputValue.value) && opts.allowOpenEmpty) ||
			suggestionAvailable.value

		)
	)

	const filteredSuggestions = computed(() => {
		if (opts.suggestions) {
			const res = (suggestionAvailable.value
				? suggestionsList.value!
				: opts.suggestions!)

			if (opts.restrictToSuggestions && !isValidSuggestion.value) return res
			if (opts.preventDuplicateValues && opts.values) {
				return res.filter(suggestion => !opts.values!.includes(suggestionLabel.value(suggestion)))
			}
			return res
		}
		return undefined
	})


	// methods

	const closeSuggestions = (): void => {
		if (debug) console.log("closeSuggestions")
		isOpen.value = false
		activeSuggestion.value = -1
	}
	const openSuggestions = (): void => {
		if (debug) console.log("openSuggestions")
		if (!openable.value) return
		if (activeSuggestion.value === -1) {
			if (exactlyMatchingSuggestion.value) {
				activeSuggestion.value = suggestionsList.value?.indexOf(exactlyMatchingSuggestion.value) ?? -1
			} else {
				activeSuggestion.value = 0
			}
		}
		isOpen.value = true
	}
	
	function enterSuggestion(num: number): void {
		if (num < -1 || num > (filteredSuggestions.value?.length ?? 0)) return
		if (debug) console.log("enterSuggestion", num)
		if (filteredSuggestions.value === undefined) return
	
		const val = suggestionLabel.value(filteredSuggestions.value[num])

		$modelValue.value = val
		$inputValue.value = val
		closeSuggestions()
		emit("submit", $modelValue.value)
	}

	const enterSelected = (): void => {
		if (activeSuggestion.value === -1) {
			if (debug) console.log("enterSelected, no active suggestion, ignoring")
			return
		}
		if (debug) console.log("enterSelected")
		enterSuggestion(activeSuggestion.value)
	}
	const selectSuggestion = (num: number): void => {
		if (debug) console.log("selectSuggestion", num)
		if (num >= -1) {
			activeSuggestion.value = num
		}
		if (num === Infinity && (filteredSuggestions.value?.length ?? 0) > 0) {
			activeSuggestion.value = filteredSuggestions.value!.length - 1
		}
	}
	
	const toggleSuggestions = (): void => {
		isOpen.value ? closeSuggestions() : openSuggestions()
	}

	const prevSuggestion = (): void => {
		if (!filteredSuggestions.value) return
		if (activeSuggestion.value > 0) {
			activeSuggestion.value--
		} else if (filteredSuggestions.value) {
			activeSuggestion.value = filteredSuggestions.value.length - 1
		}
	}

	const nextSuggestion = (): void => {
		if (!filteredSuggestions.value) return
		if (activeSuggestion.value >= filteredSuggestions.value.length - 1) {
			activeSuggestion.value = 0
		} else {
			activeSuggestion.value++
		}
	}
	const firstSuggestion = (): void => {
		selectSuggestion(0)
	}
	const lastSuggestion = (): void => {
		selectSuggestion(Infinity)
	}
	
	const cancel = (): void => {
		if (debug) console.log("cancel")
		$inputValue.value = $modelValue.value
		closeSuggestions()
	}

	
	watch(() => opts.canOpen, val => {
		if (!val) {
			if (debug) console.log("canOpen changed to false, closing suggestions")
			closeSuggestions()
		}
	})
	
	watch(openable, val => {
		if (!val) {
			if (debug) console.log("openable changed to false, closing suggestions")
			closeSuggestions()
		}
	})
	
	watch(isValidSuggestion, () => {
		if (!isValidSuggestion.value) {
			if (debug) console.log("isValidSuggestion changed to false, opening suggestions")
			openSuggestions()
		}
	})
	
	// sync vmodels and vmodel effects
	
	watch($modelValue, () => {
		$inputValue.value = $modelValue.value
		if (debug) console.log("modelValue changed")
	})

	const defaultSuggestionSelector = (suggestions: TSuggestion[], input: string): number => {
		if (input.length === 0) return 0
		let longestMatch
		let ii = -1
		for (let i = 0; i < suggestions.length; i++) {
			const suggestion = suggestions[i]
			const label = suggestionLabel.value(suggestion)
			const labelPart = label.slice(0, input.length)
			if (labelPart === input) {
				if (label.length > (longestMatch?.[0]?.length ?? 0)) {
					longestMatch = label
					ii = i
				}
			}
		}
		return ii
	}

	watch($inputValue, () => {
		if ($modelValue.value === $inputValue.value) return

		if (suggestionAvailable.value) {
			if (debug) console.log("input changed, suggestion available, opening suggestions")
			openSuggestions()
		}
		
		if (!opts.restrictToSuggestions) {
			if (debug) console.log("input changed, unrestricted, setting modelValue")
			$modelValue.value = $inputValue.value
		}
		if (exactlyMatchingSuggestion.value && suggestionsList.value) {
			if (debug) console.log("input changed, exactly matching, setting activeSuggestion")
			selectSuggestion(suggestionsList.value.indexOf(exactlyMatchingSuggestion.value))
		} else {
			if (debug) console.log("input changed, not exactly matching, finding longest match")
			
			const i =
				opts.suggestionSelector?.(filteredSuggestions.value ?? [], $inputValue.value)
				?? defaultSuggestionSelector(filteredSuggestions.value ?? [], $inputValue.value)

			selectSuggestion(i)
		}
	})


	return {
		list: suggestionsList,
		filtered: filteredSuggestions,
		active: activeSuggestion,
		available: suggestionAvailable,
		moreThanOneAvailable: moreThanOneSuggestionAvailable,
		hasExactlyMatching: exactlyMatchingSuggestion,
		/** Whether there is a valid suggestion that can be submitted. If `restrictToSuggestions` is true, this will be true if isValid is true, otherwise this is considered to be true if suggestions are available. */
		hasValidSuggestion: isValidSuggestion,
		openable,
		getLabel: suggestionLabel,
		isOpen,
		open: openSuggestions,
		close: closeSuggestions,
		enterSelected,
		enterSuggestion,
		toggle: toggleSuggestions,
		cancel,
		select: selectSuggestion,
		prev: prevSuggestion,
		next: nextSuggestion,
		first: firstSuggestion,
		last: lastSuggestion,
	}
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function useSuggestionsInputAria(
	id: Ref<string>,
	isOpen: Ref<boolean>,
	activeSuggestion: Ref<number>,
	suggestions: Ref<any | undefined>
) {
	const ariaInputProps = computed(() => ({
		"aria-autocomplete": suggestions !== undefined ? "both" as const : undefined,
		"aria-controls": suggestions !== undefined ? `suggestions-${id.value}` : undefined,
		role: suggestions ? "combobox" : undefined,
		"aria-expanded": suggestions !== undefined ? isOpen.value : undefined,
		"aria-activedescendant": isOpen.value ? `suggestion-${id.value}-${activeSuggestion.value}` : undefined,
	}))
	return ariaInputProps
}
