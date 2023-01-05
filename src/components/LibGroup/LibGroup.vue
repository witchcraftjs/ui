<template>
	<div :class="classes">
		<slot/>
	</div>
</template>

<script lang="ts">

export default {
	name: "lib-group",
}
</script>
<script setup lang="ts">
import { computed, PropType } from "vue"


const props = defineProps({
	border: { type: Boolean as PropType<boolean>, required: false, default: true },
	vertical: { type: Boolean as PropType<boolean>, required: false, default: false },
})

const classes = computed(() => ({
	group: true,
	border: props.border,
	vertical: props.vertical,
	horizontal: !props.vertical,
}))


</script>

<style lang="scss" scoped>
.group {
	--groupPadding: var(--paddingXS);
	display: flex;
	&.vertical {
		flex-direction: column;
	}
	padding: var(--groupPadding);
	@include border();
	@include border-invisible;
	&.border {
		@include border($color:var(--borderNormalSoft));
	}
	display: flex;
	&.horizontal {
		> ::v-deep(*) {
			margin-left: var(--groupPadding);
			&:first-child {
				margin-left: 0;
			}
		}
	}
	&.vertical {
		& > ::v-deep(*) {
			margin-top: var(--groupPadding);
			&:first-child {
				margin-top: 0;
			}
		}
		& > ::v-deep(.group) {
			margin-left: calc(-1 * var(--groupPadding) - var(--borderWidth));
			margin-right: calc(-1 * var(--groupPadding) - var(--borderWidth));
		}
		& > ::v-deep(.group:last-of-type) {
			margin-bottom: calc(-1 * var(--groupPadding) - var(--borderWidth));
		}
	}
	::v-deep(.border) {
		&:hover {
			box-shadow: none;
		}
		&:not(:active) {
			box-shadow: none;
		}
	}
}
</style>
