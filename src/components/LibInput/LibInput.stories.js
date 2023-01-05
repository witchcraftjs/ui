/* eslint-disable no-console */
import "../../assets/global.scss"

import { library } from "@fortawesome/fontawesome-svg-core"
import { far } from "@fortawesome/free-regular-svg-icons"
import { fas } from "@fortawesome/free-solid-svg-icons"
import { reactive, watchEffect } from "vue"

import { theme } from "../../helpers"
import TestWrapper from "../../TestWrapper.vue"

import { fa, LibInput } from ".."


library.add(fas, far)

export default {
	title: "Example/Input",
	component: LibInput,
	argTypes: {
	},
}

const border = true

const Template = args => ({
	components: { LibInput, fa, TestWrapper },
	setup() {
		theme()
		return { args: {
			label: "Some Label",
			// outline: true,
			modelValue: "some value",
			border,
			...args,
		} }
	},
	backgrounds: { disable: true },
	template: `
	<test-wrapper :outline="args.outline">
		<lib-input v-bind="{...args, modelValue:''}" />
		<lib-input v-bind="{...args, label:args.label+2}" v-model="args.modelValue" />
	</test-wrapper>
	`,
})


export const Primary = Template.bind({})
const TemplateWIcon = args => ({
	...Template(args),
	template: `
		<test-wrapper :outline="args.outline">
			<lib-input v-bind="{...args, modelValue:''}">
				<fa :icon="'bell'"/>
			</lib-input>
			<lib-input v-bind="{...args, label:args.label+2}" v-model="args.modelValue">
				<fa :icon="'bell'"/>
			</lib-input>
		</test-wrapper>
	`,
})


export const WithIcon = TemplateWIcon.bind({})

export const Disabled = Template.bind({})
Disabled.args = {
	disabled: true,
}
export const Readonly = Template.bind({})
Readonly.args = {
	readonly: true,
}

export const TopLabel = Template.bind({})
TopLabel.args = {
	labelType: "top",
}

export const TopLabelWithIcon = TemplateWIcon.bind({})
TopLabelWithIcon.args = {
	labelType: "top",
}

export const TopLabelDisabled = Template.bind({})
TopLabelDisabled.args = {
	labelType: "top",
	disabled: true,
}

export const NoLabel = Template.bind({})
NoLabel.args = {
	labelType: "none",
}

export const NoLabelDisabled = Template.bind({})
NoLabelDisabled.args = {
	labelType: "none",
	disabled: true,
}
export const Attrs = Template.bind({})
Attrs.args = {
	labelType: "none",
	type: "password",
}
export const Attrs2 = Template.bind({})
Attrs2.args = {
	labelType: "none",
	type: "date",
}


const RecordingTemplate = rawArgs => ({
	...Template(rawArgs),
	setup() {
		const noModifiers = e => !e.ctrlKey && !e.altKey && !e.metaKey && !e.shiftKey
		const args = reactive({
			label: "Some Label",
			outline: true,
			modelValue: "",
			values: undefined,
			recording: false,
			recordingValue: "",
			border,
			recordingTitle: "Recording. Press enter or click away to accept. Press escape to cancel.",
			recorder: {
				keydown(e) {
					if (noModifiers(e) && e.key === "Escape") {
						args.recordingValue = args.modelValue
						args.recording = false
						e.preventDefault()
						return
					}
					if (noModifiers(e) && e.key === "Enter") {
						args.recording = false
						e.preventDefault()
						return
					}
					args.recordingValue += ` ${e.key}`
					e.preventDefault()
				},
				mousedown(e) {
					args.recordingValue += ` ${e.button}`
					e.preventDefault()
				},
				wheel(e) {
					args.recordingValue += ` ${e.deltaY > 0 ? "↓" : "↑"}`
					e.preventDefault()
				},
			},
			...rawArgs,
		})
		watchEffect(() => {
			if (!args.recording) {
				if (args.recordingValue) {
					if (args.values) {
						args.values.push(args.recordingValue)
						args.modelValue = ""
					} else {
						args.modelValue = args.recordingValue
					}
				}
				args.recordingValue = ""
			}
		})
		return {
			args,
		}
	},
	backgrounds: { disable: true },
	template: `
	<test-wrapper :outline="args.outline">
		<lib-button label="Button for Focus Before Test"></lib-button>
		Disabled:
		<lib-input v-bind="{...args, recording:true, recordingValue:'', modelValue:'some val'}" :disabled="true"/>
		Readonly:
		<lib-input v-bind="{...args, recording:true, recordingValue:'', modelValue:'some val'}" :readonly="true"/>
		Normal:
		<lib-input v-bind="{...args}" v-model:recording="args.recording" v-model="args.modelValue"/>
		<lib-button label="Button for Focus After Test"></lib-button>
	</test-wrapper>
	`,
})

