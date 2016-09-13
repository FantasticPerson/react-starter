/**
 * Created by dandan.wu on 16/9/13.
 */
import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux'
import {nestCombineReducers,
        handleActionsReducor,
        defaultStateReducor,
        actionPayloadReducer} from '../utils/reducer-helper';

export const rootReducer = nestCombineReducers({
    routing:routerReducer,
    app:{
        name:'dandan-react-starter'
    }
})

export default rootReducer;
