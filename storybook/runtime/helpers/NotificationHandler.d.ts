import type { AnyFunction, MakeRequired } from "@alanscodelog/utils";
export declare class NotificationHandler<TRawEntry extends RawNotificationEntry<any, any> = RawNotificationEntry<any, any>, TEntry extends NotificationEntry<TRawEntry> = NotificationEntry<TRawEntry>> {
    timeout: number;
    debug: boolean;
    private id;
    readonly queue: TEntry[];
    readonly history: TEntry[];
    maxHistory: number;
    listeners: NotificationListener<TEntry>[];
    stringifier?: NotificationStringifier<TEntry>;
    constructor({ timeout, stringifier, maxHistory }?: {
        timeout?: NotificationHandler<TRawEntry>["timeout"];
        stringifier?: NotificationHandler<TRawEntry>["stringifier"];
        maxHistory?: NotificationHandler<TRawEntry>["maxHistory"];
    });
    private _checkEntry;
    protected _createEntry<TNotifyEntry extends RawNotificationEntry<any, any>>(rawEntry: TNotifyEntry): TEntry;
    notify<TNotifyEntry extends RawNotificationEntry<any, any>>(rawEntry: TNotifyEntry): NotificationPromise<TNotifyEntry["options"][number] extends string ? TNotifyEntry["options"][number] : "Ok" | "Cancel">;
    static resolveToDefault(notification: NotificationEntry): void;
    static dismiss(notification: NotificationEntry): void;
    stringify(notification: NotificationEntry): string;
    clear(): void;
    addNotificationListener(cb: NotificationListener<TEntry>): void;
    removeNotificationListener(cb: NotificationListener<TEntry>): void;
}
export type NotificationPromise<TOption extends string = string> = Promise<TOption>;
export type RawNotificationEntry<TOptions extends string[] = ["Ok", "Cancel"], TCancellable extends boolean | TOptions[number] = "Cancel"> = {
    message: string;
    title?: string;
    code?: string;
    /** @default ["Ok", "Cancel"] */
    options?: TOptions;
    /** @default false */
    requiresAction?: boolean;
    cancellable?: TCancellable;
    /** @default "Ok" */
    default?: TOptions[number];
    /** @default [] */
    dangerous?: TOptions[number][];
    /** @default false if cancellable, otherwise the default timeout */
    timeout?: number | boolean;
    icon?: string;
};
export type NotificationEntry<TRawEntry extends RawNotificationEntry<any, any> = RawNotificationEntry<any, any>> = Omit<MakeRequired<TRawEntry, "options" | "requiresAction" | "default" | "dangerous">, "cancellable"> & {
    promise: NotificationPromise;
    resolve: AnyFunction;
    cancellable?: string;
    timeout?: number;
    resolution?: string;
    id: number;
};
export type NotificationListener<TEntry extends NotificationEntry<any>> = (notification: TEntry, type: "added" | "resolved" | "deleted") => void;
export type NotificationStringifier<T extends NotificationEntry<any>> = (notification: T) => string;
//# sourceMappingURL=NotificationHandler.d.ts.map