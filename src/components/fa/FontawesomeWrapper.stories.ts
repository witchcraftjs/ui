/* eslint-disable @typescript-eslint/naming-convention */
import type { Meta, StoryObj } from "@storybook/vue3"

import Fa from "./Fa.vue"

import * as components from "../index.js"


const meta: Meta<typeof Fa> = {
	component: Fa,
	args: {
		icon: "bell",
	},
}

export default meta
type Story = StoryObj<typeof Fa>

/** Keeps height when wrapped. */
export const Primary: Story = {
	render: args => ({
		components,
		setup: () => ({ args }),
		template: `
		 <div class="flex flex-wrap border border-red-500">
			<fa v-bind="{...args}"></fa>
			<div class="border border-red-500 flex-initial w-full">Some Text</div>
		</div>
		`,
	}),
	args: {

	},
}

