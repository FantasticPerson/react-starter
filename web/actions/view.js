/**
 * Created by wdd on 2016/9/22.
 */
import * as actionHelper from '../utils/action-helper'
import * as ActionTypes from '../constants/ActionTypes'

export function showOverLayByName(overLayName){
    return (dispatch,getState)=>{
        let list = getState().view.overLayList.map((name)=> {return name;});
        if(list.indexOf(overLayName) >= 0){
            return;
        }
        list.push(overLayName);
        dispatch(actionHelper.createPayloadAction(ActionTypes.update_over_lay_list,list))
    }
}

export function removeOverLayByName(overLayName){
    return (dispatch,getState)=>{
        let list = getState().view.overLayList.map((name)=> {return name;});
        if(list.indexOf(overLayName) < 0){
            return;
        }
        list.splice(list.indexOf(overLayName),1);
        dispatch(actionHelper.createPayloadAction(ActionTypes.update_over_lay_list,list));
    }
}