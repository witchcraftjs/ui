import type { NotificationEntry } from "../../helpers/NotificationHandler.js"

export function calculateNotificationProgress(notification: NotificationEntry, time: number) {
	if (notification.timeout === undefined) return 0

	return 100 - (((notification.isPaused ? (notification._timer.elapsedBeforePause) : (notification._timer.elapsedBeforePause + (time - notification.startTime))) / notification.timeout) * 100)
}

