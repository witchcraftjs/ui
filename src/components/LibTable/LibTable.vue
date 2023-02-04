<template>
	<table :class="classes" v-resizable-table="resizable">
		<slot/>
	</table>
</template>

<script lang="ts">
export default {
	name: "lib-table",
}
</script>
<script setup lang="ts">
import { computed, type PropType } from "vue"

import { resizableTable as vResizableTable } from "../../directives/resizableTable.js"
import type { ResizableTableDirectiveOptions } from "../../types.js"


const props = defineProps({
	class: { type: Array as PropType<string[]>, required: false, default: () => []},
	resizable: { type: Object as PropType<Partial<ResizableTableDirectiveOptions>>, required: false, default: () => ({}) },
	border: { type: String as PropType<"normal" | "rounded" | "none">, required: false, default: () => "normal" },
	rows: { type: String as PropType<"even" | "odd" | "none">, required: false, default: () => "none" },
})
const classes = computed(() => [
	"button",
	props.border === "normal" ? "border" : "",
	props.border === "rounded" ? "border-rounded" : "",
	props.rows === "even" ? "rows-alternate-even" : "",
	props.rows === "odd" ? "rows-alternate-odd" : "",
].join(" "))

</script>

<style lang="scss" scoped>
table {
	width: calc(100% - var(--borderWidth) * 2);
	@include border;
	border-color: var(--opacity0);
	overflow-x: auto;

	&.resizable-table-error {
		cursor: not-allowed;
	}

	:slotted(thead),
	:slotted(tbody),
	:slotted(tr),
	:slotted(td),
	:slotted(th) {
		// needed for resizing
		box-sizing: border-box;
	}

	:slotted(td),
	:slotted(th) {
		overflow-x: hidden
	}

	:deep(.grip) {
		width: var(--tableGripSize);
	}

	&.border-rounded {
		@include border-radius;
		border-color: var(--borderNormal);
		overflow: hidden;
	}

	&.border,
	&.border-rounded {
		tr:not(:last-of-type) {
			:slotted(td) {
				@include border($side: "bottom");
			}
		}
	}

	thead {

		:slotted(td),
		:slotted(th) {
			@include border($side: "bottom", $color: var(--borderDark));
		}
	}

	tr,
	thead,
	tbody {

		:slotted(td:not(:last-child)),
		:slotted(th:not(:last-child)) {
			@include border($side: "right");
		}
	}

	&.rows-alternate-even {
		:deep(tr:nth-child(even)) {
			background: var(--bgTableRow);
		}
	}

	&.rows-alternate-odd {
		:deep(tr:nth-child(odd)) {
			background: var(--bgTableRow);
		}
	}

}
</style>
