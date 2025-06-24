<template>
<lib-popup
	v-model="showPopup"
>
	<template #button="{extractEl}">
		<lib-button
			:id="id ?? fallbackId"
			:class="twMerge(`
				button
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
				<slot>{{ t("color-picker.pick-color") }}</slot>
			</span>
			<div :class="`color-swatch
						rounded-xs
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
		<div class="color-input-margin m-5">
			<lib-color-picker v-if="showPopup"
				:id="id ?? fallbackId"
				:allow-alpha="allowAlpha"
				:custom-representation="customRepresentation"
				:string-precision="stringPrecision"
				v-model="tempValue"
				v-extract-root-el="extractEl"
				@save="$value = tempValue; showPopup = false"
				@cancel="showPopup = false"
			/>
		</div>
	</template>
</lib-popup>
</template>

<script setup lang="ts">
import Color from "colorjs.io"
import { type ButtonHTMLAttributes,computed, type PropType, ref, useAttrs } from "vue"

import { useInjectedI18n } from "../../composables/useInjectedI18n.js"
import { vExtractRootEl } from "../../directives/vExtractRootEl.js"
import type { HsvaColor, RgbaColor } from "../../types/index.js"
import { twMerge } from "../../utils/twMerge.js"
import LibButton from "../LibButton/LibButton.vue"
import LibColorPicker from "../LibColorPicker/LibColorPicker.vue"
import LibPopup from "../LibPopup/LibPopup.vue"
import { getFallbackId, type LabelProps, type LinkableByIdProps, type TailwindClassProp } from "../shared/props.js"


defineOptions({
	name: "lib-color-input",
})

const fallbackId = getFallbackId()

const t = useInjectedI18n()
// eslint-disable-next-line no-use-before-define
const props = withDefaults(defineProps<Props>(), {
	allowAlpha: true,
	border: true,
	copyTransform: (_val: HsvaColor, stringVal: string) => stringVal,
	stringPrecision: 3,
	customRepresentation: undefined,
	valid: true
})


const $attrs = useAttrs()
 
const $value = defineModel<RgbaColor>({ required: false, default: () => ({ r: 0, g: 0, b: 0 }) })
const stringColor = computed(() => new Color("srgb", [$value.value.r, $value.value.g, $value.value.b]).toString())
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
	/** See ColorPicker.copyTransform */
	copyTransform?: (val: HsvaColor, stringVal: string) => any
	/** See ColorPicker.allowAlpha */
	stringPrecision?: number
	/** See ColorPicker.customRepresentation */
	customRepresentation?: {
		fromHsvaToString: (hsva: HsvaColor, includeAlpha: boolean) => string
	}
	valid?: boolean
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
