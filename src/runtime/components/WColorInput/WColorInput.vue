<template>
<WPopover
	:root-props="{
		class: 'color-input--popover-root',
		...rootProps
	}"
	:content-props="{
		onInteractOutside: () => { $tempValue = undefined;emit('cancel') }
	}"
	v-model="showPopover"
>
	<template #button>
		<WColorSwatchButton
			:id="finalId"
			:temp-value="$tempValue"
			:value="$value"
			@click="togglePopover"
		/>
	</template>
	<template #popover>
		<div
			class="color-input--popover-wrapper p-5"
		>
			<WColorPicker
				v-if="showPopover"
				:id="finalId"
				:allow-alpha="allowAlpha"
				:custom-representation="customRepresentation"
				:string-precision="stringPrecision"
				v-model="internalTempValue"
				v-model:temp-value="$tempValue"
				@save="save"
				@cancel="cancel"
			/>
		</div>
	</template>
</Wpopover>
</template>

<script setup lang="ts">
import type { DialogRootEmits, PopoverRootProps } from "reka-ui"
import { type ButtonHTMLAttributes, type EmitsToProps, type HTMLAttributes, ref } from "vue"

import WColorSwatchButton from "./WColorSwatchButton.vue"

import { useFallbackId } from "../../composables/useFallbackId.js"
import type { HsvaColor, RgbaColor, TailwindClassProp } from "../../types/index.js"
import WColorPicker from "../WColorPicker/WColorPicker.vue"
import WPopover from "../WPopover/WPopover.vue"

defineOptions({
	name: "WColorInput"
})
const props = withDefaults(defineProps<
	& {
		id?: string
		label?: string
		allowAlpha?: boolean
		border?: boolean
		/** See ColorPicker.copyTransform */
		copyTransform?: (val: HsvaColor, stringVal: string) => any
		/** See ColorPicker.allowAlpha */
		stringPrecision?: number
		/** See ColorPicker.customRepresentation */
		customRepresentation?: {
			fromHsvaToString: (hsva: HsvaColor, includeAlpha: boolean) => string
		}
		rootProps?: PopoverRootProps & EmitsToProps<DialogRootEmits> & Omit<HTMLAttributes, "class"> & TailwindClassProp
	}
	& /** @vue-ignore */ Omit<ButtonHTMLAttributes, "class">
	& /** @vue-ignore */ TailwindClassProp
>(), {
	allowAlpha: true,
	border: true,
	copyTransform: (_val: HsvaColor, stringVal: string) => stringVal,
	stringPrecision: 3,
	customRepresentation: undefined
})
const finalId = useFallbackId(props)

const emit = defineEmits<{
	(e: "save"): void
	(e: "cancel"): void
}>()


const $value = defineModel<RgbaColor>({ required: false, default: () => ({ r: 0, g: 0, b: 0 }) })
const $tempValue = defineModel<RgbaColor | undefined>("tempValue", { required: false, default: () => (undefined) })

const internalTempValue = ref({ ...$value.value })

const showPopover = ref(false)

const togglePopover = (): void => {
	if (showPopover.value) {
		$value.value = internalTempValue.value
	}
	showPopover.value = !showPopover.value
}

function save() {
	$value.value = internalTempValue.value
	showPopover.value = false
	$tempValue.value = undefined
	emit("save")
}
function cancel() {
	showPopover.value = false
	$tempValue.value = undefined
	emit("cancel")
}
</script>
