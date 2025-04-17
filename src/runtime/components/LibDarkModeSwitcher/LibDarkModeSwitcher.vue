<template>
<lib-button
	v-bind="{...$attrs, class:undefined}"
	:class="!($attrs as any).unstyle && twMerge(`
			rounded-full
			after:rounded-full
		`,
		($attrs as any)?.class
	)"
	:title="`${t('dark-mode-switcher.title')}${t(`dark-mode-switcher.${darkModeState}`)}`"
	@click="cycleDarkMode"
>
	<!-- content-vertical-holder will keep the icon the height of a text line regardless of the svg used -->
	<template #icon>
		<icon
			v-if="darkModeState==='dark'"
			class="w-[1em] flex items-center content-vertical-holder"
		>
			<i-fa-solid-moon/>
		</icon>
		<icon
			v-else-if="darkModeState==='light'"
			class="w-[1em] content-vertical-holder"
		>
			<i-ph-sun-bold/>
		</icon>
		<icon
			v-else
			class="w-[1em] content-vertical-holder"
		>
			<i-fa6-solid-circle-half-stroke/>
		</icon>
	</template>
	<template #default v-if="showLabel">
		<div class="pr-[2px]">
			{{ t(`dark-mode-switcher.${darkModeState}`) }}
		</div>
	</template>
</lib-button>
</template>
<script lang="ts" setup>
import { type ButtonHTMLAttributes,onMounted,useAttrs, watch } from "vue"

import { useInjectedDarkMode } from "../../composables/useInjectedDarkMode.js"
import { useInjectedI18n } from "../../composables/useInjectedI18n.js"
import { twMerge } from "../../utils/twMerge.js"
import Icon from "../Icon/Icon.vue"
import LibButton from "../LibButton/LibButton.vue"
import type { TailwindClassProp } from "../shared/props.js"

const t = useInjectedI18n()

const emit = defineEmits<{
	/** Emits whether dark mode should be enabled. */
	(e: "update:darkMode", value: boolean): void
	/** Emits the change, but as a state string (dark, light, system) */
	(e: "update:darkModeState", value: "dark" | "light" | "system"): void
}>()
const $attrs = useAttrs()

// eslint-disable-next-line no-use-before-define
withDefaults(defineProps<Props>(), { showLabel: true })


const {
	darkMode,
	cycleDarkMode,
	darkModeState,
} = useInjectedDarkMode()

watch(darkMode, value => emit("update:darkMode", value))
watch(darkModeState, value => emit("update:darkModeState", value))

onMounted(() => {
	emit("update:darkMode", darkMode.value)
})
</script>
<script lang="ts">
export default {
	name: "lib-dark-mode-switcher"
}
type RealProps = {
	showLabel?: boolean
}

interface Props
	extends
	/** @vue-ignore */
	Partial<Omit<ButtonHTMLAttributes,"class" | "color" | "disabled">
	& TailwindClassProp
	& {
		disabled?: boolean
		unstyle?: boolean
	}>,
	RealProps
{ }
</script>
