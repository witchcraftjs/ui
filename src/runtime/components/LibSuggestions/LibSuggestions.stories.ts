/* eslint-disable @typescript-eslint/naming-convention */
import type { StoryObj } from "@storybook/vue3"
import { computed, onMounted, ref } from "vue"
import type { ComponentExposed } from "vue-component-type-helpers"

import LibSuggestions from "./LibSuggestions.vue"

import * as components from "../index.js"

const meta = {
	component: LibSuggestions,
	title: "Components/Suggestions",
	args: {
		id: "some-id",
		modelValue: "",
		label: "Some Label",
		border: true,
		suggestions: ["A", "AB", "ABC", "B", "BC", "C", "ABCDEFGHIJKLMNOPQRSTUVWXYZ"]
	}
} // satisfies Meta<typeof LibSuggestions> & Meta<{ custom: string }>

export default meta
type Story = StoryObj<typeof LibSuggestions> // & StoryObj<typeof extraArgs>

/**
 * The suggestions component is just the dropdown part.
 *
 * Here it is decoupled from the input.
 *
 * More examples can be found in the input component.
 */
export const Primary: Story = {
	render: args => ({
		components: { ...components, LibSuggestions },

		setup: () => {
			const inputValue = ref(args.modelValue)
			const modelValue = ref(args.modelValue)
			const drawer = ref<ComponentExposed<typeof LibSuggestions> | null>(null)
			const keydownHandler = (e: KeyboardEvent): void => {
				drawer.value?.inputKeydownHandler(e)
			}
			const suggestions = computed(() => drawer.value?.suggestions)
			const blurHandler = (e: MouseEvent) => {
				drawer.value?.inputBlurHandler(e)
			}
			onMounted(() => {
				drawer.value?.suggestions.open()
			})
			return {
				args,
				inputValue,
				modelValue,
				isOpen: ref(false),
				suggestions,
				drawer,
				keydownHandler,
				blurHandler
			}
		},

		template: `
			<div class="flex flex-col gap-3">
			Temporary Value: {{inputValue}}
			<br/>
			Model Value (Final Value): <span class="inline-block" data-testid="model-value">{{modelValue}}</span>\n
			
<br/>
			Selected: {{suggestions?.filtered[suggestions.active]}}
			<label>Some Label</label>
				<lib-simple-input
					:class="isOpen ? 'open' : ''"
					v-model="inputValue"
					@focus="suggestions.open()"
					@blur="blurHandler"
					@keydown="keydownHandler"
				></lib-simple-input>
				<lib-suggestions
					ref="drawer"
					v-bind="{...args}"
					@update:isOpen="isOpen = $event"
					v-model="modelValue"
					v-model:inputValue="inputValue"
				>
					<template #item={item}>
						{{item}}
					</template>
				</lib-suggestions>
			</div>
		`
	})
}

export const RestrictToSuggestions: Story = {
	...Primary,
	args: {
		...Primary.args,
		restrictToSuggestions: true
	}

}
export const AlwaysShowAllSuggestions = {
	...Primary,
	args: {
		...Primary.args,
		restrictToSuggestions: true,
		suggestionsFilter: (_input: string, items: string[]) => items
	}

}
export const AlwaysShowAllSuggestionsAndNoRestrictToSuggestions = {
	...Primary,
	args: {
		...Primary.args,
		restrictToSuggestions: false,
		suggestionsFilter: (_input: string, items: string[]) => items
	}

}
export const CustomSuggestionsObject = {
	...Primary,
	args: {
		...Primary.args,
		restrictToSuggestions: true,
		suggestions: [
			{ label: "A", other: "some data A" },
			{ label: "AB", other: "some data AB" },
			{ label: "ABC", other: "some data ABC" },
			{ label: "ABCDEFGHIJKLMNOPQRSTUVWXYZ", other: "some data ABCDEFGHIJKLMNOPQRSTUVWXYZ" }
		],
		suggestionLabel: (item: any) => item.label
	}

}
