/* tslint:disable:no-string-literal */

// This is a helper function for getting a value from the current process
// environment.  It is used to prevent webpack node optimization that would
// automatically replace process.env.NODE_ENV with "production"
const processEnv = (key: string) => process.env[key];

export const isDevelopment = () => !isProduction();

export const isProduction = () => processEnv("NODE_ENV") === "production";

export const isTest = () => processEnv("NODE_ENV") === "test";