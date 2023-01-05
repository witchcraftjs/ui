<template>
	<nav :class="classes"
		role="navigation"
		aria-label="Pagination Navigation"
		aria-role="navigation"
	>
		<div v-if="prevLink.i > 0 && prevLink.i !== currentLink.i" class="page">
			<slot name="link"
				:i="prevLink.i"
				:href="prevLink.href"
				:text="'Prev'"
				:arial-label="`Go to previous page. Page ${prevLink.i}`"
			>
				<a :href="prevLink.href" :arial-label="`Go to previous page. Page ${prevLink.i}`">Prev</a>
			</slot>
		</div>
		<div class="spacer"/>
		<div v-if="firstLink.i !== currentLink.i" class="page page-limit">
			<slot name="link"
				:i="0"
				:href="firstLink.href"
				:text="firstLink.i"
				:aria_label="`Go to page ${firstLink.i}`"
			>
				{{ firstLink.href }}
				<a :href="firstLink.href" :aria_label="`Go to page ${firstLink.i}`">{{ firstLink.i }}</a>
			</slot>
		</div>
		<div v-if="prevLink.i - extraPages > firstLink.i" class="page-fill">
			...
		</div>
		<div class="page page-extra" v-for="entry in extraPagesPrev" :key="entry.i">
			<slot name="link"
				:i="entry.i"
				:href="entry.href"
				:aria_label="`Go to page ${entry.i}`"
			>
				<a :href="entry.href" :aria_label="`Go to page ${entry.i}`">{{ entry.i }}</a>
			</slot>
		</div>
		<div v-if="currentLink.i >= firstLink.i && currentLink.i <= lastLink.i" class="page page-current">
			<slot name="current"
				:i="currentLink.i"
				:aria_label="`Current page ${currentLink.i}`"
				:aria_current="true"
			>
				<div class="a"
					:aria_label="`Current page ${currentLink.i}`"
					aria-current="true"
					@click="$event.preventDefault()"
				>
					{{ currentLink.i }}
				</div>
			</slot>
		</div>
		<div class="page page-extra" v-for="entry in extraPagesNext" :key="entry.i">
			<slot name="link"
				:i="entry.i"
				:href="entry.href"
				:aria_label="`Go to page ${entry.i}`"
			>
				<a :href="entry.href" :aria_label="`Go to page ${entry.i}`">{{ entry.i }}</a>
			</slot>
		</div>
		<div v-if="nextLink.i + extraPages < total" class="page-fill" aria-hidden="true">
			...
		</div>
		<div v-if="lastLink.i !== currentLink.i" class="page">
			<slot name="link"
				:i="lastLink.i"
				:href="lastLink.href"
				:text="total"
				:aria_label="`Go to page ${lastLink.i}`"
			>
				<a :href="lastLink.href" :aria_label="`Go to page ${lastLink.i}`">{{ total }}</a>
			</slot>
		</div>
		<div class="spacer"/>
		<div v-if="nextLink.i <= total && nextLink.i !== currentLink.i" class="page page-limit">
			<slot name="link"
				:i="nextLink.i"
				:href="nextLink.href"
				:text="'Next'"
				:aria_label="`Go to next page. Page ${nextLink.i}`"
			>
				<a :href="nextLink.href" :arial-label="`Go to next page. Page ${nextLink.i}`">Next</a>
			</slot>
		</div>
	</nav>
</template>
<script lang="ts">
export default {
	name: "lib-pagination",
	inheritAttrs: false,
}
</script>
<script setup lang="ts">
import { computed, PropType, watch } from "vue"

/**
 * Pagination component.
 *
 * Can be passed a slot like so to use a custom link element (like NuxtLink):
 * ```vue
 * <template #link="{ href, i, text, ariaLabel, ariaCurrent}">
 * 	<NuxtLink :to="href" :aria_label="ariaLabel" :aria-current="ariaCurrent ?? false">{{ text ?? i }}</NuxtLink>
 * </template>
 * ```
 */
