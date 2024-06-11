<template>
<div
	:class="twMerge(`icon
		inline-block
	`, ($attrs as any).class)"
	v-bind="{...$attrs, class:undefined}"
>
	<FontAwesomeIcon
		:icon="name"
		v-bind="{...$attrs, class:undefined}"
	/>
</div>
</template>

<script setup lang="ts">
import type { IconParams } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon,type FontAwesomeIconProps } from "@fortawesome/vue-fontawesome"
import { computed, type HTMLAttributes,useAttrs } from "vue"

import { twMerge } from "../../helpers/twMerge.js"
import type { TailwindClassProp } from "../shared/props.js"


const $attrs = useAttrs()

// eslint-disable-next-line no-use-before-define
const props = defineProps<Props>()

const name = computed(() => {
	const names = props.icon.split(" ")
	if (["solid", "regular", "light", "thin", "duotone"].find(weight => names.includes(weight)) === undefined) names.push("solid")
	return names.map(name => `fa-${name}`).join(" ")
})


</script>

<script lang="ts">
export default {
	name: "fa",
}

type RealProps = {
	/** Names without the fa- part, so instead of `fa-plus fa-sharp`, it's `plus sharp`. Defaults to solid set if no weight (e.g solid/regular) specified.*/
	icon: string
}

interface Props
	extends
	/** @vue-ignore */
	Partial<Omit<HTMLAttributes, "class">
		& TailwindClassProp
		& Omit<FontAwesomeIconProps, "icon">
	>,
	RealProps { }
</script>

