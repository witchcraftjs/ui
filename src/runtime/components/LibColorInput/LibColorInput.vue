<template>
<lib-popup
	class="color-input--popup"
	v-model="showPopup"
	@close="$tempValue = undefined;emit('cancel')"
>
	<template #button="{extractEl}">
		<!-- <div -->
		<!-- 		class=" -->
		<!-- 	flex -->
		<!-- 				w-full -->
		<!-- 	border -->
		<!-- 				 " -->
		<!-- 	v-extract-root-el="extractEl" -->
		<!-- > -->
			
		<!--  -->
		<lib-button
			:id="id ?? fallbackId"
			:class="twMerge(`
				p-0
				color-input--button
				flex flex-nowrap
				min-w-4
				overflow-hidden
				[&_.button--label]:items-stretch
				[&_.button--label]:gap-0
				after:hidden
			`,
				($attrs as any).class
			)"
			:aria-label="t('color-input.aria-and-title-prefix') + stringColor"
			:title="t('color-input.aria-and-title-prefix') + stringColor"
			v-bind="{...$attrs, class: undefined}"
			v-extract-root-el="extractEl"
			@click="togglePopup"
		>
			<template #label>
				<div class="
					color-input--swatch-wrapper
					flex
					w-full
				"
				>
					<slot v-bind="{stringColor, classes:swatchClasses}">
						<div :class="swatchClasses"
							:style="`background:${stringColor}`"
						/>
					</slot>
					<slot
						v-if="$tempValue"
						v-bind="{tempStringColor, classes:swatchClasses}"
						name="temp"
					>
						<div :class="swatchClasses"
							:style="`background:${tempStringColor}`"
						/>
					</slot>
				</div>
			</template>
		</lib-button>
	</template>
	<template #popup="{extractEl}">
		<div class="color-input--popup-wrapper p-5" v-extract-root-el="extractEl">
			<lib-color-picker v-if="showPopup"
				:id="id ?? fallbackId"
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

const swatchClasses = `
	color-input--swatch
	after:content-vertical-holder
	min-w-4
	flex-1
	relative
	before:content-['']
	before:absolute
	before:inset-0
	before:bg-transparency-squares
	before:z-[-1]
`

const fallbackId = getFallbackId()

const t = useInjectedI18n()
// eslint-disable-next-line no-use-before-define
const props = withDefaults(defineProps<Props>(), {
	allowAlpha: true,
	border: true,
	copyTransform: (_val: HsvaColor, stringVal: string) => stringVal,
	stringPrecision: 3,
	customRepresentation: undefined,
})
const emit = defineEmits<{
	(e: "save"): void
	(e: "cancel"): void
}>()


function save() {
	$value.value = internalTempValue.value
	showPopup.value = false
	$tempValue.value = undefined
	emit("save")
}
function cancel() {
	showPopup.value = false
	$tempValue.value = undefined
	emit("cancel")
}

const $attrs = useAttrs()
 
const $value = defineModel<RgbaColor>({ required: false, default: () => ({ r: 0, g: 0, b: 0 }) })
const $tempValue = defineModel<RgbaColor | undefined>("tempValue", { required: false, default: () => (undefined) })

const stringColor = computed(() => new Color("srgb", [
	$value.value.r / 255,
	$value.value.g / 255,
	$value.value.b / 255,
], $value.value.a ?? 1,).toString())

const tempStringColor = computed(() => $tempValue.value ? new Color("srgb", [
	$tempValue.value.r / 255,
	$tempValue.value.g / 255,
	$tempValue.value.b / 255,
], $tempValue.value.a ?? 1,).toString() : "")

const internalTempValue = ref({ ...$value.value })

const showPopup = ref(false)


const togglePopup = (): void => {
	if (showPopup.value) {
		$value.value = internalTempValue.value
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

