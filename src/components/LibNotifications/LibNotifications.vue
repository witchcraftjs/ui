<template>
	<focus-trap v-if="topNotifications.length > 0" v-model:value="trapFocus">
		<Transition>
			<div
				tabindex="-1"
				class="top-notification-veil"
				@click.self.prevent="NotificationHandler.dismiss(topNotifications[0])"
			>
				<lib-notification
					:handler="handler"
					class="top-notification"
					:notification="topNotifications[0]"
					ref="topNotificationComp"
				/>
			</div>
		</Transition>
	</focus-trap>
	<div class="notifications">
		<TransitionGroup name="list">
			<lib-notification
				:handler="handler"
				tabindex="0"
				:notification="notification"
				v-for="(notification, i) of notifications"
				:key="notification.id"
				:ref="(el: any) => i == 0 ? lastNotificationComp = el as any : ''"
			/>
		</TransitionGroup>
	</div>
</template>
<script lang="ts">
export default {
	name: "lib-notifications",
	inheritAttrs: false,
}
</script>
<script setup lang="ts">
import { removeIfIn } from "@alanscodelog/utils"
import { FocusTrap } from "focus-trap-vue"
import { computed, nextTick, onBeforeUnmount, PropType, Ref, ref, watch } from "vue"

import LibNotification from "./LibNotification.vue"

import { NotificationEntry, NotificationHandler } from "../../helpers/NotificationHandler.js"


// const emit = defineEmits<(e: "copy", val: NotificationEntry) => void>()

const props = defineProps({
	handler: { type: Object as PropType<NotificationHandler>, required: true },
})

const notifications = ref<NotificationEntry[]>([])
const topNotifications = ref<NotificationEntry[]>([])
const topNotificationComp = ref<null | InstanceType<typeof LibNotification>>(null)
const lastNotificationComp = ref<null | InstanceType<typeof LibNotification>>(null)

const wasClearTop = true
const wasClear = true

const checkFocus = (notifications: Ref<NotificationEntry[]>, wasClear: boolean, compRef: Ref<null | InstanceType<typeof LibNotification>>): void => {
	if (notifications.value.length > 0) {
		if (wasClear) {
			wasClear = false
			// eslint-disable-next-line @typescript-eslint/no-floating-promises
			nextTick(() => {
				compRef.value?.focus()
			})
		}
	} else {
		wasClear = true
	}
}

watch([topNotifications], () => {
	checkFocus(topNotifications, wasClearTop, topNotificationComp)
}, { deep: true })
watch([notifications], () => {
	checkFocus(notifications, wasClear, lastNotificationComp)
}, { deep: true })


const trapFocus = computed(() => topNotifications.value.length > 0)

const notificationListener = (entry: NotificationEntry, type: "added" | "resolved" | "deleted"): void => {
	if (type === "added") {
		if (entry.requiresAction) {
			topNotifications.value.push(entry)
			// eslint-disable-next-line @typescript-eslint/no-floating-promises
			entry.promise.then(() => { removeIfIn(topNotifications.value, entry) })
		} else {
			notifications.value.splice(0, 0, entry)
			// eslint-disable-next-line @typescript-eslint/no-floating-promises
			entry.promise.then(() => { removeIfIn(notifications.value, entry) })
		}
	}
}
props.handler.addNotificationListener(notificationListener)

onBeforeUnmount(() => {
	props.handler.removeNotificationListener(notificationListener)
})

</script>

<style lang="scss" scoped>
.top-notification-veil {
	position: absolute;
	@include pos(0, 0, 0, 0);
	background: var(--opacity5);
	display: flex;
	@include flex-row(nowrap, center, center)
}

.notifications {
	position: absolute;
	z-index: 1000;
	@include pos(0, 0, 0, null);
	width: 300px;
	pointer-events: none;
	/* for animations */
	overflow: hidden;

	&>* {
		pointer-events: all;
	}
}
</style>
