<template>
<!-- reka's filter does not work well, specially with lowercase/uppercase, e.g. A !== A but a === A ??? -->
<ComboboxRoot
	:ignore-filter="true"
	:class="twMerge(`combobox-root relative`, $attrs?.class as any)"
	v-bind="{ ...$attrs, class: undefined }"
	:reset-search-term-on-select="true"
	:reset-search-term-on-blur="true"
	:open-on-click="true"
	ref="comboboxRootComponent"
	v-model:open="open"
	v-model="modelValue"
>
	<ComboboxAnchor
		class="combobox-anchor justify-between flex"
	>
		<div
			:class="twMerge(`
				combobox--input-wrapper
				flex
				items-center
				justify-between
				rounded-sm
				px-1
				leading-none
				fg-inherit
				bg-inherit
				outlined-within:border-accent-500
				gap-2
				focus-outline-none
				focus-outline-hidden
				w-full
				min-w-0
			`, errorMessage !== false && `!border-danger-500`,
				border &&`
					border
					border-neutral-300
					dark:border-neutral-700
					bg-neutral-100
					dark:bg-neutral-800/50
					focus:bg-bg
					dark:focus:bg-neutral-800
					dark:focus:border-accent-500
					focus-within:border-accent-500
					dark:focus-within:border-accent-500
					has-[input:invalid]:border-danger-500
					invalid:border-danger-500
				`,
				open && popupSide === 'top' && `rounded-tl-none rounded-tr-none`,
				open && popupSide === 'bottom' && `rounded-bl-none rounded-br-none`
			)"
		>
			<!-- @vue-expect-error aria/keydown can be defined -->
			<ComboboxInput
				:id="id"
				:display-value="display"
				spellcheck="false"
				:aria-invalid="errorMessage !== false"
				:aria-busy="loading"
				:aria-errormessage="ariaDescribedBy"
				:class="twMerge(`
					combobox--input
					bg-transparent
					min-w-[70px]
					w-full
					outline-hidden
					px-1
				`,
					inputProps?.class
				)"
				v-bind="{ ...inputProps, class: undefined }"
				:aria-describedby="ariaDescribedBy"
				v-model="searchTerm"
				@keydown.enter="save"
			/>
			<Transition>
				<slot
					v-if="showLoadingIndicator"
					name="loading-indicator"
				>
					<WIcon
						v-if="showLoadingIndicator"
						aria-label="Loading suggestions"
						class="
						combobox--loading-indicator
						animate-spin
						text-neutral-500
						-mr-1
					"
					>
						<i-lucide-loader-circle/>
					</WIcon>
				</slot>
			</Transition>
			<ComboboxTrigger
				:as-child="true"
			>
				<slot
					name="trigger"
					v-bind="{ open }"
				>
					<WButton
						:border="false"
						class="combobox--toggle p-0"
						:aria-label="open ? 'Close' : 'Open'"
					>
						<slot
							name="toggle"
							:is-open="open"
						>
							<WIcon
								:class="twMerge(`combobox--toggle scale-150`, open && `rotate-180`)"
							>
								<i-chevron-caret-down/>
							</WIcon>
						</slot>
					</WButton>
				</slot>
			</ComboboxTrigger>
		</div>
	</ComboboxAnchor>
	<ComboboxPortal :to="to">
		<ComboboxContent
			v-if="showEmptyLabel || filtered.length > 0 || errorMessage !== false"
			:style="contentStyle"
			:class="twMerge(`
					combobox--content
					z-100
					w-[var(--reka-combobox-trigger-width)]
					align-end
					bg-white
					dark:bg-neutral-900
					will-change-[opacity,transform]
					data-[side=top]:animate-slideDownAndFade
					data-[side=right]:animate-slideLeftAndFade
					data-[side=bottom]:animate-slideUpAndFade
					data-[side=left]:animate-slideRightAndFade
					border-neutral-300
					dark:border-neutral-700
					border
					rounded-sm
					shadow-lg
					shadow-black/50
					data-[side=bottom]:border-t-0
					data-[side=top]:border-b-0
					dark:data-[side=bottom]:border-t-0
					dark:data-[side=top]:border-b-0
					data-[side=bottom]:rounded-tl-none
					data-[side=bottom]:rounded-tr-none
					data-[side=top]:rounded-bl-none
					data-[side=top]:rounded-br-none
					max-h-[500px]
					overflow-y-auto
				`, contentProps?.class)"
			ref="contentComponent"
			v-bind="{
				side: 'bottom',
				position: 'popper',
				avoidCollisions: true,
				prioritizePosition: true,
				...contentProps,
				class: undefined
			}"
		>
			<ComboboxViewport

				class="combobox--viewport flex flex-col"
			>
				<Transition>
					<div
						v-if="useSlots()['header']"
						:id="`${id}-instruction`"
						class="
							combobox--popup-header
							px-2
							flex
							items-center
							justify-center
						"
					>
						<slot
							:filtered="filtered"
							:is-showing-empty-label="showEmptyLabel"
							name="header"
							class="
								text-neutral-800
								dark:text-neutral-200
								combobox--popup-label
								text-ellipsis
								overflow-hidden
								whitespace-nowrap
							"
						/>
					</div>
				</Transition>
				<slot
					v-if="errorMessage !== false"
					name="invalid"
					v-bind="{ searchTerm, errorMessage, id: `${id}-error`, role: 'alert' }"
				>
					<div
						:id="`${id}-error`"
						role="alert"
						class="
							combobox--error-message
							text-danger-500
							dark:text-danger-500
							text-sm
							px-2
							py-1
							bg-danger-100
							dark:bg-danger-800
							flex
							items-center
							justify-center
						"
					>
						{{ errorMessage }}
					</div>
				</slot>
				<ComboboxEmpty
					v-if="showEmptyLabel"
					class="
						combobox--empty
						px-2
						text-center
						text-neutral-800
						dark:text-neutral-200
						bg-neutral-100
						dark:bg-neutral-800
					"
				>
					{{ emptyLabel }}
				</ComboboxEmpty>
				<slot
					name="suggestions"
					v-bind="{ filtered, display, searchTerm }"
				>
					<div
						class="
						combobox--suggestions
						flex-col
						flex
						max-h-[500px]
						overflow-y-auto
					"
					>
						<ComboboxItem
							class="
								combobox--suggestion
								flex
								justify-between
								gap-2
								px-2
								cursor-pointer
								data-[highlighted]:outline-hidden
								data-[highlighted]:bg-accent-200
								data-[highlighted]:text-accent-800
								dark:data-[highlighted]:bg-accent-800
								dark:data-[highlighted]:text-accent-200
							"
							:value="suggestion"
							v-for="(suggestion, index) in filtered"
							:key="index"
						>
							<slot
								name="suggestion-icon"
								v-bind="{ suggestion: suggestion as Exclude<TSuggestion, any[]> }"
							/>
							<slot
								name="suggestion"
								v-bind="{
									suggestion: suggestion as Exclude<TSuggestion, any[]>,
									suggestionText: display(suggestion)
								}"
							>
								<div
									class="
									combobox--suggestion-label
								"
								>
									{{ display(suggestion) }}
								</div>
							</slot>
						</ComboboxItem>
					</div>
				</slot>
			</ComboboxViewport>
		</ComboboxContent>
	</ComboboxPortal>
</ComboboxRoot>
</template>

<script setup lang="ts" generic="TSuggestion extends NonNullable<AcceptableValue>">
import type { AcceptableValue, ComboboxContentEmits, ComboboxContentProps, ComboboxInputEmits, ComboboxInputProps } from "reka-ui"
import {
	ComboboxAnchor,
	ComboboxContent,
	ComboboxEmpty,
	ComboboxInput,
	ComboboxItem,
	ComboboxPortal,
	ComboboxRoot,
	ComboboxTrigger,
	ComboboxViewport, useFilter } from "reka-ui"
import type { EmitsToProps, HTMLAttributes, InputHTMLAttributes } from "vue"
import { computed, nextTick, ref, useAttrs, useSlots, useTemplateRef, watch } from "vue"

import { useDelayedLoadingIndicator } from "../../composables/useDelayedLoadingIndicator.js"
import { type SuggestionsDisplayProps, useDisplayForReka } from "../../composables/useDisplayForReka.js"
import { useFallbackId } from "../../composables/useFallbackId.js"
import { usePopupConstrainToStyle } from "../../composables/usePopupConstrainToStyle.js"
import { usePreHydrationValue } from "../../composables/usePreHydrationValue.js"
import type { PopupConstrainToProps } from "../../types/index.js"
import { twMerge } from "../../utils/twMerge.js"
import WButton from "../WButton/WButton.vue"
import WIcon from "../WIcon/WIcon.vue"

const $attrs = useAttrs()

const emit = defineEmits<{
	(e: "save", value: string): void
	(e: "new", value: string): void
}>()

const props = withDefaults(defineProps<
	& SuggestionsDisplayProps<TSuggestion>
	& PopupConstrainToProps
	& {
		id?: string
		border?: boolean
		to?: string
		/**
		 * Validates the input, return true if valid, otherwise return an error message.
		 *
		 * If the input is invalid, modelValue is not updated. Empty inputs are visually valid, but they cannot trigger saves or or any setting of modelValue.
		 *
		 * If restrictToSuggestions is true, the input will be invalid if there is no exact match.
		 *
		 * `save` will not be emitted when the input is invalid.
		 *
		 * To show an error message, return a string from the function.
		 */
		isValid?: (searchTerm: string) => true | string
		suggestions: TSuggestion[]
		/** Shown in the popup when the search term is valid, not empty, not already selected, there are no suggestions, and restrictToSuggestions is false. Defaults to undefined. */
		emptyLabel?: string
		/** The popup can't be styled via the regular class attr because it's teleported. You can also pass any reka ComboboxContent options. */
		contentProps?: { class?: string, to?: string } & HTMLAttributes & ComboboxContentProps & EmitsToProps<ComboboxContentEmits>
		/** Disables the filter. */
		ignoreFilter?: boolean
		/** If false, modelValue is set to the search term (so long as it's valid). */
		restrictToSuggestions?: boolean
		/** Input attributes or reka-ui ComboboxInput props. */
		inputProps?: Omit<InputHTMLAttributes, "class"> & { class?: string } & HTMLAttributes & ComboboxInputProps & EmitsToProps<ComboboxInputEmits>
	}>(), {
	border: true,
	ignoreFilter: false,
	emptyLabel: undefined,
	isValid: (_: string) => true as const,
	restrictToSuggestions: false,
	to: "#root"
})
const finalId = useFallbackId(props)

const contentStyle = usePopupConstrainToStyle("combobox-content", props, [props?.contentProps?.style])

const modelValue = defineModel<TSuggestion>({ required: false, default: "" })
usePreHydrationValue(finalId, modelValue)
const open = defineModel<boolean>("open", { required: false, default: false })
const searchTerm = defineModel<string>("searchTerm", { default: "" })
const display = useDisplayForReka(props)

const { contains } = useFilter()
const filtered = computed(() => {
	const f = props.ignoreFilter
		? props.suggestions
		: props.suggestions.filter(v => {
				return contains(display(v), searchTerm.value)
			})
	if ((f?.length ?? 0) === 0 && props.restrictToSuggestions) {
		return props.suggestions
	} else {
		return f
	}
})

const errorMessage = computed(() => {
	if (searchTerm.value === "") return false
	const isExactMatch = filtered.value.find(v => display(v) === searchTerm.value)
	if (!props.restrictToSuggestions && isExactMatch) return false
	const validation = props.isValid(searchTerm.value)
	if (validation === true) return false
	return validation
})


watch(searchTerm, () => {
	const isExactMatch = filtered.value.find(v => display(v) === searchTerm.value)
	if (isExactMatch) {
		modelValue.value = isExactMatch
	}
})


function save(e: Event) {
	if (errorMessage.value !== false || searchTerm.value === "") {
		open.value = false
		return
	}
	e.preventDefault()
	emit("save", searchTerm.value)
	open.value = false
}

const loading = defineModel<boolean>("loading", { default: false })
const showLoadingIndicator = useDelayedLoadingIndicator(loading)

const showEmptyLabel = computed(() => {
	return errorMessage.value === false
		&& !props.restrictToSuggestions
		&& searchTerm.value !== ""
		&& props.emptyLabel !== ""
		&& !props.suggestions.some(s => display(s) === searchTerm.value)
})

const ariaDescribedBy = computed(() => {
	const ids = []
	if (open.value) ids.push(`${props.id}-instruction`)
	if (errorMessage.value !== false) ids.push(`${props.id}-error`)
	if ("ariaDescribedby" in $attrs) ids.push($attrs.ariaDescribedby as any)
	return ids.join(" ") || undefined
})

const contentComp = useTemplateRef("contentComponent")
const popupSide = ref<"top" | "right" | "bottom" | "left" | undefined>(undefined)
watch(open, () => {
	nextTick(() => {
		if (open.value && contentComp.value?.$el) {
			popupSide.value = contentComp.value.$el.getAttribute("data-side")
		} else {
			popupSide.value = undefined
		}
	})
})
</script>
