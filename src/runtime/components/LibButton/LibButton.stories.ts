/* eslint-disable @typescript-eslint/naming-convention */
import { capitalize } from "@alanscodelog/utils/capitalize.js"
import type { Meta, StoryObj } from "@storybook/vue3"

import IconFaSolidBell from "~icons/fa-solid/bell"

// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import * as components from "../index.js"


const meta: Meta<typeof components.LibButton> = {
	component: components.LibButton,
	title: "Components/Button",
	args: {
		label: "Label",
		// @ts-expect-error - custom prop for story
		_iconAfter: true,
	},
}

export default meta
type Story = StoryObj<typeof components.LibButton>


export const Primary: Story = {
	render: (args: any) => ({
		components: {
			...components,
			IconFaSolidBell,
		},
		setup: () => ({ args, capitalize }),
		template: `
		<div class="flex gap-4 justify-center">
			<template v-for="type of [false, 'ok', 'warning', 'danger', 'primary', 'secondary' ]">
				<lib-button v-bind="{...args, color: type, label: !args.label ? undefined : args.label + ' ' + capitalize(type || 'false')}">
					<template #icon>
						<icon class="w-[1em]"><icon-fa-solid-bell /></icon>
					</template>
				</lib-button>
			</template>
		</div>
		<div class="flex flex-col gap-4 pt-10">
			<template v-for="type of [false, 'ok', 'warning', 'danger', 'primary', 'secondary']">
				<lib-button v-bind="{...args, color: type , label: !args.label ? undefined : args.label + ' ' + capitalize(type || 'false') }">
					${args._iconAfter ? `
						<template #icon-after>
							<icon class="w-[1em]"><icon-fa-solid-bell /></icon>
						</template>
					` : ``}
				</lib-button>
			</template>
		</div>
		`,
	}),
}

export const IconAfter: Story = {
	...Primary,
	args: {
		...Primary.args,
		// @ts-expect-error - .
		_iconAfter: true,
	},
}

export const OnlyIcon: Story = {
	...Primary,
	args: {
		...Primary.args,
		label: undefined,
	},
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
