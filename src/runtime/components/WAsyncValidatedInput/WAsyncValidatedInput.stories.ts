/* eslint-disable @typescript-eslint/naming-convention */
import { delay } from "@alanscodelog/utils/delay"
import type { Meta, StoryObj } from "@storybook/vue3"
import { ref, watch } from "vue"

import WAsyncValidatedInput from "./WAsyncValidatedInput.vue"

import * as components from "../index.js"

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type ExtraTestArgs = { }

const meta: Meta<typeof WAsyncValidatedInput> = {
	component: WAsyncValidatedInput,
	title: "Components/AsyncValidatedInput",
	args: {
	}
}

export default meta

type Story = StoryObj<typeof WAsyncValidatedInput> & { args?: ExtraTestArgs }

export const Primary: Story = {
	render: _args => {
		let args = _args as any as NonNullable<Story["args"]>
		return {
			components: components as any,
			setup: () => {
				args = {
					errors: [],
					inputValid: true,
					...args
				}
				const modelValue = ref(args.modelValue ?? "")
				const status = ref(args.status)
				const canSubmit = ref(true)
				const forceInvalidResult = ref(false)
				const forceInvalidInput = ref(false)
				watch(modelValue, () => {
					status.value = "loading"
					delay(1000).then(() => {
						status.value = (args.errors?.length ?? 0) > 0 || forceInvalidResult.value
							? "invalid"
							: args.status ?? "valid"
					})
				})
				watch(status, () => {
					if ((args.errors?.length ?? 0) > 0 || status.value === "invalid") {
						canSubmit.value = false
					} else {
						canSubmit.value = true
					}
				})
				return {
					args,
					canSubmit,
					status,
					modelValue,
					forceInvalidResult,
					forceInvalidInput
				}
			},
			template: `
				<div class="flex flex-col gap-3">
					<div>
					The async nature of this component is loosely simulated by the story as it depends on @witchcraft/nuxt-utils's useAsyncValidation composable that uses Nuxt's async data.
					</div>
					<div>
					Note that the input can be an invalid state (schema error) independent of the "status" property.
					</div>
					<WCheckbox v-model="forceInvalidResult">Force Invalid Result</WCheckbox>
					<WCheckbox v-model="forceInvalidInput">Force Invalid Input (e.g. this would correspond to a schema only check if using the composable)</WCheckbox>
					<div class="flex flex-col items-center w-[400px]">
						<WAsyncValidatedInput 
							:errors="args.errors" 
							:status="status"
							:canSubmit="canSubmit"
							:inputValid="!forceInvalidInput"
							v-model="modelValue" 
						/>
					</div>
				</div>
			`
		}
	}
}

export const WithErrors: Story = {
	...Primary,
	args: {
		status: "invalid",
		errors: ["Some error here.", "Some very long error text here. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."]
	}
}

export const LoadingStatus: Story = {
	...Primary,
	args: {
		status: "loading"
	}
}

