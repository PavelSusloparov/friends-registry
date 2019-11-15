import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {applyMiddleware, createStore} from 'redux'
import createSagaMiddleware from 'redux-saga'
import {rootSaga} from './client/redux/RootSaga'
import {friendsReducer} from "./client/redux/friend/FriendReducer";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    friendsReducer,
    applyMiddleware(sagaMiddleware)
);
sagaMiddleware.run(rootSaga);

const action = type => store.dispatch({type});

function render() {
    ReactDOM.render(<App/>, document.getElementById('root'));
}

render();
store.subscribe(render);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about server workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
