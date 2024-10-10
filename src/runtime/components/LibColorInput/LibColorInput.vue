<template>
<lib-popup
	v-model="showPopup"
>
	<template #button="{extractEl}">
		<lib-button
			:id="id"
			:class="twMerge(`
				flex flex-nowrap
			`,
				($attrs as any).class
			)"
			:aria-label="stringColor"
			:title="stringColor"
			v-bind="{...$attrs, class: undefined}"
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
			@save="$value = tempValue; showPopup = false"
			@cancel="showPopup = false"
		/>
	</template>
</lib-popup>
</template>

<script setup lang="ts">
import { colord } from "colord"
import { type ButtonHTMLAttributes,computed, type PropType, ref, useAttrs } from "vue"

import { vExtractRootEl } from "../../directives/vExtractRootEl.js"
import type { HsvaColor, RgbaColor } from "../../types/index.js"
import { twMerge } from "../../utils/twMerge.js"
import LibButton from "../LibButton/LibButton.vue"
import LibColorPicker from "../LibColorPicker/LibColorPicker.vue"
import LibPopup from "../LibPopup/LibPopup.vue"
import { getFallbackId,type LabelProps, type LinkableByIdProps, type TailwindClassProp } from "../shared/props.js"

defineOptions({
	name: "lib-color-input",
})

// todo move to types


const fallbackId = getFallbackId()
// eslint-disable-next-line no-use-before-define
const props = withDefaults(defineProps<Props>(), {
	allowAlpha: true,
	border: true,
	copyTransform: (_val: HsvaColor, stringVal: string) => stringVal,
})


const $attrs = useAttrs()
 
const $value = defineModel<RgbaColor>({ required: false, default: () => ({ r: 0, g: 0, b: 0 }) })
const stringColor = computed(() => colord($value.value).toRgbString())
const tempValue = ref({ ...$value.value })

const showPopup = ref(false)


const togglePopup = (): void => {
	if (showPopup.value) {
		$value.value = tempValue.value
	}
	showPopup.value = !showPopup.value
}

</script>

<script lang="ts">

type RealProps =
& LabelProps
& LinkableByIdProps
& {
	allowAlpha?: boolean
	border?: boolean
	copyTransform?: (val: HsvaColor, stringVal: string) => any
}
interface Props
	extends
	/** @vue-ignore */
	Partial<Omit<ButtonHTMLAttributes,"class">
	& TailwindClassProp
	& {
		// why is this not already a part of button?
		"aria-label": string
	}>,
	RealProps
{}
</script>
