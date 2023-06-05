/* eslint-disable @typescript-eslint/naming-convention */
import type { Meta, StoryObj } from "@storybook/vue3"

import LibNotification from "./LibNotification.vue"

import { NotificationHandler } from "../../helpers/NotificationHandler.js"
import * as components from "../index.js"


const handler = new NotificationHandler()

const meta: Meta<typeof LibNotification> = {
	component: LibNotification,
	args: {

	},
}

export default meta
type Story = StoryObj<typeof LibNotification>


export const Primary: Story = {
	render: args => ({
		components: { ...components, LibNotification },
		setup() {
			return { handler, args }
		},
		backgrounds: { disable: true },
		template: `
			<lib-notification :handler="handler" :v-bind="args"/>
		`,
	}),
	args: {
		// @ts-expect-error calling protected method
		notification: { ...handler._createEntry({
			title: `Notification`,
			message: `This is a notification. Pick an option:`,
		}),
																		// eslint-disable-next-line @typescript-eslint/no-empty-function
																		resolve: () => { } },
	},
}

export const WithCode: Story = {
	...Primary,
	args: {
		...Primary.args,
		// @ts-expect-error calling protected method
		notification: handler._createEntry({
			...Primary.args!.notification,
			code: "0001",
		}),
	},
}
export const RequiresAction: Story = {
	...Primary,
	args: {
		...Primary.args,
		// @ts-expect-error calling protected method
		notification: handler._createEntry({
			...Primary.args!.notification,
			requiresAction: true,
		}),
	},
}

/** Should not have cancel cross in top corner. */

export const Uncancellable: Story = {
	...Primary,
	args: {
		...Primary.args,
		// @ts-expect-error calling protected method
		notification: handler._createEntry({
			...Primary.args!.notification,
			options: ["Ok"],
			cancellable: false,
		}),
	},
}

export const CustomOptions: Story = {
	...Primary,
	args: {
		...Primary.args,
		// @ts-expect-error calling protected method
		notification: handler._createEntry({
			...Primary.args!.notification,
			options: ["Ok", "Default Answer", "Cancel"],
		}),
	},
}
export const CustomDefaultOption: Story = {
	...Primary,
	args: {
		...Primary.args,
		// @ts-expect-error calling protected method
		notification: handler._createEntry({
			...CustomOptions.args!.notification,
			default: "Default Answer",
		}),
	},
}
export const CustomDangerousOption: Story = {
	...Primary,
	args: {
		...Primary.args,
		// @ts-expect-error calling protected method
		notification: handler._createEntry({
			...CustomOptions.args!.notification,
			options: ["Ok", "Dangerous Option", "Cancel"],
			dangerous: ["Dangerous Option"],
		}),
	},
}
export const CustomDefaultAndDangerousOption: Story = {
	...Primary,
	args: {
		...Primary.args,
		// @ts-expect-error calling protected method
		notification: handler._createEntry({
			...CustomOptions.args!.notification,
			options: ["Ok", "Default Answer", "Dangerous Option", "Cancel"],
			default: "Default Answer",
			dangerous: ["Dangerous Option"],
		}),
	},
}

