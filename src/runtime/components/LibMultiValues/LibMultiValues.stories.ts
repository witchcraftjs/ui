/* eslint-disable @typescript-eslint/naming-convention */
import type { Meta, StoryObj } from "@storybook/vue3"
import { ref } from "vue"

import LibMultiValues from "./LibMultiValues.vue"

import * as components from "../index.js"

const meta = {
	component: LibMultiValues as any,
	title: "Components/MultiValues",
	args: {
		modelValue: ["A", "B", "C"],
		border: true
	},
	tags: ["!test"]
} satisfies Meta<typeof LibMultiValues> & Meta<{ custom: string }>

export default meta
type Story = StoryObj<typeof LibMultiValues> // & StoryObj<typeof extraArgs>

/**
 * The multi-value component is just the values part beneath the input.
 *
 * This is a simple example of how it can be combined with the simple-input component to create an input with multiple values.
 *
 * Note that setting the `disabled` or `readonly` props won't prevent the component from accepting an updated `values` prop. Disabling adding must be done separately from whatever is controlling the component (e.g. the input in this case).
 */
export const Primary: Story = {
	render: args => ({
		components: { ...components, LibMultiValues },
		setup: () => {
			const inputValue = ref("B")
			const multiValueEl = ref<typeof LibMultiValues | null>(null)
			const onKeydownEnter = (e: KeyboardEvent): void => {
				if (e.key === "Enter") (args.modelValue!).push(inputValue.value)
			}
			return ({
				args,
				inputValue,
				multiValueEl,
				onKeydownEnter
			})
		},

		template: `
			<p>Simple Input connected to multi-value.</p>
			<p>Note: You will be able to add values, including duplicates, even to the disabled/readonly version in this test, see the Input component for a properly connected approach.</p>
			<p> Press enter to add value :</p>
			<lib-simple-input
				v-model="inputValue"
				@keydown="onKeydownEnter"
			>
			</lib-simple-input>
			<p>Multi-value component: </p>
			<div class="flex justify-start">
				<lib-multi-values
					ref="multiValueEl"
					v-bind="args"
					v-model="args.modelValue"
				/>
			</div>
		`
	})
}

export const Disabled = {
	...Primary,
	args: {
		disabled: true
	}
}

export const Readonly = {
	...Primary,
	args: {
		readonly: true
	}
}
