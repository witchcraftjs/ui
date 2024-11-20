<template>
<div id="app"
	tabindex="-1"
	:class="twMerge(
		(showOutline ? 'group outlined outlined-visible' : '[&_*]:outline-none'),
		darkMode && ' dark',
		`min-h-screen`
	)
	"
	ref="el"
>
	<div
		class="
			min-h-screen
			dark:bg-fg
			dark:text-bg
			bg-bg
			text-fg
			flex
			flex-col
			items-center
		"
	>
		<slot/>
	</div>
</div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, type PropType, ref } from "vue"

import { useAccesibilityOutline } from "../../composables/useAccesibilityOutline.js"
import { useDarkMode } from "../../composables/useDarkMode.js"
import { useShowDevOnlyKey } from "../../composables/useShowDevOnlyKey.js"
import { theme } from "../../theme.js"
import { twMerge } from "../../utils/twMerge.js"

defineOptions({ name: "root" })
const props = withDefaults(defineProps<{
	outline?: boolean
	forceOutline?: boolean
}>(), {
	outline: false,
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

const {
	darkMode,
	manualDarkMode
} = useDarkMode()

useShowDevOnlyKey()
</script>