export const Recording = RecordingTemplate.bind({})
Recording.args = {}
export const RecordingMultipleValues = RecordingTemplate.bind({})
RecordingMultipleValues.args = {
	values: [],
}

const MultipleValuesTemplate = args => ({
	...Template(args),
	setup() {
		return {
			args: reactive({
				label: "Some Label",
				outline: true,
				modelValue: "some value",
				blankValues: [],
				blankValue: "",
				values: [],
				border,
				...args,
			}),
		}
	},
	backgrounds: { disable: true },
	template: `
	<test-wrapper :outline="args.outline">
		<lib-input
			v-bind="{...args, label:args.label+2}"
			v-model:values="args.blankValues"
			v-model="args.blankValue"
		/>
		<lib-input
			v-bind="{...args, modelValue:'test', label:args.label+2}"
			v-model:values="args.blankValues"
		/>
		<lib-input
			v-bind="{...args, label:args.label+3}"
			v-model="args.modelValue"
			v-model:values="args.values"
		/>
	</test-wrapper>
	`,
})

export const MultipleValues = MultipleValuesTemplate.bind({})

MultipleValues.args = {
	values: ["a", "abcdefg", "ABCDEF"],
}
export const MultipleValuesDisabled = MultipleValuesTemplate.bind({})

MultipleValuesDisabled.args = {
	values: ["a", "abcdefg", "ABCDEF"],
	disabled: true,
}
export const MultipleValuesReadonly = MultipleValuesTemplate.bind({})

MultipleValuesReadonly.args = {
	values: ["a", "abcdefg", "ABCDEF"],
	readonly: true,
}

const TemplateWAutosuggest = rawArgs => ({
	...Template(rawArgs),
	setup() {
		const args = reactive({
			label: "Some Label",
			modelValue: "A",
			border,
			suggestions: ["A", "AB", "ABC", "B", "BC", "C"],
			...rawArgs,
		})
		const handleError = e => {
			console.log(e)

			e.value = args.modelValue
		}
		return {
			args,
			handleError,
		}
	},
	template: `
		<test-wrapper :outline="args.outline">
			<lib-input v-bind="{...args}" v-model="args.modelValue" v-model:values="args.values" @error="handleError">
				<template #item={item}>
					{{item}}
				</template>
			</lib-input>
		</test-wrapper>
		`,
	})


export const WithAutosuggest = TemplateWAutosuggest.bind({})
WithAutosuggest.args = { }
export const NoLabelWithAutosuggest = TemplateWAutosuggest.bind({})
NoLabelWithAutosuggest.args = { labelType: "none" }
export const TopLabelWithAutosuggest = TemplateWAutosuggest.bind({})
TopLabelWithAutosuggest.args = { labelType: "top" }
export const AutosuggestSelectLike = TemplateWAutosuggest.bind({})
AutosuggestSelectLike.args = {
	restrictToSuggestions: true,
}
export const AutosuggestObjectOptions = TemplateWAutosuggest.bind({})
AutosuggestObjectOptions.args = {
	restrictToSuggestions: true,
	suggestions: [
		{ label: "A", other: "some data A" },
		{ label: "AB", other: "some data AB" },
		{ label: "ABC", other: "some data ABC" },
	],
	suggestionLabel: item => item.label,
}
export const MultipleValuesWithAutosuggest = TemplateWAutosuggest.bind({})
MultipleValuesWithAutosuggest.args = {
	values: ["a", "b", "c"],
}
