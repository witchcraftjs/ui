/* eslint-disable @typescript-eslint/naming-convention */
import type { Meta, StoryObj } from "@storybook/vue3"
import { ref } from "vue"

import WTooltip from "./WTooltip.vue"

import * as components from "../index.js"

const meta: Meta<typeof WTooltip> = {
	component: WTooltip as any,
	title: "Components/Tooltip",
	args: {
		content: "This is a tooltip"
	}
}

export default meta

type ExtraTestArgs = {
	_testContent?: string
	_testTrigger?: string
}

type Story = StoryObj<typeof WTooltip> & {
	args?: ExtraTestArgs
}

export const Primary: Story = {
	render: args => {
		const extraArgs = args as ExtraTestArgs
		return {
			components,
			setup() {
				const showTooltip = ref(false)
				return {
					showTooltip,
					extraArgs,
					args
				}
			},
			template: `
			<div class="flex flex-col gap-3 items-center pt-10">
				<WTooltip v-bind="args">
					${extraArgs._testTrigger ?? ""}
					<template #content>
					${extraArgs._testContent ?? "This is a tooltip"}
					</template>
				</WTooltip>
			</div>
		`
		}
	}
}


export const CustomTrigger: Story = {
	...Primary,
	args: {

		_testTrigger: "Custom Trigger"
	}
}

export const VeryLongContentConstrainedToTriggerWidth: Story = {
	...Primary,
	args: {
		constrainWidthTo: "trigger",
		constrainHeightTo: "available",
		_testTrigger: "<button>Tiny Trigger</button>",
		// should scroll
		_testContent: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.".repeat(10)
	}
}

export const VeryLongContentConstrainedToCustomPxHeight: Story = {
	...Primary,
	args: {
		constrainHeightTo: 50,
		// should scroll
		_testContent: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.".repeat(10)
	}
}
