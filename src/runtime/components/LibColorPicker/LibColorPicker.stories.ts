/* eslint-disable @typescript-eslint/naming-convention */
import type { Meta, StoryObj } from "@storybook/vue3"
import { ref } from "vue"

import LibColorPicker from "./LibColorPicker.vue"

// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import * as components from "../index.js"


const meta: Meta<typeof LibColorPicker> = {
	component: LibColorPicker,
	args: {

	},
}

export default meta
type Story = StoryObj<typeof LibColorPicker>


export const Primary: Story = {
	render: args => ({
		components,
		setup: () => {
			const color = ref({ r: 0, g: 0, b: 0/* , a: 0.5 */ })
			const handleChange = (e: any) => {
				color.value = { ...e }
			}
			return {
				args: {
					outline: false,
					color,
					allowAlpha: true,
					...args,
				},
				handleChange,
			}
		},
		template: `
			<test-wrapper :outline="args.outline">
	 		{{args.color}}
	 		<lib-color-picker
	 			:allowAlpha="args.allowAlpha"
	 			:modelValue="args.color.value"
	 			@update:modelValue="handleChange"
	 		>
	 		</lib-color-picker>
	 		</test-wrapper>
		`,
	}),
}
export const DoesNotAllowAlpha: Story = {
	...Primary,
	args: {
		allowAlpha: false,
	},
}

