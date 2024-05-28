/* eslint-disable @typescript-eslint/naming-convention */
import type { Meta, StoryObj } from "@storybook/vue3"

// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import * as components from "../index.js"


const meta = {
	component: components.LibCheckbox,
	args: {
		modelValue: true,
		label: "Label",
	},
} satisfies Meta<typeof components.LibCheckbox> & Meta<{ custom: string }>

export default meta
type Story = StoryObj<typeof components.LibCheckbox> // & StoryObj<typeof extraArgs>


export const Primary: Story = {
	render: args => ({
		components,
		setup: () => ({ args }),
		template: `
			<lib-checkbox v-bind="args" v-model="args.modelValue"></lib-checkbox>
			<br>
			Opposite State:
			<br>
			<lib-checkbox v-bind="args" :modelValue="!args.modelValue" @update:modelValue="args.modelValue = !$event"></lib-checkbox>
		`,
	}),
}


export const Disabled = {
	...Primary,
	args: {
		disabled: true,
	},
}
