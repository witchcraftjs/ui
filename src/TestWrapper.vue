<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, type PropType, ref } from "vue"

import { setupAccesibilityOutline } from "./mixins/index.js"
import { theme } from "./theme.js"

import { cssObjectToString } from "metamorphosis/utils"


defineOptions({ name: "test-wrapper" })
const props = defineProps({
	outline: { type: Boolean as PropType<boolean>, required: false, default: () => false },
})

const el = ref<HTMLElement | null>(null)
const styleEl = ref<HTMLElement | null>(null)

const autoOutline = setupAccesibilityOutline(el).outline

const showOutline = computed(() => props.outline && autoOutline)

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

</script>

<template>
	<!-- Workaround to create global style component for tests that is
	accessible from the storybook preview decorator. See theme callback
	above. -->
	<component :is="'style'" ref="styleEl"/>
	<div id="app"
		:class="showOutline ? 'group outlined' : ''"
		class="
			p-10
			dark:bg-black
			dark:text-white
		"
		tabindex="-1"
		ref="el"
	>
		<div class="outline-indicator absolute right-0 top-0 m-1">{{ showOutline ? "Outline Enabled" : "Outline Disabled" }}</div>
		<slot/>
	</div>
</template>

<style lang="css">
#app:not(.group.outlined) * {
	outline:none;
}
</style>
