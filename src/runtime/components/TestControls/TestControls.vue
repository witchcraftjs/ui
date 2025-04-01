<template>
<!-- Width 100% + 2xmargin in combination with the margins in LibRoot is a bit of a hack so that it looks like there's padding around the content in test mode (for storybook). We can't just absolutely position these controls or they make the container scroll. -->
<div class="flex gap-2 p-1 pb-10 -ml-10 w-[calc(100%_+_var(--spacing)*20)]">
	<div class="flex-grow"/>
	<div class="outline-indicator">{{ showOutline ? "Outline Enabled" : "Outline Disabled" }}</div>
	<lib-dark-mode-switcher/>
</div>
</template>

<script setup lang="ts">
import LibDarkModeSwitcher from "../LibDarkModeSwitcher/LibDarkModeSwitcher.vue"

defineOptions({ name: "test-controls" })
defineProps< {
	showOutline: boolean
}>()

</script>

