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
 
import { computed, type HTMLAttributes, onBeforeUnmount, onMounted, type PropType, reactive, type Ref, ref, watch } from "vue"

import { twMerge } from "../../utils/twMerge.js"
import { baseInteractiveProps, type TailwindClassProp } from "../shared/props.js"


defineOptions({
	name: "lib-name", /* todo */
	inheritAttrs: false,
})


// const props = defineProps<{}>({ })

const el = ref<null | HTMLElement>(null)

const modelValue = defineModel<string>({ required: true })


</script>

<script lang="ts">
export default {
	name: "lib-name",
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
