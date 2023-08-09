/* eslint-disable @typescript-eslint/naming-convention */
import type { Meta, StoryObj } from "@storybook/vue3"
import { reactive, ref } from "vue"

import LibNotifications from "./LibNotifications.vue"

import { NotificationHandler } from "../../helpers/NotificationHandler.js"
import * as components from "../index.js"


const meta: Meta<typeof LibNotifications> = {
	component: LibNotifications,
	args: {
	// @ts-expect-error story only arg
		withTitle: true,
	},
}

export default meta
type Story = StoryObj<typeof LibNotifications>


export const Primary: Story = {
	render: args => ({
		components,
		setup() {
			const handler = reactive(new NotificationHandler())

			let count = 0

			const withTitle = ref(args.withTitle)
			const disableTimeout = ref(false)

			const notifyRequiresAction = () => {
				count++
				void handler.notify({
					title: withTitle.value ? `Notification(${count})` : undefined,
					message: `This is a notification that requires action. Pick an option:`,
					requiresAction: true,
					options: ["Ok", "Default Answer", "Cancel"],
					default: "Default Answer",
				})
			}
			const notifyWithDangerousOption = () => {
				count++
				void handler.notify({
					title: withTitle.value ? `Notification(${count})` : undefined,
					message: `This is a notification that has a dangerous option. Pick an option:`,
					options: ["Ok", "Default Answer", "Dangerous Option", "Cancel"],
					default: "Default Answer",
					dangerous: ["Dangerous Option"],
				})
			}
			const notifyNonCancellable = () => {
				count++
				void handler.notify({
					title: withTitle.value ? `Notification(${count})` : undefined,
					message: `This is a non-cancellable notification. Pick an option:`,
					options: ["Ok", "Default Answer"],
					default: "Default Answer",
					cancellable: false,
				})
			}
			const notifyNonCancellableRequiresAction = () => {
				count++
				void handler.notify({
					title: withTitle.value ? `Notification(${count})` : undefined,
					message: `This is a non-cancellable notification. Pick an option:`,
					requiresAction: true,
					options: ["Ok", "Default Answer"],
					default: "Default Answer",
					cancellable: false,
				})
			}
			const notifyTimeoutable = () => {
				count++
				void handler.notify({
					title: withTitle.value ? `Notification(${count})` : undefined,
					message: `This is a notification. No action required.`,
					timeout: disableTimeout.value ? false : 2000,
				})
			}
			return {
				notifyRequiresAction,
				notifyTimeoutable,
				notifyNonCancellable,
				notifyWithDangerousOption,
				notifyNonCancellableRequiresAction,
				handler,
				withTitle,
				disableTimeout,
				args: {
					outline: false,
					...args,
				},
			}
		},
		backgrounds: { disable: true },
		// <lib-debug>{{args.handler}}</lib-debug>
		template: `
	<test-wrapper :outline="args.outline">
		<lib-button :label="'Notify Timeoutable'" @click="notifyTimeoutable()"></lib-button>
		<lib-button :label="'Notify RequiresAction'" @click="notifyRequiresAction()"></lib-button>
		<lib-button :label="'Notify Non-Cancellable that RequiresAction'" @click="notifyNonCancellableRequiresAction()"></lib-button>
		<lib-button :label="'Notify With Dangerous Option'" @click="notifyWithDangerousOption()"></lib-button>
		<lib-button :label="'Notify Non-Cancellable'" @click="notifyNonCancellable()"></lib-button>
		<input type="checkbox" v-model="withTitle"/> With Title
		<input type="checkbox" v-model="disableTimeout"/> Disable Timeout
			<lib-notifications :handler="handler" />
		History:
		<lib-debug>
			<template v-for="entry in handler.history">
				Message: {{entry.message}}
				Resolution: {{entry.resolution}}
				<br>
			</template>
		</lib-debug>
	</test-wrapper>
	`,
	}),
}

