<template>
<TransitionGroup
	name="list"
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
	<div
		v-show="topNotifications.length > 0"
		:class="twMerge(`notifications--none`, ($attrs as any).class)"
	/>
</Transition>
<!-- we don't need to worry about the user accidentally closing a non-closable dialog as keeping open=true (which the handler handles when the component tries to close) is enough to keep it open without issues -->
<AlertDialogRoot
	:open="topNotifications.length > 0 && topNotifications[0] !== undefined"
	@update:open="topNotifications[0] && NotificationHandler.dismiss(topNotifications[0])"
>
	<AlertDialogPortal :to="'#root'">
		<AlertDialogOverlay
			class="
				fixed inset-0 z-30
				bg-neutral-950/20
				data-[state=open]:animate-overlayShow
			"
		/>
		<AlertDialogContent
			class="
				data-[state=open]:animate-contentShow
				fixed
				top-[50%]
				left-[50%]
				translate-x-[-50%]
				translate-y-[-50%]
				max-h-[80dvh]
				max-w-[700px]
				z-100
			"
		>
			<lib-notification
				v-if="topNotifications.length > 0 && topNotifications[0]"
				class="top-notification"
				:handler="handler"
				:notification="topNotifications[0]!"
				ref="topNotificationComp"
			>
				<template #title="slotProps">
					<AlertDialogTitle v-bind="slotProps">
						Notification
					</AlertDialogTitle>
				</template>
				<template #message="slotProps">
					<AlertDialogDescription v-bind="slotProps">
						{{ slotProps.message }}
					</AlertDialogDescription>
				</template>
			</lib-notification>
		</AlertDialogContent>
	</AlertDialogPortal>
</AlertDialogRoot>
</template>

<script setup lang="ts">
import { removeIfIn } from "@alanscodelog/utils/removeIfIn"
import {
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogOverlay,
	AlertDialogPortal,
	AlertDialogRoot,
	AlertDialogTitle } from "reka-ui"
import { onBeforeUnmount, shallowReactive } from "vue"

import LibNotification from "./LibNotification.vue"

import { useNotificationHandler } from "../../composables/useNotificationHandler.js"
import { type NotificationEntry, NotificationHandler } from "../../helpers/NotificationHandler.js"
import { twMerge } from "../../utils/twMerge.js"
import type { LinkableByIdProps, TailwindClassProp } from "../shared/props.js"

defineOptions({
	name: "LibNotifications",
	inheritAttrs: false
})

const props = defineProps<Props>()


const notifications = shallowReactive<NotificationEntry[]>([])
const topNotifications = shallowReactive<NotificationEntry[]>([])

const addNotification = (entry: NotificationEntry) => {
	if (entry.resolution === undefined) {
		if (entry.requiresAction) {
			topNotifications.push(entry)
			entry.promise.then(() => {
				removeIfIn(topNotifications, entry)
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
import type { HTMLAttributes } from "vue"

type RealProps
	= & LinkableByIdProps
		& {
			/** If not provided, uses the global handler (this requires useNotificationHandler be called and configured). */
			handler?: NotificationHandler
		}

interface Props
	extends
	/** @vue-ignore */
	Partial<Omit<HTMLAttributes, "class"> & TailwindClassProp>,
	RealProps
{}
</script>
