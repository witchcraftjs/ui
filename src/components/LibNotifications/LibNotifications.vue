<template>
<TransitionGroup name="list"
	tag="div"
	:class="twMerge(`notifications
			fixed
			z-50
			inset-y-0 right-0
			w-1/3
			min-w-[300px]
			pointer-events-none
			overflow-hidden
		`, ($attrs as any).class)"
	v-bind="{ ...$attrs, class: undefined }"
>
	<lib-notification
		class="pointer-events-auto"
		:handler="handler"
		tabindex="0"
		:notification="notification"
		v-for="notification of notifications"
		:key="notification.id"
	/>
</TransitionGroup>
<Transition>
	<div v-show="topNotifications.length > 0">AAAAAAAA</div>
</Transition>
<Transition>
	<dialog
		v-show="topNotifications.length > 0"
		:id="id"
		class="modal
			bg-transparent
			p-0
			backdrop:bg-black/50
			backdrop:p-5
		"
		ref="dialogEl"
		@click.self.prevent="NotificationHandler.dismiss(topNotifications[0])"
	>
		<form>
			<lib-notification
				v-if="topNotifications.length > 0"
				:handler="handler"
				class="top-notification"
				:notification="topNotifications[0]"
				ref="topNotificationComp"
			/>
		</form>
	</dialog>
</Transition>
</template>
<script setup lang="ts">
import { removeIfIn } from "@alanscodelog/utils"
import { nextTick, onBeforeUnmount, type PropType, ref, shallowReactive } from "vue"

import LibNotification from "./LibNotification.vue"

import { type NotificationEntry, NotificationHandler } from "../../helpers/NotificationHandler.js"
import { twMerge } from "../../helpers/twMerge.js"
import { linkableByIdProps } from "../shared/props.js"


defineOptions({
	name: "lib-notificiations",
	inheritAttrs: false,
})

const props = defineProps({
	...linkableByIdProps(),
	handler: { type: Object as PropType<NotificationHandler>, required: true },
})
const dialogEl = ref<HTMLDialogElement | null>(null)

const isOpen = ref(false)
const notifications = shallowReactive<NotificationEntry[]>([])
const topNotifications = shallowReactive<NotificationEntry[]>([])
const open = () => {
	if (!isOpen.value) {
		void nextTick(() => {
			dialogEl.value!.showModal()
			isOpen.value = true
		})
	}
}
const close = () => {
	if (isOpen.value && topNotifications.length === 0) {
		dialogEl.value!.close()
		isOpen.value = false
	}
}

const addNotification = (entry: NotificationEntry) => {
	if (entry.resolution === undefined) {
		if (entry.requiresAction) {
			topNotifications.push(entry)
			open()
			// eslint-disable-next-line @typescript-eslint/no-floating-promises
			entry.promise.then(() => {
				removeIfIn(topNotifications, entry)
				close()
			})
		} else {
			notifications.splice(0, 0, entry)
			// eslint-disable-next-line @typescript-eslint/no-floating-promises
			entry.promise.then(() => {
				removeIfIn(notifications, entry)
			})
		}
	}
}

const notificationListener = (entry: NotificationEntry, type: "added" | "resolved" | "deleted"): void => {
	if (type === "added") {
		addNotification(entry)
	}
}
props.handler.addNotificationListener(notificationListener)

for (const entry of props.handler.queue) {addNotification(entry)}
onBeforeUnmount(() => {
	props.handler.removeNotificationListener(notificationListener)
})

</script>
