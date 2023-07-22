import { computed, type ComputedRef, onMounted, ref } from "vue"

/** Returns a computed ref that creates aria-label and aria-labelledby with the correct id for labelledby. */
export const useAriaLabel = (props: { id?: string, label?: string }): ComputedRef<Record<string, string | undefined>> => {
	const labelExists = ref(false)

	const aria = computed(() => ({
		"aria-label": labelExists.value ? undefined : props.label,
		"aria-labelledby": labelExists.value && props.id ? `label-${props.id}` : undefined,
	}))

	onMounted(() => {
		if (props.id && document.querySelector(`#label-${props.id}`)) {
			labelExists.value = true
		}
	})
	return aria
}
