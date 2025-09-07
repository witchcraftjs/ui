/* eslint-disable @typescript-eslint/naming-convention */
import type { Meta, StoryObj } from "@storybook/vue3"

import Label from "./LibLabel.vue"

import * as components from "../index.js"

const meta: Meta<typeof Label> = {
	component: Label,
	title: "Components/Label",
	args: {
		slot: "label"
	}
}

export default meta
type Story = StoryObj<typeof Label>

export const Primary: Story = {
	render: args => ({
		components,
		setup: () => ({ args }),
		template: `
				<lib-label v-bind="args">{{args.slot}}</lib-label>
				<br/>
				In flex col with input:
				<div class="flex flex-col">
					<lib-label v-bind="args">{{args.slot}}</lib-label>
					<lib-simple-input modelValue="some input"></lib-simple-input>
				</div>
		`
	})
}
