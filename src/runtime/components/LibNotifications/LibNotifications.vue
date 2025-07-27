<template>
<TransitionGroup name="list"
	tag="div"
	:class="twMerge(`notifications
			absolute
			z-50
			inset-y-0 right-0
			w-1/3
			min-w-[300px]
			pointer-events-none
			overflow-hidden
			flex flex-col
		`, ($attrs as any).class)"
	v-bind="{ ...$attrs, class: undefined }"
>
	<lib-notification class="pointer-events-auto"
		:handler="handler"
		tabindex="0"
		:notification="notification"
		v-for="notification of notifications"
		:key="notification.id"
	/>
</TransitionGroup>
<Transition>
	<div
		v-show="topNotifications.length > 0"
		:class="twMerge(`notifications--none`, ($attrs as any).class)"
	/>
</Transition>
<Transition>
	<dialog v-show="topNotifications.length > 0"
		:id="id"
		:class="twMerge(`notifications-modal
			bg-transparent
			p-0
			backdrop:bg-black/50
			backdrop:p-5
		`, ($attrs as any).class)"
		ref="dialogEl"
		@click.self.prevent="topNotifications[0] && NotificationHandler.dismiss(topNotifications[0])"
	>
		<form>
			<lib-notification v-if="topNotifications.length > 0 && topNotifications[0]"
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
import { removeIfIn } from "@alanscodelog/utils/removeIfIn.js"
import { type HTMLAttributes,nextTick, onBeforeUnmount, ref,shallowReactive, Transition, TransitionGroup } from "vue"

import LibNotification from "./LibNotification.vue"

import { useNotificationHandler } from "../../composables/useNotificationHandler.js"
import { type NotificationEntry, NotificationHandler } from "../../helpers/NotificationHandler.js"
import { twMerge } from "../../utils/twMerge.js"
import type { LinkableByIdProps, TailwindClassProp } from "../shared/props.js"

defineOptions({
	name: "lib-notifications",
	inheritAttrs: false,
})


const props = defineProps<Props>()

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
			entry.promise.then(() => {
				removeIfIn(topNotifications, entry)
				close()
			})
		} else {
			notifications.splice(0, 0, entry)
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

const handler = props.handler ?? useNotificationHandler()

handler.addNotificationListener(notificationListener)

for (const entry of handler.queue) { addNotification(entry) }
onBeforeUnmount(() => {
	handler.removeNotificationListener(notificationListener)
})

</script>
<script lang="ts">

type RealProps =
& LinkableByIdProps
& {
	/** If not provided, uses the global handler (this requires useNotificationHandler be called and configured). */
	handler?: NotificationHandler
}

interface Props
	extends
	/** @vue-ignore */
	Partial<Omit<HTMLAttributes,"class"> & TailwindClassProp>,
	RealProps
{}
</script>
