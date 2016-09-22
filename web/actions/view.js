/**
 * Created by wdd on 2016/9/22.
 */
import * as actionHelper from '../utils/action-helper'
import * as ActionTypes from '../constants/ActionTypes'
import * as overLayNames from '../constants/OverLayNames'

export function showUserAddOverLay(){
    return (dispatch,getState)=>{
        let list = getState().view.overLayList;
        if(list.indexOf(overLayNames.USER_ADD_OVER_LAY) >= 0){
            return;
        }
        list.push(overLayNames.USER_ADD_OVER_LAY);
        dispatch(actionHelper.createPayloadAction(ActionTypes.update_over_lay_list,list))
    }
}

export function removeUserAddOverLay(){
    return (dispatch,state)=>{
        let list = state.view.overLayList;
        if(list.indexOf(overLayNames.USER_ADD_OVER_LAY) < 0){
            return;
        }
        list.remove(overLayNames.USER_ADD_OVER_LAY);
        dispatch(actionHelper.createPayloadAction(ActionTypes.update_over_lay_list,list));
    }
}