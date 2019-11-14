export declare type Either<L, R> = L | R;
export declare type F<T, TFunctionArgs = any> = (args: TFunctionArgs) => T;
export declare type MaybeFunction<T, TFunctionArgs = any> = Either<T, F<T, TFunctionArgs>>;
export declare function getValue<T, TFunctionArgs = any>(maybe: MaybeFunction<T, TFunctionArgs> | undefined, args?: TFunctionArgs): T | undefined;
