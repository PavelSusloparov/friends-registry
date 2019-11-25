export type Either<L, R> = L | R;
export type F<T, TFunctionArgs = any> = (args: TFunctionArgs) => T;
export type MaybeFunction<T, TFunctionArgs = any> = Either<T, F<T, TFunctionArgs>>;

/**
 *
 */
export function getValue<T, TFunctionArgs = any>(
    maybe: MaybeFunction<T, TFunctionArgs> | undefined,
    args?: TFunctionArgs
): T | undefined {
    if (typeof maybe === "function") {
        return (maybe as F<T, TFunctionArgs>)((args as unknown) as TFunctionArgs);
    } else {
        return maybe;
    }
}
