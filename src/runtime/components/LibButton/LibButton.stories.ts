/* eslint-disable @typescript-eslint/naming-convention */
import { capitalize } from "@alanscodelog/utils/capitalize"
import type { Meta, StoryObj } from "@storybook/vue3"

import IconFaSolidBell from "~icons/fa-solid/bell"

import * as components from "../index.js"

type ExtraTestArgs = {
	_iconAfter?: boolean
}
const meta: Meta<typeof components.LibButton> = {
	component: components.LibButton,
	title: "Components/Button",
	args: {
		label: "Label",
		...{
			_iconAfter: true
		} satisfies ExtraTestArgs as any
	}
}

export default meta
type Story = StoryObj<typeof components.LibButton> & { args?: ExtraTestArgs }

export const Primary: Story = {
	render: args => {
		const extraArgs = args as ExtraTestArgs
		return {
			components: {
				...components,
				IconFaSolidBell
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
							${extraArgs._iconAfter
								? `
								<template #icon-after>
									<icon class="w-[1em]"><icon-fa-solid-bell /></icon>
								</template>
							`
								: ``}
						</lib-button>
					</template>
				</div>
			`
		}
	}
}

export const IconAfter: Story = {
	...Primary,
	args: {
		...Primary.args,
		_iconAfter: true
	}
}

export const OnlyIcon: Story = {
	...Primary,
	args: {
		...Primary.args,
		label: undefined
	}
}
export const Disabled: Story = {
	...Primary,
	args: {
		...Primary.args,
		disabled: true
	}
}
export const Borderless: Story = {
	...Primary,
	args: {
		...Primary.args,
		border: false
	}
}
export const BorderlessDisabled: Story = {
	...Primary,
	args: {
		...Primary.args,
		border: false,
		disabled: true
	}
}
export const WithDivInside: Story = {
	render: args => ({
		components,
		setup: () => ({ args }),
		template: `
		<div class="flex gap-4 justify-center">
			<lib-button v-bind="{...args}">
				<div>Div inside button still has a pointer cursor.</div>
			</lib-button>
		</div>
		`
	})
}
