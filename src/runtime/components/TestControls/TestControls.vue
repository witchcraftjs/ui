<template>
<!-- Width 100% + 2xmargin in combination with the margins in WRoot is a bit of a hack so that it looks like there's padding around the content in test mode (for storybook). We can't just absolutely position these controls or they make the container scroll. -->
<div
	class="
	test-controls
	grid
		grid-cols-2
	gap-2
	px-10
	pb-5
	mb-10
	-ml-10
	w-[calc(100%_+_var(--spacing)*20)]
	border-b
	border-neutral-500
"
>
	<div class="flex flex-col gap-2 items-center">
		<div class="text-sm">
			Test State:
		</div>
		<div class="outline-indicator">
			<WIcon
				:title="showOutline ? 'Tab Focus Outline Enabled' : 'Tab Focus Outline Disabled'"
				:class="twMerge(
					showOutline ? 'text-accent-500' : 'text-neutral-500'
				)"
			>
				<i-lucide-keyboard/>
			</WIcon>
		</div>
	</div>
	<div class="flex flex-col items-center gap-2">
		<div class="text-sm">
			Controls:
		</div>
		<WDarkModeSwitcher/>
	</div>
</div>
</template>

<script setup lang="ts">
import { twMerge } from "../../utils/twMerge.js"
import WDarkModeSwitcher from "../WDarkModeSwitcher/WDarkModeSwitcher.vue"

defineOptions({ name: "TestControls" })
defineProps<{
	showOutline: boolean
}>()
</script>
