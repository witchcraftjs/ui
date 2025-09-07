<!-- eslint-disable -->
<template>
<div :class="twMerge(`

	`, ($attrs as any).class)"
	v-bind="{...$attrs, class:undefined}"
>
	<slot/>
</div>
</template>

<script setup  lang="ts">
// remove when copying
// @ts-nocheck this is a templatek
/* eslint-disable */

import { type HTMLAttributes, ref } from "vue"

import { twMerge } from "../../utils/twMerge.js"
import type { TailwindClassProp } from "../shared/props.js"

defineOptions({
	name: "LibName", /* todo */
	inheritAttrs: false
})

// const props = defineProps<{}>({ })

const el = ref<null | HTMLElement>(null)

const modelValue = defineModel<string>({ required: true })
</script>

<script lang="ts">
export default {
	name: "LibName"
}

type RealProps = {
}

interface Props
	extends
	/** @vue-ignore */
	Partial<Omit<HTMLAttributes, "class">
	& TailwindClassProp
	& RealProps
	> { }
</script>
