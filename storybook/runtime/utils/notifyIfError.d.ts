/**
 * Notifies the user if the given value is an error. Useful for making non-critical errors don't go unnoticed.
 *
 * Integrates with {@link TypedError} from `@alanscodelog/utils` to display the error code as well if it has one.
 *
 * If the value is not an error, it is returned.
 */
export declare function notifyIfError<T>(err: T, { logger, ns, force }?: {
    logger?: {
        debug: (...args: any[]) => void;
    };
    ns?: string;
    force?: boolean;
}): T;
//# sourceMappingURL=notifyIfError.d.ts.map