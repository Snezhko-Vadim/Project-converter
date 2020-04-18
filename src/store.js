import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {request,converter,styles} from './reducers';

const allReducers = combineReducers({
    request:request,
    converter:converter,
    styles:styles,
})
export const store=createStore(allReducers,applyMiddleware(thunk));