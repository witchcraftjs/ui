<template>
<div class="border-2 border-accent-500 p-1 px-2 rounded-sm bg-accent-500/10">
	<div class="text-lg">
		Custom Message Component
	</div>
	<div class="font-bold">
		Original message:
	</div>
	<div
		:class="props.messageClasses"
	>
		{{ props.message }}
	</div>
	<div class="font-bold">
		Custom Prop:
	</div>
	<div>
		{{ props.customProp }}
	</div>
</div>
</template>

<script setup lang="ts">
import type { CustomNotificationComponentProps } from "../../types/index.js"

const props = defineProps<CustomNotificationComponentProps & { customProp: string }>()
</script>
