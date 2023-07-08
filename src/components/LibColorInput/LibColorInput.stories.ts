/* eslint-disable @typescript-eslint/naming-convention */
import type { Meta, StoryObj } from "@storybook/vue3"
import { ref } from "vue"

import LibColorInput from "./LibColorInput.vue"

import * as components from "../index.js"


const meta: Meta<typeof LibColorInput> = {
	component: LibColorInput,
	args: {

	},
}

export default meta
type Story = StoryObj<typeof LibColorInput>


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
			<lib-color-Input
				:allowAlpha="args.allowAlpha"
				:modelValue="args.color.value"
				@update:modelValue="handleChange"
			>
 			</lib-color-Input>
			Stretched:
			<div class="flex-1 flex">
				<lib-color-Input
					class="flex-1"
					:allowAlpha="args.allowAlpha"
					:modelValue="args.color.value"
					@update:modelValue="handleChange"
				>
				</lib-color-Input>
			</div>
		`,
	}),
}


export const DoesNotAllowAlpha: Story = {
	...Primary,
	args: {
		allowAlpha: false,
	},
}

