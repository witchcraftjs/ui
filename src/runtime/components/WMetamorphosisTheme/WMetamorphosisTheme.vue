<template>
<div
	class="
			metamorphosis
			flex
			flex-col
			gap-4
		"
>
	<div
		class="
				metamorphosis--entry
				flex
				flex-col
				gap-1
			"
		v-for="key in Object.keys(value)"
		:key="key"
	>
		<span
			class="
					metamorphosis--entry-label
					font-medium
					text-neutral-500
					dark:text-neutral-400

				"
		>
			{{ key }}
		</span>

		<div
			class="
				p-2
				px-4
				inset-shadow-black/50
				inset-shadow-sm
				rounded-lg
				border
				border-neutral-500/10
			"
		>
			<WMetamorphosisControl
				v-if="value[key] instanceof ControlVar"
				:control-var="value[key]"
			/>

			<WMetamorphosisInterpolatedColors
				v-else-if=" value[key] instanceof InterpolatedVars && isColorInterpolated(value[key] as InterpolatedVars<any>)"
				:interpolated-vars="value[key] as InterpolatedVars<any>"
				v-bind="getOptions(key)"
			/>

			<WMetamorphosisInterpolatedNumber
				v-else-if="value[key] instanceof InterpolatedVars"
				:interpolated-vars="value[key] as InterpolatedVars<any>"
				v-bind="getOptions(key)"
			/>
		</div>
	</div>
</div>
</template>

<script setup lang="ts">
import { ControlVar } from "metamorphosis/ControlVar"
import { InterpolatedVars } from "metamorphosis/InterpolatedVars"
import type { Theme } from "metamorphosis/Theme"
import { shallowRef, watch } from "vue"

import type { MetamorphosisInterpolatedVarsProps } from "./types.js"
import WMetamorphosisControl from "./WMetamorphosisControl.vue"
import WMetamorphosisInterpolatedColors from "./WMetamorphosisInterpolatedColors.vue"
import WMetamorphosisInterpolatedNumber from "./WMetamorphosisInterpolatedNumber.vue"

import { useInjectedTheme } from "../../composables/useInjectedTheme.js"
import { useMetamorphosisTheme } from "../../composables/useMetamorphosisTheme.js"

defineOptions({
	name: "WMetamorphosis"
})

const props = defineProps<{
	/**
	 * The component looks at the theme injection by default, but if needed you can override the Theme instance to edit. Mark it raw if possible.
	 *
	 * Note that a theme can be more complex than this component supports. Currently only the following are supported.
	 *
	 * InterpolatedVars with color ControlVars in the following colorspaces: rgb, hsl, hwb, lch, oklch, lab, oklab
	 *
	 * InterpolatedVars with numeric ControlVars (where the value shape is { _: number })
	 *
	 * InterpolatedVars with string ControlVars (where the value shape is { _: string })
	 */
	theme?: Theme<any>
	// note keep in sync with sub-component docs
	/**
	 * Control what interpolated controls are available, passes props on to the internal Interpolated components.
	 *
	 * {@link MetamorphosisInterpolatedVarsProps}
	 */
	options?: Record<string, Partial<MetamorphosisInterpolatedVarsProps>> | Partial<MetamorphosisInterpolatedVarsProps>
}>()

const injectedTheme = useInjectedTheme()

const themeRef = shallowRef(props.theme ?? injectedTheme.value)

watch(() => props.theme, () => {
	themeRef.value = props.theme ?? injectedTheme.value
})
if (!themeRef.value) throw new Error("No theme provided or injected.")

const { value } = useMetamorphosisTheme(themeRef.value)

/**
 * Gets an allow option for a given theme key, falling back to the default `true`.
 * Checks per-key override first, then global defaults.
 */
function getOptions(key: string): Omit<MetamorphosisInterpolatedVarsProps, "interpolatedVars"> {
	const opts = props.options
	if (!opts) return {}

	if ("allowSwitchingStopsMode" in opts || "allowModifyingSteps" in opts || "forceDisplayStopHandles" in opts) {
		return opts
	}

	const perKey = opts[key as keyof typeof opts]
	return perKey as any
}

function isColorInterpolated(interpolatedVars: InterpolatedVars<any>): boolean {
	if ((interpolatedVars.values[0]! as any).value._ === undefined) return true
	return false
}
</script>
