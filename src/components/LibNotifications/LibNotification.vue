<template>
	<div
		:class="classes"
		tabindex="0"
		ref="notificationEl"
		@keydown.enter.self="NotificationHandler.resolveToDefault(notification)"
	>
		<div class="upper">
			<div
				class="message-container"
				@keydown.enter.self="NotificationHandler.resolveToDefault(notification)"
			>
				<div
					v-if="notification.title"
					class="title"
				>
					{{ notification.title }}
				</div>
				<div
					class="message"
				>
					{{ notification.message }}
				</div>
				<div
					v-if="notification.code"
					class="code"
				>
					Code: {{ notification.code }}
				</div>
			</div>
			<lib-group v-if="notification.options" class="options" :border="false">
				<lib-button
					:label="option"
					:color="getColor(notification, option)"
					v-for="option in notification.options"
					:key="option"
					@click="notification.resolve(option)"
				/>
			</lib-group>
		</div>
		<div class="actions">
			<lib-button
				v-if="notification.cancellable"
				:border="false"
				@click="NotificationHandler.dismiss(notification)"
			>
				<fa :icon="'solid times'"/>
			</lib-button>
			<LibButton
				:border="false"
				class="copy"
				@click="copy(handler.stringify(notification))"
			>
				<fa :icon="'regular copy'"/>
			</LibButton>
		</div>
	</div>
</template>
<script lang="ts">
export default {
	name: "lib-notification",
	inheritAttrs: false,
}
</script>
<script setup lang="ts">
import { computed, PropType, ref } from "vue"

import { copy } from "../../helpers/copy.js"
import { NotificationEntry, NotificationHandler } from "../../helpers/NotificationHandler.js"
import fa from "../fa/Fa.vue"
import LibButton from "../LibButton/LibButton.vue"
import LibGroup from "../LibGroup/LibGroup.vue"


defineProps({
	notification: { type: Object as PropType<NotificationEntry>, required: true },
	handler: { type: Object as PropType<NotificationHandler>, required: true },
})


const classes = computed(() => ({
	notification: true,
}))


const getColor = (notification: NotificationEntry, option: string): "red" | "green" | "blue" | "orange" | "yellow" | false => notification.default === option ? "green" : notification.dangerous.includes(option) ? "red" : false

const notificationEl = ref<null | HTMLElement>(null)

defineExpose({
	focus: () => {
		notificationEl.value?.focus()
	},
})


</script>

<style lang="scss" scoped>
.notification {
	max-width: 700px;
	background: var(--bgNormal);
	// padding: var(--paddingM);
	border-radius: var(--borderRadius);

	& :deep(.group) {
		--groupPadding: var(--paddingM);
		padding: 0;
		@include flex-row(wrap, center, center);
	}

	@include border();
	@include focusable();
	// @include flex-col(nowrap, null, center);
	@include flex-row(nowrap);
	position:relative;
	gap: var(--paddingM);
	margin: var(--paddingM);
}

.upper {
	margin: var(--paddingM);
	gap: var(--paddingM);
	@include flex-col(wrap);
}

.message-container {
	@include flex(1, 1);
	@include flex-col(wrap);
	align-items: center;
	margin-right: calc((var(--paddingXS) + 2px) + 1em);
	// margin-left: var(--paddingXS);
	margin-top: var(--paddingM);
	gap: var(--paddingM);
	// order:1;
}

.title {
	font-weight: bold;
}

.message,
.title {
	@include flex(1, 1);
}

.code {
	@include flex(1, 0);
	font-size: var(--fontSizeSmall);
}

.actions {
	// @include flex(0,0);
	position: absolute;
	top: 0;
	right: 0;
	@include flex-col(nowrap, center, flex-start);
}

// .options {
// 	// @include flex(1, 0, 100%);
// 	order:2;
// }

// .cancel {
// 	order:0;
// 	// @include flex(1, 0, 100%);
// 	@include flex-row(wrap, flex-end, center);
// }

// .copy {
// 	align-self: flex-end;
// }
</style>
