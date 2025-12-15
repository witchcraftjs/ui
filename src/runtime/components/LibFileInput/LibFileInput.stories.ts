/* eslint-disable @typescript-eslint/naming-convention */
import type { Meta, StoryObj } from "@storybook/vue3"
import { ref } from "vue"

import LibFileInput from "./LibFileInput.vue"

import * as components from "../index.js"

const meta: Meta<typeof LibFileInput> = {
	component: LibFileInput,
	title: "Components/FileInput",
	args: {

	}
}

export default meta
type Story = StoryObj<typeof LibFileInput>

export const SingleFile: Story = {
	render: args => ({
		components,
		setup: () => {
			const errors = ref([])
			function errorHandler(errs: any) {
				// eslint-disable-next-line no-console
				console.log(errs)
				errors.value = errs
			}
			return { args, errorHandler, errors }
		},
		template: `
			<lib-file-input v-bind="{...args}" @errors="errorHandler"></lib-file-input>
			<div
				v-if="errors.length > 0"
				class="border-2 border-red-500 rounded-lg p-2 mt-2 w-full"
			>
				<div v-for="err of errors" :key="err">
					{{err}}
				</div>
			</div>
		`
	})
}

export const MultipleFile: Story = {
	...SingleFile,
	args: {
		...SingleFile.args,
		multiple: true
	}
}

export const AnyFormat: Story = {
	...SingleFile,
	args: {
		...SingleFile.args,
		multiple: true,
		formats: []
	}
}

export const Compact: Story = {
	...SingleFile,
	args: {
		...SingleFile.args,
		compact: true
	}
}

export const ErrorHandling: Story = {
	render: args => ({
		components,
		setup: () => {
			const errors = ref([])
			const errorHandler = (e: any) => errors.value = e
			return {
				args, errors, errorHandler
			}
		},
		template: `
			<lib-debug :title="'Errors'">{{errors}}</lib-debug>
			<lib-file-input v-bind="{...args}"  @errors="errorHandler"></lib-file-input>
		`
	})
}
