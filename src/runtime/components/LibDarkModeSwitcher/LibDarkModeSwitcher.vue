<template>
<lib-button
	v-bind="{...$attrs, class:undefined}"
	:class="!($attrs as any).unstyle && twMerge(`
			rounded-full
			after:rounded-full
		`,
		($attrs as any)?.class
	)"
	:title="`Switch dark mode type (current: ${darkModeState})`"
	:label="autoLabel
		? autoLabel[darkModeState]
		: ''
	"
	@click="cycleDarkMode"
>
	<template #icon>
		<icon
			v-if="darkModeState==='dark'"
			class="w-[1em] flex items-center"
		>
			<i-fa-solid-moon/>
		</icon>
		<icon
			v-else-if="darkModeState==='light'"
			class="w-[1em]"
		>
			<i-ph-sun-bold/>
		</icon>
		<icon
			v-else
			class="w-[1em]"
		>
			<i-fa6-solid-circle-half-stroke/>
		</icon>
	</template>
</lib-button>
</template>
<script lang="ts" setup>
import { type ButtonHTMLAttributes,onMounted,useAttrs, watch, watchEffect } from "vue"

import { useInjectedDarkMode } from "../../composables/useInjectedDarkMode.js"
import { twMerge } from "../../utils/twMerge.js"
import Icon from "../Icon/Icon.vue"
import LibButton from "../LibButton/LibButton.vue"
import type { TailwindClassProp } from "../shared/props.js"

const emit = defineEmits<{
	/** Emits whether dark mode should be enabled. */
	(e: "update:darkMode", value: boolean): void
	/** Emits the change, but as a state string (dark, light, system) */
	(e: "update:darkModeState", value: "dark" | "light" | "system"): void
}>()
const $attrs = useAttrs()

// eslint-disable-next-line no-use-before-define
const props = withDefaults(defineProps<Props>(), {
	autoLabel: () => ({
		light: "Light Mode",
		system: "System Mode",
		dark: "Dark Mode",
	}) ,
})


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
type RealProps =
 {
 	/** The auto labels are shown by default. You can disable them by passing false or pass an object with your own labels. */
 	autoLabel?: false | Record<"system" | "dark" | "light", string>
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
