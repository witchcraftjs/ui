/* eslint-disable @typescript-eslint/naming-convention */
import type { Meta, StoryObj } from "@storybook/vue3"
import { ref, watchEffect } from "vue"

import LibInput from "./LibInput.vue"

import { createRecorderHandler, createRecorderWatchEffect } from "../../helpers/storybook.js"
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import * as components from "../index.js"


const meta = {
	component: LibInput as any,
	args: {
		modelValue: "A",
		border: true,
		label: "Some Label",
	},
} satisfies Meta<typeof LibInput> & Meta<{ custom: string }>

export default meta
type Story = StoryObj<typeof LibInput> // & StoryObj<typeof extraArgs>

export const Primary: Story = {
	render: args => ({
		components: { ...components, LibInput },
		setup: () => ({
			args,
		})
		,

		template: `
			<div> Value: {{args.modelValue}}</div>
			<lib-input
				v-bind="args"
				v-model:values="args.values"
				v-model="args.modelValue"
			>
			Some Label
			</lib-input>
			<lib-input
				v-bind="args"
				v-model:values="args.values"
				v-model="args.modelValue"
			>
			Some Label
			</lib-input>
		`,
	}),
}

export const Disabled: Story = {
	...Primary,
	args: {
		disabled: true,
	},
}
export const Readonly: Story = {
	...Primary,
	args: {
		readonly: true,
	},
}
export const Invalid: Story = {
	...Primary,
	args: {
		valid: false,
	},
}

export const AttrsPassword: Story = {
	...Primary,
	args: {
		type: "password",
	} as any,
}
export const AttrsDate: Story = {
	...Primary,
	args: {
		type: "date",
	} as any,
}
export const AttrsNumber: Story = {
	...Primary,
	args: {
		type: "number",
	} as any,
}

export const WithAutosuggest = {
	...Primary,
	args: {
		suggestions: ["A", "AB", "ABC"],
	},
}
export const Borderless = {
	...Primary,
	args: {
		border: false,
		suggestions: ["A", "AB", "ABC"],
	},
}

export const AutosuggestSelectLike = {
	...WithAutosuggest,
	args: {
		...WithAutosuggest.args,
		restrictToSuggestions: true,
	},
}
export const AutosuggestSelectLikeShowAllUnrestricted = {
	...WithAutosuggest,
	args: {
		...WithAutosuggest.args,
		restrictToSuggestions: false,
		suggestionsFilter: (_input: string, items: string[]) => items,
	},
}
export const AutosuggestObjectOptions = {
	...WithAutosuggest,
	args: {
		...WithAutosuggest.args,
		restrictToSuggestions: true,
		suggestions: [
			{ label: "A", other: "some data A" },
			{ label: "AB", other: "some data AB" },
			{ label: "ABC", other: "some data ABC" },
		],
		suggestionLabel: (item: any) => item.label,
	},
}

export const Slots: Story = {
	render: args => ({
		components: { ...components, LibInput },
		setup: () => ({
			args,
		})
		,

		template: `
			<div> Value: {{args.modelValue}}</div>

			<lib-input
				v-bind="args"
				v-model="args.modelValue"
				v-model:values="args.values"
			>
				<template #label>
					Custom Label Slot
				</template>
				<template #left>
					<lib-button  class="px-0" :border="false" :label="'none'">
						<fa :icon="'chevron-left'"/>
					</lib-button>
				</template>
				<template #right>
					<lib-button  class="px-0" :border="false"  :label="'none'">
						<fa :icon="'chevron-right'"/>
					</lib-button>
				</template>
			</lib-input>
		`,
	}),
}
/** Press enter to add a value. */
export const WithMultipleValues: Story = {
	render: args => ({
		components: { ...components, LibInput },
		setup: () => ({
			args,
		})
		,

		template: `
			<div> Value: {{args.modelValue}}</div>
			<lib-input
				v-bind="args"
				v-model="args.modelValue"
				v-model:values="args.values"
			>
				<template #left>
					<lib-button class="px-0" :border="false">
						<fa :icon="'tags solid'"/>
					</lib-button>
				</template>
			</lib-input>
		`,
	}),
	args: {
		values: ["A", "B", "C"],
	},
}

export const WithMultipleValuesWithSuggestions = {
	...WithMultipleValues,
	args: {
		...WithMultipleValues.args,
		suggestions: ["A", "AB", "ABC"],
	},
}
export const WithMultipleValuesDisabled = {
	...WithMultipleValues,
	args: {
		...WithMultipleValues.args,
		disabled: true,
	},
}
export const WithMultipleValuesReadonly = {
	...WithMultipleValues,
	args: {
		...WithMultipleValues.args,
		readonly: true,
	},
}

export const InputSlotReplacement: Story = {
	render: args => ({
		components: { ...components, LibInput },
		setup: () => {
			const recording = ref(false)
			const recordingValue = ref("")
			const modelValue = ref("K E Y S")
			const values = ref(args.values ?? [])
			const recorderEl = ref(null)
			const recorder = createRecorderHandler(recordingValue, recording, modelValue, recorderEl)
			watchEffect(createRecorderWatchEffect(recordingValue, recording, modelValue, values as any))
			return {
				recorder,
				recording,
				recordingValue,
				recorderEl,
				modelValue,
				values,
				args,
			}
		}
		,

		template: `
			<div> Value: {{modelValue}} {{values}} {{recording}}</div>
			<lib-input
				v-bind="args"
				v-model="modelValue"
				v-model:values="values"
			>
				<template #input >
					<lib-recorder
						class="p-0"
						v-extract-root-el="_ => recorderEl = _"
						:border="false"
						:recordingValue="recordingValue"
						:recorder="recorder"
						v-model:recording="recording"
						v-model="modelValue"
						@recorder:click="recording = !recording"
						@recorder:blur="recordingValue = modelValue; recording = false"
					/>
				</template>
				<template #left>
					<fa :icon="'keyboard solid'"/>
				</template>
			</lib-input>
		`,
	}),
	args: {
		values: ["A", "B", "C"],
	},
}


export const NextToButton: Story = {
	render: args => ({
		components: { ...components, LibInput },
		setup: () => ({
			args,
		}),

		template: `
		<div class="flex gap-2 items-center">
			<lib-input
				v-bind="args"
				v-model:values="args.values"
				v-model="args.modelValue"
:label="undefined"
			>
			</lib-input>
			<lib-button>Button</lib-button>
		</div>
		`,
	}),
}

