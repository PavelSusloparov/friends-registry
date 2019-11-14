import { WaitForResult } from "@redtech/keystone-utils";

export interface PopulateStoreArgs {
    dispatch: () => void;
    onError?: (reason: PopulateStoreResult) => void;
    timeout?: number;
    waitFor: () => boolean | Promise<boolean>;
}
export declare enum PopulateStoreResult {
    SUCCESS = 0,
    ERROR = 1,
    TIMEOUT = 2,
    SKIPPED = 3
}
export declare const waitForResultToPopulateStoreResult: {
    [WaitForResult.TIMEOUT]: PopulateStoreResult;
    [WaitForResult.ERROR]: PopulateStoreResult;
    [WaitForResult.SUCCESS]: PopulateStoreResult;
};
export declare function populateStore(args: PopulateStoreArgs): Promise<PopulateStoreResult>;
