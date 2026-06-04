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

const metaSlots = computed(() => meta.value?.meta?.slots ?? [])
</script>

<template>
<ProseTable v-if="metaSlots.length">
	<ProseThead>
		<ProseTr>
			<ProseTh>
				Slot
			</ProseTh>
			<ProseTh>
				Type
			</ProseTh>
		</ProseTr>
	</ProseThead>
	<ProseTbody>
		<ProseTr
			v-for="slot in metaSlots"
			:key="slot.name"
		>
			<ProseTd>
				<ProseCode>
					{{ slot.name }}
				</ProseCode>
			</ProseTd>
			<ProseTd>
				<ProseCode
					v-if="slot.type"
					class="text-sm"
				>
					{{ slot.type }}
				</ProseCode>

				<p
					v-if="slot.description"
					class="text-toned mt-1 text-sm"
				>
					{{ slot.description }}
				</p>
			</ProseTd>
		</ProseTr>
	</ProseTbody>
</ProseTable>
</template>
