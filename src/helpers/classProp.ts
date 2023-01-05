import type { PropType } from "vue"


export const classProp: {
	type: PropType<string | string[] | Record<string, boolean>>
	required: boolean
	default: () => Record<string, boolean>
} = {
	type: Object as PropType<Record<string, boolean>>,
	// type: [Array, String, Object] as PropType<string | string[] | Record<string, boolean>>,
	required: false,
	default: () => ({ }),
}
