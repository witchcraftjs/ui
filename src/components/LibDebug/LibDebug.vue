<template>
	<div class="lib-debug">
		<LibButton @click="copy()"><fa :icon="'regular copy'"/></LibButton>
		<pre v-if="value">{{ getStringValue(value) }}</pre>
		<pre v-if="value === undefined"><slot/></pre>
	</div>
</template>
<script lang="ts">
import { PropType, useSlots } from "vue"

import fa from "../fa/Fa.vue"
import LibButton from "../LibButton/LibButton.vue"


/**
 * Simple debug component for displaying objects and strings with whitespace.
 *
 * In the case of objects, it JSON.stringifies them with a tab character. The tab width can be controlled with the `tab` prop, which will set the `tab-size` css property on the element.
 *
 * The value can be undefined, it will just display undefined.
 */
export default {
	name: "lib-debug",
	// https://v3.vuejs.org/guide/typescript-support.html#annotating-props
}
</script>
<script setup lang="ts">

const $slots = useSlots()
const props = defineProps({
	/** The value to debug, can be anything. */
	// eslint-disable-next-line vue/no-restricted-props
	value: { type: Object as PropType<any>, required: false, default: undefined },
	/** Sets the tab size in css. Defaults to 3. */
	tab: { type: Number as PropType<number>, required: false, default: () => 3 },
})
const getStringValue = (value: any): string => value === undefined
	? "undefined"
	: typeof value === "string"
		? value
		: JSON.stringify(value, null, "\t")

const findText = (children: any[]): string => {
	let res = ""
	for (const child of children) {
		if (child.children) {
			if (typeof child.children === "string") res += child.children as string
			else res += findText(child.children)
		} else {
			res += "\n"
		}
	}
	return res
}
const copy = (): void => {
	if (navigator.clipboard) {
		const text = props.value ? getStringValue(props.value) : findText([...$slots.default!()![0].children as any[]])

		// eslint-disable-next-line @typescript-eslint/no-empty-function
		navigator.clipboard.writeText(text).catch(() => { })
	}
}
</script>

<style lang="scss" scoped>
.lib-debug {
	border: 1px solid red;
}

pre {
	border: 1px solid red;
	tab-size: v-bind("tab");
	color: var(--textNormal);
	// mix-blend-mode: difference;
}
</style>
