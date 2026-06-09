<script setup lang="ts">
import { camelCase, upperFirst } from "scule"

const props = withDefaults(defineProps<{
	/** Specific story name to show (e.g. "Primary"). If omitted, shows all stories as tabs. */
	story?: string
}>(), {
	story: undefined
})

const route = useRoute()

/**
 * Derives the Storybook title from the current route path.
 * e.g. /components/w-button -> Components/Button
 */
const storybookTitle = computed(() => {
	const slug = route.path.split("/").pop() ?? ""
	const name = camelCase(slug)
	// Strip leading 'w' from component names (WButton -> Button)
	const componentName = name.startsWith("w") ? name.slice(1) : name
	return `Components/${upperFirst(componentName)}`
})

/** Lowercase kebab version used in story IDs: components-button */
const storybookTitleSlug = computed(() => storybookTitle.value.toLowerCase().replace("/", "-"))

const storybookBase = computed(() => import.meta.dev ? "http://localhost:6006" : `${useRuntimeConfig().app.baseURL ?? "/"}storybook`)

const storybookLink = computed(() => `${storybookBase.value}/?path=/docs/${storybookTitle.value.replace("/", "-").toLowerCase()}--docs`)

const { data } = await useFetchStorybookStories(storybookTitleSlug.value)
// eslint-disable-next-line no-console
if (!data) console.warn(`Failed to fetch storybook stories for ${storybookTitleSlug.value}`)

const stories = computed(() => data.value?.stories ?? [])
const activeIndex = ref(0)

if (props.story && stories.value.length > 0) {
	const idx = stories.value.findIndex(s => s.name === props.story)
	if (idx !== -1) activeIndex.value = idx
}

const activeStory = computed(() => stories.value[activeIndex.value] ?? null)

const iframeUrl = computed(() => {
	if (!activeStory.value) return ""
	return `${storybookBase.value}/iframe.html?id=${activeStory.value.id}&viewMode=story`
})
</script>

<template>
<h2
	v-if="stories.length > 0"
	class="text-2xl font-bold"
>
	Stories
</h2>

<div
	v-if="stories.length > 0"
	class="rounded-lg border border-muted bg-muted overflow-hidden my-5"
>
	<div
		v-if="stories.length > 1"
		class="flex flex-wrap items-center justify-between gap-1 border-b border-muted bg-muted px-3 py-2"
	>
		<div class="flex flex-wrap gap-1">
			<button
				:class="[
					'rounded px-3 py-1 text-sm font-medium transition-colors',
					i === activeIndex
						? 'bg-primary text-primary-foreground'
						: 'text-muted-foreground hover:bg-muted hover:text-foreground'
				]"
				v-for="(s, i) in stories"
				:key="s.id"
				@click="activeIndex = i"
			>
				{{ s.name }}
			</button>
		</div>
		<a
			:href="storybookLink"
			target="_blank"
			rel="noopener noreferrer"
			class="flex shrink-0 items-center gap-1 rounded px-2 py-1 text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground"
		>
			Open in Storybook
			<Icon
				name="lucide:external-link"
				size="12"
			/>
		</a>
	</div>

	<div
		v-else
		class="flex items-center justify-between border-b bg-muted/30 px-3 py-2"
	>
		<span class="text-sm font-medium text-muted-foreground">{{ activeStory?.name }}</span>
		<a
			:href="storybookLink"
			target="_blank"
			rel="noopener noreferrer"
			class="flex shrink-0 items-center gap-1 text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground"
		>
			Open in Storybook
			<Icon
				name="lucide:external-link"
				size="12"
			/>
		</a>
	</div>

	<iframe
		:src="iframeUrl"
		class="w-full"
		style="height: 700px"
		frameborder="0"
		loading="lazy"
		sandbox="allow-scripts allow-same-origin"
		:title="activeStory?.name + ' story'"
	/>
</div>
</template>
