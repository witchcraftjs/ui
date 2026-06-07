/* eslint-disable @typescript-eslint/naming-convention */
import type { Meta, StoryObj } from "@storybook/vue3"
import { ref } from "vue"

import WFileInput from "./WFileInput.vue"

import * as components from "../index.js"

type ExtraTestArgs = {
	_slot?: string
}
const meta: Meta<typeof WFileInput> = {
	component: WFileInput,
	title: "Components/FileInput",
	args: {

	}
}

export default meta
type Story = StoryObj<typeof WFileInput> & { args?: ExtraTestArgs }

export const SingleFile: Story = {
	render: args => {
		const extraArgs = args as ExtraTestArgs
		return {
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
			<!-- compact breaks in flexbox if not styled correctly -->
			<div class="flex w-full">
				<WFileInput v-bind="{...args}" @errors="errorHandler">
					${extraArgs._slot}
				</WFileInput>
			</div>
			<div
				v-if="errors.length > 0"
				class="border-2 border-red-500 rounded-lg p-2 mt-2 w-full"
			>
				<div v-for="err of errors" :key="err">
					{{err}}
				</div>
			</div>
		`
		}
	}
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
		label: "Compact",
		compact: true,
		_slot: `
			<template #label>
				Upload
			</template>
		`
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
			<WDebug :title="'Errors'">{{errors}}</WDebug>
			<WFileInput v-bind="{...args}"  @errors="errorHandler"></WFileInput>
		`
	})
}
