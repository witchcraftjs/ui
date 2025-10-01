import type { AnyFunction, MakeRequired } from "@alanscodelog/utils"
import { castType } from "@alanscodelog/utils/castType"
import { crop } from "@alanscodelog/utils/crop"
import { indent } from "@alanscodelog/utils/indent"
import { isBlank } from "@alanscodelog/utils/isBlank"
import { pretty } from "@alanscodelog/utils/pretty"
import { setReadOnly } from "@alanscodelog/utils/setReadOnly"
import { type Reactive, reactive } from "vue"

export class NotificationHandler<
	TRawEntry extends RawNotificationEntry<any, any> = RawNotificationEntry<any, any>,
	TEntry extends NotificationEntry<TRawEntry> = NotificationEntry<TRawEntry>
> {
	timeout: number = 5000

	debug: boolean = false

	private id: number = 0

	readonly queue: Reactive<TEntry[]>

	readonly history: Readonly<TEntry[]>

	maxHistory: number = 100

	listeners: NotificationListener<TEntry>[] = []

	stringifier?: NotificationStringifier<TEntry>

	constructor({
		timeout,
		stringifier,
		maxHistory
	}: {
		timeout?: NotificationHandler<TRawEntry>["timeout"]
		stringifier?: NotificationHandler<TRawEntry>["stringifier"]
		maxHistory?: NotificationHandler<TRawEntry>["maxHistory"]
	} = {}) {
		this.queue = reactive([])
		this.history = reactive([])
		if (timeout) this.timeout = timeout
		if (maxHistory) this.maxHistory = maxHistory
		if (stringifier) this.stringifier = stringifier
	}

	private _checkEntry(entry: Omit<TEntry, "promise" | "resolve">): void {
		if (entry.cancellable !== undefined && isBlank(entry.cancellable)) {
			throw new Error(
				crop`Cancellable cannot be a blank string:
					${indent(pretty(entry), 5)}
				`)
		}
		if (!entry.options.includes(entry.default)) {
			throw new Error(
				crop`Entry options does not include default option "${entry.default}":
					${indent(pretty(entry), 5)}
				`)
		}
		if (entry.cancellable) {
			if (typeof entry.cancellable === "string" && !entry.options.includes(entry.cancellable)) {
				throw new Error(
					crop`Entry options does not include cancellable option "${entry.cancellable}":
						${indent(pretty(entry), 6)}
					`)
			}
		} else {
			if (entry.options.includes("Cancel")) {
				throw new Error(
					crop`You specified that the entry should not be cancellable, but the options include the "Cancel" option:
						${indent(pretty(entry), 6)}
					`)
			}
		}
		if (entry.timeout !== undefined && !entry.cancellable) {
			throw new Error(
				crop`Cannot timeout notification that is not cancellable:
					${indent(pretty(entry), 5)}
					`)
		}
		if (entry.timeout !== undefined && entry.requiresAction) {
			throw new Error(
				crop`Cannot timeout notification that requires action:
					${indent(pretty(entry), 5)}
					`)
		}
		const missingDangerousOption = entry.dangerous!.find((option: string) => !entry.options.includes(option))
		if (entry.dangerous !== undefined && missingDangerousOption) {
			throw new Error(
				crop`Dangerous options list contains an unknown option "${missingDangerousOption}":
					${indent(pretty(entry), 5)}
				`)
		}
	}

	protected _createEntry<TNotifyEntry extends RawNotificationEntry<any, any>>(rawEntry: TNotifyEntry): TEntry {
		const entry: Partial<NotificationEntry<any>> & Omit<NotificationEntry<any>, "promise" | "resolve"> = {
			requiresAction: false,
			options: ["Ok", "Cancel"],
			default: "Ok",
			cancellable: rawEntry.cancellable,
			...rawEntry,
			dangerous: rawEntry.dangerous ?? [],
			timeout: rawEntry.timeout === true
				? this.timeout
				: rawEntry.timeout !== undefined && rawEntry.timeout !== false
					? rawEntry.timeout
					: undefined
		} as any as TEntry

		if (rawEntry.cancellable === true || (rawEntry.cancellable === undefined && entry.options?.includes("Cancel"))) {
			entry.cancellable = "Cancel" as any
		}

		this._checkEntry(entry)

		castType<TEntry>(entry)
		this.id++
		entry.id = this.id
		return entry
	}

	async notify<TNotifyEntry extends RawNotificationEntry<any, any>>(rawEntry: TNotifyEntry):
	NotificationPromise<TNotifyEntry["options"][number] extends string
		? TNotifyEntry["options"][number]
		: "Ok" | "Cancel"> {
		const entry = this._createEntry(rawEntry)
		entry.promise = new Promise(_resolve => {
			entry.resolve = _resolve
		}) as NotificationPromise

		if (entry.timeout !== undefined) {
			entry._timer = {
				elapsedBeforePause: 0
			}
			this.resume(entry as any)
		}
		this.queue.push(entry as any)
		for (const listener of this.listeners) {
			listener(entry, "added")
		}

		return entry.promise.then(res => {
			entry.resolution = res
			for (const listener of this.listeners) {
				listener(entry, "resolved")
			}
			;(this.history as any).push(entry)
			if (this.history.length > this.maxHistory) {
				;(this.history as any).splice(0, 1)
				for (const listener of this.listeners) {
					listener(entry, "deleted")
				}
			}
			this.queue.splice(this.queue.indexOf(entry as any), 1)
			return res
		}) satisfies NotificationPromise as any
	}

	pause(notification: NotificationEntry): void {
		if (notification.timeout === undefined) {
			throw new Error(`Cannot pause notification with no timeout: ${notification.id}`)
		}
		if (notification.isPaused) {
			throw new Error(`Cannot pause notification that is already paused: ${notification.id}`)
		}
		notification.isPaused = true
		clearTimeout(notification._timer.id)
		notification._timer.elapsedBeforePause += (Date.now() - notification.startTime)
	}

	resume(notification: NotificationEntry): void {
		if (notification.timeout === undefined) {
			throw new Error(`Cannot resume notification with no timeout: ${notification.id}`)
		}
		notification.isPaused = false
		notification.startTime = Date.now()
		const remaining = notification.timeout - notification._timer.elapsedBeforePause
		clearTimeout(notification._timer.id)
		notification._timer.id = setTimeout(() => {
			notification.resolve(notification.cancellable)
		}, remaining)
	}

	static resolveToDefault(notification: NotificationEntry): void {
		notification.resolve(notification.default)
	}

	static dismiss(notification: NotificationEntry): void {
		if (notification.cancellable) {
			notification.resolve(notification.cancellable)
		}
	}

	stringify(notification: NotificationEntry): string {
		if (this.stringifier) return this.stringifier(notification as any)
		let str = ""
		if (notification.title) str += `${notification.title}\n`
		str += `${notification.message}\n`
		if (notification.code) str += `code:${notification.code}\n`
		return str
	}

	clear(): void {
		setReadOnly(this, "history", [])
	}
}

