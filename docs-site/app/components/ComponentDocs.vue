<script setup lang="ts">
import { camelCase, upperFirst } from "scule"

import { useFetchComponentMeta } from "../composables/fetchComponentMeta.js"

const props = withDefaults(defineProps<{
	slug?: string
	ignore?: string[]
}>(), {
	ignore: () => []
})

const route = useRoute()

const camelName = camelCase(props.slug ?? route.path.split("/").pop() ?? "")
const componentName = `${upperFirst(camelName)}`

const { data: meta } = await useFetchComponentMeta(componentName as any)

const hasProps = computed(() => {
	const all = meta.value?.meta?.props ?? []
	return all.filter(p => !props.ignore?.includes(p.name)).length > 0
})

const hasEvents = computed(() => (meta.value?.meta?.events ?? []).length > 0)
const hasSlots = computed(() => (meta.value?.meta?.slots ?? []).length > 0)
const $slots = useSlots()
</script>

<template>
<h2
	v-if="hasProps"
	class="text-2xl font-bold"
>
	Props
</h2>
<ComponentProps
	v-if="hasProps"
	:slug="slug"
	:ignore="ignore"
/>

<h2
	v-if="hasEvents"
	class="text-2xl font-bold"
>
	Events
</h2>
<ComponentEmits
	v-if="hasEvents"
	:slug="slug"
/>

<h2
	v-if="hasSlots"
	class="text-2xl font-bold"
>
	Slots
</h2>
<ComponentSlots
	v-if="hasSlots"
	:slug="slug"
/>
<h2
	v-if="$slots.default"
	class="text-2xl font-bold"
>
	CSS Variables
</h2>
<slot/>
</template>
