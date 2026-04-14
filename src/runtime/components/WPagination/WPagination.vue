<template>
<PaginationRoot
	:total="total"
	:items-per-page="itemsPerPage"
	:sibling-count="siblingCount"
	show-edges
	:class="twMerge(`
		pagination--wrapper
		flex flex-wrap items-center justify-center gap-2
	`, ($attrs as any).class)"
	v-model:page="current"
	v-bind="{ ...$attrs, class: undefined }"
>
	<PaginationList
		v-slot="{ items }"
		class="flex items-center gap-2 w-full"
	>
		<PaginationFirst
			as-child
			:class="`pagination--link ${pageClasses}`"
		>
			<a
				:href="customRoute(route, 1).href"
				:aria-label="t('pagination.aria.go-to-first-page')"
			>
				<slot name="first">
					<i-lucide-chevrons-left class="w-4 h-4"/>
				</slot>
			</a>
		</PaginationFirst>

		<PaginationPrev
			as-child
			:class="`pagination--link ${pageClasses}`"
		>
			<a
				:href="customRoute(route, current - 1).href"
				:aria-label="t('pagination.aria.go-to-previous-page')"
				@click="onLinkClick($event, current - 1)"
			>
				<slot name="prev">
					<i-lucide-chevron-left class="w-4 h-4"/>
				</slot>
			</a>
		</PaginationPrev>

		<div class="pagination--spacer flex-1"/>

		<template v-for="(page, index) in items">
			<PaginationListItem
				v-if="page.type === 'page'"
				:value="page.value"
				as-child
				:key="index"
			>
				<a
					:href="customRoute(route, page.value).href"
					:aria-label="t('pagination.aria.go-to-page', { count: page.value })"
					:class="page.value === current ? currentPageClasses : pageClasses"
					@click="onLinkClick($event, page.value)"
				>
					<slot
						name="page"
						:value="page.value"
					>
						{{ page.value }}
					</slot>
				</a>
			</PaginationListItem>

			<!-- @vue-expect-error index is a prop... -->
			<PaginationEllipsis
				v-else
				:index="index"
				class="pagination--page-fill flex items-center justify-center w-8 h-8"
				:key="page.type"
			>
				...
			</PaginationEllipsis>
		</template>

		<div class="pagination--spacer flex-1"/>

		<PaginationNext
			as-child
			:class="`pagination--link ${pageClasses}`"
		>
			<a
				:href="customRoute(route, current + 1).href"
				:aria-label="t('pagination.aria.go-to-next-page')"
				@click="onLinkClick($event, current + 1)"
			>
				<slot name="next">
					<i-lucide-chevron-right class="w-4 h-4"/>
				</slot>
			</a>
		</PaginationNext>

		<PaginationLast
			as-child
			:class="`pagination--link ${pageClasses}`"
		>
			<a
				:href="customRoute(route, Math.ceil(total / itemsPerPage)).href"
				:aria-label="t('pagination.aria.go-to-last-page')"
				@click="onLinkClick($event, Math.ceil(total / itemsPerPage))"
			>
				<slot name="last">
					<i-lucide-chevrons-right class="w-4 h-4"/>
				</slot>
			</a>
		</PaginationLast>
	</PaginationList>
</PaginationRoot>
</template>

<script setup lang="ts">
import {
	PaginationEllipsis,
	PaginationFirst,
	PaginationLast,
	PaginationList,
	PaginationListItem,
	PaginationNext,
	PaginationPrev,
	PaginationRoot,
	type PaginationRootProps
} from "reka-ui"
import { type HTMLAttributes, useAttrs } from "vue"

import ILucideChevronLeft from "~icons/lucide/chevron-left"
import ILucideChevronRight from "~icons/lucide/chevron-right"
import ILucideChevronsLeft from "~icons/lucide/chevrons-left"
import ILucideChevronsRight from "~icons/lucide/chevrons-right"

import { useInjectedI18n } from "../../composables/useInjectedI18n.js"
import type { TailwindClassProp } from "../../types/index.js"
import { twMerge } from "../../utils/twMerge.js"

defineOptions({
	name: "WPagination",
	inheritAttrs: false
})

const t = useInjectedI18n()
const $attrs = useAttrs()

const props = withDefaults(defineProps<
	& /** @vue-ignore */ Omit<HTMLAttributes, "class">
	& /** @vue-ignore */ TailwindClassProp
	& Pick<PaginationRootProps, "defaultPage" | "siblingCount" | "itemsPerPage">
	& {
		route: string
		customRoute?: (route: string, i: number) => { i: number, href: string }
		total: number
	}
>(), {
	customRoute: (route: string = "", i: number) => {
		if (i <= 1) return { href: route, i: 1 }
		return { href: `${route}${i}`, i }
	},
	siblingCount: 1,
	defaultPage: 1,
	itemsPerPage: 1
})

const current = defineModel<number>("current", { required: true })

const emit = defineEmits<{
	/**
	 * Fired when a link is clicked. Can be used to prevent navigation. Is passed the href calculated by customRoute.
	 */
	(e: "link-click", event: MouseEvent, payload: { i: number, href: string }): void
}>()

function onLinkClick(event: MouseEvent, pageNum: number) {
	const routeInfo = props.customRoute(props.route, pageNum)
	emit("link-click", event, routeInfo)
}

const commonClasses = `
	flex
	items-center
	justify-center
	w-8
	h-8
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
</script>

