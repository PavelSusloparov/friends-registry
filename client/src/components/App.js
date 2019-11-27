import React, {Component} from 'react';
import {ApolloProvider} from 'react-apollo';
import {getMainDefinition, toIdValue} from 'apollo-utilities';
import styled from "styled-components";
import {WebSocketLink} from "apollo-link-ws";
import {HttpLink} from "apollo-link-http";
import {split} from "apollo-link";
import {InMemoryCache} from "apollo-cache-inmemory";
import ApolloClient from "apollo-client";
import CreateFriend from "./CreateFriend";
import GetFriends from "./GetFriends";

const PORT = 4000;
const wsurl = `ws://localhost:${PORT}/graphql`;
const httpurl = `http://localhost:${PORT}/graphql`;

const wsLink = new WebSocketLink({
    uri: wsurl,
    options: {
        reconnect: true
    }
});
const httpLink = new HttpLink({
    uri: httpurl,
});

const link = split(
    // split based on operation type
    ({query}) => {
        const {kind, operation} = getMainDefinition(query);
        return kind === 'OperationDefinition' && operation === 'subscription';
    },
    wsLink,
    httpLink,
);

const dataIdFromObject = (result) => {
    if (result.__typename) {
        if (result.id !== undefined) {
            return `${result.__typename}:${result.id}`
        }
    }
    return null;
};

const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
    customResolvers: {
        Query: {
            contact: (__, args) => {
                return toIdValue(dataIdFromObject({__typename: 'Contact', id: args['id']}))
            },
        },
    },
    dataIdFromObject,
});

export const FriendContainerWrapper = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  padding: 20px;
  margin: 20px 0;

  div {
    padding: 20px;
  }
`;

class App extends Component {
    render() {
        return (
            <ApolloProvider client={client}>
                <FriendContainerWrapper>
                    <CreateFriend/>
                    <GetFriends/>
                </FriendContainerWrapper>
            </ApolloProvider>
        );
    }
}

export default App;
