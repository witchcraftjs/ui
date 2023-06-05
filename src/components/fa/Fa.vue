<template>
	<!-- content forces the div height to be the same as if the div had real text with a zero width space, this way we can still use a flexbox instead of doing inline-block -->
	<div :class="twMerge(`icon
		inline-block
		`, ($attrs as any).class)"
		v-bind="{...$attrs, class:undefined}"
	>
		<FontAwesomeIcon
			:icon="name"
			v-bind="$attrs"
			fixed-width
		/>
	</div>
</template>

<script lang="ts">
export default {

	name: "fa",
}
</script>

<script setup lang="ts">
import type { IconParams } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { computed, type PropType, useAttrs } from "vue"

import { twMerge } from "../../helpers/twMerge.js"


const $attrs = useAttrs()
const props = defineProps({
	/** Names without the fa- part, so instead of `fa-plus fa-sharp`, it's `plus sharp`. Defaults to solid set if no weight (e.g solid/regular) specified.*/
	icon: { type: String, required: true },
	attrs: { type: Object as PropType<IconParams>, required: false, default: () => ({}) },
})

const name = computed(() => {
	const names = props.icon.split(" ")
	if (["solid", "regular", "light", "thin", "duotone"].find(weight => names.includes(weight)) === undefined) names.push("solid")
	return names.map(name => `fa-${name}`).join(" ")
})


</script>

