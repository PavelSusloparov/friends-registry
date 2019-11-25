import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import { toIdValue } from 'apollo-utilities';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import Contacts from './Contacts';
import AddContact from './AddContact';
import ContactSingle from './ContactSingle';
import {WebSocketLink} from "apollo-link-ws";
import {HttpLink} from "apollo-link-http";
import {getMainDefinition} from "apollo-utilities";
import {split} from "apollo-link";
import {InMemoryCache} from "apollo-cache-inmemory";
import ApolloClient from "apollo-client";

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
    ({ query }) => {
      const { kind, operation } = getMainDefinition(query);
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
        return toIdValue(dataIdFromObject({ __typename: 'Contact', id: args['id'] }))
      },
    },
  },
  dataIdFromObject,
});

//
// const networkInterface = createNetworkInterface({
//   uri: `http://localhost:${PORT}/graphql`,
// });
//
// const wsClient = new SubscriptionClient(`ws://localhost:${PORT}/subscriptions`, {
//   reconnect: true
// });
//
// const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
//   networkInterface,
//   wsClient
// );
//
// const dataIdFromObject = (result) => {
//   if (result.__typename) {
//     if (result.id !== undefined) {
//       return `${result.__typename}:${result.id}`
//     }
//   }
//   return null;
// }
//
// const client = new ApolloClient({
//   networkInterface: networkInterfaceWithSubscriptions,
//   customResolvers: {
//     Query: {
//       contact: (__, args) => {
//         return toIdValue(dataIdFromObject({ __typename: 'Contact', id: args['id'] }))
//       },
//     },
//   },
//   dataIdFromObject,
// });

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <BrowserRouter>
          <div>
            <div className="navbar-fixed">
              <nav className="teal darken-1">
                <div className="nav-wrapper">
                  <Link to="/" className="brand-logo center">CRM</Link>
                </div>
              </nav>
            </div>
              <AddContact />
              <Switch>
                <Route exact path="/" component={Contacts}/>
                <Route path="/contact/:contactId" component={ContactSingle}/>
              </Switch>
          </div>

        </BrowserRouter>
      </ApolloProvider>
    );
  }
}

export default App;
