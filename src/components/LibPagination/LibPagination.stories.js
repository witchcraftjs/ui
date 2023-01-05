import "../../assets/global.scss"

import { library } from "@fortawesome/fontawesome-svg-core"
import { far } from "@fortawesome/free-regular-svg-icons"
import { fas } from "@fortawesome/free-solid-svg-icons"
import { ref } from "vue"

import { theme } from "../../helpers"
import TestWrapper from "../../TestWrapper.vue"

import { LibGroup, LibInput, LibPagination } from ".."


library.add(fas, far)

export default {
	title: "Example/Pagination",
	component: LibPagination,
	argTypes: {
	},
}

const Template = args => ({
	components: { TestWrapper, LibPagination, LibInput, LibGroup },
	setup() {
		const num = ref(1)
		theme()
		const changePage = ($event, i) => {
			$event.preventDefault()
			if (i >= 10) num.value = 10
			if (i <= 1) num.value = 1
			num.value = i
		}

		return { changePage,
			num,
			args: {
				total: 10,
				...args,
		} }
	},
	template: `
		<test-wrapper :outline="args.outline">
			<lib-group :border="false" :vertical="true">
				<lib-pagination v-bind="{...args, current: num, route:'#'}">
					<template #link="linkProps">
						<a v-bind="linkProps" @click="changePage($event, linkProps.i)">{{ linkProps.text ?? linkProps.i }}</a>
					</template>
				</lib-pagination>
				<lib-input :label="'Change Page'" :modelValue="num.toString()" @update:modelValue="num = parseInt($event)" type="number" min="0" :max="args.total"></lib-input>
			</lib-group>
		</test-wrapper>
	`,
	backgrounds: { disable: true },
})


export const Primary = Template.bind({})
