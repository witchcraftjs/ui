/**
 * This is not inside helpers to avoid having it get dragged in by an import of /helpers.
 */

import { ResizeObserverWrapper } from "./helpers/resizeObserverWrapper.js"


if (typeof ResizeObserver === "undefined") {
	// eslint-disable-next-line no-console
	console.warn("You are a directive that uses a ResizeObserver or from directives, in a context (e.g. the server) where ResizeObserverWrapper does not exist.")
}
export const globalResizeObserver = typeof ResizeObserver !== "undefined" ? new ResizeObserverWrapper() : {} as ResizeObserverWrapper
