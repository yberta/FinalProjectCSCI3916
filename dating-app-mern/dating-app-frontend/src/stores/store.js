import { createStore, combineReducers, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';
import authReducer from "../reducers/authReducer";
import datingReducer from '../reducers/datingReducer';
import matchReducer from '../reducers/matchReducer';

const middlewares = [thunk];

if (process.env.NODE_ENV === 'development') {
    const { logger } = require('redux-logger');

    middlewares.push(logger);
}

const store = createStore(
    combineReducers( {
        auth: authReducer,
        people: datingReducer,
        matches: matchReducer
    }),
    applyMiddleware(
        ...middlewares
    )
);

export default store;