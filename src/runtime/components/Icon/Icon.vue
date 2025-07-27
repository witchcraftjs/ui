<template>
<div
	:class="twMerge('icon inline-block', $attrs?.class)"
	v-bind="{...$attrs, class:undefined}"
>
	<slot/>
</div>
</template>

<script setup lang="ts">
import { computed, type HTMLAttributes,useAttrs } from "vue"

import { twMerge } from "../../utils/twMerge.js"

defineOptions({
	name: "icon",
	inheritAttrs: false,
})


const $attrs = useAttrs() as any

const props = defineProps<Props>()


</script>

<script lang="ts">
/**
 * Just a very simple wrapper for wrapping unplugin-icons in an inline-block div so the icon in the slot take's up a normal line height when it's alone.
 *
 * ```vue
 * 		<icon><i-...></icon>
 * ``
 */

interface Props
	extends
	/** @vue-ignore */
	Partial<Omit<HTMLAttributes, "class">
	> { }
</script>

