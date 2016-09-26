/**
 * Created by dandan.wu on 16/9/21.
 */
import * as actionHelper from '../utils/action-helper';
import * as ActionTypes from '../constants/ActionTypes';
import * as myFetch from '../utils/mFetch'
import * as AdpterURL from '../constants/AdpterURL';
import {createRemoteOnlyDAO} from '../middleware/dal'

export function getUserList(cb = null){
    let userList = [{"contact": "杨燕龙", "webport": 10001, "filehost": "61.155.85.77", "code": "0513001", "tcphost": "61.155.85.77", "fileport": 10004, "id": "6f8b7e3d-9040-4a9b-b910-9364a918054e", "ctel": "15151000001", "webhost": "61.155.85.77", "server": "宋卫南", "mac": "56:E8:F6:23:EF", "timeout": "2017-09-12", "tcpport": 10003, "name": "江苏中威科技"},
        {"contact": "杨燕龙", "webport": 10001, "filehost": "61.155.85.77", "code": "0513001", "tcphost": "61.155.85.77", "fileport": 10004, "id": "6f8b7e3d-9040-4a9b-b910-9364a918054e", "ctel": "15151000001", "webhost": "61.155.85.77", "server": "宋卫南", "mac": "56:E8:F6:23:EF", "timeout": "2017-09-12", "tcpport": 10003, "name": "江苏中威科技"},
        {"contact": "杨燕龙", "webport": 10001, "filehost": "61.155.85.77", "code": "0513001", "tcphost": "61.155.85.77", "fileport": 10004, "id": "6f8b7e3d-9040-4a9b-b910-9364a918054e", "ctel": "15151000001", "webhost": "61.155.85.77", "server": "宋卫南", "mac": "56:E8:F6:23:EF", "timeout": "2017-09-12", "tcpport": 10003, "name": "江苏中威科技"},
        {"contact": "杨燕龙", "webport": 10001, "filehost": "61.155.85.77", "code": "0513001", "tcphost": "61.155.85.77", "fileport": 10004, "id": "6f8b7e3d-9040-4a9b-b910-9364a918054e", "ctel": "15151000001", "webhost": "61.155.85.77", "server": "宋卫南", "mac": "56:E8:F6:23:EF", "timeout": "2017-09-12", "tcpport": 10003, "name": "江苏中威科技"}];

    return createRemoteOnlyDAO({
        fromRemote:function () {
            return myFetch.fetch_get(AdpterURL.GET_USER_LIST);
        },
        onEnd: function(data) {
            if(!actionHelper.isError(data)) {
                this.dispatch(actionHelper.createPayloadAction(ActionTypes.user_list_update, data));
            }
        }
    },cb);
}

export function postNewUser(data,cb=null){
    return createRemoteOnlyDAO({
        fromRemote:function(){
            return myFetch.fetch_post(AdpterURL.POST_NEW_USER_DATA,data);
        }
    },cb);
}

export function postUpdateUser(data,cb=null){
    return createRemoteOnlyDAO({
        fromRemote:function(){
            return myFetch.fetch_post(AdpterURL.POST_UPDATE_USER_DATA,data);
        }
    },cb)
}

export function postDeleteUser(id,cb=null){
    return createRemoteOnlyDAO({
        fromRemote:function () {
            return myFetch.fetch_post(AdpterURL.POST_REMOVE_USER,id);
        }
    },cb)
}