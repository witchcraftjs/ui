// @ts-nocheck remove when copying
/* eslint-disable @typescript-eslint/naming-convention */
import type { Meta, StoryObj } from "@storybook/vue3"
import { ref } from "vue"

import LibDarkModeSwitcher from "./LibDarkModeSwitcher.vue"

// todo, maybe don't do this for perf reasons
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import * as components from "../index.js"

const meta: Meta<typeof LibDarkModeSwitcher> = {
	component: LibDarkModeSwitcher,
	args: {

	},
}

export default meta
type Story = StoryObj<typeof LibDarkModeSwitcher>


export const Primary: Story = {
	render: args => ({
		components,
		setup: () => {
			const darkMode = ref(false)
			return {
				args,
				darkMode
			}
		},
		template: `
			Value: {{darkMode}}
			<LibDarkModeSwitcher 
				@update:darkMode="darkMode = $event"
				v-bind="{...args}"
			></LibDarkModeSwitcher>
			
		`,
	}),
}
export const WithoutLabel: Story = {
	...Primary,
	args: {
		...Primary.args,
		autoLabel: false,
	},
}

