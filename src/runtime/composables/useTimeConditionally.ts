import { type Ref, ref, watch } from "vue"

/**
 * Returns a ref with the current time if the given value ref is true or it's an array with 1 or more items.. It will update the time every 50ms (configurable) if so (within a requestAnimationFrame).
 *
 * When the value is anything else it will clear the interval and set the time to undefined.
 *
 * Useful for use with a progress bar.
 *
 * Updating the time all the time is expensive and not idea. This way we only set the interval if we really need it.
 */
export function useTimeConditionally(
	val: Ref<any[] | boolean | any>,
	{
		refreshInterval = 50
	}: {
		refreshInterval?: number
	} = {}
): {
	time: Ref<undefined | number>
	refresh: () => void
} {
	const time = ref<undefined | number>(undefined)

	let interval: ReturnType<typeof setInterval> | undefined
	function refresh(
		/** The value to use for the check. Do not pass unless you know what you're doing. */
		v = val.value
	) {
		if (v === true || (Array.isArray(v) && v.length > 0)) {
			if (interval !== undefined) return
			time.value = Date.now()
			interval = setInterval(() => {
				requestAnimationFrame(() => {
					time.value = Date.now()
				})
			}, refreshInterval)
		} else {
			if (interval === undefined) return
			clearInterval(interval)
			interval = undefined
		}
	}
	watch(val, val => {
		refresh(val)
	})

	refresh()

	return { time, refresh }
}
