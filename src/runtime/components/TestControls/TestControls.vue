<template>
<!-- Width 100% + 2xmargin in combination with the margins in WRoot is a bit of a hack so that it looks like there's padding around the content in test mode (for storybook). We can't just absolutely position these controls or they make the container scroll. -->
<div class="test-controls flex gap-2 p-1 pb-10 -ml-10 w-[calc(100%_+_var(--spacing)*20)]">
	<div class="flex-grow"/>
	<div class="outline-indicator">
		{{ showOutline ? "Outline Enabled" : "Outline Disabled" }}
	</div>
	<WDarkModeSwitcher/>
</div>
</template>

<script setup lang="ts">
import WDarkModeSwitcher from "../WDarkModeSwitcher/WDarkModeSwitcher.vue"

defineOptions({ name: "TestControls" })
defineProps<{
	showOutline: boolean
}>()
</script>
