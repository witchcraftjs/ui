/* eslint-disable @typescript-eslint/naming-convention */
import type { Meta, StoryObj } from "@storybook/vue3"
import { ref } from "vue"

import WPopup from "./WPopup.vue"

import * as components from "../index.js"

const meta: Meta<typeof WPopup> = {
	component: WPopup,
	title: "Components/Popup"
}

export default meta
type Story = StoryObj<typeof WPopup>

export const Primary: Story = {
	render: args => ({
		components,
		setup: () => {
			const value = ref(false)
			return { args, value }
		},
		template: `
			<div class="test bg-transparency-squares flex items-center justify-center" style="height:80vh;border:1px solid black;">
				<WPopup v-model="value" v-bind="args">
					<template #button>
						<WButton>Open Modal Popup</WButton>
					</template>
					<template #popup>
						<div
							:style="{width: args.width, height: args.height}"
							class="p-3"
						>
							<div>Popup Content</div>
							<WButton class="mt-4" @click="value = false">Close</WButton>
						</div>
					</template>
				</WPopup>
			</div>
		`
	})
}

export const PopupLarge = {
	...Primary,
	args: {
		width: "80vw",
		height: "80vh"
	}
}

// popup should scroll contents instead of getting to big (popup will limit it)
export const PopupTooBig = {
	...Primary,
	args: {
		width: "110vw",
		height: "110vh"
	}
}
