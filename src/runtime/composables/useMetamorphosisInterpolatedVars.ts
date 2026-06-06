import type { ControlVar } from "metamorphosis/ControlVar"
import type { InterpolatedVars } from "metamorphosis/InterpolatedVars"
import { customRef, onScopeDispose, type Ref } from "vue"


/**
 * Wraps an InterpolatedVars instance to provide Vue-compatible reactive wrappers for values, stops, and options supporting v-model.
 * ```ts
 * const interpolated = new InterpolatedVars("spacing", Units.px, [v1, v2])
 * const { values, stops, options, interpolatedMap } = useMetamorphosisInterpolatedVars(interpolated)
 * // In template:
 * // <input v-model="options.steps" type="number" />
 * ```
 */
export function useMetamorphosisInterpolatedVars<
	TUnit extends Record<string, any> = Record<string, any>
>(
	/** The plain InterpolatedVars instance. */
	interpolatedVars: InterpolatedVars<TUnit>
): {
	/** Direct access to the raw InterpolatedVars instance. */
	instance: InterpolatedVars<TUnit>
	/** Readonly ref containing the generated raw interpolated array. */
	value: Ref<InterpolatedVars<TUnit>["value"]>
	/** Writable array ref for the underlying ControlVars. Compatible with v-model. */
	values: Ref<ControlVar<any, TUnit>[]>
	/** Writable array ref for the stop positions. Returns undefined if evenly spaced. Compatible with v-model. */
	stops: Ref<number[] | undefined>
	/** A custom ref wrapping a proxy, allowing both full object replacement and deep property mutation via v-model. */
	options: Ref<InterpolatedVars<TUnit>["options"]>
	/** Read-only ref containing the generated key-to-css map object. */
	interpolated: Ref<Record<string, string>>
} {
	const triggers = {
		value: undefined as any,
		values: undefined as any,
		stops: undefined as any,
		options: undefined as any,
		interpolated: undefined as any
	}

	const valueRef = customRef((track, trigger) => {
		triggers.value = trigger
		return {
			get() {
				track()
				return interpolatedVars.value
			},
			set(_newValues: ControlVar<any, TUnit>[]) {
				throw new Error("Cannot set value directly.")
			}
		}
	})
	const valuesRef = customRef((track, trigger) => {
		triggers.values = trigger
		return {
			get() {
				track()
				return interpolatedVars.values
			},
			set(newValues: ControlVar<any, TUnit>[]) {
				interpolatedVars.set("values-stops", newValues, interpolatedVars.stops)
			}
		}
	})

	const stopsRef = customRef((track, trigger) => {
		triggers.stops = trigger
		return {
			get() {
				track()
				return interpolatedVars.stops ? [...interpolatedVars.stops] : undefined
			},
			set(newStops: number[] | undefined) {
				interpolatedVars.set("values-stops", interpolatedVars.values, newStops)
			}
		}
	})

	const interpolatedMapRef = customRef((track, trigger) => {
		triggers.interpolated = trigger
		return {
			get() {
				track()
				return { ...interpolatedVars.interpolated }
			},
			set() {
				throw new Error("Cannot set interpolated map directly.")
			}
		}
	})

	const optionsRef = customRef((track, trigger) => {
		triggers.options = trigger

		// Proxy the main class instance so it can always look up the live object reference
		const proxy = new Proxy(interpolatedVars, {
			get(target, prop) {
				track()
				const result = Reflect.get(target.options, prop)
				return result
			},
			set(target, prop, value) {
				target.set("options", { [prop]: value })
				// Mutate directly on the active reference
				// target.options[prop as any] = value
				// Trigger your custom internal tracking loop directly
				trigger()
				return true
			}
		}) as unknown as InterpolatedVars<TUnit>["options"]

		return {
			get() {
				track()
				return proxy
			},
			set() {
				// Whole object overrides are disabled here
			}
		}
	})

	const listener = {
		notify() {
			for (const trigger of Object.values(triggers)) {
				trigger()
			}
		}
	}

	interpolatedVars.addDep(listener)

	onScopeDispose(() => {
		interpolatedVars.removeDep(listener)
	})

	return {
		instance: interpolatedVars,
		value: valueRef,
		values: valuesRef,
		stops: stopsRef,
		options: optionsRef,
		interpolated: interpolatedMapRef
	}
}
