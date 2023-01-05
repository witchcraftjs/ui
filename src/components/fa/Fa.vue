<template>
	<div :className="classes">
		<FontAwesomeIcon :icon="name"/>
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
import { computed, PropType } from "vue"


const props = defineProps({
	/** Names without the fa- part, so instead of `fa-plus fa-sharp`, it's `plus sharp`. Defaults to solid set if no weight (e.g solid/regular) specified.*/
	icon: { type: String, required: true },
	class: { type: Array as PropType<string[]>, required: false, default: () => []},
	attrs: { type: Object as PropType<IconParams>, required: false, default: () => ({}) },
})

const name = computed(() => {
	const names = props.icon.split(" ")
	if (["solid", "regular", "light", "thin", "duotone"].find(weight => names.includes(weight)) === undefined) names.push("solid")
	return names.map(name => `fa-${name}`).join(" ")
})

const classes = computed(() => [
	"icon",
	...props.class,
].join(" "))

</script>


<style scoped>
.icon {
	display: flex;
	align-items: center;
	/* vertical-align: middle;
	height: 1em;
	font-size: 1em; */
}
</style>
