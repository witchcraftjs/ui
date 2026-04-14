<template>
<div
	tabindex="-1"
	:class="twMerge(
		(showOutline ? 'group outlined outlined-visible' : '[&_*]:outline-hidden'),
		darkMode && ' dark',
		wrapperAttrs?.class
	)"
	v-bind="{
		id: 'app',
		...wrapperAttrs,
		class: undefined
	}"
	:ref="handleRef"
>
	<!-- id root is useful for teleports, so they are at the topmost level where they can still be styled -->
	<!-- See TestControls for why the margins here -->
	<div
		id="root"
		v-bind="{ ...$attrs, class: undefined }"
		:class="twMerge(`
			dark:bg-neutral-900
			dark:text-white
			bg-neutral-50
			text-black
		`,
			testWrapperMode && `
			px-10
			pb-10
		`,
			!testWrapperMode && `
			min-h-dvh
			flex
			flex-col
		`,
			($attrs as any).class)"
	>
		<TestControls
			v-if="testWrapperMode"
			:show-outline="showOutline"
		/>
		<Notifications
			v-if="useNotifications && isClientSide"
			data-allow-mismatch
		/>
		<slot/>
	</div>
</div>
</template>

<script setup lang="ts">
import { unreachable } from "@alanscodelog/utils/unreachable"
import type { Theme } from "metamorphosis"
import type { ComponentPublicInstance, HTMLAttributes } from "vue"
import { computed, onBeforeUnmount, onMounted, ref, toRaw, useAttrs } from "vue"

import { useAccesibilityOutline } from "../../composables/useAccesibilityOutline.js"
import { useNotificationHandler } from "../../composables/useNotificationHandler.js"
import { useSetupDarkMode } from "../../composables/useSetupDarkMode.js"
import { useSetupI18n } from "../../composables/useSetupI18n.js"
import { useSetupLocale } from "../../composables/useSetupLocale.js"
import { useShowDevOnlyKey } from "../../composables/useShowDevOnlyKey.js"
import { NotificationHandler } from "../../helpers/NotificationHandler.js"
import { theme as defaultTheme } from "../../theme.js"
import type { TailwindClassProp } from "../../types/index.js"
import { twMerge } from "../../utils/twMerge.js"
import TestControls from "../TestControls/TestControls.vue"
import Notifications from "../WNotifications/WNotifications.vue"


defineOptions({ name: "Root", inheritAttrs: false, suspensible: false })
const $attrs = useAttrs()
const props = withDefaults(defineProps<{
	theme?: Theme
	outline?: boolean
	forceOutline?: boolean
	testWrapperMode?: boolean
	/** You can set a ref to the root element by passing :getRef="_ => el = _" */
	getRef?: (el: HTMLElement | null) => void
	/** True by default, should be passed import.meta.client if using nuxt, or false when running server side. */
	isClientSide?: boolean
	useBuiltinTranslations?: boolean
	useNotifications?: boolean
	notificationHandler?: NotificationHandler
	wrapperAttrs?: Omit<HTMLAttributes, "class"> & TailwindClassProp
}>(), {
	theme: undefined,
	testWrapperMode: false,
	outline: true,
	forceOutline: false,
	getRef: undefined,
	isClientSide: true,
	useBuiltinTranslations: true,
	useNotifications: true,
	notificationHandler: undefined
})

const el = ref<HTMLElement | null>(null)

function handleRef(_: Element | ComponentPublicInstance | null): void {
	if (_ !== null && !(_ instanceof HTMLElement)) unreachable()
	el.value = _
	props.getRef?.(_)
}

if (props.useNotifications) {
	const handler = props.notificationHandler ?? new NotificationHandler()
	useNotificationHandler(handler, props.isClientSide)
}

const autoOutline = useAccesibilityOutline(el).outline

const showOutline = computed(() => (props.outline && autoOutline.value) || props.forceOutline)

const theme = computed(() => props.theme ?? defaultTheme)
const themeCb = (): void => {
	toRaw(theme.value).attach(el.value!)
}
if (props.isClientSide) {
	onMounted(() => {
		toRaw(theme.value).on("change", themeCb)
		themeCb()
	})
	onBeforeUnmount(() => {
		toRaw(theme.value).off("change", themeCb)
	})
}

const darkModeSetup = useSetupDarkMode({ isClientSide: props.isClientSide })

const darkMode = darkModeSetup.darkMode

useShowDevOnlyKey()

defineExpose({
	darkMode: darkModeSetup
})

if (props.useBuiltinTranslations) {
	const { languageLocale } = useSetupLocale()
	void useSetupI18n({
		locale: languageLocale,
		useBuiltinTranslations: true,
		useDummyMessageSetWhileLoading: true
	})
}
</script>
