<template>
<div
	:class="twMerge(`notification
			max-w-700px
			bg-neutral-50
			dark:bg-neutral-950
			border
			border-neutral-400
			rounded
			focus-outline
			flex-flex-col
			gap-2
			p-2 m-2
		`,
		notification.requiresAction && `
		`,
		($attrs as any).class)"
	v-bind="{...$attrs, class:undefined}"
	tabindex="0"
	ref="notificationEl"
	@keydown.enter.self="NotificationHandler.resolveToDefault(notification)"
>
	<div class="header flex-reverse flex justify-between">
		<div
			v-if="notification.title"
			tabindex="0"
			class=" title
				focus-outline flex
				rounded
				font-bold
				"
		>
			{{ notification.title }}
		</div>
		<div class="actions flex">
			<LibButton
				:border="false"
				class="copy text-neutral-700"
				@click="copy(handler ? handler.stringify(notification) : JSON.stringify(notification))"
			>
				<fa :icon="'regular copy'"/>
			</LibButton>
			<lib-button
				v-if="notification.cancellable"
				:border="false"
				@click="NotificationHandler.dismiss(notification)"
			>
				<fa :icon="'solid times'"/>
			</lib-button>
		</div>
	</div>
	<div class="message" tabindex="0">
		{{ notification.message }}
	</div>
	<div class="bottom flex items-end justify-between">
		<div v-if="notification.code" class="code text-xs text-neutral-700">
			Code: {{ notification.code }}
		</div>
		<div class="flex-1 py-1"/>
		<div v-if="notification.options"
			:border="false"
			class="options
				flex flex-wrap justify-end
				gap-2
			"
		>
			<lib-button
				:label="option"
				:class="buttonColors[i] == 'secondary' && 'p-0'"
				:border="buttonColors[i] !== 'secondary'"
				:color="buttonColors[i]"
				v-for="option, i in notification.options"
				:key="option"
				@click="notification.resolve(option)"
			/>
		</div>
	</div>
</div>
</template>
<script setup lang="ts">
import { computed, type PropType, ref, useAttrs } from "vue"

import { copy } from "../../helpers/copy.js"
import { type NotificationEntry, NotificationHandler } from "../../helpers/NotificationHandler.js"
import { twMerge } from "../../helpers/twMerge.js"
import fa from "../fa/Fa.vue"
import LibButton from "../LibButton/LibButton.vue"


defineOptions({
	name: "lib-notification",
	inheritAttrs: false,
})

const $attrs = useAttrs()

const props = defineProps({
	notification: { type: Object as PropType<NotificationEntry>, required: true },
	handler: { type: Object as PropType<NotificationHandler>, required: true },
})

const getColor = (notification: NotificationEntry, option: string): "ok" | "primary" | "danger" | "secondary" => notification.default === option ? "primary" : notification.dangerous.includes(option) ? "danger" : "secondary"
/* Todo make this more flexible? */
const buttonColors = computed(() => props.notification.options.map((option: any /* what ??? */) => getColor(props.notification, option)))

const notificationEl = ref<null | HTMLElement>(null)

defineExpose({
	focus: () => {
		notificationEl.value?.focus()
	},
})


</script>