export type NotificationPromise<TOption extends string = string> = Promise<TOption>

export type RawNotificationEntry<
	TOptions extends string[] = ["Ok", "Cancel"],
	TCancellable extends boolean | TOptions[number] = "Cancel"
> = {
	message: string
	title?: string
	code?: string
	/** @default ["Ok", "Cancel"] */
	options?: TOptions
	/** @default false */
	requiresAction?: boolean
	cancellable?: TCancellable
	/** @default "Ok" */
	default?: TOptions[number]
	/** @default [] */
	dangerous?: TOptions[number][]
	/** @default false if cancellable, otherwise the default timeout */
	timeout?: number | boolean
	icon?: string
}

export type NotificationEntry<
	TRawEntry extends RawNotificationEntry<any, any> = RawNotificationEntry<any, any>
> = Omit<MakeRequired<TRawEntry, "options" | "requiresAction" | "default" | "dangerous">, "cancellable"> & {
	promise: NotificationPromise
	resolve: AnyFunction
	cancellable?: string
	timeout?: number
	resolution?: string
	id: number
	startTime: number
	isPaused: boolean
	_timer: {
		id?: ReturnType<typeof setTimeout>
		elapsedBeforePause: number
	}
}

export type NotificationListener<TEntry extends NotificationEntry<any>> = (notification: TEntry, type: "added" | "resolved" | "deleted") => void

export type NotificationStringifier<T extends NotificationEntry<any>> = (notification: T) => string
