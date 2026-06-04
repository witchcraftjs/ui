<script setup lang="ts">
import { camelCase, upperFirst } from "scule"

import { useFetchComponentMeta } from "../composables/fetchComponentMeta.js"

const props = defineProps<{
	slug?: string
}>()

const route = useRoute()

const camelName = camelCase(props.slug ?? route.path.split("/").pop() ?? "")
const componentName = `${upperFirst(camelName)}`

const { data: meta } = await useFetchComponentMeta(componentName as any)

const metaEvents = computed(() => meta.value?.meta?.events ?? [])
</script>

<template>
<ProseTable v-if="metaEvents.length">
	<ProseThead>
		<ProseTr>
			<ProseTh>
				Event
			</ProseTh>
			<ProseTh>
				Type
			</ProseTh>
		</ProseTr>
	</ProseThead>
	<ProseTbody>
		<ProseTr
			v-for="event in metaEvents"
			:key="event.name"
		>
			<ProseTd>
				<ProseCode>
					{{ event.name }}
				</ProseCode>
			</ProseTd>
			<ProseTd>
				<ProseCode
					v-if="event.type"
					class="text-sm"
				>
					{{ event.type }}
				</ProseCode>
			</ProseTd>
		</ProseTr>
	</ProseTbody>
</ProseTable>
</template>
