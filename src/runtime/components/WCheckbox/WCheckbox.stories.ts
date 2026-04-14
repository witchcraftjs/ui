/* eslint-disable @typescript-eslint/naming-convention */
import type { Meta, StoryObj } from "@storybook/vue3"

import * as components from "../index.js"

const meta = {
	component: components.WCheckbox,
	title: "Components/Checkbox",
	args: {
		modelValue: true,
		label: "Label"
	}
} satisfies Meta<typeof components.WCheckbox> & Meta<{ custom: string }>

export default meta
type Story = StoryObj<typeof components.WCheckbox> // & StoryObj<typeof extraArgs>

export const Primary: Story = {
	render: args => ({
		components,
		setup: () => ({ args }),
		template: `
			<WCheckbox v-bind="args" v-model="args.modelValue"></WCheckbox>
			<br>
			Opposite State:
			<br>
			<WCheckbox v-bind="args" :modelValue="!args.modelValue" @update:modelValue="args.modelValue = !$event"></WCheckbox>
		`
	})
}

export const Disabled = {
	...Primary,
	args: {
		disabled: true
	}
}
