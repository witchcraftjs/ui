<template>
<!-- we use data-disabled because labels have no disabled property technically -->
<label
	:id="`label-${id ?? fallbackId}`"
	:class="!($attrs as any).unstyle && twMerge(`
			pr-0
			text-sm
		`,
		!valid && `text-danger-700`,
		($attrs as any)?.class
	)"
	:data-disabled="disabled"
	:data-invalid="!valid"
	:for="id"
	v-bind="{...$attrs, class:undefined}"
>
	<slot/>
</label>
</template>

<script setup  lang="ts">
import type { MakeRequired } from "@alanscodelog/utils/types"
import { type LabelHTMLAttributes,toRef,useAttrs } from "vue"

import { twMerge } from "../../utils/twMerge.js"
import { type BaseInteractiveProps, baseInteractivePropsDefaults, getFallbackId, type LabelProps, type LinkableByIdProps, type TailwindClassProp } from "../shared/props.js"


defineOptions({
	name: "lib-label",
})

const fallbackId = getFallbackId()

 
withDefaults(defineProps<Props>(), {
	id: "",
	unstyled: undefined,
	valid: true,
	...baseInteractivePropsDefaults,
})

const $attrs = useAttrs()
</script>

<script lang="ts">
type RealProps =
	& LinkableByIdProps
	& LabelProps
	& BaseInteractiveProps
	& {
		unstyled?: boolean
		valid?: boolean
	}

interface Props
	extends
	/** @vue-ignore */
	Partial<Omit<LabelHTMLAttributes,"class"> & TailwindClassProp>,
	RealProps
{}
</script>

<script lang="ts">

</script>
