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
	v-bind="{ ...$attrs, class: undefined }"
>
	<slot/>
</label>
</template>

<script setup  lang="ts">
import { useAttrs } from "vue"

import { twMerge } from "../../utils/twMerge.js"
import { getFallbackId } from "../shared/props.js"

defineOptions({
	name: "LibLabel"
})

const fallbackId = getFallbackId()

withDefaults(defineProps<Props>(), {
	id: "",
	valid: true,
	unstyle: false, disabled: false, readonly: false, border: true
})

const $attrs = useAttrs()
</script>

<script lang="ts">
import type { LabelHTMLAttributes } from "vue"
import type { BaseInteractiveProps, LabelProps, LinkableByIdProps, TailwindClassProp } from "../shared/props.js"

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
	{ }
</script>

<script lang="ts">

</script>
