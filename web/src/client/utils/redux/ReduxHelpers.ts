import {Action, createAction} from "redux-act";
import {CallEffect, put} from "redux-saga/effects";

/**
 *
 * NOTE: For bitwise operations:
 *
 * Failed | Done = 20
 * Success | Done = 24
 */
export enum FlowStep {
    Unknown = 0,
    Trying = 1,
    Started = 2,
    Failed = 4,
    Success = 8,
    Done = 16
}

/**
 *
 */
export interface IActionFlow<TTry, TStart, TFailed, TSuccess, TDone> {
    done: (args?: TDone) => Action<TDone>;
    failed: (args?: TFailed) => Action<TFailed>;
    start: (args?: TStart) => Action<TStart>;
    success: (args?: TSuccess) => Action<TSuccess>;
    try: (args?: TTry) => Action<TTry>;
}

/**
 * Merges nextState into prevState and enforces type safety to ensure that there are no
 * missing properties added to the state that are not known to the interfaces.
 *
 * @param prevState
 * @param nextState
 * @returns {S}
 */
export function mergeState<STATE>(prevState: STATE, nextState: STATE): STATE {
    return {
        ...(prevState as {}),
        ...(nextState as {})
    } as STATE;
}

/**
 * Iterate the list of actions and creates an action with the flowName appended
 *
 * @param flowName
 * @param moreActions
 * @param actions
 * @returns {{}}
 */
export function createActions<T>(flowName: string, actions: string[]): T {
    return actions.reduce(
        (acc, action) => ({
            [action]: createAction(`[${action.toUpperCase()}] ${flowName}`),
            ...acc
        }),
        {} as T
    );
}

/**
 * Creates the set of standard actions for an TryCatch flow
 *
 * @param actionName
 * @returns {any}
 */
export function createActionFlow<TTry = unknown,
    TStart = unknown,
    TFailed = unknown,
    TSuccess = unknown,
    TDone = unknown>(actionName: string): IActionFlow<TTry, TStart, TFailed, TSuccess, TDone> {
    return createActions<IActionFlow<TTry, TStart, TFailed, TSuccess, TDone>>(actionName, [
        "try",
        "start",
        "failed",
        "success",
        "done"
    ]);
}

type ExtractPutAction<T> = (action: any) => PutWithArgs<T>;
export type PutOrPutCreator<TApiParams> = ExtractPutAction<TApiParams> | PutWithArgs;

export interface PutWithArgs<T = any> {
    args?: T;
    // tslint:disable-next-line
    put: Function;
}

export interface SimpleActionFlowOptions<TActionPayload, TActionResult, TValue> {
    call: (args: TActionPayload) => CallEffect;

    createSuccessPayload: (args: { payload: TActionPayload; value: TActionResult }) => TValue;
    // The particular flow that should be executed
    flow: IActionFlow<unknown, unknown, unknown, unknown, unknown>;
}

/**
 * Extract an action creator and its arguments that will be dispatched later
 *
 * @param {PutOrPutCreator<T>} p
 * @param action
 */
export function extractPut<T>(p: PutOrPutCreator<T>, action: any) {
    if (typeof p === "function") {
        const {put: putEffect, args} = p(action);
        return putEffect(args);
    } else {
        return p.put(p.args);
    }
}

/**
 * This will create an action flow based saga that dispatches the standard action flow
 * actions and allows for specifying what to `call`
 *
 * Yielding to `args.call` will return TActionResult which will then be passed back to the user
 * defined `createSuccessPayload` method so that the caller can construct the expected payload
 * to be dispatched via action flow `success` action.
 *
 * @param {SimpleActionFlowOptions<TActionPayload, TActionResult, TSuccessPayload>} args
 * @returns {(action) => IterableIterator<PutEffect<Action> | CallEffect>}
 */
export function getSimpleActionFlowSaga<TActionPayload, TActionResult, TSuccessPayload>(
    args: SimpleActionFlowOptions<TActionPayload, TActionResult, TSuccessPayload>
) {
    return function* generatedSimpleActionFlowSaga(action: any) {
        try {
            yield put(args.flow.start());

            // yield to the call effect to run the callback and get a result
            const value: TActionResult = yield args.call(action.payload as TActionPayload);

            const successPayload: TSuccessPayload = args.createSuccessPayload({
                payload: action.payload as TActionPayload,
                value: value
            });

            yield put(args.flow.success(successPayload));
        } catch (err) {
            yield put(args.flow.failed(err));
        } finally {
            yield put(args.flow.done());
        }
    };
}

export function withoutKeys<K extends string | number | symbol, V>(
    obj: Record<string, V>,
    keys: string | string[]
): Partial<Record<string, V>> {
    return Object.keys(obj).reduce<Record<string, V>>((acc, key) => {
        if (typeof keys === "string") {
            if (keys === key) {
                return acc;
            }
        } else {
            if (keys.includes(key)) {
                return acc;
            }
        }

        return {
            ...acc,
            [key]: obj[key]
        };
    }, {});
}
