import { TypedError } from "@alanscodelog/utils/TypedError.js"

import { useNotificationHandler } from "../composables/useNotificationHandler.js"

/**
 * Notifies the user if the given value is an error. Useful for making non-critical errors don't go unnoticed.
 *
 * Integrates with {@link TypedError} from `@alanscodelog/utils` to display the error code as well if it has one.
 *
 * If the value is not an error, it is returned.
 */
export function notifyIfError<T>(
	err: T, {
		logger,
		ns,
		force = false,
	}: {
		logger?: { debug: (...args: any[]) => void }
		/* Logger namespace. */
		ns?: string
		/* force interpret as error, for catch blocks */
		force?: boolean
	} = {}): T {
	if (force || err instanceof Error) {
		const errMessage = {
			message: err instanceof Error ? err.message : `Unknown error ${err as any}`,
			code: err instanceof TypedError ? err.code : undefined,
		}
		if (logger) {
			logger.debug({
				ns,
				...errMessage,
				stack: err instanceof Error ? err.stack : undefined
			})
		}
		void useNotificationHandler().notify({
			title: "Error",
			...errMessage,
			options: ["Ok"],
			cancellable: "Ok",
			timeout: true
		})
	}
	return err
}
