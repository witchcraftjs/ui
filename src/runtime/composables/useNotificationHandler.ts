import { watchEffect } from "vue"

import type { NotificationHandler } from "../helpers/NotificationHandler.js"

let first = true
let notificationHandler: NotificationHandler
export const useNotificationHandler = (handler?: NotificationHandler): NotificationHandler => {
	if (!import.meta.client) return undefined as any
	if (first) {
		first = false
		if (handler) {
			notificationHandler = handler
		} else {
			throw new Error("You must set the notification handler to use at least once before using it.")
		}
	} else if (handler) {
		// eslint-disable-next-line no-console
		console.warn("You can only set the notification handler once. (Note that there might be false positive during HMR).")
	}
	return notificationHandler
}
