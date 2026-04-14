<template>
<div
	v-if="notification"
	:role="notification.requiresAction ? 'alertdialog' : 'status'"
	:aria-labelledby="notification.title ? `title-${notification.id}` : undefined"
	:aria-describedby="notification.message ? `msg-${notification.id}` : undefined"
	:class="twMerge(`
		notification
		bg-neutral-50
		dark:bg-neutral-900
		text-fg
		dark:text-bg
		border
		border-neutral-400
		dark:border-neutral-700
		rounded-sm
		focus-outline
		flex
		flex-col
		gap-2
		p-1
		text-sm
		focus:border-accent-500
		focus-within:border-accent-500
	`,
		($attrs as any).class,
		notification.notificationAttrs?.class
	)
	"
	v-bind="{ ...$attrs, ...(notification?.notificationAttrs ?? {}), class: undefined }"
	tabindex="0"
	:data-id="notification.id"
	ref="notificationEl"
	@keydown.enter.self="NotificationHandler.resolveToDefault(notification)"
>
	<slot
		name="top"
		:notification="notification"
	/>


	<div
		class="
		notification--header
		flex-reverse
		flex
		justify-between
		items-center
	"
	>
		<slot
			v-if="notification.title"
			name="title"
			v-bind="setSlotVar('title', {
				id: `title-${notification.id}`,
				title: notification.title,
				class: `
					notification--title
					focus-outline
					rounded-sm
					font-bold
				`
			})"
		>
			<div
				v-bind="slotVars.title"
			>
				{{ notification.title }}
			</div>
		</slot>
		<div class="notification--spacer flex-1"/>
		<div class="notification--actions flex">
			<WButton
				:border="false"
				aria-label="Copy notification content"
				class="
					notification--title-button
					notification--copy-button
					text-neutral-700
					dark:text-neutral-300
				"
				@click="copy(handler ? handler.stringify(notification) : JSON.stringify(notification))"
			>
				<WIcon><i-lucide-copy/></WIcon>
			</WButton>
			<WButton
				v-if="notification.cancellable"
				aria-label="Dismiss notification"
				class="
					notification--title-button
					notification--cancel-button
				"
				:border="false"
				@click="NotificationHandler.dismiss(notification)"
			>
				<WIcon><i-lucide-x/></WIcon>
			</Wbutton>
		</div>
	</div>
	<slot
		v-if="notification.message && !notification.component"
		name="message"
		v-bind="setSlotVar('message', {
			class: `
				notification--message
				shrink-1
				overflow-auto
				whitespace-pre-wrap
				text-neutral-800
				dark:text-neutral-200
				mb-1
			`,
			message: notification.message
		})"
	>
		<div
			v-bind="slotVars.message"
			:id="`msg-${notification.id}`"
		>
			{{ notification.message }}
		</div>
	</slot>
	<Component
		v-if="notification.component"
		:is="notification.component"
		v-bind="{
			notification,
			message: notification.message,
			messageClasses: `
					notification--message
					whitespace-pre-wrap
					text-neutral-800
					dark:text-neutral-200
					mb-1
				`,
			...(notification.componentProps ?? {})
		}"
	/>
	<div class="notification--footer flex items-end justify-between">
		<div
			v-if="notification.code"
			class="code text-xs text-neutral-700 dark:text-neutral-300"
		>
			Code: {{ notification.code }}
		</div>
		<div class="notification--footer-spacer flex-1 py-1"/>
		<div
			v-if="notification.options"
			class="
				notification--options
				flex
				flex-wrap
				justify-end
				gap-2
			"
		>
			<WButton
				:label="option"
				:class="twMerge(`
					notification--button
					notification--option-button
					px-2
				`,
					notification.default === option && `notification--default`
				)"
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
import { computed, type HTMLAttributes, onMounted, ref, useAttrs } from "vue"

import ILucideCopy from "~icons/lucide/copy"
import ILucideX from "~icons/lucide/x"

import { useSlotVars } from "../../composables/useSlotVars.js"
import { copy } from "../../helpers/copy.js"
import { type NotificationEntry, NotificationHandler } from "../../helpers/NotificationHandler.js"
import type { TailwindClassProp } from "../../types/index.js"
import { twMerge } from "../../utils/twMerge.js"
import WButton from "../WButton/WButton.vue"
import WIcon from "../WIcon/WIcon.vue"

defineOptions({
	name: "WNotification",
	inheritAttrs: false
})
const $attrs = useAttrs()

const { setSlotVar, slotVars } = useSlotVars()


const props = withDefaults(defineProps<
	& {
		notification: NotificationEntry
		handler?: NotificationHandler
	}
	& /** @vue-ignore */ Omit<HTMLAttributes, "class">
	& /** @vue-ignore */ TailwindClassProp
>(), {
	handler: undefined
})


const getColor = (notification: NotificationEntry, option: string): "ok" | "primary" | "danger" | "secondary" => {
	return notification.dangerous.includes(option)
		? "danger"
		: notification.default === option
			? "primary"
			: "secondary"
}


/* Todo make this more flexible? */
const buttonColors = computed(() => props.notification.options.map((option: any /* what ??? */) => getColor(props.notification, option)))

const notificationEl = ref<null | HTMLElement>(null)

onMounted(() => {
	if (props.notification.requiresAction) {
		notificationEl.value?.focus()
	}
})

defineExpose({
	focus: () => {
		notificationEl.value?.focus()
	}
})
</script>
