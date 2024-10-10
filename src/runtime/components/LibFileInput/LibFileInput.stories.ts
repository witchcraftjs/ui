/* eslint-disable @typescript-eslint/naming-convention */
import type { Meta, StoryObj } from "@storybook/vue3"
import { ref } from "vue"

import LibFileInput from "./LibFileInput.vue"

// eslint-disable-next-line @typescript-eslint/no-restricted-imports
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
		setup: () => {
			function errorHandler(e: any): void {
				// eslint-disable-next-line no-console
				console.log(e)
			}
			return { args, errorHandler }
		},
		template: `
			<lib-file-input v-bind="{...args}" @errors="errorHandler"></lib-file-input>
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

export const AnyFormat: Story = {
	...SingleFile,
	args: {
		...SingleFile.args,
		multiple: true,
		formats: [],
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
