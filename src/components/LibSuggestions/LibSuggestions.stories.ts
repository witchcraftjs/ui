/* eslint-disable @typescript-eslint/naming-convention */
import type { StoryObj } from "@storybook/vue3"
import { ref } from "vue"

import LibSuggestions from "./LibSuggestions.vue"

import * as components from "../index.js"


const meta = {
	component: LibSuggestions,
	args: {
		id: "some-id",
		modelValue: "A",
		label: "Some Label",
		border: true,
		suggestions: ["A", "AB", "ABC", "B", "BC", "C"],
	},
} // satisfies Meta<typeof LibSuggestions> & Meta<{ custom: string }>

export default meta
type Story = StoryObj<typeof LibSuggestions> // & StoryObj<typeof extraArgs>


/**
 * The suggestions component is just the dropdown part.
 *
 * Here it is decoupled from the input and forced open.
 *
 * More example can be found in the input component.
 */
export const Primary: Story = {
	render: args => ({
		components: { ...components, LibSuggestions },
		setup: () => {
			const inputValue = ref(args.modelValue)
			const modelValue = ref(args.modelValue)
			const drawer = ref<typeof LibSuggestions | null>(null)
			const keydownHandler = (e: KeyboardEvent): void => {
				drawer.value?.inputKeydownHandler(e)
			}
			const blurHandler = (e: MouseEvent) => {
				drawer.value?.inputBlurHandler(e)
				args.canOpen = false
			}
			return {
				args,
				inputValue,
				modelValue,
				canOpen: ref(true),
				isOpen: ref(false),
				drawer,
				keydownHandler,
				blurHandler,
			}
		},

		template: `
			<div class="flex flex-col gap-3">
			Temporary Value: {{inputValue}}
			Value Selected: {{modelValue}}
				<lib-simple-input
					:class="isOpen ? 'open' : ''"
					v-model="inputValue"
					@focus="args.canOpen=true"
					@blur="blurHandler"
					@keydown="keydownHandler"
				></lib-simple-input>
				<lib-suggestions
					ref="drawer"
					v-bind="{...args}"
					:canOpen="true"
					v-model="modelValue"
					v-model:inputValue="inputValue"
				>
					<template #item={item}>
						{{item}}
					</template>
				</lib-suggestions>
			</div>
		`,
	}),
	args: {
	},
}

export const RestrictToSuggestions = {
	...Primary,
	args: {
		...Primary.args,
		restrictToSuggestions: true,
	},
}
export const AlwaysShowAllSuggestions = {
	...Primary,
	args: {
		...Primary.args,
		restrictToSuggestions: true,
		suggestionsFilter: (_input: string, items: string[]) => items,
	},
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
		],
		suggestionLabel: (item: any) => item.label,
	},
}
// export const MultipleValuesWithAutosuggest = TemplateWAutosuggest.bind({})
// MultipleValuesWithAutosuggest.args = {
// 	values: ["a", "b", "c"],
// }
