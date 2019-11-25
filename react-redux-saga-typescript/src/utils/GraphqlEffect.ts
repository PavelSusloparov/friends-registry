import {Omit} from "./TypeHelpers";
import {CallEffect} from "redux-saga/effects";

export function makeGraphqlCall<TResult>(
    fn: (...args: any[]) => TResult,
    ...args: any[]
): Omit<CallEffect, "type"> & { type: "GRAPHQL_SERVICE" } {
    return {
        "@@redux-saga/IO": true,
        combinator: false,
        type: "GRAPHQL_SERVICE",
        payload: {
            context: null,
            args,
            fn
        }
    };
}
