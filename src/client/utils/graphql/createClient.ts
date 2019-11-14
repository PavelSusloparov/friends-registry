import { deepmerge, executingOn, isExecutingOnServer } from "@redtech/keystone-utils";
import { ApolloClient, ApolloLink, IntrospectionResultData } from "apollo-boost";
import { InMemoryCache, IntrospectionFragmentMatcher } from "apollo-cache-inmemory";
import { split } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";
import fetch from "cross-fetch";

export interface CreateClientOptions {
    httpProtocol: string;
    wsProtocol: string;
    port: string;
    host: string;
    introspectionQueryResultData?: IntrospectionResultData;
}

export const createClientFactory = (createClientOptions: CreateClientOptions) => {
    const {httpProtocol, wsProtocol, port, host, introspectionQueryResultData} = createClientOptions;
    return (httpLinkOptions: Partial<HttpLink.Options> = {}) => {
        // Create an http link
        const httpLink = new HttpLink(deepmerge({
            uri: executingOn({
                server: `${httpProtocol}://${host}:${port}/graphql`,
                browser: `${httpProtocol}://${host}:${port}/graphql`,
            }),
            credentials: "same-origin",
            fetch: fetch,
        }, httpLinkOptions));

        // This link should only be instantiated in browser
        const wsLink = executingOn({
            server: () => null,
            browser: () => {
                const wsLink = new WebSocketLink({
                    uri: `${wsProtocol}://${host}:${port}/graphql`,
                    options: {
                        reconnect: true,
                        timeout: 30000,
                        lazy: true
                    },
                    webSocketImpl: WebSocket
                });
                wsLink.subscriptionClient.maxConnectTimeGenerator.duration = () => wsLink.subscriptionClient.maxConnectTimeGenerator.max;
                return wsLink;
            }
        });

        /**
         * Using the ability to split links, you can send data to each link
         * depending on what kind of operation is being sent
         *
         * Note: we only want to split links in the browser
         */
        const link: ApolloLink = executingOn({
            server: httpLink,
            browser: () => {
                if (wsLink === null) {
                    return httpLink;
                }

                return split(
                    // split based on operation type
                    ({ query }) => {
                        const { kind, operation } = getMainDefinition(query);
                        return kind === "OperationDefinition" && operation === "subscription";
                    },
                    wsLink,
                    httpLink
                );
            }
        });

        const fragmentMatcher = new IntrospectionFragmentMatcher({
            introspectionQueryResultData: introspectionQueryResultData
        });

        /**
         *
         */
        return new ApolloClient({
            link,
            cache: new InMemoryCache({ fragmentMatcher }),
            ssrMode: isExecutingOnServer(),
            defaultOptions: {
                /**
                 * Using the all policy is the best way to notify your users of potential issues while
                 * still showing as much data as possible from your server. It saves both data and errors
                 * into the Apollo Cache so your UI can use them.
                 *
                 * https://www.apollographql.com/docs/react/features/error-handling.html
                 */
                query: {
                    errorPolicy: "all"
                },
                mutate: {
                    errorPolicy: "all"
                }
            }
        });
    };
};
