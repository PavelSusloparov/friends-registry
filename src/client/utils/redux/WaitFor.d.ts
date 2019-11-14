export declare enum WaitForResult {
    SUCCESS = 0,
    ERROR = 1,
    TIMEOUT = 2
}
export declare function waitFor(truthyStateFn: () => boolean | Promise<boolean>, maxWait?: number): Promise<WaitForResult>;
