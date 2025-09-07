/* eslint-disable @typescript-eslint/naming-convention */
import type { Meta, StoryObj } from "@storybook/vue3"
import Color from "colorjs.io"
import { ref } from "vue"

import LibColorPicker from "./LibColorPicker.vue"

import * as components from "../index.js"

const meta: Meta<typeof LibColorPicker> = {
	component: LibColorPicker,
	title: "Components/ColorPicker",
	args: {

	}
}

export default meta
type Story = StoryObj<typeof LibColorPicker>

export const Primary: Story = {
	render: args => ({
		components,
		setup: () => {
			const color = ref({ r: 0, g: 0, b: 0/* , a: 0.5 */, ...(args.modelValue) })
			delete args.modelValue
			const handleChange = (e: any) => {
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
			<lib-root :outline="args.outline">
	 		{{args.color}}
	 		<lib-color-picker
	 			:modelValue="args.color.value"
				v-bind="args"
	 			@update:modelValue="handleChange"
	 		>
	 		</lib-color-picker>
	 		</lib-root>
		`
	})
}
export const DoesNotAllowAlpha: Story = {
	...Primary,
	args: {
		allowAlpha: false
	}
}
export const WithExistingValue: Story = {
	...Primary,
	args: {
		modelValue: { r: 255, g: 0, b: 0 }
	}
}
export const CustomStringRepresentation: Story = {
	...Primary,
	args: {
		allowAlpha: false,
		customRepresentation: {
			fromHsvaToString: (hsva: any, includeAlpha: boolean) => new Color(
				"hsv",
				[hsva.h, hsva.s, hsva.v],
				includeAlpha ? hsva.a : 1 // this takes care of the correct hex format
			).toString({ format: "hex" })
		}
	}
}
