<template>
<label
	:id="`label-${id}`"
	:class="!unstyled && twMerge(`
			pr-2
			border
			border-transparent
		`,
		type === 'top' && `
			w-full
			pr-0
			text-sm
		`,
		!valid && `text-danger-700`
	)
	"
	:data-top="type === 'top'"
	:data-disabled="disabled"
	:readonly="readonly"
	:data-invalid="!valid"
	:for="id"
>
	<slot/>
</label>
</template>
<script setup  lang="ts">
import { type PropType } from "vue"

import { twMerge } from "../../helpers/twMerge.js"
import { baseInteractiveProps, linkableByIdProps } from "../shared/props.js"


defineOptions({
	name: "lib-label",
})
// const el = ref<null | HTMLElement>(null)

/* const props =*/ defineProps({
	...linkableByIdProps(),
	...baseInteractiveProps,
	type: { type: String as PropType<"normal" | "top">, required: false, default: "normal" },
	border: undefined as any,
	valid: { type: Boolean as PropType<boolean>, required: false, default: true },
	unstyled: { type: Boolean as PropType<boolean>, required: false, default: false },
})


</script>
