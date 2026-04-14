/* eslint-disable @typescript-eslint/naming-convention */
import type { Meta, StoryObj } from "@storybook/vue3"
import { ref, watch } from "vue"

import { playAllowNewValues, playBasic, playBasicClickSelect, playBasicKeyboardSelect, playValidation } from "./storyPlays.js"
import WCombobox from "./WCombobox.vue"

import * as components from "../index.js"


const meta: Meta<typeof WCombobox> = {
	component: WCombobox as any,
	title: "Components/Combobox",
	args: {
		modelValue: "",
		searchTerm: "",
		emptyLabel: "No matches found",
		suggestions: ["A", "AB", "ABC", "B", "BC", "C", "ABCDEFGHIJKLMNOPQRSTUVWXYZ"]
	}
}

export default meta

type ExtraTestArgs = {
	_simulateLoading?: boolean
	_allowSave?: boolean
	_headerTemplate?: string
}

type Story = StoryObj<typeof WCombobox> & { args?: ExtraTestArgs }

/**
 * Primary story setup to match the DOM structure expected by the
 * migrated play functions (specifically looking for data-testid="model-value").
 */
export const Primary: Story = {
	render: args => {
		const extraArgs = args as ExtraTestArgs
		return {
			components,
			setup() {
				const modelValue = ref(args.modelValue)
				const searchTerm = ref(args.searchTerm)
				const suggestions = ref([...args.suggestions!])
				const loading = ref(false)
				const simulateLoading = ref((extraArgs)._simulateLoading)
				// the component takes care of extending this so we can actually see the icon on quick loads like this
				watch(searchTerm, () => {
					if (simulateLoading.value) {
						loading.value = true
						setTimeout(() => {
							loading.value = false
						}, 1)
					}
				})
				function save(value: string) {
					if (!(extraArgs)._allowSave) return
					const newValue: any
						= typeof value === "string" && typeof suggestions.value[0] === "object"
							? { name: value, id: "new-id" }
							: value
					suggestions.value = [...suggestions.value, newValue]
					modelValue.value = newValue
				}
				return {
					args,
					modelValue,
					searchTerm,
					suggestions,
					loading,
					simulateLoading,
					save,
					extraArgs
				}
			},
			template: `
			<div class="flex flex-col gap-3">
				<div class="flex flex-col gap-1">
					<WCheckbox v-model="simulateLoading">Simulate Loading</WCheckbox>
					<WCheckbox v-model="loading">Loading (Force State)</WCheckbox>
				</div>
				<div class="text-xs text-neutral-500">
					<div>
						Current Model Value: 
						<span class="font-mono" data-testid="model-value">{{ modelValue }}</span>
					</div>
					<div>
						Current Search Term: 
						<span class="font-mono" data-testid="search-term">{{ searchTerm }}</span>
					</div>
				</div>

				<div class="flex flex-col gap-1">
					<WCombobox
						@save="save"
						v-bind="args"
						v-model="modelValue"
						v-model:searchTerm="searchTerm"
						:suggestions="suggestions"
						:loading="loading"
					>
						${(extraArgs)._headerTemplate ?? ""}
					</WCombobox>
				</div>
			</div>
		`
		}
	},
	play: async (...args) => {
		await playBasicClickSelect(...args)
		await playBasicKeyboardSelect(...args)
		await playBasic(...args)
	}
}

export const RestrictToSuggestions: Story = {
	...Primary,
	args: {
		...Primary.args,
		restrictToSuggestions: true
	},
	play: async (...args) => {
		await playBasicClickSelect(...args)
		await playBasicKeyboardSelect(...args)
		await playBasic(...args)
	}
}


export const ObjectSuggestions: Story = {
	...Primary,
	play: undefined,
	args: {
		...Primary.args,
		suggestions: [
			{ id: 1, name: "Apple" },
			{ id: 2, name: "Banana" },
			{ id: 3, name: "Cherry" }
		] as any[],
		displayKey: "name"
	}
}


export const AllowNewValues: Story = {
	...Primary,
	args: {
		...Primary.args,
		_allowSave: true,
		_headerTemplate: `
		<template #header="slotProps">
			<div v-if="slotProps.isShowingEmptyLabel" :class="slotProps.class">
				Press Enter to Add Value
			</div>
		</template>
		`
	},
	play: playAllowNewValues
}

/** Note that when allowing new values to be added, if the input is v-modeling objects, you have to transform the object before adding it to the suggestions array. */
export const ObjectSuggestionsCustomDisplay: Story = {
	...Primary,
	play: undefined,
	args: {
		...Primary.args,
		_allowSave: true,
		suggestions: [
			{ id: 1, name: "Apple" },
			{ id: 2, name: "Banana" },
			{ id: 3, name: "Cherry" }
		] as any[],
		displayEntry: (value: any) => {
			return value.name?.toLowerCase()
		}
	}
}


export const CustomHeader: Story = {
	...Primary,
	play: undefined,
	args: {
		...Primary.args,
		loading: true,
		_headerTemplate: `<template #header> Custom Header </template>`
	}
}

export const WithValidation: Story = {
	...Primary,
	args: {
		...Primary.args,
		loading: true,
		isValid: (searchTerm: string) => searchTerm === "Invalid" ? "Error Message" : true,
		modelValue: "Invalid"
	},
	play: playValidation
}

export const LoadingIndicator: Story = {
	...Primary,
	play: undefined,
	args: {
		...Primary.args,
		_simulateLoading: true
	}
}

