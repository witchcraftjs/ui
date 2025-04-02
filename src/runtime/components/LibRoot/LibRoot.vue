<template>
<div :id="id"
	tabindex="-1"
	:class="twMerge(
		(showOutline ? 'group outlined outlined-visible' : '[&_*]:outline-hidden'),
		darkMode && ' dark',
		($attrs['wrapperAttrs'] as any)?.class
	)"
	v-bind="{ ...($attrs['wrapperAttrs']), attrs:undefined, class: undefined }"
	:ref="handleRef"
>
	<!-- id root is useful for teleports, so they are at the topmost level where they can still be styled -->
	<!-- See TestControls for why the margins here -->
	<div
		id="root"
		v-bind="{ ...$attrs.attrs, class: undefined, wrapperAttrs: undefined }"
		:class="twMerge( `
			dark:bg-fg
			dark:text-bg
			bg-bg
			text-fg
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
			($attrs as any).attrs?.class)"
	>
		<TestControls v-if="testWrapperMode" :show-outline="showOutline"/>
		<slot/>
	</div>
</div>
</template>

<script setup lang="ts">
import { unreachable } from "@alanscodelog/utils/unreachable.js"
import { type Theme } from "metamorphosis"
import { type ComponentPublicInstance, computed, onBeforeUnmount, onMounted, ref, toRaw } from "vue"

import { useAccesibilityOutline } from "../../composables/useAccesibilityOutline.js"
import { useDivideAttrs } from "../../composables/useDivideAttrs.js"
import { useSetupDarkMode } from "../../composables/useSetupDarkMode.js"
import { useShowDevOnlyKey } from "../../composables/useShowDevOnlyKey.js"
import { theme as defaultTheme } from "../../theme.js"
import { twMerge } from "../../utils/twMerge.js"
import {type Theme} from "metamorphosis"
import TestControls from "../TestControls/TestControls.vue"

const $attrs = useDivideAttrs(["wrapper"])

defineOptions({ name: "root", inheritAttrs: false })
const props = withDefaults(defineProps<{
	theme?: Theme
	outline?: boolean
	forceOutline?: boolean
	testWrapperMode?: boolean
	id?: string
	/** You can set a ref to the root element by passing :getRef="_ => el = _" */
	getRef?: (el: HTMLElement | null) => void
}>(), {
	theme: undefined,
	testWrapperMode: false,
	outline: true,
	forceOutline: false,
	id: "app",
	getRef: undefined,
})

const el = ref<HTMLElement | null>(null)

function handleRef(_: Element | ComponentPublicInstance | null): void {
	if (_ !== null && !(_ instanceof HTMLElement)) unreachable()
	el.value = _
	props.getRef?.(_)
}

const autoOutline = useAccesibilityOutline(el).outline

const showOutline = computed(() => (props.outline && autoOutline.value) || props.forceOutline)

const theme = computed(() => props.theme ?? defaultTheme)
const themeCb = (): void => {
	toRaw(theme.value).attach(el.value!)
}
if (import.meta.client) {
	onMounted(() => {
		toRaw(theme.value).on("change", themeCb)
		themeCb()
	})
	onBeforeUnmount(() => {
		toRaw(theme.value).off("change", themeCb)
	})
}

const darkModeSetup = useSetupDarkMode()

const darkMode = darkModeSetup.darkMode

useShowDevOnlyKey()

defineExpose({
	darkMode: darkModeSetup,
})
</script>

