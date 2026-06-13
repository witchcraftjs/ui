import type { ComponentMeta } from "vue-component-meta"

export function useFetchComponentMeta(name: string) {
	const route = `/api/component-meta/${name}.json`
	prerenderRoutes(route)

	return useAsyncData<{ meta: ComponentMeta }>(`component-meta-${name}`, () => $fetch(route).catch(() => ({}) as any) as any, {
		lazy: import.meta.client,
		dedupe: "defer",
		getCachedData: (key, nuxtApp) => nuxtApp.payload.data[key]
	})
}
