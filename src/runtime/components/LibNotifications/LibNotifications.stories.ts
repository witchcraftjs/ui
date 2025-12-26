/* eslint-disable @typescript-eslint/naming-convention */
import { faker } from "@faker-js/faker"
import type { Meta, StoryObj } from "@storybook/vue3"
import { computed, ref } from "vue"

import LibNotifications from "./LibNotifications.vue"

import { NotificationHandler } from "../../helpers/NotificationHandler.js"
import * as components from "../index.js"

const meta: Meta<typeof LibNotifications> = {
	component: LibNotifications,
	title: "Components/Notifications",
	args: {
	// @ts-expect-error story only arg
		withTitle: true
	}
}

export default meta
type Story = StoryObj<typeof LibNotifications>

export const Primary: Story = {
	render: args => ({
		components,
		setup() {
			const handler = new NotificationHandler({})

			let count = 0

			const withTitle = ref(args.withTitle)
			const disableTimeout = ref(false)
			const lotsOfText = ref(false)
			const paragraphs = `\n Simulating lots of text:\n${faker.lorem.paragraphs(20)}`
			const extraText = computed(() => lotsOfText.value ? paragraphs : "")

			const notifyRequiresAction = () => {
				count++
				void handler.notify({
					title: withTitle.value ? `Notification(${count})` : undefined,
					message: `This is a notification that requires action. Pick an option:${extraText.value}`,
					requiresAction: true,
					options: ["Ok", "Default Answer", "Cancel"],
					default: "Default Answer"
				})
			}

			const notifyWithDangerousOption = () => {
				count++
				void handler.notify({
					title: withTitle.value ? `Notification(${count})` : undefined,
					message: `This is a notification that has a dangerous option. Pick an option:${extraText.value}`,
					options: ["Ok", "Default Answer", "Dangerous Option", "Cancel"],
					default: "Default Answer",
					dangerous: ["Dangerous Option"]
				})
			}
			const notifyNonCancellable = () => {
				count++
				void handler.notify({
					title: withTitle.value ? `Notification(${count})` : undefined,
					message: `This is a non-cancellable notification. Pick an option:${extraText.value}`,
					options: ["Ok", "Default Answer"],
					default: "Default Answer",
					cancellable: false
				})
			}
			const notifyNonCancellableRequiresAction = () => {
				count++
				void handler.notify({
					title: withTitle.value ? `Notification(${count})` : undefined,
					message: `This is a non-cancellable notification. Pick an option:${extraText.value}`,
					requiresAction: true,
					options: ["Ok", "Default Answer"],
					default: "Default Answer",
					cancellable: false
				})
			}
			const notifyTimeoutable = () => {
				count++
				void handler.notify({
					title: withTitle.value ? `Notification(${count})` : undefined,
					message: `This is a notification. No action required.${extraText.value}`,
					timeout: disableTimeout.value ? false : 5000
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
				lotsOfText,
				args: {
					outline: false,
					...args
				}
			}
		},
		backgrounds: { disable: true },
		// <lib-debug>{{args.handler}}</lib-debug>
		template: `
	<lib-root :outline="args.outline" :notification-handler="handler">
		<lib-button :label="'Notify Timeoutable'" @click="notifyTimeoutable()"></lib-button>
		<lib-button :label="'Notify RequiresAction'" @click="notifyRequiresAction()"></lib-button>
		<lib-button :label="'Notify Non-Cancellable that RequiresAction'" @click="notifyNonCancellableRequiresAction()"></lib-button>
		<lib-button :label="'Notify With Dangerous Option'" @click="notifyWithDangerousOption()"></lib-button>
		<lib-button :label="'Notify Non-Cancellable'" @click="notifyNonCancellable()"></lib-button>
		<lib-checkbox v-model="lotsOfText">Use lots of text</lib-checkbox>
		<lib-checkbox v-model="disableTimeout">Disable Timeout</lib-checkbox>
		<lib-checkbox v-model="withTitle">With Title</lib-checkbox>
		<lib-notifications :handler="handler" />
		History:
		<lib-debug>
			<template v-for="entry in handler.history">
				Message: {{entry.message}}
				Resolution: {{entry.resolution}}
				<br>
			</template>
		</lib-debug>
	</lib-root>
	`
	})
}
