/* eslint-disable no-console */
import { type AnyFunction } from "@alanscodelog/utils"
import { isBlank } from "@alanscodelog/utils/isBlank.js"
import { isObject } from "@alanscodelog/utils/isObject.js"
import { pushIfNotIn } from "@alanscodelog/utils/pushIfNotIn.js"
import { removeIfIn } from "@alanscodelog/utils/removeIfIn.js"
import { computed, type Ref, ref, toRaw, watch } from "vue"

import { type SuggestionsEmits,type SuggestionsOptions } from "../components/shared/props.js"


/**
 * The logic for the suggestions component.
 *
 * Note that while object suggestions are supported, the `suggestionLabel` prop is required and $inputModel and $modelValue will still be string values (as returned by the suggestionLabel function).
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function useSuggestions<TSuggestion, TMultivalue extends boolean = false>(
	$inputValue: Ref<string>,
	$modelValue: Ref<TMultivalue extends true ? string[] : string>,
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
	if (opts.suggestions) {
		for (const suggestion of opts.suggestions) {
			suggestionLabelGuard(suggestion, opts.suggestionLabel)
		}
	}

	const getSuggestionLabel = (item: any): string => {
		suggestionLabelGuard(item, opts.suggestionLabel)
		if (isObject<any>(item)) {
			return opts.suggestionLabel!(item)
		}
		return item
	}

	const defaultSuggestionsFilter = (input: string, items: TSuggestion[]): TSuggestion[] => input === ""
		? [...items]
		: items.filter(item => {
			if (Array.isArray($modelValue.value)) {
				// always include selected values for unselecting
				if ($modelValue.value.includes(getSuggestionLabel(item))) return true
			}
			return getSuggestionLabel(item).toLowerCase().includes(input.toLowerCase())
		})
	const suggestionsFilter = computed(() => opts.suggestionsFilter ?? defaultSuggestionsFilter)

	const suggestionsList = computed(() => {
		if (opts.suggestions) {
			const suggestions = [...opts.suggestions]
			if (Array.isArray($modelValue.value) && !opts.showSelectedValues) {
				pushIfNotIn(suggestions, $modelValue.value)
			}
			const res = suggestionsFilter.value($inputValue.value, suggestions)
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
			$inputValue.value === getSuggestionLabel(suggestion)))

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
			return res
		}
		return undefined
	})


	// methods
	// returns true if the value was removed
	function setValue(val: string): boolean {
		if (Array.isArray($modelValue.value)) {
			// works like a toggle
			if ($modelValue.value.includes(val)) {
				removeIfIn($modelValue.value, val)
				return true
			} else {
				pushIfNotIn($modelValue.value, [val])
			}
		} else {
			($modelValue.value as string) = val
		}
		return false
	}

	function closeSuggestions(): void {
		if (debug) console.log("closeSuggestions")
		isOpen.value = false
		activeSuggestion.value = -1
	}
	function openSuggestions(): void {
		if (debug) console.log("openSuggestions", { openable: openable.value })
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
	
	function enterSuggestion(num: number, doClose: boolean = true): void {
		if (num < -1 || num > (filteredSuggestions.value?.length ?? 0)) return
		if (debug) console.log("enterSuggestion", num)
		if (filteredSuggestions.value === undefined) return
	
		const suggestion = filteredSuggestions.value[num]
		const val = getSuggestionLabel(suggestion)
		const wasRemoved = setValue(val)
		$inputValue.value = Array.isArray($modelValue.value) ? "" : getSuggestionLabel(suggestion)
		if (doClose) {
			closeSuggestions()
		}
		emit("submit", val, toRaw(suggestion), wasRemoved)
	}

	function enterSelected(doClose: boolean = true): void {
		if (activeSuggestion.value === -1) {
			if (!opts.restrictToSuggestions) {
				if (debug) console.log("enterSelected, unrestricted, emitting submit")
				emit("submit", $inputValue.value)
			} else {
				if (debug) console.log("enterSelected, no active suggestion, ignoring")
			}
			return
		}
		if (debug) console.log("enterSelected")
		enterSuggestion(activeSuggestion.value, doClose)
	}

	function selectSuggestion(num: number): void {
		if (debug) console.log("selectSuggestion", num)
		if (num >= -1) {
			activeSuggestion.value = num
		}
		if (num === Infinity && (filteredSuggestions.value?.length ?? 0) > 0) {
			activeSuggestion.value = filteredSuggestions.value!.length - 1
		}
	}
	
	function toggleSuggestions(): void {
		isOpen.value ? closeSuggestions() : openSuggestions()
	}

	function prevSuggestion(): void {
		if (!filteredSuggestions.value) return
		if (activeSuggestion.value > 0) {
			activeSuggestion.value--
		} else if (filteredSuggestions.value) {
			activeSuggestion.value = filteredSuggestions.value.length - 1
		}
	}

	function nextSuggestion(): void {
		if (!filteredSuggestions.value) return
		if (activeSuggestion.value >= filteredSuggestions.value.length - 1) {
			activeSuggestion.value = 0
		} else {
			activeSuggestion.value++
		}
	}
	function firstSuggestion(): void {
		selectSuggestion(0)
	}
	function lastSuggestion(): void {
		selectSuggestion(Infinity)
	}
	
	function cancel(): void {
		if (Array.isArray($modelValue.value)) {
			$inputValue.value = ""
			return
		}
		if (debug) console.log("cancel")
		$inputValue.value = getSuggestionLabel($modelValue.value)
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
		if (Array.isArray($modelValue.value)) {
			$inputValue.value = ""
		} else {
			$inputValue.value = getSuggestionLabel($modelValue.value)
		}
		if (debug) console.log("modelValue changed")
	})

	function defaultSuggestionSelector(suggestions: TSuggestion[], input: string): number {
		if (input.length === 0) return 0
		let longestMatch
		let ii = -1
		for (let i = 0; i < suggestions.length; i++) {
			const suggestion = suggestions[i]
			const label = getSuggestionLabel(suggestion)
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
		if (debug) console.log("input changed:", $inputValue.value, "modelValue:", $modelValue.value)
		if (!Array.isArray($modelValue.value) && getSuggestionLabel($modelValue.value) === $inputValue.value) return

		if (suggestionAvailable.value) {
			if (debug) console.log("input changed, suggestion available, opening suggestions")
			openSuggestions()
		}
		
		if (!opts.restrictToSuggestions && !Array.isArray($modelValue.value)) {
			if (debug) console.log("input changed, unrestricted, setting modelValue")
			setValue($inputValue.value)
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
		getLabel: getSuggestionLabel,
		isOpen,
		open: openSuggestions,
		close: closeSuggestions,
		enterSelected,
		enterIndex: enterSuggestion,
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
export function suggestionLabelGuard<TFunction extends AnyFunction>(item: any, suggestionLabeler: TFunction | undefined): asserts suggestionLabeler is TFunction {
	if (isObject<any>(item)) {
		if (!suggestionLabeler) {
			throw new Error("`suggestionLabel` must be passed if suggestions are objects.")
		}
	}
}
