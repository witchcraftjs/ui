import type { StoryObj } from "@storybook/vue3"
import { onMounted, ref } from "vue"

import { useScrollNearContainerEdges } from "./useScrollNearContainerEdges.js"

import { twMerge } from "../helpers/twMerge.js"

const meta = { }

export default meta
type Story = StoryObj // & StoryObj<typeof extraArgs>
// eslint-disable-next-line @typescript-eslint/naming-convention
export const Primary: Story = {
	render: args => ({
		setup: () => {
			const containerEl = ref<HTMLElement | null>(null)
			const {
				resetScrollIndicator,
				scrollEdges,
				endScroll,
				scrollIndicator,
				isScrolling
			} = useScrollNearContainerEdges({
				containerEl,
				scrollMargin: 20,
				outerScrollMargin: 20,
			})
			const pos = ref({ x: 0, y: 0 })
			onMounted(() => {
				pos.value.x = containerEl.value!.getBoundingClientRect().left
				pos.value.y = containerEl.value!.getBoundingClientRect().top
			})
			const moveDrag = (e: MouseEvent): void => {
				pos.value.x = e.clientX
				pos.value.y = e.clientY
				scrollEdges(e.clientX, e.clientY)
			}
			const endDrag = (_e: MouseEvent): void => {
				endScroll()
				document.removeEventListener("mousemove", moveDrag)
				document.removeEventListener("mouseup", endDrag)
			}
			const startDrag = (_e: MouseEvent): void => {
				document.addEventListener("mousemove", moveDrag)
				document.addEventListener("mouseup", endDrag)
			}
			return {
				args,
				containerEl,
				resetScrollIndicator,
				scrollEdges,
				endScroll,
				startDrag,
				scrollIndicator,
				isScrolling,
				twMerge,
				pos
			}
		},

		template: `
		<div 
			:class="twMerge(
				'relative flex flex-col max-h-[300px] max-w-[300px] border-2 border-red-500',
				isScrolling && 'after:content-[\\'\\'] after:absolute after:inset-0 after:border-transparent after:border-[15px]', 
				scrollIndicator.right && 'after:border-r-accent-500/60',
				scrollIndicator.down && 'after:border-b-accent-500/60',
				scrollIndicator.left && 'after:border-l-accent-500/60',
				scrollIndicator.up && 'after:border-t-accent-500/60',
			)"
			
		>
			<div 
				class="overflow-auto"
				ref="containerEl"
			>
				<div class="h-[1000px] w-[1000px]"/>
				<div
					@mousedown="startDrag" 
					:style="\`top:\${pos.y}px; left:\${pos.x}px;\`"
					class="h-[20px] w-[20px] bg-red-500 cursor-move fixed"
				></div>
			</div>
		</div>
		`,
	}),
}
