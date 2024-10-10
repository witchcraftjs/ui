<template>
<div
	class="icon inline-block"
	v-bind="{...$attrs, class:undefined}"
>
	<slot/>
</div>
</template>

<script setup lang="ts">
import { computed, type HTMLAttributes,useAttrs } from "vue"

const $attrs = useAttrs()

// eslint-disable-next-line no-use-before-define
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
export default {
	name: "icon",
}

interface Props
	extends
	/** @vue-ignore */
	Partial<Omit<HTMLAttributes, "class">
	> { }
</script>

