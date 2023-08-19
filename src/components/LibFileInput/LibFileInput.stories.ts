/* eslint-disable @typescript-eslint/naming-convention */
import type { Meta, StoryObj } from "@storybook/vue3"
import { ref } from "vue"

import LibFileInput from "./LibFileInput.vue"

import * as components from "../index.js"


const meta: Meta<typeof LibFileInput> = {
	component: LibFileInput,
	args: {

	},
}

export default meta
type Story = StoryObj<typeof LibFileInput>


export const SingleFile: Story = {
	render: args => ({
		components,
		setup: () => ({ args }),
		template: `
			<lib-file-input v-bind="{...args}"></lib-file-input>
		`,
	}),
}
export const MultipleFile: Story = {
	...SingleFile,
	args: {
		...SingleFile.args,
		multiple: true,
	},
}

export const Compact: Story = {
	...SingleFile,
	args: {
		...SingleFile.args,
		compact: true,
	},
}

export const ErrorHandling: Story = {
	render: args => ({
		components,
		setup: () => {
			const errors = ref([])
			const errorHandler = (e: any) => errors.value = e
			return {
				args, errors, errorHandler,
			}
		},
		template: `
			<lib-debug :title="'Errors'">{{errors}}</lib-debug>
			<lib-file-input v-bind="{...args}"  @errors="errorHandler"></lib-file-input>
		`,
	}),
}
