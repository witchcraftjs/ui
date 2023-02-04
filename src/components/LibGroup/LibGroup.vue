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
import { computed, type PropType } from "vue"


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

	@include flex(1, 1);

	&.vertical {
		flex-direction: column;
	}

	padding: var(--groupPadding);
	@include border();
	@include border-invisible;

	&.border {
		@include border($color: var(--borderNormalSoft));
	}

	display: flex;
	gap: var(--groupPadding);

	::v-deep(.group) {
		padding: 0;
		border: none;
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
