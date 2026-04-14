/* eslint-disable @typescript-eslint/naming-convention */
import type { Meta, StoryObj } from "@storybook/vue3"
import { onUnmounted, ref } from "vue"

import WProgressBar from "./WProgressBar.vue"

import * as components from "../index.js"

type ExtraTestArgs = {
	_start?: number
	_timeout?: number
	_add?: number
}
const meta: Meta<typeof WProgressBar> = {
	component: WProgressBar,
	title: "Components/ProgressBar",
	args: {
		label: "Label",
		...{
			_timeout: 1000,
			_add: 10,
			_start: 50
		} satisfies ExtraTestArgs as any
	}
}

export default meta
type Story = StoryObj<typeof WProgressBar> & { args?: ExtraTestArgs }

export const Primary: Story = {
	render: args => {
		const extraArgs = args as ExtraTestArgs
		return {
			components,
			setup: () => {
				const forceFull = ref(false)
				const progress = ref(extraArgs._start as number)
				if (args.progress) {
					progress.value = args.progress
				} else {
					let justHitFull = false
					const interval = setInterval(() => {
						if (justHitFull) return
						if (progress.value >= 100) {
							justHitFull = true
							// give it time to hide
							setTimeout(() => {
								progress.value = 0
								justHitFull = false
							}, 2000)
						} else {
							progress.value += extraArgs._add as number
						}
					}, extraArgs._timeout as number)
					onUnmounted(() => {
						clearInterval(interval)
					})
				}
				return {
					args: { ...args },
					forceFull,
					progress
				}
			},
			template: `
			<WCheckbox v-model="forceFull">Force 100%</WCheckbox>
			<WProgressBar class="flex-1" v-bind="args" :progress="forceFull ? 100 : progress"></WProgressBar>
			<br/>
			Stretched in flexbox:
			<div class="flex w-full">
				<WProgressBar class="flex-1" v-bind="args" :progress="forceFull ? 100 : progress"></WProgressBar>
			</div>
			<hr class="mt-2"/>
		`
		}
	}
}


export const ReallyLongLabel: Story = {
	...Primary,
	args: {
		...Primary.args,
		label: "Really Long Label Label to See Effect Really Long Label Label to See Effect Really Long Label Label to See Effect Really Long Label Label to See Effect"
	}
}
export const Static: Story = {
	...Primary,
	args: {
		...Primary.args,
		progress: 50
	}
}

export const AutoHiding: Story = {
	...Primary,
	args: {
		...Primary.args,
		autohideOnComplete: 500,
		clamp: [10, 100],
		// keepSpaceWhenHidden: true,
		_start: 0,
		_timeout: 1000,
		_add: 10
	}
}

export const AutoHidingNoKeepSpace: Story = {
	...Primary,
	args: {
		...Primary.args,
		autohideOnComplete: 500,
		keepSpaceWhenHidden: false,
		clamp: [10, 100],
		_start: 0,
		_timeout: 1000,
		_add: 10
	}
}
