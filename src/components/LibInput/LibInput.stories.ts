/* eslint-disable @typescript-eslint/naming-convention */
import type { Meta, StoryObj } from "@storybook/vue3"
import { ref, watchEffect } from "vue"

import LibInput from "./LibInput.vue"

import IconFaChevronLeft from "~icons/fa6-solid/chevron-left"
import IconFaChevronRight from "~icons/fa6-solid/chevron-right"
import IconFaSolidKeyboard from "~icons/fa6-solid/keyboard"
import IconFaSolidTags from "~icons/fa6-solid/tags"

import { createRecorderHandler, createRecorderWatchEffect } from "../../helpers/storybook.js"
import Icon from "../Icon/Icon.vue"
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import * as components from "../index.js"
import { playBasicClickSelect,playBasicKeyboardSelect, playBasicSelect } from "../shared/storyHelpers/playSuggestions.js"


const meta = {
	component: LibInput as any,
	args: {
		border: true,
		label: "Some Label",
	},
} satisfies Meta<typeof LibInput> & Meta<{ custom: string }>

export default meta
type Story = StoryObj<typeof LibInput> // & StoryObj<typeof extraArgs>
const allComponents = {
	...components,
	LibInput,
	Icon,
	IconFaChevronRight,
	IconFaChevronLeft,
	IconFaSolidKeyboard,
	IconFaSolidTags,
}

const playAutosuggestSelectLike = async (context: { canvasElement: HTMLElement, args: any }) => {
	await playBasicSelect(context)
	await playBasicKeyboardSelect(context)
	await playBasicClickSelect(context)
}

const setupModelValue = (args: any) => ({
	modelValue: ref(args.modelValue ?? ""),
})

const setupModelValues = (args: any) => ({
	values: ref(args.values ?? []),
})

export const Primary: Story = {
	render: args => ({
		components: allComponents,
		setup: () => ({
			...setupModelValue(args),
			...setupModelValues(args),
			args: {
				...args,
				updateOnlyOnSubmit: args.suggestions !== undefined,
			},
		}),

		template: `
			Model Value: <span class="inline-block" data-testid="model-value">{{modelValue}}</span>\n
			<lib-input
				v-bind="args"
				v-model:values="values"
				v-model="modelValue"
				@submit="modelValue = $event"
			>
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

export const Borderless = {
	...Primary,
	args: {
		border: false,
		suggestions: ["A", "AB", "ABC", "ABCDEFGHIJKLMNOPQRSTUVWXYZ"],
	},
}


export const WithAutosuggest = {
	...Primary,
	args: {
		suggestions: ["A", "AB", "ABC", "ABCDEFGHIJKLMNOPQRSTUVWXYZ"],
	},
	play: playAutosuggestSelectLike
}
export const WithInstantAutosuggest = {
	...Primary,
	args: {
		suggestions: ["A", "AB", "ABC", "ABCDEFGHIJKLMNOPQRSTUVWXYZ"],
	},
}
export const AutosuggestRestricted = {
	...WithAutosuggest,
	args: {
		...WithAutosuggest.args,
		restrictToSuggestions: true,
	},
	play: playAutosuggestSelectLike
}
export const AutosuggestSelectLikeShowAllUnrestricted = {
	...WithAutosuggest,
	args: {
		...WithAutosuggest.args,
		restrictToSuggestions: false,
		suggestionsFilter: (_input: string, items: string[]) => items,
	},
	play: playAutosuggestSelectLike
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
			{ label: "ABCDEFGHIJKLMNOPQRSTUVWXYZ", other: "some data ABCDEFGHIJKLMNOPQRSTUVWXYZ" },
		],
		suggestionLabel: (item: any) => item.label,
	},
	play: playAutosuggestSelectLike
}

export const Slots: Story = {
	render: args => ({
		components: allComponents,
		setup: () => ({
			...setupModelValue(args),
			...setupModelValues(args),
			args: {
				...args,
				updateOnlyOnSubmit: args.suggestions !== undefined,
			},
		})
		,
		template: `
			Model Value: <span class="inline-block" data-testid="model-value">{{modelValue}}</span>\n

			<lib-input
				v-bind="args"
				v-model="modelValue"
				v-model:values="values"
			>
				<template #label>
					Custom Label Slot
				</template>
				<template #left>
					<lib-button  class="px-0" :border="false" :label="'none'">
						<icon><icon-fa-chevron-left/></icon>
					</lib-button>
				</template>
				<template #right>
					<lib-button  class="px-0" :border="false"  :label="'none'">
						<icon><icon-fa-chevron-right/></icon>
					</lib-button>
				</template>
			</lib-input>
		`,
	}),
}
/** Press enter to add a value. */
export const WithMultipleValues: Story = {
	render: args => ({
		components: allComponents,
		setup: () => ({
			...setupModelValue(args),
			...setupModelValues(args),
			args,
		})
		,

		template: `
			Model Value: <span class="inline-block" data-testid="model-value">{{modelValue}}</span>\n

			<lib-input
				v-bind="args"
				v-model="modelValue"
				v-model:values="values"
			>
				<template #left>
					<lib-button class="px-0" :border="false">
						<icon><icon-fa-solid-tags/></icon>
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
		suggestions: ["A", "AB", "ABC", "ABCDEFGHIJKLMNOPQRSTUVWXYZ"],
	},
	play: playAutosuggestSelectLike
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
		components: allComponents,
		setup: () => {
			const recording = ref(false)
			const recordingValue = ref("")
			const modelValue = ref("K E Y S")
			const values = ref<string[]>((args.values as any) ?? [])
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
			Model Value: <span class="inline-block" data-testid="model-value">{{modelValue}}</span>\n
			Values: <span class="inline-block" data-testid="values">{{values}}</span>\n
			Recording: <span class="inline-block" data-testid="recording">{{recording}}</span>\n
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
					<icon><icon-fa-solid-keyboard/></icon>
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
		components: allComponents,
		setup: () => ({
			...setupModelValue(args),
			...setupModelValues(args),
			args,
		}),

		template: `
		<div class="flex gap-2 items-center">
			<lib-input
				v-bind="args"
				v-model:values="values"
				v-model="modelValue"
:label="undefined"
			>
			</lib-input>
			<lib-button>Button</lib-button>
		</div>
		`,
	}),
}

