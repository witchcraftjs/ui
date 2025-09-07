/* eslint-disable @typescript-eslint/naming-convention */
import type { Meta, StoryObj } from "@storybook/vue3"

import * as components from "../index.js"

const meta = {
	component: components.LibSimpleInput,
	title: "Components/Input",
	args: {
		modelValue: "Value",
		placeholder: "Placeholder"
	}
} satisfies Meta<typeof components.LibSimpleInput> & Meta<{ custom: string }>

export default meta
type Story = StoryObj<typeof components.LibSimpleInput> // & StoryObj<typeof extraArgs>

/** Input */
export const Primary: Story = {
	args: {
		modelValue: "some value"
	},
	render: args => ({
		components,
		// eslint-disable-next-line no-console
		setup: () => ({ args, test: () => console.log("Enter") }),
		template: `
				<lib-simple-input
				@keydown="test"
				class="m-2" v-bind="args" v-model="args.modelValue" ></lib-simple-input>
				<lib-simple-input class="m-2" v-bind="{...args, modelValue:''}" ></lib-simple-input>
				`
	})
}

/** Has more reasonable min-width inside a flexbox. */
export const InsideAFlexbox: Story = {
	render: args => ({
		components,
		setup: () => ({ args }),
		template: `
				Inside a flexbox:
				<div class="flex flex-wrap">
					<lib-simple-input v-bind="args" v-model="args.modelValue"></lib-simple-input>
					<div class="border-1 border-danger-500 flex-1 whitespace-nowrap">Flex Grow: 1</div>
				</div>
		`
	}),
	args: {
		stretch: true
	}
}

export const Disabled = {
	...Primary,
	args: {
		disabled: true
	}
}
export const Readonly = {
	...Primary,
	args: {
		readonly: true
	}
}
export const Invalid = {
	...Primary,
	args: {
		valid: false
	}
}
/**
 * Intended for being wrapped.
 * Should not have any border or focus outline styles.
 */
export const Borderless = {
	...Primary,
	args: {
		border: false
	}
}

export const Numerical = {
	...Primary,
	args: {
		type: "number"
	}
}
export const NumericalInsideAFlexbox = {
	...InsideAFlexbox,
	args: {
		type: "number"
	}
}
