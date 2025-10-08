// @ts-nocheck remove when copying
/* eslint-disable @typescript-eslint/naming-convention */
import type { Meta, StoryObj } from "@storybook/vue3"
import { ref } from "vue"

import LibDarkModeSwitcher from "./LibDarkModeSwitcher.vue"

// todo, maybe don't do this for perf reasons
import * as components from "../index.js"

const meta: Meta<typeof LibDarkModeSwitcher> = {
	component: LibDarkModeSwitcher,
	title: "Components/DarkModeSwitcher",
	args: {

	}
}

export default meta
type Story = StoryObj<typeof LibDarkModeSwitcher>


export const Primary: Story = {
	render: args => ({
		components,
		setup: () => {
			const darkMode = ref(false)
			return {
				args,
				darkMode
			}
		},
		template: `
			Value: {{darkMode}}
			<LibDarkModeSwitcher 
				@update:darkMode="darkMode = $event"
				v-bind="{...args}"
			></LibDarkModeSwitcher>
			<!-- workaround for style tag not being allowed -->
			<component is="style">
				{{args.css}}
			</component>
			
		`
	})
}

export const WithoutLabel: Story = {
	...Primary,
	args: {
		...Primary.args,
		showLabel: false
	}
}

export const WithViewTransitionApi: Story = {
	...Primary,
	args: {
		...Primary.args,
		css: `
			:root {
				--story-anim-length: 1s; /* Shorter for testing */
			}

			#root {
				view-transition-name: wroot;
				height: 100dvh;
				padding: 0;

			}

			::view-transition-new(wroot) {
				animation: grow var(--story-anim-length) ease-in-out;
				animation-fill-mode: both;
				z-index: 2;
				mask: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><circle cx="20" cy="20" r="20" fill="white"/></svg>') center / 0 no-repeat;
				mask-size: 50dvw;
			}

			::view-transition-old(wroot) {
				animation: none;
				animation-fill-mode: both;
				z-index: 1;
			}

			@keyframes grow {
					from {
						mask-size: 0dvw;
					}
					to {
						mask-size: 300dvw;
					}
			}
		`
	}
}

