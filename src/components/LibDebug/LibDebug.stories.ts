/* eslint-disable @typescript-eslint/naming-convention */
import type { Meta, StoryObj } from "@storybook/vue3"

import LibDebug from "./LibDebug.vue"

import { crop } from "@alanscodelog/utils/crop"

import * as components from "../index.js"


const meta: Meta<typeof LibDebug> = {
	component: LibDebug,
	args: {
		value: { any: ["any", { value: "any" }]},
	},
}

export default meta
type Story = StoryObj<typeof LibDebug>


export const Primary: Story = {
	render: args => ({
		components,
		setup: () => ({ args }),
		template: `
			<lib-debug v-bind="args" />
		`,
	}),
}
export const WithCustomTab: Story = {
	...Primary,
	args: {
		...Primary.args,
		value: { any: ["any", { value: "any" }]},
		tab: 2,
	},
}
export const NoValue: Story = {
	...Primary,
	args: {
		...Primary.args,
		value: undefined,
	},
}
export const StringWithWhitespace: Story = {
	...Primary,
	args: {
		...Primary.args,
		value: crop`
	 		Manually
	 			Indented
	 				String
	 	`,
	},
}

