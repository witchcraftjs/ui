<template>
<lib-button
	v-bind="{ ...$attrs, class: undefined }"
	:class="!unstyle && twMerge(`
			dark-mode-switcher
			rounded-full
			after:rounded-full
		`,
		($attrs as any)?.class
	)"
	:aria-label="`${t('dark-mode-switcher.title')}${t(`dark-mode-switcher.${darkModeState}`)}`"
	@click="cycleDarkMode"
>
	<!-- content-vertical-holder will keep the icon the height of a text line regardless of the svg used -->
	<template #icon>
		<icon
			class="w-[1em] items-center content-vertical-holder"
		>
			<component :is="darkModeState==='dark' ? IFaSolidMoon : darkModeState==='light' ? IPhSunBold : IFa6SolidCircleHalfStroke"/>
		</icon>
	</template>
	<template
		#default
		v-if="showLabel"
	>
		<div class="dark-mode-switcher--label pr-[2px]">
			{{ t(`dark-mode-switcher.${darkModeState}`) }}
		</div>
	</template>
</lib-button>
</template>

<script lang="ts" setup>
import { type ButtonHTMLAttributes, onMounted, useAttrs, watch } from "vue"

import IFaSolidMoon from "~icons/fa-solid/moon"
import IFa6SolidCircleHalfStroke from "~icons/fa6-solid/circle-half-stroke"
import IPhSunBold from "~icons/ph/sun-bold"

import { useInjectedDarkMode } from "../../composables/useInjectedDarkMode.js"
import { useInjectedI18n } from "../../composables/useInjectedI18n.js"
import type { BaseInteractiveProps, TailwindClassProp } from "../../types/index.js"
import { twMerge } from "../../utils/twMerge.js"
import Icon from "../Icon/Icon.vue"
import LibButton from "../LibButton/LibButton.vue"

const t = useInjectedI18n()

const emit = defineEmits<{
	/** Emits whether dark mode should be enabled. */
	(e: "update:darkMode", value: boolean): void
	/** Emits the change, but as a state string (dark, light, system) */
	(e: "update:darkModeState", value: "dark" | "light" | "system"): void
}>()
const $attrs = useAttrs()

withDefaults(defineProps<
	& Pick<BaseInteractiveProps, "border">
	& {
		disabled?: boolean
		unstyle?: boolean
		showLabel?: boolean
	}
	& /** @vue-ignore */ Omit<ButtonHTMLAttributes, "class">
	& /** @vue-ignore */ TailwindClassProp
>(), { showLabel: true })

const {
	darkMode,
	cycleDarkMode,
	darkModeState
} = useInjectedDarkMode()

watch(darkMode, value => emit("update:darkMode", value))
watch(darkModeState, value => emit("update:darkModeState", value))

onMounted(() => {
	emit("update:darkMode", darkMode.value)
})
</script>

