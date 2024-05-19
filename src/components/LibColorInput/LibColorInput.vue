<template>
<lib-popup
	v-model="showPopup"
>
	<template #button="{extractEl}">
		<lib-button
			:id="id"
			class="flex flex-nowrap"
			:aria-label="stringColor"
			:title="stringColor"
			v-bind="$attrs"
			v-extract-root-el="extractEl"
			@click="togglePopup"
		>
			<span class="color-label
					whitespace-nowrap
					pr-2
				"
			>
				<slot>Pick Color</slot>
			</span>
			<div :class="`color-swatch
						rounded-sm
						px-1
						flex-1
						h-4
						w-8
						relative
						aspect-square
						before:content-['']
						before:absolute
						before:inset-0
						before:bg-transparency-squares
						before:z-[-1]
					`"
				:style="`background:${stringColor}`"
			/>
		</lib-button>
	</template>
	<template #popup="{extractEl}">
		<lib-color-picker v-if="showPopup"
			:id="id"
			:allow-alpha="allowAlpha"
			v-model="tempValue"
			v-extract-root-el="extractEl"
			@save="emits('update:modelValue', tempValue); showPopup = false"
			@cancel="showPopup = false"
		/>
	</template>
</lib-popup>
	<!-- </div> -->
</template>

<script setup lang="ts">
import { colord } from "colord"
import { computed, type PropType, ref, useAttrs } from "vue"

import { vExtractRootEl } from "../../directives/vExtractRootEl.js"
import LibButton from "../LibButton/LibButton.vue"
import LibColorPicker from "../LibColorPicker/LibColorPicker.vue"
import LibPopup from "../LibPopup/LibPopup.vue"
import { linkableByIdProps } from "../shared/props.js"


type HsvaColor = { h: number, s: number, v: number, a?: number }
type RgbaColor = { r: number, g: number, b: number, a?: number }
defineOptions({
	name: "lib-color-input",
})
const props = defineProps({
	...linkableByIdProps(),
	modelValue: { type: Object as PropType<RgbaColor>, required: false, default: () => ({ r: 0, g: 0, b: 0 }) },
	allowAlpha: { type: Boolean, required: false, default: true },
	copyTransform: {
		type: Function as PropType<(val: HsvaColor, stringVal: string) => any>,
		required: false,
		default: (_val: RgbaColor, stringVal: string) => stringVal,
	},
})
const $attrs = useAttrs()

const stringColor = computed(() => colord(props.modelValue).toRgbString())
const tempValue = ref({ ...props.modelValue })

const showPopup = ref(false)

const emits = defineEmits<{
	(e: "update:modelValue", val: RgbaColor): void
}>()


const updateValue = (val: RgbaColor): void => {
	emits("update:modelValue", val)
}

const togglePopup = (): void => {
	if (showPopup.value) {
		updateValue(tempValue.value)
	}
	showPopup.value = !showPopup.value
}

</script>

