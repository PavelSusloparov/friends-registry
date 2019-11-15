import {ApolloClient, NormalizedCacheObject} from "apollo-boost";
import {createClientFactory} from "./createClient";

export const client = createClientFactory({
    httpProtocol: "http",
    wsProtocol: "ws",
    port: "8101",
    host: "localhost",
    introspectionQueryResultData: require("../../generated/graphql/fragmentTypes.json")
});

export type GraphqlClient = ApolloClient<NormalizedCacheObject>
