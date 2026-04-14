/* eslint-disable @typescript-eslint/naming-convention */
import { crop } from "@alanscodelog/utils/crop"
import type { Meta, StoryObj } from "@storybook/vue3"

import WDebug from "./WDebug.vue"

import * as components from "../index.js"

const meta: Meta<typeof WDebug> = {
	component: WDebug,
	title: "Components/Debug",
	args: {
		value: { any: ["any", { value: "any" }] }
	}
}

export default meta
type Story = StoryObj<typeof WDebug>

export const Primary: Story = {
	render: args => ({
		components,
		setup: () => ({ args }),
		template: `
			<WDebug v-bind="args" />
		`
	})
}
export const WithCustomTab: Story = {
	...Primary,
	args: {
		...Primary.args,
		value: { any: ["any", { value: "any" }] },
		tab: 2
	}
}
export const NoValue: Story = {
	...Primary,
	args: {
		...Primary.args,
		value: undefined
	}
}
export const StringWithWhitespace: Story = {
	...Primary,
	args: {
		...Primary.args,
		value: crop`
	 		Manually
	 			Indented
	 				String
	 	`
	}
}
