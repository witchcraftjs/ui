/* eslint-disable @typescript-eslint/naming-convention */
import type { Meta, StoryObj } from "@storybook/vue3"
import { ref } from "vue"

import LibPopup from "./LibPopup.vue"

import * as components from "../index.js"

type ExtraTestArgs = {
	_slots: string
}
const meta: Meta<typeof WPopup> = {
	component: WPopup,
	title: "Components/Popup",
	args: {
		title: "Popup Title",
		description: "Popup Description"
	}
}

export default meta
type Story = StoryObj<typeof WPopup> & { args?: ExtraTestArgs }

export const Primary: Story = {
	render: args => {
		const extraArgs = args as ExtraTestArgs
		return {
			components,
			setup: () => {
				const value = ref(false)
				return { args, value }
			},
			template: `
			<div class="test bg-transparency-squares flex items-center justify-center" style="height:80vh;border:1px solid black;">
				<WPopup
					:title="args.title"
					:description="args.description"
					v-model="value"
					v-bind="args"
				>
					${extraArgs._slots}
					<template #button>
						<lib-button>Open Modal Popup</lib-button>
					</template>
					<template #extra>
						<div
							:style="{width: args.width, height: args.height}"
						>
							<div>Extra Slot</div>
						</div>
					</template>
				</lib-popup>
			</div>
		`
		}
	}
}

export const OtherSlots = {
	...Primary,
	args: {
		_slots: `
			<template #title>
				<div>Title Slot</div>
			</template>
			<template #description>
				<div>Description Slot</div>
			</template>
			<template #close>
				<div>Close Slot</div>
			</template>
			<template #backdrop>
				<div>Backdrop Slot</div>
			</template>
		`
	}
}

export const PopupSlots = {
	...Primary,
	args: {
		_slots: `
			<template #popup>
				<div>Popup Slot - Replaces Other Slots except Close (note, you must provide reka's DialogTitle and DialogDescription to avoid it's warnings</div>
			</template>
		`
	}
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
