<template>
<div tabindex="0">{{ value }}</div>
</template>

<script  setup lang="ts">
import type { PropType } from "vue"


defineOptions({ name: "aria" })
defineProps<{
	// eslint-disable-next-line vue/no-restricted-props
	value: string
}>()
</script>

<style scoped>
div {
	position: absolute;
	height: 1px;
	width: 1px;
	padding: 0;
	margin: -1px;
	overflow: hidden;
	clip: rect(0, 0, 0, 0);
	white-space: nowrap;
}
</style>
