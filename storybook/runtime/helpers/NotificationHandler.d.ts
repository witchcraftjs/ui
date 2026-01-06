import type { AnyFunction, MakeRequired } from "@alanscodelog/utils";
import { type Component, type Reactive } from "vue";
export declare class NotificationHandler<TRawEntry extends RawNotificationEntry<any, any> = RawNotificationEntry<any, any>, TEntry extends NotificationEntry<TRawEntry> = NotificationEntry<TRawEntry>> {
    timeout: number;
    debug: boolean;
    private id;
    readonly queue: Reactive<TEntry[]>;
    readonly history: Readonly<TEntry[]>;
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
    pause(notification: NotificationEntry): void;
    resume(notification: NotificationEntry): void;
    static resolveToDefault(notification: NotificationEntry): void;
    static dismiss(notification: NotificationEntry): void;
    stringify(notification: NotificationEntry): string;
    clear(): void;
}
export type NotificationPromise<TOption extends string = string> = Promise<TOption>;
export type RawNotificationEntry<TOptions extends string[] = ["Ok", "Cancel"], TCancellable extends boolean | TOptions[number] = "Cancel"> = {
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
    message: string;
    component?: string | Component;
    /** By default the component is passed the message and the messageClasses. Both will be overriden if you set them on componentProps. */
    componentProps?: Record<string, any>;
};
export type NotificationEntry<TRawEntry extends RawNotificationEntry<any, any> = RawNotificationEntry<any, any>> = Omit<MakeRequired<TRawEntry, "options" | "requiresAction" | "default" | "dangerous">, "cancellable"> & {
    promise: NotificationPromise;
    resolve: AnyFunction;
    cancellable?: string;
    timeout?: number;
    resolution?: string;
    id: number;
    startTime: number;
    isPaused: boolean;
    _timer: {
        id?: ReturnType<typeof setTimeout>;
        elapsedBeforePause: number;
    };
};
export type NotificationListener<TEntry extends NotificationEntry<any>> = (notification: TEntry, type: "added" | "resolved" | "deleted") => void;
export type NotificationStringifier<T extends NotificationEntry<any>> = (notification: T) => string;
//# sourceMappingURL=NotificationHandler.d.ts.map