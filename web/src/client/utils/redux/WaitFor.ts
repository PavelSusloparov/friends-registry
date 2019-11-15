import {isPromise} from "./TypeGuards";

export enum WaitForResult {
    SUCCESS,
    ERROR,
    TIMEOUT
}

/**
 * This will wait for the truthyStateFn to return true before continuing.  This enables you to
 * pause application execution while waiting for some asynchronous task to complete.
 *
 * This is useful in server side rendering when a saga is executing and we need to force the app
 * to wait for the data to be fully loaded, and available in the redux store before continuing.
 *
 * If the task does not complete within the maxWait time, it will be canceled and the promise
 * will be rejected.
 *
 * Example:
 *
 *  // Load the data for a this page
 *  if (id) {
 *    ctx.store.dispatch(loadTodoData.try(parseInt(id as string)));
 *    await executingOn({
 *      server: () => waitFor(() => !!ctx.store.getState().example.todos[id.toString()])
 *    });
 *  }
 *
 * @param truthyStateFn
 * @param maxWait
 */
export function waitFor(
    truthyStateFn: () => boolean | Promise<boolean>,
    maxWait: number = 5000
): Promise<WaitForResult> {
    return new Promise<WaitForResult>((resolve, reject) => {
        let isCanceled = false;

        // Start a timer that will cancel this after the timeout is reached
        setTimeout(() => {
            isCanceled = true;
            reject(WaitForResult.TIMEOUT);
        }, maxWait);

        const wait = () => {
            return setTimeout(async () => {
                // If it has already been canceled by timeout, then we can just return
                if (isCanceled) {
                    return;
                }

                try {
                    // This may be a bool or a promise that returns a bool
                    const truthyFnResult = truthyStateFn();
                    const isTrue = isPromise(truthyFnResult) ? await truthyFnResult : truthyFnResult;

                    // If its true then continue otherwise keep waiting
                    if (isTrue) {
                        resolve(WaitForResult.SUCCESS);
                    } else {
                        wait();
                    }
                } catch (e) {
                    reject(WaitForResult.ERROR);
                }
            }, 10);
        };

        wait();
    });
}
