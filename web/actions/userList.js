/**
 * Created by dandan.wu on 16/9/21.
 */
import * as actionHelper from '../utils/action-helper';
import * as ActionTypes from '../constants/ActionTypes';
import * as myFetch from '../utils/mFetch'
// import * as kFetch from '../utils/kFetch';
// import * as AdpterURL from '../constants/AdpterURL';
// import {createAutoDAO, createRemoteOnlyDAO,AccessType,createLocalOnlyDAO} from '../middleware/dal'

export function getUserList(cb){
    let userList = [{"contact": "杨燕龙", "webport": 10001, "filehost": "61.155.85.77", "code": "0513001", "tcphost": "61.155.85.77", "fileport": 10004, "id": "6f8b7e3d-9040-4a9b-b910-9364a918054e", "ctel": "15151000001", "webhost": "61.155.85.77", "server": "宋卫南", "mac": "56:E8:F6:23:EF", "timeout": "2017-09-12", "tcpport": 10003, "name": "江苏中威科技"},
        {"contact": "杨燕龙", "webport": 10001, "filehost": "61.155.85.77", "code": "0513001", "tcphost": "61.155.85.77", "fileport": 10004, "id": "6f8b7e3d-9040-4a9b-b910-9364a918054e", "ctel": "15151000001", "webhost": "61.155.85.77", "server": "宋卫南", "mac": "56:E8:F6:23:EF", "timeout": "2017-09-12", "tcpport": 10003, "name": "江苏中威科技"},
        {"contact": "杨燕龙", "webport": 10001, "filehost": "61.155.85.77", "code": "0513001", "tcphost": "61.155.85.77", "fileport": 10004, "id": "6f8b7e3d-9040-4a9b-b910-9364a918054e", "ctel": "15151000001", "webhost": "61.155.85.77", "server": "宋卫南", "mac": "56:E8:F6:23:EF", "timeout": "2017-09-12", "tcpport": 10003, "name": "江苏中威科技"},
        {"contact": "杨燕龙", "webport": 10001, "filehost": "61.155.85.77", "code": "0513001", "tcphost": "61.155.85.77", "fileport": 10004, "id": "6f8b7e3d-9040-4a9b-b910-9364a918054e", "ctel": "15151000001", "webhost": "61.155.85.77", "server": "宋卫南", "mac": "56:E8:F6:23:EF", "timeout": "2017-09-12", "tcpport": 10003, "name": "江苏中威科技"}];

    myFetch.myfetch('customer/list',true);
    // return myFetch.myfetch('customer/list',true,onFetchListCb.bind(this))
        // .then(result=>{
        //     console.info(ok);
        //     console.info(result)

    // })

    // function onFetchListCb(result){
        return dispatch => {
            dispatch(actionHelper.createPayloadAction(ActionTypes.user_list_update, userList));
            cb();
        };
    // }
    //
    // return dispatch => {
    //     dispatch(actionHelper.createPayloadAction(ActionTypes.user_list_update, userList));
    //     cb();
    // };

    // return createRemoteOnlyDAO({
    //         fromRemote: ()=> {
    //             return userList;
    //         },
    //         onEnd: function (result) {
    //             console.info(result);
    //             this.dispatch(actionHelper.createPayloadAction(ActionTypes.user_list_update, result));
    //             cb();
    //         }
    //     }
    // )
}