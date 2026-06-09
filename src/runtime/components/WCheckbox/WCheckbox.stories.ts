/* eslint-disable @typescript-eslint/naming-convention */
import type { Meta, StoryObj } from "@storybook/vue3"

import * as components from "../index.js"

const meta: Meta<typeof components.WCheckbox> = {
	component: components.WCheckbox as any,
	title: "Components/Checkbox",
	args: {
		modelValue: true,
		label: "Label"
	}
}

export default meta
type ExtraTestArgs = Record<string, never>
type Story = StoryObj<typeof components.WCheckbox> & { args?: ExtraTestArgs }

export const Primary: Story = {
	render: _args => {
		const args = _args as any as NonNullable<Story["args"]>
		return {
			components: components as any,
			setup: () => ({ args }),
			template: `
				<WCheckbox v-bind="args" v-model="args.modelValue"></WCheckbox>
				<br>
				Opposite State:
				<br>
				<WCheckbox v-bind="args" :modelValue="!args.modelValue" @update:modelValue="args.modelValue = !$event"></WCheckbox>
			`
		}
	}
}

export const Disabled = {
	...Primary,
	args: {
		disabled: true
	}
}
