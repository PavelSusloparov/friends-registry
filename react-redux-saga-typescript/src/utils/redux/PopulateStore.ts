import {executingOn} from "./ExecutingOn";
import {waitFor, WaitForResult} from "./WaitFor";

export interface PopulateStoreArgs {
    dispatch: () => void;
    onError?: (reason: PopulateStoreResult) => void;
    timeout?: number;
    waitFor: () => boolean | Promise<boolean>;
}

export enum PopulateStoreResult {
    SUCCESS,
    ERROR,
    TIMEOUT,
    SKIPPED
}

const waitForResultToPopulateStoreResult = {
    [WaitForResult.TIMEOUT]: PopulateStoreResult.TIMEOUT,
    [WaitForResult.ERROR]: PopulateStoreResult.ERROR,
    [WaitForResult.SUCCESS]: PopulateStoreResult.SUCCESS
};

/**
 * Combine waitFor and executingOn to enable server side rendering to dispatch some
 * Redux actions and then wait for the Redux store to be updated with some data before
 * continuing to render on the server.
 *
 * This is required when loading data via a Redux Saga because the sagas are forked
 * and there is no other way to know that a particular saga has completed loading
 * its data.
 *
 * This is most likely to be used in the `getInitialProps` method in a NextJS page.
 *
 * @param args
 */
export async function populateStore(args: PopulateStoreArgs): Promise<PopulateStoreResult> {
    // Dispatch the actions now
    args.dispatch();

    // Start waiting for it to be done
    const executingOnPromise = executingOn<Promise<WaitForResult>>({
        server: () => waitFor(args.waitFor, args.timeout)
    });

    if (!executingOnPromise) {
        return PopulateStoreResult.SKIPPED;
    }

    return executingOnPromise
        .then((value: WaitForResult) => {
            return waitForResultToPopulateStoreResult[value];
        })
        .catch((value: WaitForResult) => {
            const reason = waitForResultToPopulateStoreResult[value];
            if (typeof args.onError === "function") {
                args.onError(reason);
            }
            return reason;
        });
}
