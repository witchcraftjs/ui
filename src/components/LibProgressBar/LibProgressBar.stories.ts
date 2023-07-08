/* eslint-disable @typescript-eslint/naming-convention */
import type { Meta, StoryObj } from "@storybook/vue3"
import { onUnmounted, ref } from "vue"

import LibProgressBar from "./LibProgressBar.vue"

import * as components from "../index.js"


const meta: Meta<typeof LibProgressBar> = {
	component: LibProgressBar,
	args: {
		label: "Label",
		_timeout: 1000,
		_add: 10,
		_start: 50,
	},
}

export default meta
type Story = StoryObj<typeof LibProgressBar>


export const Primary: Story = {
	render: args => ({
		components,
		setup: () => {
			const progress = ref(args._start)
			if (args.progress) {
				progress.value = args.progress
			} else {
				const interval = setInterval(() => {
					if (progress.value >= 100) {
						progress.value = 0
					} else {
						progress.value += args._add
					}
				}, args._timeout)
				onUnmounted(() => {
					clearInterval(interval)
				})
			}
			return {
				args: { ...args },
				progress,
			}
		},
		template: `
			<lib-progress-bar class="flex-1" v-bind="args" :progress="progress"></lib-progress-bar>
			<br/>
			Stretched in flexbox:
			<div class="flex w-full">
				<lib-progress-bar class="flex-1" v-bind="args" :progress="progress"></lib-progress-bar>
			</div>
		`,
	}),
}
export const Secondary: Story = {
	...Primary,
	args: {
		...Primary.args,
	},
}
export const ReallyLongLabel: Story = {
	...Primary,
	args: {
		...Primary.args,
		label: "Really Long Label Label to See Effect Really Long Label Label to See Effect Really Long Label Label to See Effect Really Long Label Label to See Effect",
	},
}
export const Static: Story = {
	...Primary,
	args: {
		...Primary.args,
		progress: 50,
	},
}

export const AutoHiding: Story = {
	...Primary,
	args: {
		...Primary.args,
		autohideOnComplete: 500,
		clamp: [10, 100],
		_start: 0,
		// keepSpaceWhenHidden: true,
		_timeout: 1000,
		_add: 10,
	},
}

