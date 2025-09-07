import type { Ref } from "vue"

import { hasModifiers } from "./hasModifiers.js"

export const createRecorderHandler = (
	recordingValue: Ref<string>,
	recording: Ref<boolean>,
	modelValue: Ref<string>,
	recordingEl: Ref<null | HTMLElement>
): { keydown(e: KeyboardEvent): void, mousedown(e: MouseEvent): void, wheel(e: WheelEvent): void } => ({
	keydown(e: KeyboardEvent) {
		e.preventDefault()
		if (!hasModifiers(e) && e.key === "Escape") {
			recordingValue.value = modelValue.value
			recording.value = false
			return
		}
		if (!hasModifiers(e) && e.key === "Enter") {
			recording.value = false
			return
		}
		recordingValue.value += ` ${e.key}`
	},
	mousedown(e: MouseEvent) {
		const target = e.target as any
		const el = recordingEl.value
		if (target === el || el?.contains(target)) {
			return
		}
		recordingValue.value += ` ${e.button}`
		e.preventDefault()
	},
	wheel(e: WheelEvent) {
		recordingValue.value += ` ${e.deltaY > 0 ? "↓" : "↑"}`
		e.preventDefault()
	}
})

export const createRecorderWatchEffect = (recordingValue: Ref<string>, recording: Ref<boolean>, modelValue: Ref<string>, values?: Ref<string[]>) => () => {
	if (!recording.value) {
		if (recordingValue.value) {
			if (values?.value) {
				values.value.push(recordingValue.value)
				modelValue.value = ""
			} else {
				modelValue.value = recordingValue.value
			}
		}
		recordingValue.value = ""
	}
}
