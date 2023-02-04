import { castType } from "@alanscodelog/utils"
import { computed, type WritableComputedRef } from "vue"

/**
 * Creates a ref that will emit the correct `update` event for the prop when it's set. This makes it possible to set vModeled props just like any other reference.
 *
 * ```
 * const modelValue = vModel("modelValue", props, context)
 *
 * if (modelValue.value) {...}
 *
 * modelValue.value = "Some Value" // will do context.emit("update:modelValue", "Some Value")
 * ```
 */
export function vModel<TProp extends Record<string, any>, TKey extends keyof TProp, TValue extends TProp[TKey]>(key: TKey, props: TProp, contextOrEmit: any): WritableComputedRef<TValue> {
	return computed({
		get: () => props[key],
		set: value => {
			castType<string>(key)
			contextOrEmit instanceof Function ? contextOrEmit(`update:${key}`, value) : contextOrEmit.emit(`update:${key}`, value)
		},
	})
}
