<script lang="ts">
export default {
	name: "app",
}
</script>
<script setup lang="ts">
import { ref } from "vue"

import TestWrapper from "./TestWrapper.vue"


const args = ref({
	modelValue: "A",
	values: [],
	options: ["A", "B", "C", "AB"],
	label: "Test",
	restrictOptions: true,
})
</script>

<template>
	<test-wrapper>
		<lib-debug :value="args"/>
		<lib-input v-bind="{...args}" v-model="args.modelValue" v-model:values="args.values">
			<template #item="{item}">
				{{ item }}
			</template>
		</lib-input>
	</test-wrapper>
</template>

<style lang="scss">
body {
	padding: 50px;
	background: var(--bg);
}
</style>
