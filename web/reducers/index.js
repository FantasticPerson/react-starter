/**
 * Created by dandan.wu on 16/9/13.
 */
import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux'
import {nestCombineReducers, handleActionsReducor} from '../utils/reducer-helper';
import * as userList from './userList'
import * as view from './view'

export const rootReducer = nestCombineReducers({
    routing:routerReducer,
    userList: {
        list: handleActionsReducor([], userList.list)
    },
    view:{
        overLayList:handleActionsReducor([],view.overLayList)
    }
});

export default rootReducer;
