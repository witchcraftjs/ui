import type { ResizeCallback } from "../types/index.js"

export class ResizeObserverWrapper {
	observers: WeakMap<Element, Set<ResizeCallback>> = new WeakMap()

	observer: ResizeObserver

	constructor() {
		this.observers = new WeakMap()
		this.observer = new ResizeObserver(elements => {
			for (const element of elements) {
				const { target, contentRect } = element
				const callbacks = this.observers.get(target)

				if (callbacks) {
					for (const cb of callbacks) {
						cb(contentRect, target)
					}
				}
			}
		})
	}

	observe(element: Element, callback: ResizeCallback): void {
		const entry = this.observers.get(element)
		if (!entry) {
			this.observers.set(element, new Set())
		}
		this.observer.observe(element)
		const callbacks = this.observers.get(element)!
		callbacks.add(callback)
	}

	unobserve(element: Element, callback: ResizeCallback): void {
		const entry = this.observers.get(element)
		if (!entry) return
		const callbacks = this.observers.get(element)!
		callbacks.delete(callback)
		if (callbacks.size === 0) {
			this.observer.unobserve(element)
			this.observers.delete(element)
		}
	}
}
