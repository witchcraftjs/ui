/* eslint-disable @typescript-eslint/naming-convention */
import type { Meta, StoryObj } from "@storybook/vue3"
import { ref } from "vue"

import * as components from "../index.js"

const meta: Meta<typeof components.WSlider> = {
	component: components.WSlider as any,
	title: "Components/Slider",
	args: {
		min: 0,
		max: 100,
		step: 1
	}
}

export default meta
type Story = StoryObj<typeof components.WSlider>

export const Primary: Story = {
	render: args => ({
		components: components as any,
		setup: () => {
			const modelValue = ref(args.modelValue ?? [0])
			return { args, modelValue }
		},
		template: `
			<div class="w-64 flex flex-col gap-4">
				<WSlider v-bind="args" v-model="modelValue" />
				<span class="text-sm text-neutral-500">Value: {{ modelValue }}</span>
			</div>
		`
	})
}

export const Ranged: Story = {
	...Primary,
	args: {
		...Primary.args,
		min: 0,
		max: 200,
		step: 5,
		modelValue: [10, 100]
	}
}


export const RangedMany: Story = {
	...Primary,
	args: {
		...Primary.args,
		min: 0,
		max: 200,
		step: 5,
		modelValue: [10, 100, 150]
	}
}
export const RangedManyNoHighlight: Story = {
	...Primary,
	args: {
		...Primary.args,
		min: 0,
		max: 200,
		step: 5,
		modelValue: [10, 100, 150],
		highlightRange: false
	}
}

export const Disabled: Story = {
	...Primary,
	args: {
		...Primary.args,
		modelValue: [10, 100, 150],
		disabled: true
	}
}

export const Readonly: Story = {
	...Primary,
	args: {
		...Primary.args,
		modelValue: [10, 100, 150],
		readonly: true
	}
}

