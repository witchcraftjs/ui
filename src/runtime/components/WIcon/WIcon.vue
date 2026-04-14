<template>
<div
	:class="twMerge('icon inline-block', $attrs?.class)"
	v-bind="{ ...$attrs, class: undefined }"
>
	<slot/>
</div>
</template>

<script setup lang="ts">
import { type HTMLAttributes, useAttrs } from "vue"

import { twMerge } from "../../utils/twMerge.js"

defineOptions({
	name: "Icon",
	inheritAttrs: false
})

const $attrs = useAttrs() as any

defineProps<
	& /** @vue-ignore */ Omit<HTMLAttributes, "class">
>()
</script>

<script lang="ts">
/**
 * Just a very simple wrapper for wrapping unplugin-icons in an inline-block div so the icon in the slot take's up a normal line height when it's alone.
 *
 * ```vue
 * 		<WIcon><i-...></WIcon>
 * ``
 */
export default { name: "Icon" }
</script>
