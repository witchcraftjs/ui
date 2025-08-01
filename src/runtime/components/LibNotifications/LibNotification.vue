<template>
<div :class="twMerge(`notification
		max-w-700px
		bg-neutral-50
		dark:bg-neutral-900
		text-fg
		dark:text-bg
		border
		border-neutral-400
		rounded-sm
		focus-outline
		flex-flex-col
		gap-2
		p-2 m-2
	`,
	($attrs as any).class)"
	v-bind="{ ...$attrs, class: undefined }"
	tabindex="0"
	ref="notificationEl"
	@keydown.enter.self="NotificationHandler.resolveToDefault(notification)"
>
	<div class="notification--header flex-reverse flex justify-between">
		<div v-if="notification.title"
			tabindex="0"
			class="title
				focus-outline flex
				rounded-sm
				font-bold
			"
		>
			{{ notification.title }}
		</div>
		<div class="notification--spacer flex-1"/>
		<div class="actions flex">
			<LibButton :border="false"
				class="notification--copy-button text-neutral-700"
				@click="copy(handler ? handler.stringify(notification) : JSON.stringify(notification))"
			>
				<icon><i-fa6-regular-copy/></icon>
			</LibButton>
			<lib-button
				v-if="notification.cancellable"
				class="notification--cancel-button"
				:border="false"
				@click="NotificationHandler.dismiss(notification)"
			>
				<icon><i-fa6-solid-xmark/></icon>
			</lib-button>
		</div>
	</div>
	<div class="notification--message whitespace-pre-wrap" tabindex="0">
		{{ notification.message }}
	</div>
	<div class="notification--footer flex items-end justify-between">
		<div v-if="notification.code" class="code text-xs text-neutral-700 dark:text-neutral-300">
			Code: {{ notification.code }}
		</div>
		<div class="notification--footer-spacer flex-1 py-1"/>
		<div v-if="notification.options"
			class="notification--options
				flex flex-wrap justify-end
				gap-2
			"
		>
			<lib-button :label="option"
				:class="twMerge(`
					notification--option-button
				`,
					buttonColors[i] == 'secondary' && 'p-0'
				)"
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
import { computed, type HTMLAttributes,ref, useAttrs } from "vue"

import { copy } from "../../helpers/copy.js"
import { type NotificationEntry, NotificationHandler } from "../../helpers/NotificationHandler.js"
import { twMerge } from "../../utils/twMerge.js"
import Icon from "../Icon/Icon.vue"
import LibButton from "../LibButton/LibButton.vue"
import type { TailwindClassProp } from "../shared/props.js"


defineOptions({
	name: "lib-notification",
	inheritAttrs: false,
})
const $attrs = useAttrs()

const props = withDefaults(defineProps<Props>(), {
	handler: undefined,
})

const getColor = (notification: NotificationEntry, option: string): "ok" | "primary" | "danger" | "secondary" => notification.default === option ? "primary" : notification.dangerous.includes(option) ? "danger" : "secondary"

/* Todo make this more flexible? */
// eslint-disable-next-line @stylistic/space-in-parens
const buttonColors = computed(() => props.notification.options.map((option: any /* what ??? */) => getColor(props.notification, option)))

const notificationEl = ref<null | HTMLElement>(null)
defineExpose({
	focus: () => {
		notificationEl.value?.focus()
	},
})

</script>

<script lang="ts">
type RealProps = {
	notification: NotificationEntry
	handler?: NotificationHandler
}

interface Props
	extends
	/** @vue-ignore */
	Partial<Omit<HTMLAttributes,"class"> & TailwindClassProp>,
	RealProps
{}
</script>
