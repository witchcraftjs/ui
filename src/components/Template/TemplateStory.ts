// @ts-nocheck remove when copying
/* eslint-disable @typescript-eslint/naming-convention */
import type { Meta, StoryObj } from "@storybook/vue3"

import NAME from "./NAME.vue"

import * as components from "../index.js"


const meta: Meta<typeof NAME> = {
	component: NAME,
	args: {

	},
}

export default meta
type Story = StoryObj<typeof NAME>


export const Primary: Story = {
	render: args => ({
		components,
		setup: () => ({ args }),
		template: `
			<NAME v-bind="{...args}">{{args.value}}</NAME>
		`,
	}),
}
export const Secondary: Story = {
	...Primary,
	args: {
		...Primary.args,
	},
}

