/* eslint-disable @typescript-eslint/naming-convention */
import type { Meta, StoryObj } from "@storybook/vue3"
import { ref } from "vue"

import LibPagination from "./LibPagination.vue"

// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import * as components from "../index.js"


const meta: Meta<typeof LibPagination> = {
	component: LibPagination,
	args: {
		total: 10,
	},
}

export default meta
type Story = StoryObj<typeof LibPagination>


export const Primary: Story = {
	render: args => ({
		components,
		setup() {
			const num = ref(1)
			const changePage = ($event: any, i: any) => {
				$event.preventDefault()
				if (i >= 10) num.value = 10
				if (i <= 1) num.value = 1
				num.value = i
			}

			return {
				changePage,
				args,
				num,
			}
		},
		template: `
			<lib-pagination v-bind="{...args, current: num, route:'#'}">
				<template #link="linkProps">
					<a v-bind="linkProps" @click="changePage($event, linkProps.i)">{{ linkProps.text ?? linkProps.i }}</a>
				</template>
			</lib-pagination>
			<lib-input :label="'Change Page'" :modelValue="num.toString()" @update:modelValue="num = parseInt($event)" type="number" min="0" :max="args.total">

			</lib-input>
		`,
	}),
}

