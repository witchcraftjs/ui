/**
 * This is not inside helpers to avoid having it get dragged in by an import of /helpers.
 */

import { ResizeObserverWrapper } from "./helpers/resizeObserverWrapper.js"


if (typeof ResizeObserver === "undefined") {
	// eslint-disable-next-line no-console
	console.warn("You are using a directive that uses a ResizeObserver or are importing something that uses this resize observer in a context (e.g. the server) where ResizeObserver does not exist.")
}
export const globalResizeObserver = typeof ResizeObserver !== "undefined" ? new ResizeObserverWrapper() : {} as ResizeObserverWrapper
