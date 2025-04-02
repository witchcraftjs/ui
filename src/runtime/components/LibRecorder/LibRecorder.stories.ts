/* eslint-disable @typescript-eslint/naming-convention */
import type { Meta, StoryObj } from "@storybook/vue3"
import { ref, watchEffect } from "vue"

import { createRecorderHandler, createRecorderWatchEffect } from "../../helpers/storybook.js"
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import * as components from "../index.js"
/**
 * This is a special input component designed to record any type of event.
 *
 * It requires additional setup to actually work since what and how anything is recorded is up to the needs of the application.
 *
 * This basic implementation just lists the keys. Enter accepts the recording, escape cancels back to the initial value.
 */
const meta: Meta<typeof components.LibRecorder> = {
	component: components.LibRecorder,
	title: "Components/Recorder",
	args: {
		label: "Some Label",
		recordingTitle: "Recording. Press enter or click away to accept. Press escape to cancel.",
		modelValue: "K E Y S",
	},
}

export default meta
type Story = StoryObj<typeof components.LibRecorder>

export const Primary: Story = {
	render: args => ({
		components,
		setup: () => {
			const recording = ref(false)
			const recordingValue = ref("")
			const modelValue = ref(args.modelValue)
			const recorderEl = ref(null)
			const recorder = createRecorderHandler(recordingValue, recording, modelValue, recorderEl)
			watchEffect(createRecorderWatchEffect(recordingValue, recording, modelValue))
			return {
				args,
				modelValue,
				recorder,
				recording,
				recordingValue,
				recorderEl,
			}
		},
		template: `
			<lib-recorder
				v-bind="args"
				v-extract-root-el="_ => recorderEl = _"
				:recordingValue="recordingValue"
				:recorder="recorder"
				v-model:recording="recording"
				v-model="modelValue"
				@recorder:click="recording = !recording"
			/>
		`,
	}),
}

/** Should not be tabbable or recordable. */
export const Disabled: Story = {
	...Primary,
	args: {
		disabled: true,
	},
}
/** *Should* be tabbable but not recordable. */
export const Readonly: Story = {
	...Primary,
	args: {
		readonly: true,
	},
}
/** Height should not shrink. */
export const EmptyInitialValue: Story = {
	...Primary,
	args: {
		modelValue: "",
	},
}
