/* eslint-disable @typescript-eslint/naming-convention */
import type { Meta, StoryObj } from "@storybook/vue3"
import { ref } from "vue"

import WColorInput from "./WColorInput.vue"

import * as components from "../index.js"

const meta: Meta<typeof WColorInput> = {
	component: WColorInput,
	title: "Components/ColorInput",
	args: {

	}
}

export default meta
type Story = StoryObj<typeof WColorInput>

export const Primary: Story = {
	render: args => ({
		components,
		setup: () => {
			const color = ref({ r: 0, g: 0, b: 0/* , a: 0.5 */ })
			const handleChange = (e: any): void => {
				color.value = { ...e }
			}
			return {
				args: {
					outline: false,
					color,
					allowAlpha: true,
					...args
				},
				handleChange
			}
		},
		template: `
			<WColorInput
				:allowAlpha="args.allowAlpha"
				:modelValue="args.color.value"
				@update:modelValue="handleChange"
			>
 			</WColorInput>
			Stretched:
			<div class="flex-1 flex">
				<WColorInput
					class="flex-1"
					:allowAlpha="args.allowAlpha"
					:modelValue="args.color.value"
					@update:modelValue="handleChange"
				>
				</WColorInput>
			</div>
		`
	})
}

export const DoesNotAllowAlpha: Story = {
	...Primary,
	args: {
		allowAlpha: false
	}
}
