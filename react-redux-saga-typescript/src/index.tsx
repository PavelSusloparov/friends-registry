import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, Switch } from 'react-router';
import { createBrowserHistory } from 'history';
import { configureStore } from './store';
import {App2} from './containers/App';
import { ApolloProvider } from 'react-apollo';
import client from './utils/graphql/apolloClient';

const store = configureStore();
const history = createBrowserHistory();

ReactDOM.render(
  <ApolloProvider store={store} client={client}>
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <Route path="/" component={App2} />
        </Switch>
      </Router>
    </Provider>
  </ApolloProvider>,
  document.getElementById('root')
);
