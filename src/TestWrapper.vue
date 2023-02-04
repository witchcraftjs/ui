<script  lang="ts">
export default {
	name: "test-wrapper",
}
</script>
<script setup lang="ts">
import { computed, type PropType, ref } from "vue"

import { theme } from "./helpers/index.js"
import { setupAccesibilityOutline } from "./mixins/index.js"


const props = defineProps({
	outline: { type: Boolean as PropType<boolean>, required: false, default: () => false },
})
theme()

const el = ref(null)

const { outline } = setupAccesibilityOutline(el)

const classes = computed(() => ({
	outline: props.outline ? true : outline.value,
}))

</script>

<template>
	<div id="main"
		:class="classes"
		tabindex="-1"
		ref="el"
	>
		<div class="outline-indicator">{{ classes.outline ? "Outline Enabled" : "Outline Disabled" }}</div>
		<slot/>
	</div>
</template>

<style lang="scss">
body {
	margin: 0;
}

#main {
	padding: 50px;
	background: var(--bg);
}

.outline-indicator {
	position: fixed;
	top: 0;
	right: 0;
	margin: 10px;
}
</style>
