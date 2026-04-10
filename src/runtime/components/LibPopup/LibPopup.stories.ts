/* eslint-disable @typescript-eslint/naming-convention */
import type { Meta, StoryObj } from "@storybook/vue3"
import { ref } from "vue"

import LibPopup from "./LibPopup.vue"

import * as components from "../index.js"

const meta: Meta<typeof LibPopup> = {
	component: LibPopup,
	title: "Components/Popup"
}

export default meta
type Story = StoryObj<typeof LibPopup>

export const Primary: Story = {
	render: args => ({
		components,
		setup: () => {
			const value = ref(false)
			return { args, value }
		},
		template: `
			<div class="test bg-transparency-squares flex items-center justify-center" style="height:80vh;border:1px solid black;">
				<lib-popup v-model="value" v-bind="args">
					<template #button>
						<lib-button>Open Modal Popup</lib-button>
					</template>
					<template #popup>
						<div
							:style="{width: args.width, height: args.height}"
							class="p-3"
						>
							<div>Popup Content</div>
							<lib-button class="mt-4" @click="value = false">Close</lib-button>
						</div>
					</template>
				</lib-popup>
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
