import "../../assets/global.scss"

import { library } from "@fortawesome/fontawesome-svg-core"
import { far } from "@fortawesome/free-regular-svg-icons"
import { fas } from "@fortawesome/free-solid-svg-icons"
import { reactive, ref } from "vue"

import { NotificationHandler, theme } from "../../helpers"
import TestWrapper from "../../TestWrapper.vue"

import { fa, LibButton, LibDebug, LibNotifications } from ".."


library.add(fas, far)

export default {
	title: "Example/Notifications",
	component: LibNotifications,
	argTypes: {
	},
}


const Template = args => ({
	components: { LibNotifications, LibDebug, LibButton, fa, TestWrapper },
	setup() {
		theme()
		const handler = reactive(new NotificationHandler())

		let count = 0

		const withTitle = ref(true)
		const disableTimeout = ref(false)

		const notify = () => {
			count++
			handler.notify({
				title: withTitle.value ? `Notification(${count})` : undefined,
				message: `This is a notification. Pick an option:`,
				requiresAction: true,
				options: ["Ok", "Default Answer", "Dangerous Option", "Cancel"],
				default: "Default Answer",
				dangerous: ["Dangerous Option"],
				cancellable: true,
			})
		}
		const notifyTimeoutable = () => {
			count++
			handler.notify({
				title: withTitle.value ? `Notification(${count})` : undefined,
				message: `This is a notification. No action required.`,
				cancellable: true,
				timeout: disableTimeout.value ? false : 2000,
			})
		}
		return {
			notify,
			notifyTimeoutable,
			handler,
			withTitle,
			disableTimeout,
			args: {
				outline: true,
				...args,
			},
		}
	},
	backgrounds: { disable: true },
	// <lib-debug>{{args.handler}}</lib-debug>
	template: `
	<test-wrapper :outline="args.outline">
		<lib-button :label="'Notify'" @click="notify()"></lib-button>
		<lib-button :label="'Notify Timeoutable'" @click="notifyTimeoutable()"></lib-button>
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
})


export const Primary = Template.bind({})
