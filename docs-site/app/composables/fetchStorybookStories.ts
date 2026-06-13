export function useFetchStorybookStories(componentSlug: string) {
	const route = `/api/storybook-stories/${componentSlug}.json`
	prerenderRoutes(route)
	return useAsyncData<{ stories: { id: string, name: string, title: string }[], component: string }>(
		`storybook-stories-${componentSlug}`,
		async () => $fetch<{ stories: { id: string, name: string, title: string }[], component: string }>(route).catch(error => {
			// eslint-disable-next-line no-console
			console.warn(`Failed to fetch storybook stories for ${componentSlug} (${(error as { data?: { status?: number } })?.data?.status ?? "unknown"})`)
			return { stories: [], component: componentSlug }
		}),
		{
			lazy: import.meta.client,
			dedupe: "defer",
			getCachedData: (key, nuxtApp) => nuxtApp.payload.data[key]
		}
	)
}
