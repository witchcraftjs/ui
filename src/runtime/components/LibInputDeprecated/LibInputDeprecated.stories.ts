/* eslint-disable @typescript-eslint/naming-convention */
import type { Meta, StoryObj } from "@storybook/vue3"
import { ref, watchEffect } from "vue"

import LibInputDeprecated from "./LibInputDeprecated.vue"

import IconFaChevronLeft from "~icons/fa6-solid/chevron-left"
import IconFaChevronRight from "~icons/fa6-solid/chevron-right"
import IconFaSolidKeyboard from "~icons/fa6-solid/keyboard"
import IconFaSolidTags from "~icons/fa6-solid/tags"

import { vExtractRootEl } from "../../directives/vExtractRootEl.js"
import { createRecorderHandler, createRecorderWatchEffect } from "../../helpers/storybook.js"
import Icon from "../Icon/Icon.vue"
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import * as components from "../index.js"
import {
	playBasicVModel,
	playMultipleValues
} from "../shared/storyHelpers/playInput.js"
import {
	playBasicClickSelect,
	playBasicKeyboardSelect,
	playBasicSelect,
} from "../shared/storyHelpers/playSuggestions.js"

const meta = {
	component: LibInputDeprecated as any,
	title: "Components/Combobox",
	args: {
		border: true,
		label: "Some Label",
		...{
			_template: undefined,
		} as any
	},
} satisfies Meta<typeof LibInputDeprecated> & Meta<{ custom: string }>

export default meta
type Story = StoryObj<typeof LibInputDeprecated> // & StoryObj<typeof extraArgs>
const allComponents = {
	...components,
	LibInputDeprecated,
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
	inputValue: ref(args.inputValue ?? ""),
})

const setupModelValues = (args: any) => ({
	values: ref(args.values ?? undefined),
})

const Base: Story = {
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

		template: (args as any)._template ?? `
			Model Value: <span class="inline-block" data-testid="model-value">{{modelValue}}</span>\n
			<lib-simple-input-deprecated
				v-bind="args"
				v-model:values="values"
				v-model:inputValue="inputValue"
				v-model="modelValue"
				@submit="modelValue = $event"
			>
			</lib-simple-input-deprecated>
		`,
	}),
}

export const Primary: Story = {
	...Base,
	play: playBasicVModel
}

export const Disabled: Story = {
	...Base,
	args: {
		disabled: true,
	},
}
export const Readonly: Story = {
	...Base,
	args: {
		readonly: true,
	},
}
export const Invalid: Story = {
	...Base,
	args: {
		valid: false,
	},
}

export const AttrsPassword: Story = {
	...Base,
	args: {
		type: "password",
	} as any,
}
export const AttrsDate: Story = {
	...Base,
	args: {
		type: "date",
	} as any,
}
export const AttrsNumber: Story = {
	...Base,
	args: {
		type: "number",
	} as any,
}

export const Borderless = {
	...Base,
	args: {
		border: false,
		suggestions: ["A", "AB", "ABC", "ABCDEFGHIJKLMNOPQRSTUVWXYZ"],
	},
}


export const WithAutosuggest = {
	...Base,
	args: {
		suggestions: ["A", "AB", "ABC", "ABCDEFGHIJKLMNOPQRSTUVWXYZ"],
	},
	play: playAutosuggestSelectLike
}

export const WithAutosuggestNoLabel = {
	...Base,
	args: {
		label: undefined,
		suggestions: ["A", "AB", "ABC", "ABCDEFGHIJKLMNOPQRSTUVWXYZ"],
	},
	play: playAutosuggestSelectLike
}
export const WithInstantAutosuggest = {
	...Base,
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
export const AutosuggestRestrictedWithClearOnClick = {
	...WithAutosuggest,
	args: {
		...WithAutosuggest.args,
		restrictToSuggestions: true,
		_template: `
				Model Value: <span class="inline-block" data-testid="model-value">{{modelValue}}</span>\n
				Temp Value: <span class="inline-block" data-testid="temp-value">{{inputValue}}</span>\n
				<lib-simple-input-deprecated
					v-bind="args"
					v-model:values="values"
					v-model:inputValue="inputValue"
					v-model="modelValue"
					@submit="modelValue = $event"
					@click="inputValue = ''"
				>
				</lib-simple-input-deprecated>
			`
	},
	play: null,
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

			<lib-simple-input-deprecated
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
			</lib-simple-input-deprecated>
		`,
	}),
}
const MultipleValuesBase: Story = {
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
			<br/>
			Values: <span class="inline-block" data-testid="values">{{values.join(", ")}}</span>\n
			<lib-simple-input-deprecated
				v-bind="args"
				v-model="modelValue"
				v-model:values="values"
			>
				<template #left>
					<lib-button class="px-0" :border="false" :disabled="args.disabled || args.readonly">
						<icon><icon-fa-solid-tags/></icon>
					</lib-button>
				</template>
			</lib-simple-input-deprecated>
		`,
	}),
	args: {
		values: ["A", "B", "C"],
	},
	
}
/** Press enter to add a value. */
export const WithMultipleValues: Story = {
	...MultipleValuesBase,
	play: playMultipleValues
}

export const WithMultipleValuesWithSuggestions = {
	...MultipleValuesBase,
	args: {
		...MultipleValuesBase.args,
		suggestions: ["A", "AB", "ABC", "ABCDEFGHIJKLMNOPQRSTUVWXYZ"],
	},
	play: playAutosuggestSelectLike
}
export const WithMultipleValuesWithSuggestionsNoSelected = {
	...MultipleValuesBase,
	args: {
		...MultipleValuesBase.args,
		suggestions: ["A", "AB", "ABC", "ABCDEFGHIJKLMNOPQRSTUVWXYZ"],
		showSelectedValues: false,
	},
	play: playAutosuggestSelectLike
}
export const WithMultipleValuesDisabled = {
	...MultipleValuesBase,
	args: {
		...MultipleValuesBase.args,
		disabled: true,
	},
}
export const WithMultipleValuesReadonly = {
	...MultipleValuesBase,
	args: {
		...MultipleValuesBase.args,
		readonly: true,
	},
}

export const InputSlotReplacement: Story = {
	render: args => ({
		components: allComponents,
		directives: { vExtractRootEl },
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
			<br/>
			Values: <span class="inline-block" data-testid="values">{{values.join(", ")}}</span>\n
			<br/>
			Recording: <span class="inline-block" data-testid="recording">{{recording}}</span>\n
			<lib-simple-input-deprecated
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
			</lib-simple-input-deprecated>
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
			<lib-simple-input-deprecated
				v-bind="args"
				v-model:values="values"
				v-model="modelValue"
				:label="undefined"
			>
			</lib-simple-input-deprecated>
			<lib-button>Button</lib-button>
		</div>
		`,
	}),
}

