<template>
<div :class="twMerge(`

	`, ($attrs as any).class)"
	v-bind="{...$attrs, class:undefined}"
>
	<slot/>
</div>
</template>
<script setup  lang="ts">
/* eslint-disable @typescript-eslint/no-unused-vars */
import { computed, getCurrentInstance, onBeforeUnmount, onMounted, type PropType, reactive, type Ref, ref, watch } from "vue"

import { twMerge } from "../../helpers/twMerge.js"
import { baseInteractiveProps, linkableByIdProps } from "../shared/props.js"


defineOptions({
	name: "lib-name", /* todo */
	inheritAttrs: false,
})


const props = defineProps({
	...linkableByIdProps(),
	...baseInteractiveProps,
})

const el = ref<null | HTMLElement>(null)

const modelValue = defineModel<string>({ required: true })


</script>

