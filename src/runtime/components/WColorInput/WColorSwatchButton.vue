<template>
<WButton
	:id="id"
	:class="twMerge(`
		color-input--button
		p-0
		flex
		flex-nowrap
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
	v-bind="{ ...$attrs, class: undefined }"
>
	<template #label>
		<div
			class="
					color-input--swatch-wrapper
					flex
					w-full
				"
		>
			<slot v-bind="{ stringColor, classes: swatchClasses }">
				<div
					:class="swatchClasses"
					:style="`background:${stringColor}`"
				/>
			</slot>
			<slot
				v-if="tempValue"
				v-bind="{ tempStringColor, classes: swatchClasses }"
				name="temp"
			>
				<div
					:class="swatchClasses"
					:style="`background:${tempStringColor}`"
				/>
			</slot>
		</div>
	</template>
</Wbutton>
</template>

<script setup lang="ts">
import Color from "colorjs.io"
import { type ButtonHTMLAttributes, computed, useAttrs } from "vue"

import { useInjectedI18n } from "../../composables/useInjectedI18n.js"
import type { RgbaColor, TailwindClassProp } from "../../types/index.js"
import { twMerge } from "../../utils/twMerge.js"
import WButton from "../WButton/WButton.vue"


const $attrs = useAttrs()

const t = useInjectedI18n()

const props = withDefaults(defineProps<
	& {
		id?: string
		tempValue: RgbaColor | undefined
		value: RgbaColor
	}
	& /** @vue-ignore */ Omit<ButtonHTMLAttributes, "class" | "value">
	& /** @vue-ignore */ TailwindClassProp
>(), {
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


const stringColor = computed(() => new Color("srgb", [
	props.value.r / 255,
	props.value.g / 255,
	props.value.b / 255
], props.value.a ?? 1).toString())

const tempStringColor = computed(() => props.tempValue
	? new Color("srgb", [
			props.tempValue.r / 255,
			props.tempValue.g / 255,
			props.tempValue.b / 255
		], props.tempValue.a ?? 1).toString()
	: "")
</script>
