import { computed, type ComputedRef, onMounted, ref } from "vue"

/** Returns a computed ref that creates aria-label and aria-labelledby with the correct id for labelledby. */
export const useAriaLabel = (
	props: { id?: string, label?: string },
	fallbackId?: string

): ComputedRef<Record<string, string | undefined>> => {
	const id = computed(() => props.id ?? fallbackId)
	const labelExists = ref(false)

	const aria = computed(() => ({
		"aria-label": labelExists.value ? undefined : props.label,
		"aria-labelledby": labelExists.value ? `label-${id.value}` : undefined,
	}))

	onMounted(() => {
		if (id.value && document.querySelector(`#label-${id.value}`)) {
			labelExists.value = true
		}
	})
	return aria
}
