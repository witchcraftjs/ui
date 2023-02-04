<template>
	<button
		:id="id"
		:class="classes"
		:disabled="disabled"
		type="button"
		ref="el"
		@click="click($event)"
	>
		<span class="label"><slot/>{{ label }}</span>
	</button>
</template>
<script lang="ts">

export default {
	name: "lib-button",
}
</script>
<script setup  lang="ts">
import { castType, isBlank } from "@alanscodelog/utils"
import { computed, getCurrentInstance, onMounted, type PropType, type Ref, ref } from "vue"


const emits = defineEmits<(e: "click", _payload: MouseEvent | PointerEvent) => void>()
/* eslint-enable @typescript-eslint/unified-signatures */

const props = defineProps({
	/** The id for the input. Uses vue's uid (`getCurrentInstance().uid`) if none provided. */
	id: { type: String as PropType<string>, required: false, default: () => getCurrentInstance()!.uid.toString() },
	/** The label for the button. */
	label: { type: String as PropType<string>, required: false, default: () => "" },
	disabled: { type: Boolean as PropType<boolean>, required: false, default: false },
	border: { type: Boolean as PropType<boolean>, required: false, default: true },
	autofocus: { type: Boolean as PropType<boolean>, required: false, default: false },
	color: { type: [String, Boolean] as PropType<"red" | "green" | "blue" | "orange" | "yellow" | false>, required: false, default: false },
})

const click = (e: MouseEvent | PointerEvent): void => {
	emits("click", e)
}

const el = ref<null | HTMLElement>(null)

const classes = computed(() => ({
	button: true,
	border: props.border,
	// label: isBlank(props.label) ? "" : "blank",
	blank: isBlank(props.label),
	[`color-${props.color}`]: !!props.color,
}))

onMounted(() => {
	if (props.autofocus) {
		castType<Ref<HTMLElement>>(el)
		el?.value.focus()
	}
})

</script>

<style lang="scss" scoped>
button {
	display: flex;
	align-items: center;
	padding: var(--paddingXS) calc(var(--paddingXS) + 2px);
	@include border;
	@include border-radius;
	/* use an invisible border when borderless so that they all occupy the same height anyways */
	border-color: var(--opacity0);
	color: var(--textNormal);
	@include colors("&", true, true);
	user-select: none;

	.label {
		display: flex;
		align-items: center;
	}

	&:not(.blank) :slotted(.icon) {
		margin-right: calc(var(--paddingS) + 1px);
	}

	&.border {
		@include colors("&", true, true);
		@include box-shadow;
		background: var(--bgNormal);
		border-color: var(--borderNormal);
	}

	&:not(:active, :hover) {
		.outline &:focus {
			color: var(--textFocused);

			&.border {
				border-color: var(--borderFocused);
				// background: var(--bgFocused);
				@include box-shadow($color: var(--shadowFocused));
			}
		}
	}

	&:not(:disabled):hover {
		cursor: pointer;
		color: var(--textHover);
		@include text-shadow($color: var(--textShadowHover));

		&.border {
			@include box-shadow($color: var(--shadowHover));
			border-color: var(--borderHover);
		}
	}

	&:not(:disabled):active {
		color: var(--textActive);
		@include no-text-shadow;

		&.border {
			@include box-shadow($color: var(--shadowActive), $spread: calc(var(--shadowWidth) + 1px), $inset: true);
			border-color: var(--borderActive);
		}
	}

	&:disabled {
		color: var(--textDisabled);
		box-shadow: none;
		@include no-text-shadow;

		&.border {
			border-color: var(--borderDisabled);
			background: var(--bgDisabled);
		}
	}
}

.large {
	font-size: var(--fontSizeLarge);
}

.small {
	font-size: var(--fontSizeSmall);
}
</style>
