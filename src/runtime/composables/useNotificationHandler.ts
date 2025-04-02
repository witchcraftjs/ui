import type { NotificationHandler } from "../helpers/NotificationHandler.js"

let first = true
const configuration: {
	notificationHandler: NotificationHandler
	isClientSide: boolean
} = {
	notificationHandler: undefined as any,
	isClientSide: undefined as any
}
export const useNotificationHandler = (
	handler?: NotificationHandler,
	/** True by default, should be passed import.meta.client if using nuxt, or false when running server side. */
	isClientSide?: boolean
): NotificationHandler => {
	const clientSide = isClientSide ?? configuration.isClientSide

	if (!clientSide) return undefined as any
	if (first) {
		first = false
		configuration.isClientSide = clientSide ?? true
		if (handler) {
			configuration.notificationHandler = handler
		} else {
			throw new Error("You must set the notification handler to use at least once before using it.")
		}
	} else if (handler || isClientSide) {
		// eslint-disable-next-line no-console
		console.warn("You can only configure useNotificationHandler once. (Note that there might be false positive during HMR).")
	}
	return configuration.notificationHandler
}
