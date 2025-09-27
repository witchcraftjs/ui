<template>
<DevOnly>
	<slot v-if="doShow && $attrs?.['as-child'] !== undefined"/>
	<div
		v-else-if="doShow"
		:class="twMerge(`
			dev-only
			border
			border-dashed
			border-red-500
			px-2
			py-1
			never-packaged
		`,
			($attrs.class as string)
		)"
		v-bind="{ ...$attrs, class: undefined }"
	>
		<slot/>
	</div>
</DevOnly>
</template>

<script lang="ts" setup>
import { computed, inject, ref, useAttrs } from "vue"

import { showDevOnlyInjectionKey } from "../../injectionKeys.js"
import { twMerge } from "../../utils/twMerge.js"

const $attrs = useAttrs()

const props = withDefaults(defineProps<{
	show?: boolean
}>(), {
	show: false
})

const injectedShow = inject(showDevOnlyInjectionKey, ref(false))
const doShow = computed(() => props.show || injectedShow.value)
</script>

<script lang="ts">
export interface Props {
	show?: boolean
}

// Not sure why nuxt's types aren't correctly getting detected
// This should be enough to bypass the type lint error.
declare module "vue" {
	export interface GlobalComponents {
		// eslint-disable-next-line @typescript-eslint/naming-convention
		DevOnly: any
	}
}
</script>