const props = defineProps({
	/** The total number of pages. */
	total: { type: Number as PropType<number>, required: true },
	/** Whether to add a border around the links, default false. */
	border: { type: Boolean as PropType<boolean>, required: false, default: false },
	/** The number of the current page. It must be valid, between 0 - total or the component will throw an error. */
	current: { type: Number as PropType<number>, required: true },
	/** The base route/link path for the page. Should end with a forward slash `/`. */
	route: { type: String as PropType<string>, required: true },
	/**
	 * A function to customize the output href and page link number. By default, page 0 is page 1, page 1 is 1, then everything else is normal.
	 *
	 * This is because usually we have routes like: `/page/1`, `/page/2`, not `/page/0`.
	 *
	 * You can use this function to customize things further. For example, make `/page/1` just `/`
	 */
	customRoute: {
		type: Function as PropType<(route: string, i: number) => { i: number, href: string }>,
		required: false,
		default: (route: string, i: number) => {
			if (i === 0 || i === 1) {
				const num = 1
				return { href: route, i: num }
			}
			return { href: route + i.toString(), i }
		},
	},
	/** How many extra pages to show to each side of the current page. */
	extraPages: { type: Number as PropType<number>, required: false, default: 3 },
})

const classes = computed(() => ({
	border: props.border,
	pages: true,
}))

const currentLink = computed(() => props.customRoute(props.route, props.current))
const currentIsInvalid = computed(() => currentLink.value.i < 0 || currentLink.value.i > props.total)

watch(() => currentIsInvalid.value, () => {
	if (currentIsInvalid.value) {
		throw new Error(`Current page is out of range: 0 - ${props.total}`)
	}
})

const prevLink = computed(() => props.customRoute(props.route, props.current - 1))

const nextLink = computed(() => {
	const maybeNextLink = props.customRoute(props.route, props.current + 1)
	if (maybeNextLink.i === currentLink.value.i) {
		return props.customRoute(props.route, props.current + 2)
	}
	return maybeNextLink
})

const firstLink = computed(() => props.customRoute(props.route, 0))
const lastLink = computed(() => props.customRoute(props.route, props.total))

type HrefInfo = { href: string, i: number }
const extraPagesPrev = computed(() => [...Array(props.extraPages)].map((_, _i) => {
	const num = currentLink.value.i - (props.extraPages - _i)
	if (num <= firstLink.value.i || num >= lastLink.value.i || num >= currentLink.value.i) return undefined
	return props.customRoute(props.route, num)
}).filter(entry => entry !== undefined) as HrefInfo[])

const extraPagesNext = computed(() => [...Array(props.extraPages + 1)].map((_, i) => {
	const num = currentLink.value.i + i
	if (num <= firstLink.value.i || num >= lastLink.value.i || num <= currentLink.value.i) return undefined
	return props.customRoute(props.route, num)
}).filter(entry => entry !== undefined).slice(0, props.extraPages) as HrefInfo[])


</script>

<style lang="scss" scoped>
@include spacer;

.pages {
	display: flex;
	@include flex-row(wrap, center, center);
}


.page,
.page-fill {
	// :deep(a), :deep(.a) {
	@include border($color: var(--opacity0));
	padding: var(--paddingS);

	.border & {
		@include border-radius;
		background: var(--bgNormal);
		border-color: var(--borderNormalSoft);

		&:hover,
		.outline &:focus-within {
			border-color: var(--borderFocused);
		}
	}

	padding: var(--paddingS);
	margin: 0 var(--paddingXS);

	&:first-of-type {
		margin-left: 0;
	}

	&:last-of-type {
		margin-right: 0;
	}
}

.page {

	&:hover,
	.outline &:focus-within {
		border-bottom-color: var(--borderFocused);
	}
}


.page-current {

	// :deep(.a) {
	.pages:not(.border) & {
		@include border($side: "bottom");
		border-bottom-color: var(--borderNormal);
		border-radius: 0;
	}

	color: var(--textNormal);

	.border & {

		&:hover,
		.outline &:focus-within {
			border-color: var(--borderDisabled);
		}
	}

	// }
}
</style>
