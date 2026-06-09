export function useFetchStorybookStories(componentSlug: string) {
	if (import.meta.server) {
		const event = useRequestEvent()
		event?.node.res.setHeader(
			"x-nitro-prerender",
			[event?.node.res.getHeader("x-nitro-prerender"), `/api/storybook-stories/${componentSlug}`].filter(Boolean).join(",")
		)
	}

	return useAsyncData<{ stories: { id: string, name: string, title: string }[], component: string }>(
		`storybook-stories-${componentSlug}`,
		() => $fetch(`/api/storybook-stories/${componentSlug}`).catch(() => ({ stories: [], component: componentSlug }) as any),
		{
			lazy: import.meta.client,
			dedupe: "defer",
			getCachedData: (key, nuxtApp) => nuxtApp.payload.data[key]
		}
	)
}
