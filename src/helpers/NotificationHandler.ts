import type { AnyFunction, MakeRequired } from "@alanscodelog/utils"
import { castType, crop, indent, isBlank, pretty, setReadOnly } from "@alanscodelog/utils"


export class NotificationHandler<
	TRawEntry extends RawNotificationEntry<any, any> = RawNotificationEntry<any, any>,
	TEntry extends NotificationEntry<TRawEntry> = NotificationEntry<TRawEntry>,
> {
	timeout: number = 5000
	debug: boolean = false
	private id: number = 0
	readonly queue: TEntry[] = []
	readonly history: TEntry[] = []
	maxHistory: number = 100
	listeners: NotificationListener<TEntry>[] = []
	stringifier?: NotificationStringifier<TEntry>
	constructor({
		timeout,
		stringifier,
		maxHistory,
	}: {
		timeout?: NotificationHandler<TRawEntry>["timeout"]
		stringifier?: NotificationHandler<TRawEntry>["stringifier"]
		maxHistory?: NotificationHandler<TRawEntry>["maxHistory"]
	} = {}) {
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
		const entry: Partial<TEntry> & Omit<TEntry, "promise" | "resolve"> = {
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
				: undefined,
		} as TEntry


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
			setTimeout(() => {
				entry.resolve(entry.cancellable)
			}, entry.timeout)
		}
		this.queue.push(entry)
		for (const listener of this.listeners) {
			listener(entry, "added")
		}

		return entry.promise.then(res => {
			entry.resolution = res
			for (const listener of this.listeners) {
				listener(entry, "resolved")
			}
			this.history.push(entry)
			if (this.history.length > this.maxHistory) {
				this.history.splice(0, 1)
				for (const listener of this.listeners) {
					listener(entry, "deleted")
				}
			}
			this.queue.splice(this.queue.indexOf(entry), 1)
			return res
		}) satisfies NotificationPromise as any
	}	static resolveToDefault(notification: NotificationEntry): void {
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
	addNotificationListener(cb: NotificationListener<TEntry>): void {
		this.listeners.push(cb)
	}
	removeNotificationListener(cb: NotificationListener<TEntry>): void {
		const exists = this.listeners.indexOf(cb)
		if (exists > -1) {
			this.listeners.splice(exists, 1)
		} else {
			throw new Error(`Listener does not exist: ${cb.toString()}`)
		}
	}
}

export type NotificationPromise<TOption extends string = string> = Promise<TOption>

export type RawNotificationEntry<
	TOptions extends string[] = ["Ok", "Cancel"],
	TCancellable extends boolean | TOptions[number] = "Cancel",
> = {
	message: string
	title?: string
	code?: string
	options?: TOptions
	requiresAction?: boolean
	cancellable?: TCancellable
	default?: TOptions[number]
	dangerous?: TOptions[number][]
	timeout?: number | boolean
	icon?: string
}

export type NotificationEntry<
	TRawEntry extends RawNotificationEntry<any, any> = RawNotificationEntry<any, any>,
> = Omit<MakeRequired<TRawEntry, "options" | "requiresAction" | "default" | "dangerous">, "cancellable"> & {
	promise: NotificationPromise
	resolve: AnyFunction
	cancellable?: string
	timeout?: number
	resolution?: string
	id: number
}

export type NotificationListener<TEntry extends NotificationEntry<any>> = (notification: TEntry, type: "added" | "resolved" | "deleted") => void


export type NotificationStringifier<T extends NotificationEntry<any>> = (notification: T) => string

