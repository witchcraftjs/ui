<template>
<div id="app"
	tabindex="-1"
	:class="twMerge(
		(showOutline ? 'group outlined outlined-visible' : '[&_*]:outline-hidden'),
		darkMode && ' dark',
		($attrs['wrapperAttrs'] as any)?.class
	)"
	v-bind="{ ...($attrs['wrapperAttrs']), class: undefined }"
	ref="el"
>
	<!-- id root is useful for teleports, so they are at the topmost level where they can still be styled -->
	<div
		id="root"
		v-bind="{ ...$attrs, class: undefined, wrapperAttrs: undefined }"
		:class="twMerge( `
			min-w-dvw
			dark:bg-fg
			dark:text-bg
			bg-bg
			text-fg
			flex
			flex-col
			items-center
		`, ($attrs as any).attrs?.class)"
	>
		<slot/>
	</div>
</div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, type PropType, ref } from "vue"

import { useAccesibilityOutline } from "../../composables/useAccesibilityOutline.js"
import { useDivideAttrs } from "../../composables/useDivideAttrs.js"
import { useSetupDarkMode } from "../../composables/useSetupDarkMode.js"
import { useShowDevOnlyKey } from "../../composables/useShowDevOnlyKey.js"
import { theme } from "../../theme.js"
import { twMerge } from "../../utils/twMerge.js"

const $attrs = useDivideAttrs(["wrapper"])

defineOptions({ name: "root" })
const props = withDefaults(defineProps<{
	outline?: boolean
	forceOutline?: boolean
}>(), {
	outline: true,
	forceOutline: false,
})


const el = ref<HTMLElement | null>(null)

const autoOutline = useAccesibilityOutline(el).outline

const showOutline = computed(() => (props.outline && autoOutline.value) || props.forceOutline)

const themeCb = (): void => {
	theme.attach(el.value!)
}
if ((process as any).client) {
	onMounted(() => {
		theme.on("change", themeCb)
		themeCb()
	})
	onBeforeUnmount(() => {
		theme.off("change", themeCb)
	})
}

const darkModeSetup = useSetupDarkMode()

const darkMode = darkModeSetup.darkMode

useShowDevOnlyKey()

defineExpose({
	darkMode: darkModeSetup,
})
</script>

