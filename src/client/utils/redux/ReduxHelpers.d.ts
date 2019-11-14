import { Action } from "redux-act";
import { CallEffect } from "redux-saga/effects";
export declare enum FlowStep {
    Unknown = 0,
    Trying = 1,
    Started = 2,
    Failed = 4,
    Success = 8,
    Done = 16
}
export interface IActionFlow<TTry, TStart, TFailed, TSuccess, TDone> {
    done: (args?: TDone) => Action<TDone>;
    failed: (args?: TFailed) => Action<TFailed>;
    start: (args?: TStart) => Action<TStart>;
    success: (args?: TSuccess) => Action<TSuccess>;
    try: (args?: TTry) => Action<TTry>;
}
export declare function mergeState<STATE>(prevState: STATE, nextState: STATE): STATE;
export declare function createActions<T>(flowName: string, actions: string[]): T;
export declare function createActionFlow<TTry = unknown, TStart = unknown, TFailed = unknown, TSuccess = unknown, TDone = unknown>(actionName: string): IActionFlow<TTry, TStart, TFailed, TSuccess, TDone>;
declare type ExtractPutAction<T> = (action: any) => PutWithArgs<T>;
export declare type PutOrPutCreator<TApiParams> = ExtractPutAction<TApiParams> | PutWithArgs;
export interface PutWithArgs<T = any> {
    args?: T;
    put: Function;
}
export interface SimpleActionFlowOptions<TActionPayload, TActionResult, TValue> {
    call: (args: TActionPayload) => CallEffect;
    createSuccessPayload: (args: {
        payload: TActionPayload;
        value: TActionResult;
    }) => TValue;
    flow: IActionFlow<unknown, unknown, unknown, unknown, unknown>;
}
export declare function extractPut<T>(p: PutOrPutCreator<T>, action: any): any;
export declare function getSimpleActionFlowSaga<TActionPayload, TActionResult, TSuccessPayload>(args: SimpleActionFlowOptions<TActionPayload, TActionResult, TSuccessPayload>): (action: any) => Generator<import("@redux-saga/types").SimpleEffect<"CALL", import("redux-saga/effects").CallEffectDescriptor<any>> | import("@redux-saga/types").SimpleEffect<"PUT", import("redux-saga/effects").PutEffectDescriptor<Action<unknown, {}>>>, void, TActionResult>;
export declare function withoutKeys<K extends string | number | symbol, V>(obj: Record<string, V>, keys: string | string[]): Partial<Record<string, V>>;
export {};
