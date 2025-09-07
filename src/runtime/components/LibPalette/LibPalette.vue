<template>
<div class="theme-palette flex h-full flex-col items-center justify-center ">
	<div class="theme-palette--container mx-auto ">
		<div class="grid grid-cols-11 gap-2 gap-y-10 px-10">
			<template
				v-for="color, i in colors"
				:key="color"
			>
				<div
					:style="`background-color: var(${color});`"
					:class="`theme-palette--item h-10 rounded-sm flex items-center justify-center text-fg dark:text-bg`"
				>
					{{ [5, 16, 27, 38, 49].includes(i) ? 'Text':'' }}
				</div>
			</template>
		</div>
		<!-- <div class="flex flex-col">
				<template v-for="color in ['green', 'yellow', 'red', 'blue', 'neutral']" :key="color">
					<div class="grid grid-cols-11 gap-2 gap-y-10 px-10">
						<div :class="`h-10 bg-${color}-${num} rounded-sm`" v-for="num in ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950']" :key="num"/>
					</div>
				</template>
			</div> -->
	</div>
</div>
</template>

<script lang="ts">
export default { name: "LibPalette" }
</script>

<script setup  lang="ts">
import { keys } from "@alanscodelog/utils/keys"
import type { Theme } from "metamorphosis"

import type { BaseInteractiveProps, LinkableByIdProps } from "../shared/props.js"

const props = withDefaults(defineProps<
	& LinkableByIdProps
	& BaseInteractiveProps
	& {
		theme?: Theme
	}>(), {
	theme: () => ({} as any),
	unstyle: false, disabled: false, readonly: false, border: true
})

const exclude = ["--color-bg", "--color-fg"]
const colors = keys(props.theme.css).filter(key => key.startsWith("--color") && !exclude.includes(key))
</script>
