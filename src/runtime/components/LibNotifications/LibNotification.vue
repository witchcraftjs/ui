<template>
<div
	v-if="notification"
	:class="twMerge(`
		notification
		max-w-700px
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
	`,
		($attrs as any).class)"
	v-bind="{ ...$attrs, class: undefined }"
	tabindex="0"
	ref="notificationEl"
	@keydown.enter.self="NotificationHandler.resolveToDefault(notification)"
>
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
				title: notification.title,
				class: `
					notification--title
					focus-outline
					rounded-sm
					font-bold
				`,
				tabindex: 0
			})"
		>
			<div
				v-bind="slotVars.title"
			>
				{{ notification.title }}
			</div>
		</slot>
		<div class="notification--spacer flex-1"/>
		<div class="actions flex">
			<LibButton
				:border="false"
				class="
					notification--title-button
					notification--copy-button
					text-neutral-700
					dark:text-neutral-300
				"
				@click="copy(handler ? handler.stringify(notification) : JSON.stringify(notification))"
			>
				<icon><i-fa6-regular-copy/></icon>
			</LibButton>
			<lib-button
				v-if="notification.cancellable"
				class="
					notification--title-button
					notification--cancel-button
				"
				:border="false"
				@click="NotificationHandler.dismiss(notification)"
			>
				<icon><i-fa6-solid-xmark/></icon>
			</lib-button>
		</div>
	</div>
	<slot
		v-if="notification.message"
		name="message"
		v-bind="setSlotVar('message', {
			class: `
				notification--message
				whitespace-pre-wrap
				text-neutral-800
				dark:text-neutral-200
				mb-1
			`,
			message: notification.message,
			tabindex: 0
		})"
	>
		<div
			v-bind="slotVars.message"
		>
			{{ notification.message }}
		</div>
	</slot>
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
			<lib-button
				:label="option"
				:class="twMerge(`
					notification--button
					notification--option-button
					px-2
				`"
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
import { computed, type HTMLAttributes, ref, useAttrs } from "vue"

import IFa6RegularCopy from "~icons/fa6-regular/copy"
import IFa6SolidXmark from "~icons/fa6-solid/xmark"

import { useSlotVars } from "../../composables/useSlotVars.js"
import { copy } from "../../helpers/copy.js"
import { type NotificationEntry, NotificationHandler } from "../../helpers/NotificationHandler.js"
import { twMerge } from "../../utils/twMerge.js"
import Icon from "../Icon/Icon.vue"
import LibButton from "../LibButton/LibButton.vue"
import type { TailwindClassProp } from "../shared/props.js"

defineOptions({
	name: "LibNotification",
	inheritAttrs: false
})
const $attrs = useAttrs()

const { setSlotVar, slotVars } = useSlotVars()


const props = withDefaults(defineProps<Props>(), {
	handler: undefined
})

const getColor = (notification: NotificationEntry, option: string): "ok" | "primary" | "danger" | "secondary" => notification.default === option ? "primary" : notification.dangerous.includes(option) ? "danger" : "secondary"

/* Todo make this more flexible? */

const buttonColors = computed(() => props.notification.options.map((option: any /* what ??? */) => getColor(props.notification, option)))

const notificationEl = ref<null | HTMLElement>(null)
defineExpose({
	focus: () => {
		notificationEl.value?.focus()
	}
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
	Partial<Omit<HTMLAttributes, "class"> & TailwindClassProp>,
	RealProps
{}
</script>
