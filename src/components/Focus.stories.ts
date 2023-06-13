/* eslint-disable @typescript-eslint/naming-convention */
import type { Meta, StoryObj } from "@storybook/vue3"
import { onMounted, ref } from "vue"

import * as components from "./index.js"
// TODO move docs to composable
/**
 * For testing the focus styles. The (still WIP) idea is that normally the outlined class is set by whether the user is using the keyboard or not. When true, outlines generated by the focus-outline-* or outlined-* utilities are allowed (they might not always appear since most components have focus-visible styles), when false, they are not allowed, but components can still set custom focus styles that will always appear. Either or is usually not a good idea unless all components set custom focus styles. For something like a web app, focus-visible should be allowed. For an app, this setup allows that to be configurable.
 */
const meta: Meta = {
	title: "Other/Focus",
	args: {
		outline: true,
	},
}
const template = `
			<div class="focus-outline-no-offset border border-accent-600" tabindex="0">focus-outline-no-offset (outlined i.e. outlined-focus-visible)</div>
			<div class="focus-outline border border-accent-600" tabindex="0">focus-outline (outlined i.e. outlined-focus-visible)</div>
			<div class="outline-none outlined-focus:border-red-500 border border-accent-600" tabindex="0">outlined-focus</div>
			<div class="outline-none outlined-within:border-red-500 border border-accent-600" >
				outlined-within<div tabindex="0">Inner</div>
			</div>
			<div class="outline-none focus:border-red-500 border border-accent-600" tabindex="0">Has Manual Focus Classes</div>
		`
export default meta
type Story = StoryObj<typeof NAME>

export const Primary: Story = {
	render: args => ({
		components,
		setup: () => {
			const el = ref<HTMLElement>(null)
			onMounted(() => {
				// el.value.focus()
			})
			return { ...args, el }
		},
		template,
	}),
}
/* As in force allow, not force show. */
export const OutlineForcedTrue: Story = {
	...Primary,
	args: {
		...Primary.args,
		forceOutline: true,
	},
}
export const OutlineFalse: Story = {
	...Primary,
	args: {
		...Primary.args,
		outline: false,
	},
}
/* We can also allow focus-visible outlines regardless of the state of outline, by wrapping in `.group.outlined-visible`. This is the default for the test wrapper.*/
export const AlwaysAllowFocusVisible: Story = {
	render: args => ({
		components,
		setup: () => args,
		template: `
		<div class="outlined-visible group">${template}</div>
		`,

	}),
}
