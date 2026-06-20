/* eslint-disable @typescript-eslint/naming-convention */
import type { Meta, StoryObj } from "@storybook/vue3"
import { ref } from "vue"
import z from "zod"

import * as components from "../index.js"

type ExtraTestArgs = {
	_slot?: string
}
const meta: Meta<typeof components.WFileInput> = {
	component: components.WFileInput,
	title: "Components/FileInput",
	args: {

	}
}

export default meta
type Story = StoryObj<typeof components.WFileInput> & { args?: ExtraTestArgs }

export const SingleFile: Story = {
	render: _args => {
		const args = _args as any as NonNullable<Story["args"]>
		return {
			components: components as any,
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
					${args._slot}
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

const MIN_DIMENSIONS = { width: 1, height: 1 }
const MAX_DIMENSIONS = { width: 10, height: 10 }

export const SchemaValidation: Story = {
	...SingleFile,
	args: {
		...SingleFile.args,
		schema: z.array(z
			.instanceof(File, {
				message: "Please select an image file."
			})
			.refine(
				file =>
					new Promise(resolve => {
						const reader = new FileReader()
						reader.onload = e => {
							const img = new Image()
							img.onload = () => {
								const meetsDimensions
									= img.width >= MIN_DIMENSIONS.width
										&& img.height >= MIN_DIMENSIONS.height
										&& img.width <= MAX_DIMENSIONS.width
										&& img.height <= MAX_DIMENSIONS.height
								resolve(meetsDimensions)
							}
							img.src = e.target?.result as string
						}
						reader.readAsDataURL(file)
					}),
				{
					message: `The image dimensions are invalid. Please upload an image between ${MIN_DIMENSIONS.width}x${MIN_DIMENSIONS.height} and ${MAX_DIMENSIONS.width}x${MAX_DIMENSIONS.height} pixels.`
				}
			))
	}
}

export const ErrorHandling: Story = {
	render: args => ({
		components: components as any,
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

