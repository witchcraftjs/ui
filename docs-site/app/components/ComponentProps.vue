<script setup lang="ts">
import { camelCase, upperFirst } from "scule"
import type { ComponentMeta } from "vue-component-meta"

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

const metaProps: ComputedRef<ComponentMeta["props"]> = computed(() => {
	if (!meta.value?.meta?.props?.length) {
		return []
	}

	return meta.value.meta.props.filter(prop => {
		return !props.ignore?.includes(prop.name)
	}).map(prop => {
		// Clean up default values
		if (prop.default) {
			prop.default = prop.default
				.replace(" as never", "")
				.replace(/^"(.*)"$/, "'$1'")
		}
		return prop
	})
})
</script>

<template>
<ProseTable v-if="metaProps.length">
	<ProseThead>
		<ProseTr>
			<ProseTh>
				Prop
			</ProseTh>
			<ProseTh>
				Default
			</ProseTh>
			<ProseTh>
				Type
			</ProseTh>
		</ProseTr>
	</ProseThead>
	<ProseTbody>
		<ProseTr
			v-for="prop in metaProps"
			:key="prop.name"
		>
			<ProseTd>
				<ProseCode>
					{{ prop.name }}
				</ProseCode>
			</ProseTd>
			<ProseTd>
				<ProseCode
					v-if="prop.default"
					class="text-sm"
				>
					{{ prop.default }}
				</ProseCode>
			</ProseTd>
			<ProseTd>
				<ProseCode
					v-if="prop.type"
					class="text-sm"
				>
					{{ prop.type }}
				</ProseCode>

				<p
					v-if="prop.description"
					class="text-toned mt-1 text-sm"
				>
					{{ prop.description }}
				</p>
			</ProseTd>
		</ProseTr>
	</ProseTbody>
</ProseTable>
</template>
