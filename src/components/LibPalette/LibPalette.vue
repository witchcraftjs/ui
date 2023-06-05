<template>
	<div class="flex h-full flex-col items-center justify-center ">
		<div class="container mx-auto ">
			<div class="grid grid-cols-11 gap-2 gap-y-10 px-10">
				<template v-for="color, i in colors" :key="color">
					<div :class="`h-10 ${color} rounded flex items-center justify-center text-black dark:text-white`">{{ [5, 16, 27, 38, 49].includes(i) ? 'Text':'' }}</div>
				</template>
			</div>
			<!-- <div class="flex flex-col">
				<template v-for="color in ['green', 'yellow', 'red', 'blue', 'neutral']" :key="color">
					<div class="grid grid-cols-11 gap-2 gap-y-10 px-10">
						<div :class="`h-10 bg-${color}-${num} rounded`" v-for="num in ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950']" :key="num"/>
					</div>
				</template>
			</div> -->
		</div>
	</div>
</template>
<script lang="ts">
 
export default { name: "lib-palette" }
</script>
<script setup  lang="ts">
/* eslint-disable @typescript-eslint/no-unused-vars */
import { keys } from "@alanscodelog/utils"
import { computed, getCurrentInstance, onBeforeUnmount, onMounted, type PropType, reactive, type Ref, ref, watch } from "vue"

import { type Theme } from "metamorphosis"

import { baseInteractiveProps, linkableByIdProps } from "../shared/props.js"


const el = ref<null | HTMLElement>(null)

 
const emits = defineEmits<{
	(e: "update:modelValue", val: string): void
}>()
/* eslint-enable @typescript-eslint/prefer-function-type */

const props = defineProps({
	...linkableByIdProps(),
	...baseInteractiveProps,
	modelValue: { type: String as PropType<string>, required: true },
	theme: { type: Object as PropType<Theme>, required: true },
})


const colors = keys(props.theme.css).filter(key => key.startsWith("--color")).map(key => key.replace("--color-", "bg-"))

</script>
