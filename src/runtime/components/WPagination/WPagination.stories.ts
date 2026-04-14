/* eslint-disable @typescript-eslint/naming-convention */
import type { Meta, StoryObj } from "@storybook/vue3"
import { ref } from "vue"

import WPagination from "./WPagination.vue"

import * as components from "../index.js"

const meta: Meta<typeof WPagination> = {
	component: WPagination,
	title: "Components/Pagination",
	args: {
		total: 10
	}
}

export default meta
type Story = StoryObj<typeof WPagination>

export const Primary: Story = {
	render: args => ({
		components,
		setup() {
			const num = ref(1)
			const interceptClick = ref(false)
			const changePage = ($event: any, i: any) => {
				if (interceptClick.value) {
					$event.preventDefault()
				}
				if (i >= 10) num.value = 10
				if (i <= 1) num.value = 1
				num.value = i
			}

			return {
				changePage,
				args,
				num,
				interceptClick
			}
		},
		template: `
			<WCheckbox v-model="interceptClick">Intercept Click (url should change when off)</WCheckbox>
			<WPagination v-bind="{...args, current: num, route:'#'}" @link-click="changePage($event, num)">
			</WPagination>
			<WSimpleInput class="mt-5" :label="'Change Page'" :modelValue="num.toString()" @update:modelValue="num = parseInt($event)" type="number" min="0" :max="args.total">

			</WSimpleInput>
		`
	})
}
