<template>
<!-- using custom toasts, reka-ui toasts still have issues, like like of control over pause, and I can't get the leave event to animate or transition with vue transitions to work -->
<TransitionGroup
	name="list"
	tag="div"
	:class="twMerge(`
		notifications
		[--notification-width:300px]
		fixed
		top-0
		z-50
		right-[calc(var(--notification-width)*-1)]
		py-2
		w-[calc(var(--spacing)*2+var(--notification-width)*2)]
		[&_.notification]:w-[var(--notification-width)]
		max-h-[100dvh]
		flex
		flex-col
		[&_.notification]:shrink-0
		gap-1
		list-none
		outline-none
		overflow-y-auto
		overflow-x-clip
		scrollbar-hidden
	`, ($attrs as any).class)"
	v-bind="{ ...$attrs, class: undefined }"
>
	<lib-notification
		:handler="handler"
		tabindex="0"
		:notification="notification"
		class="overflow-hidden"
		v-for="notification of notifications"
		:key="notification.id"
		@pointerenter="notification.timeout && !notification.isPaused && handler.pause(notification)"
		@blur="notification.timeout && notification.isPaused && handler.resume(notification)"
	>
		<template #top>
			<LibProgressBar
				v-if="notification.timeout !== undefined"
				class="
					w-full
					h-1
					before:duration-[10ms]
					-mt-1
					-mx-[calc(var(--spacing)*2+2px)]
					rounded-none
				"
				:progress="100 - (((notification.isPaused ? (notification._timer.elapsedBeforePause): (notification._timer.elapsedBeforePause + (time - notification.startTime))) / notification.timeout) * 100)"
			/>
		</template>
	</lib-notification>
</TransitionGroup>
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
				class="
					top-notification
					text-md
					gap-2
					p-2
					[&_.notification--button]:p-2
					[&_.notification--button]:py-1
					[&_.notification--header]:text-lg
					[&_.notification--message]:py-3
				"
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
	AlertDialogTitle
} from "reka-ui"
import { computed, ref } from "vue"

import LibNotification from "./LibNotification.vue"

import { useNotificationHandler } from "../../composables/useNotificationHandler.js"
import { type NotificationEntry, NotificationHandler } from "../../helpers/NotificationHandler.js"
import { twMerge } from "../../utils/twMerge.js"
import LibProgressBar from "../LibProgressBar/LibProgressBar.vue"
import type { LinkableByIdProps, TailwindClassProp } from "../shared/props.js"

defineOptions({
	name: "LibNotifications",
	inheritAttrs: false
})

const props = defineProps<Props>()


const time = ref(Date.now())
setInterval(() => {
	requestAnimationFrame(() => {
		time.value = Date.now()
	})
}, 50)

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
