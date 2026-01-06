<template>
<!-- using custom toasts, reka-ui toasts still have issues, like like of control over pause, and I can't get the leave event to animate or transition with vue transitions to work -->
<TransitionGroup
	name="list"
	tag="div"
	:class="twMerge(`
		notifications
		[--notification-width:calc(100dvw-var(--spacing)*4)]
		sm:[--notification-width:300px]
		fixed
		top-0
		z-50
		right-[calc(var(--notification-width)*-1)]
		w-[calc(var(--spacing)*2+var(--notification-width)*2)]
		max-h-[100dvh]
		flex
		flex-col
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
		class="
			overflow-hidden
			my-2
			max-h-[300px]
			w-[var(--notification-width)]
			shrink-0
			max-sm:[&_.notification--button]:p-2
			max-sm:[&_.notification--button]:py-1
			max-sm:[&_.notification--header]:text-lg
		"
		v-for="notification of notifications"
		:key="notification.id"
		@pause="handler.pause(notification)"
		@resume="handler.resume(notification)"
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
				:progress="calculateNotificationProgress(notification, time!)"
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
				max-sm:data-[state=open]:animate-slideInUp
				fixed
				flex
				max-h-[80dvh]
				top-[50%]
				left-[50%]
				sm:translate-x-[-50%]
				sm:translate-y-[-50%]
				max-w-[700px]
				max-sm:bottom-2
				max-sm:top-[unset]
				max-sm:left-2
				max-sm:right-2
				max-sm:w-[calc(100%-var(--spacing)*4)]
				z-100
			"
		>
			<lib-notification
				class="
					w-full
					sm:max-w-[700px]
					max-w-full
					max-h-full
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
						{{ slotProps.title }}
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
import {
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogOverlay,
	AlertDialogPortal,
	AlertDialogRoot,
	AlertDialogTitle
} from "reka-ui"
import { computed } from "vue"

import { calculateNotificationProgress } from "./calculateNotificationProgress.js"
import LibNotification from "./LibNotification.vue"

import { useNotificationHandler } from "../../composables/useNotificationHandler.js"
import { useTimeConditionally } from "../../composables/useTimeConditionally.js"
import { NotificationHandler } from "../../helpers/NotificationHandler.js"
import { twMerge } from "../../utils/twMerge.js"
import LibProgressBar from "../LibProgressBar/LibProgressBar.vue"
import type { LinkableByIdProps, TailwindClassProp } from "../shared/props.js"

defineOptions({
	name: "LibNotifications",
	inheritAttrs: false
})

const props = defineProps<Props>()

const handler = props.handler ?? useNotificationHandler()

const topNotifications = computed(() => handler.queue.filter(entry => entry.requiresAction).reverse())
const notifications = computed(() => handler.queue.filter(entry => !entry.requiresAction))

const fetchTime = computed(() => {
	return notifications.value.filter(entry => entry.timeout !== undefined && !entry.isPaused).length > 0
})

const { time } = useTimeConditionally(fetchTime, { refreshInterval: props.progressUpdateInterval })
</script>

<script lang="ts">
import type { HTMLAttributes } from "vue"

type RealProps
	= & LinkableByIdProps
		& {
		/** If not provided, uses the global handler (this requires useNotificationHandler be called and configured). */
			handler?: NotificationHandler
			progressUpdateInterval?: number
		}

interface Props
	extends
	/** @vue-ignore */
	Partial<Omit<HTMLAttributes, "class"> & TailwindClassProp>,
	RealProps
{}
</script>
