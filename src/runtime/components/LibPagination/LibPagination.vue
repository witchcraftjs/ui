<template>
<nav
	:class="twMerge(`
		pagination--wrapper
		flex flex-wrap items-center justify-center gap-2
	`, ($attrs as any).class)"
	role="navigation"
	:aria-label="t('pagination.aria')"
>
	<slot v-if="prevLink.i > 0 && prevLink.i !== currentLink.i"
		name="link"
		:i="prevLink.i"
		:href="prevLink.href"
		:text="t('pagination.previous-page')"
		:aria-label=" t('pagination.aria.go-to-previous-page',{count:prevLink.i})"
		:class="`pagination--link ${pageClasses}`"
	>
		<a
			:class="`pagination--link ${pageClasses}`"
			:href="prevLink.href"
			:aria-label=" t('pagination.aria.go-to-previous-page', {count:prevLink.i})"
		/>
	</slot>
	<div class="pagination--spacer flex-1"/>
	<slot v-if="firstLink.i !== currentLink.i"
		name="link"
		:i="0"
		:href="firstLink.href"
		:text="firstLink.i"
		:aria-label="t('pagination.aria.go-to-page', {count:firstLink.i})"
		:class="`pagination--link pagination--first-link ${pageClasses}`"
	>
		{{ firstLink.href }}
		<a
			:class="`pagination--link pagination--first-link ${pageClasses}`"
			:href="firstLink.href"
			:aria-label="t('pagination.aria.go-to-page', {count:firstLink.i})"
		>
			{{ firstLink.i }}
		</a>
	</slot>
	<div v-if="prevLink.i - extraPages > firstLink.i" class="pagination--page-fill">
		...
	</div>
	<template
		v-for="entry in extraPagesPrev"
		:key="entry.i"
	>
		<slot name="link"
			:class="`pagination--link ${pageClasses}`"
			:i="entry.i"
			:href="entry.href"
			:aria-label="t('pagination.aria.go-to-page', {count:entry.i})"
		>
			<a
				:class="`pagination--link ${pageClasses}`"
				:href="entry.href"
				:aria-label="t('pagination.aria.go-to-page', {count:entry.i})"
			>
				{{ entry.i }}
			</a>
		</slot>
	</template>
	<slot name="current"
		:class="`pagination--link ${currentPageClasses}`"
		tabindex="0"
		:i="currentLink.i"
		:aria-label="t('pagination.aria.current-page', {count:currentLink.i})"
		:aria_current="true"
	>
		<div :class="`pagination--current-page a ${currentPageClasses}`"
			tabindex="0"
			:aria-label="t('pagination.aria.current-page', {count:currentLink.i})"
			aria-current="true"
			@click="$event.preventDefault()"
		>
			{{ currentLink.i }}
		</div>
	</slot>
	<template
		v-for="entry in extraPagesNext"
		:key="entry.i"
	>
		<slot name="link"
			:class="`pagination--link ${pageClasses}`"
			:i="entry.i"
			:href="entry.href"
			:aria-label="t('pagination.aria.go-to-page', {count:entry.i})"
		>
			<a
				:class="`pagination--link ${pageClasses}`"
				:href="entry.href"
				:aria-label="t('pagination.aria.go-to-page', {count:entry.i})"
			>
				{{ entry.i }}
			</a>
		</slot>
	</template>
	<div v-if="nextLink.i + extraPages < total" class="pagination--page-fill" aria-hidden="true">
		...
	</div>
	<slot v-if="lastLink.i !== currentLink.i"
		name="link"
		:class="`pagination--link ${pageClasses}`"
		:i="lastLink.i"
		:href="lastLink.href"
		:text="total"
		:aria-label="t('pagination.aria.go-to-page', {count:lastLink.i})"
	>
		<a
			:class="`pagination--link ${pageClasses}`"
			:href="lastLink.href"
			:aria-label="t('pagination.aria.go-to-page', {count:lastLink.i})"
		>
			{{ total }}
		</a>
	</slot>
	<div class="pagination--spacer flex-1"/>
	<slot
		v-if="nextLink.i <= total && nextLink.i !== currentLink.i"
		:class="`pagination--link ${pageClasses}`"
		name="link"
		:i="nextLink.i"
		:href="nextLink.href"
		:text="t('pagination.next-page')"
		:aria-label="t('pagination.aria.go-to-next-page', {count:nextLink.i})"
	>
		<a
			:class="`pagination--link ${pageClasses}`"
			:href="nextLink.href"
			:aria-label="t('pagination.aria.go-to-next-page', {count:nextLink.i})"
		>
			Next
		</a>
	</slot>
</nav>
</template>
<script setup lang="ts">
import { computed, type HTMLAttributes,useAttrs,watch } from "vue"

import { useInjectedI18n } from "../../composables/useInjectedI18n.js"
import { twMerge } from "../../utils/twMerge.js"
import { type TailwindClassProp } from "../shared/props.js"

const t = useInjectedI18n()

const commonClasses = `
	block
	focus-outline
	border-b-2
	border-transparent
	transition-all
	outlined:rounded-sm
`
const pageClasses = `
	${commonClasses}
	focus-outline
	hover:text-accent-600
	hover:border-b-accent-500
	hover:scale-125
`

const currentPageClasses = `
	${commonClasses}
	border-b-accent-500
	scale-125
`
defineOptions({
	name: "lib-pagination",
	inheritAttrs: false,
})

// eslint-disable-next-line no-use-before-define
const props = withDefaults(defineProps<Props>(), {
	customRoute: (route: string, i: number) => {
		if (i === 0 || i === 1) {
			const num = 1
			return { href: route, i: num }
		}
		return { href: route + i.toString(), i }
	},
	extraPages: 3,
})
const $attrs = useAttrs()

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
<script lang="ts">

/**
 * Pagination component.
 *
 * Can be passed a slot like so to use a custom link element (like NuxtLink):
 * ```vue
 * <template #link="{ href, i, text, ariaLabel, ariaCurrent}">
 * 	<NuxtLink :to="href" :aria-label="ariaLabel" :aria-current="ariaCurrent ?? false">{{ text ?? i }}</NuxtLink>
 * </template>
 * ```
 */
export default {
	name: "lib-pagination",
}
type RealProps = {
	/** The total number of pages. */
	total: number
	/** The number of the current page. It must be valid, between 0 - total or the component will throw an error. */
	current: number
	/** The base route/link path for the page. Should end with a forward slash `/`. */
	route: string
	/**
	 * A function to customize the output href and page link number. By default, page 0 is page 1, page 1 is 1, then everything else is normal.
	 *
	 * This is because usually we have routes like: `/page/1`, `/page/2`, not `/page/0`.
	 *
	 * You can use this function to customize things further. For example, make `/page/1` just `/`
	 */
	customRoute?: (route: string, i: number) => { i: number, href: string }
	/** How many extra pages to show to each side of the current page. */
	extraPages?: number
}
interface Props
	extends
	/** @vue-ignore */
	Partial<Omit<HTMLAttributes,"class"> & TailwindClassProp>,
	RealProps
{}
</script>
