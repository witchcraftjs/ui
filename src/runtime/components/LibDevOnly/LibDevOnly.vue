<template>
<DevOnly>
	<slot v-if="doShow && $attrs?.['as-child'] !== undefined"/>
	<div v-else-if="doShow"


		:class="twMerge(`
			border
			border-dashed
			border-red-500
			px-2
			py-1
			never-packaged
		`,
			$attrs.class
		)"
		v-bind="{...$attrs, class: undefined}"
	>
		<slot/>
	</div>
</DevOnly>
</template>
<script lang="ts" setup>
import { computed, inject, ref, useAttrs } from "vue"

import { showDevOnlyInjectionKey } from "../../composables/useShowDevOnlyKey.js"
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
interface Props {
	show?: boolean
	asChild?: boolean
}
</script>
