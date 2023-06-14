/* eslint-disable @typescript-eslint/naming-convention */
import type { Meta, StoryObj } from "@storybook/vue3"

import * as components from "../index.js"


const meta: Meta<typeof components.LibButton> = {
	component: components.LibButton,
	args: {
		label: "Label",
	},
}

export default meta
type Story = StoryObj<typeof components.LibButton>


export const Primary: Story = {
	render: (args: any) => ({
		components,
		setup: () => ({ args }),
		template: `
		<div class="flex gap-4 justify-center">
			<template v-for="type of [false, 'ok', 'warning', 'danger', 'primary', 'secondary' ]">
				<lib-button v-bind="{...args, color: type}">
					<fa :icon="'bell'"/>
				</lib-button>
			</template>
		</div>
		<div class="flex flex-col gap-4 pt-10">
			<template v-for="type of [false, 'ok', 'warning', 'danger', 'primary', 'secondary']">
				<lib-button v-bind="{...args, color: type}">
					<fa :icon="'bell'"/>
				</lib-button>
			</template>
		</div>
		`,
	}),
}

export const Disabled: Story = {
	...Primary,
	args: {
		...Primary.args,
		disabled: true,
	},
}
export const Borderless: Story = {
	...Primary,
	args: {
		...Primary.args,
		border: false,
	},
}
export const BorderlessDisabled: Story = {
	...Primary,
	args: {
		...Primary.args,
		border: false,
		disabled: true,
	},
}
export const WithDivInside: Story = {
	render: (args: any) => ({
		components,
		setup: () => ({ args }),
		template: `
		<div class="flex gap-4 justify-center">
			<lib-button v-bind="{...args}">
				<div>Div inside button still has a pointer cursor.</div>
			</lib-button>
		</div>
		`,
	}),
}
