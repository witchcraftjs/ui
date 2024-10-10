<template>
<!-- Workaround to create global style component for tests that is
	accessible from the storybook preview decorator. See theme callback
	above. -->
<component :is="'style'" ref="styleEl"/>
<div id="app"
	tabindex="-1"
	:class="(showOutline ? 'group outlined outlined-visible' : '[&_*]:outline-none') +
		(darkMode ? ' dark' : '') "
	ref="el"
>
	<div class="flex gap-2 absolute right-0 top-0 m-1 dark:text-white">
		<div>Wrapper Controls:</div>
		<div class="outline-indicator">{{ showOutline ? "Outline Enabled" : "Outline Disabled" }}</div>
		<lib-dark-mode-switcher @update:dark-mode="darkMode = $event"/>
	</div>
	<div
		class="
			p-10
			dark:bg-neutral-900
			dark:text-white
		"
	>
		<slot/>
	</div>
</div>
</template>

<script setup lang="ts">
import { cssObjectToString } from "metamorphosis/utils"
import { computed, onBeforeUnmount, onMounted, type PropType, ref } from "vue"

import { useAccesibilityOutline } from "../../composables/useAccesibilityOutline.js"
import { theme } from "../../theme.js"
import LibDarkModeSwitcher from "../LibDarkModeSwitcher/LibDarkModeSwitcher.vue"

defineOptions({ name: "test-wrapper" })
const props = defineProps({
	outline: { type: Boolean as PropType<boolean>, required: false, default: () => false },
	forceOutline: { type: Boolean as PropType<boolean>, required: false, default: () => false },
})

const el = ref<HTMLElement | null>(null)
const styleEl = ref<HTMLElement | null>(null)

const autoOutline = useAccesibilityOutline(el).outline

const showOutline = computed(() => (props.outline && autoOutline.value) || props.forceOutline)

/**
 * Not using the suggested attach method because we're writing the css
 * to a global style element. See template below.
 */
const themeCb = (): void => {
	styleEl.value!.innerHTML = `:root{\n${cssObjectToString(theme.css)}\n}`
}
onMounted(() => {
	theme.on("change", themeCb)
	themeCb()
})
onBeforeUnmount(() => {
	theme.off("change", themeCb)
})
const darkMode = ref(false)
</script>

