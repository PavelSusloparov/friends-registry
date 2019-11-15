import {getValue, MaybeFunction} from "./MaybeFunction";
import {isTest} from "./Environment";

declare var window: any;

export interface ExecutingOnArgs<T> {
    browser?: MaybeFunction<T>;
    server?: MaybeFunction<T>;
    test?: MaybeFunction<T>;
}

/**
 * Attempt tp infer which environment this code is running in and execute the
 * appropriate function.  This is useful when some code should only be run on
 * the server and not the client.
 *
 * Optional defaultValue can be set to return if the result of the selected
 * function does not return a value
 *
 * @param args
 * @param defaultValue
 */
export function executingOn<T>(args: ExecutingOnArgs<T>, defaultValue?: T): T {
    const value =
        args.test && isTest()
            ? getValue<T>(args.test)
            : isExecutingOnServer()
            ? getValue<T>(args.server)
            : getValue<T>(args.browser);

    if (typeof value === "undefined" && typeof defaultValue !== "undefined") {
        return defaultValue;
    }

    return value;
}

/**
 *
 */
export const isExecutingOnServer = (): boolean => {
    return typeof window === "undefined";
};

/**
 *
 */
export const isExecutingOnBrowser = (): boolean => {
    return !isExecutingOnServer();
};
