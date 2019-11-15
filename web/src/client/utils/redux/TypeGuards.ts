export function isPromise(object: any): object is Promise<any> {
    return typeof object.then !== "undefined";
}