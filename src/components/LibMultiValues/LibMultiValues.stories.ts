/* eslint-disable @typescript-eslint/naming-convention */
import type { Meta, StoryObj } from "@storybook/vue3"
import { ref } from "vue"

import LibMultiValues from "./LibMultiValues.vue"

import * as components from "../index.js"


const meta = {
	component: LibMultiValues,
	args: {
		values: ["A", "B", "C"],
		border: true,
	},
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
				if (e.key === "Enter") (args.values).push(inputValue.value)
			}
			return ({
				args,
				inputValue,
				multiValueEl,
				onKeydownEnter,
			})
		}
		,

		template: `
			Press enter to add value.
			<lib-simple-input
				v-model="inputValue"
				@keydown="onKeydownEnter"
			>
			</lib-simple-input>
			<lib-multi-values
				ref="multiValueEl"
				v-bind="args"
				v-model:values="args.values"
			>
			</lib-multi-values>
		`,
	}),
}


export const Disabled = {
	...Primary,
	args: {
		disabled: true,
	},
}

export const Readonly = {
	...Primary,
	args: {
		readonly: true,
	},
}
