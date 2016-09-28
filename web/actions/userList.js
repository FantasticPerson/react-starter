/**
 * Created by dandan.wu on 16/9/21.
 */
import * as actionHelper from '../utils/action-helper';
import * as ActionTypes from '../constants/ActionTypes';
import * as myFetch from '../utils/mFetch'
import * as AdpterURL from '../constants/AdpterURL';
import {createRemoteOnlyDAO} from '../middleware/dal'

export function getUserList(cb = null){
    let userList = [{"contact": "杨燕龙", "webport": 10001, "filehost": "61.155.85.77", "code": "05130011", "tcphost": "61.155.85.77", "fileport": 10004, "id": "6f8b7e3d-9040-4a9b-b910-9364a918054e", "ctel": "15151000001", "webhost": "61.155.85.77", "server": "宋卫南", "mac": "56:E8:F6:23:EF", "timeout": "2017-09-12", "tcpport": 10003, "name": "江苏中威科技"},
        {"contact": "杨燕龙", "webport": 10001, "filehost": "61.155.85.77", "code": "05130012", "tcphost": "61.155.85.77", "fileport": 10004, "id": "6f8b7e3d-9040-4a9b-b910-9364a918054e", "ctel": "15151000001", "webhost": "61.155.85.77", "server": "宋卫南", "mac": "56:E8:F6:23:EF", "timeout": "2017-09-12", "tcpport": 10003, "name": "江苏中威科技"},
        {"contact": "杨燕龙", "webport": 10001, "filehost": "61.155.85.77", "code": "05130013", "tcphost": "61.155.85.77", "fileport": 10004, "id": "6f8b7e3d-9040-4a9b-b910-9364a918054e", "ctel": "15151000001", "webhost": "61.155.85.77", "server": "宋卫南", "mac": "56:E8:F6:23:EF", "timeout": "2017-09-12", "tcpport": 10003, "name": "江苏中威科技"},
        {"contact": "杨燕龙", "webport": 10001, "filehost": "61.155.85.77", "code": "05130014", "tcphost": "61.155.85.77", "fileport": 10004, "id": "6f8b7e3d-9040-4a9b-b910-9364a918054e", "ctel": "15151000001", "webhost": "61.155.85.77", "server": "宋卫南", "mac": "56:E8:F6:23:EF", "timeout": "2017-09-12", "tcpport": 10003, "name": "江苏中威科技"},
        {"contact": "杨燕龙", "webport": 10001, "filehost": "61.155.85.77", "code": "05130015", "tcphost": "61.155.85.77", "fileport": 10004, "id": "6f8b7e3d-9040-4a9b-b910-9364a918054e", "ctel": "15151000001", "webhost": "61.155.85.77", "server": "宋卫南", "mac": "56:E8:F6:23:EF", "timeout": "2017-09-12", "tcpport": 10003, "name": "江苏中威科技"},
        {"contact": "杨燕龙", "webport": 10001, "filehost": "61.155.85.77", "code": "05130016", "tcphost": "61.155.85.77", "fileport": 10004, "id": "6f8b7e3d-9040-4a9b-b910-9364a918054e", "ctel": "15151000001", "webhost": "61.155.85.77", "server": "宋卫南", "mac": "56:E8:F6:23:EF", "timeout": "2017-09-12", "tcpport": 10003, "name": "江苏中威科技"},
        {"contact": "杨燕龙", "webport": 10001, "filehost": "61.155.85.77", "code": "05130017", "tcphost": "61.155.85.77", "fileport": 10004, "id": "6f8b7e3d-9040-4a9b-b910-9364a918054e", "ctel": "15151000001", "webhost": "61.155.85.77", "server": "宋卫南", "mac": "56:E8:F6:23:EF", "timeout": "2017-09-12", "tcpport": 10003, "name": "江苏中威科技"},
        {"contact": "杨燕龙", "webport": 10001, "filehost": "61.155.85.77", "code": "05130018", "tcphost": "61.155.85.77", "fileport": 10004, "id": "6f8b7e3d-9040-4a9b-b910-9364a918054e", "ctel": "15151000001", "webhost": "61.155.85.77", "server": "宋卫南", "mac": "56:E8:F6:23:EF", "timeout": "2017-09-12", "tcpport": 10003, "name": "江苏中威科技"},
        {"contact": "杨燕龙", "webport": 10001, "filehost": "61.155.85.77", "code": "05130019", "tcphost": "61.155.85.77", "fileport": 10004, "id": "6f8b7e3d-9040-4a9b-b910-9364a918054e", "ctel": "15151000001", "webhost": "61.155.85.77", "server": "宋卫南", "mac": "56:E8:F6:23:EF", "timeout": "2017-09-12", "tcpport": 10003, "name": "江苏中威科技"},
        {"contact": "杨燕龙", "webport": 10001, "filehost": "61.155.85.77", "code": "05130020", "tcphost": "61.155.85.77", "fileport": 10004, "id": "6f8b7e3d-9040-4a9b-b910-9364a918054e", "ctel": "15151000001", "webhost": "61.155.85.77", "server": "宋卫南", "mac": "56:E8:F6:23:EF", "timeout": "2017-09-12", "tcpport": 10003, "name": "江苏中威科技"},
        {"contact": "杨燕龙", "webport": 10001, "filehost": "61.155.85.77", "code": "05130021", "tcphost": "61.155.85.77", "fileport": 10004, "id": "6f8b7e3d-9040-4a9b-b910-9364a918054e", "ctel": "15151000001", "webhost": "61.155.85.77", "server": "宋卫南", "mac": "56:E8:F6:23:EF", "timeout": "2017-09-12", "tcpport": 10003, "name": "江苏中威科技"},
        {"contact": "杨燕龙", "webport": 10001, "filehost": "61.155.85.77", "code": "05130022", "tcphost": "61.155.85.77", "fileport": 10004, "id": "6f8b7e3d-9040-4a9b-b910-9364a918054e", "ctel": "15151000001", "webhost": "61.155.85.77", "server": "宋卫南", "mac": "56:E8:F6:23:EF", "timeout": "2017-09-12", "tcpport": 10003, "name": "江苏中威科技"},
        {"contact": "杨燕龙", "webport": 10001, "filehost": "61.155.85.77", "code": "05130023", "tcphost": "61.155.85.77", "fileport": 10004, "id": "6f8b7e3d-9040-4a9b-b910-9364a918054e", "ctel": "15151000001", "webhost": "61.155.85.77", "server": "宋卫南", "mac": "56:E8:F6:23:EF", "timeout": "2017-09-12", "tcpport": 10003, "name": "江苏中威科技"},
        {"contact": "杨燕龙", "webport": 10001, "filehost": "61.155.85.77", "code": "05130024", "tcphost": "61.155.85.77", "fileport": 10004, "id": "6f8b7e3d-9040-4a9b-b910-9364a918054e", "ctel": "15151000001", "webhost": "61.155.85.77", "server": "宋卫南", "mac": "56:E8:F6:23:EF", "timeout": "2017-09-12", "tcpport": 10003, "name": "江苏中威科技"},
        {"contact": "杨燕龙", "webport": 10001, "filehost": "61.155.85.77", "code": "05130025", "tcphost": "61.155.85.77", "fileport": 10004, "id": "6f8b7e3d-9040-4a9b-b910-9364a918054e", "ctel": "15151000001", "webhost": "61.155.85.77", "server": "宋卫南", "mac": "56:E8:F6:23:EF", "timeout": "2017-09-12", "tcpport": 10003, "name": "江苏中威科技"},
        {"contact": "杨燕龙", "webport": 10001, "filehost": "61.155.85.77", "code": "05130026", "tcphost": "61.155.85.77", "fileport": 10004, "id": "6f8b7e3d-9040-4a9b-b910-9364a918054e", "ctel": "15151000001", "webhost": "61.155.85.77", "server": "宋卫南", "mac": "56:E8:F6:23:EF", "timeout": "2017-09-12", "tcpport": 10003, "name": "江苏中威科技"},
        {"contact": "杨燕龙", "webport": 10001, "filehost": "61.155.85.77", "code": "05130027", "tcphost": "61.155.85.77", "fileport": 10004, "id": "6f8b7e3d-9040-4a9b-b910-9364a918054e", "ctel": "15151000001", "webhost": "61.155.85.77", "server": "宋卫南", "mac": "56:E8:F6:23:EF", "timeout": "2017-09-12", "tcpport": 10003, "name": "江苏中威科技"},
        {"contact": "杨燕龙", "webport": 10001, "filehost": "61.155.85.77", "code": "05130028", "tcphost": "61.155.85.77", "fileport": 10004, "id": "6f8b7e3d-9040-4a9b-b910-9364a918054e", "ctel": "15151000001", "webhost": "61.155.85.77", "server": "宋卫南", "mac": "56:E8:F6:23:EF", "timeout": "2017-09-12", "tcpport": 10003, "name": "江苏中威科技"},
        {"contact": "杨燕龙", "webport": 10001, "filehost": "61.155.85.77", "code": "05130029", "tcphost": "61.155.85.77", "fileport": 10004, "id": "6f8b7e3d-9040-4a9b-b910-9364a918054e", "ctel": "15151000001", "webhost": "61.155.85.77", "server": "宋卫南", "mac": "56:E8:F6:23:EF", "timeout": "2017-09-12", "tcpport": 10003, "name": "江苏中威科技"},
        {"contact": "杨燕龙", "webport": 10001, "filehost": "61.155.85.77", "code": "05130030", "tcphost": "61.155.85.77", "fileport": 10004, "id": "6f8b7e3d-9040-4a9b-b910-9364a918054e", "ctel": "15151000001", "webhost": "61.155.85.77", "server": "宋卫南", "mac": "56:E8:F6:23:EF", "timeout": "2017-09-12", "tcpport": 10003, "name": "江苏中威科技"},
        {"contact": "杨燕龙", "webport": 10001, "filehost": "61.155.85.77", "code": "05130031", "tcphost": "61.155.85.77", "fileport": 10004, "id": "6f8b7e3d-9040-4a9b-b910-9364a918054e", "ctel": "15151000001", "webhost": "61.155.85.77", "server": "宋卫南", "mac": "56:E8:F6:23:EF", "timeout": "2017-09-12", "tcpport": 10003, "name": "江苏中威科技"},
        {"contact": "杨燕龙", "webport": 10001, "filehost": "61.155.85.77", "code": "05130032", "tcphost": "61.155.85.77", "fileport": 10004, "id": "6f8b7e3d-9040-4a9b-b910-9364a918054e", "ctel": "15151000001", "webhost": "61.155.85.77", "server": "宋卫南", "mac": "56:E8:F6:23:EF", "timeout": "2017-09-12", "tcpport": 10003, "name": "江苏中威科技"},
        {"contact": "杨燕龙", "webport": 10001, "filehost": "61.155.85.77", "code": "05130033", "tcphost": "61.155.85.77", "fileport": 10004, "id": "6f8b7e3d-9040-4a9b-b910-9364a918054e", "ctel": "15151000001", "webhost": "61.155.85.77", "server": "宋卫南", "mac": "56:E8:F6:23:EF", "timeout": "2017-09-12", "tcpport": 10003, "name": "江苏中威科技"},
        {"contact": "杨燕龙", "webport": 10001, "filehost": "61.155.85.77", "code": "05130034", "tcphost": "61.155.85.77", "fileport": 10004, "id": "6f8b7e3d-9040-4a9b-b910-9364a918054e", "ctel": "15151000001", "webhost": "61.155.85.77", "server": "宋卫南", "mac": "56:E8:F6:23:EF", "timeout": "2017-09-12", "tcpport": 10003, "name": "江苏中威科技"},
        {"contact": "杨燕龙", "webport": 10001, "filehost": "61.155.85.77", "code": "05130035", "tcphost": "61.155.85.77", "fileport": 10004, "id": "6f8b7e3d-9040-4a9b-b910-9364a918054e", "ctel": "15151000001", "webhost": "61.155.85.77", "server": "宋卫南", "mac": "56:E8:F6:23:EF", "timeout": "2017-09-12", "tcpport": 10003, "name": "江苏中威科技"},
        {"contact": "杨燕龙", "webport": 10001, "filehost": "61.155.85.77", "code": "05130036", "tcphost": "61.155.85.77", "fileport": 10004, "id": "6f8b7e3d-9040-4a9b-b910-9364a918054e", "ctel": "15151000001", "webhost": "61.155.85.77", "server": "宋卫南", "mac": "56:E8:F6:23:EF", "timeout": "2017-09-12", "tcpport": 10003, "name": "江苏中威科技"},
        {"contact": "杨燕龙", "webport": 10001, "filehost": "61.155.85.77", "code": "05130037", "tcphost": "61.155.85.77", "fileport": 10004, "id": "6f8b7e3d-9040-4a9b-b910-9364a918054e", "ctel": "15151000001", "webhost": "61.155.85.77", "server": "宋卫南", "mac": "56:E8:F6:23:EF", "timeout": "2017-09-12", "tcpport": 10003, "name": "江苏中威科技"},
        {"contact": "杨燕龙", "webport": 10001, "filehost": "61.155.85.77", "code": "05130038", "tcphost": "61.155.85.77", "fileport": 10004, "id": "6f8b7e3d-9040-4a9b-b910-9364a918054e", "ctel": "15151000001", "webhost": "61.155.85.77", "server": "宋卫南", "mac": "56:E8:F6:23:EF", "timeout": "2017-09-12", "tcpport": 10003, "name": "江苏中威科技"},
        {"contact": "杨燕龙", "webport": 10001, "filehost": "61.155.85.77", "code": "05130039", "tcphost": "61.155.85.77", "fileport": 10004, "id": "6f8b7e3d-9040-4a9b-b910-9364a918054e", "ctel": "15151000001", "webhost": "61.155.85.77", "server": "宋卫南", "mac": "56:E8:F6:23:EF", "timeout": "2017-09-12", "tcpport": 10003, "name": "江苏中威科技"},
        {"contact": "杨燕龙", "webport": 10001, "filehost": "61.155.85.77", "code": "05130040", "tcphost": "61.155.85.77", "fileport": 10004, "id": "6f8b7e3d-9040-4a9b-b910-9364a918054e", "ctel": "15151000001", "webhost": "61.155.85.77", "server": "宋卫南", "mac": "56:E8:F6:23:EF", "timeout": "2017-09-12", "tcpport": 10003, "name": "江苏中威科技"},
        {"contact": "杨燕龙", "webport": 10001, "filehost": "61.155.85.77", "code": "05130041", "tcphost": "61.155.85.77", "fileport": 10004, "id": "6f8b7e3d-9040-4a9b-b910-9364a918054e", "ctel": "15151000001", "webhost": "61.155.85.77", "server": "宋卫南", "mac": "56:E8:F6:23:EF", "timeout": "2017-09-12", "tcpport": 10003, "name": "江苏中威科技"},
        {"contact": "杨燕龙", "webport": 10001, "filehost": "61.155.85.77", "code": "05130042", "tcphost": "61.155.85.77", "fileport": 10004, "id": "6f8b7e3d-9040-4a9b-b910-9364a918054e", "ctel": "15151000001", "webhost": "61.155.85.77", "server": "宋卫南", "mac": "56:E8:F6:23:EF", "timeout": "2017-09-12", "tcpport": 10003, "name": "江苏中威科技"},
        {"contact": "杨燕龙", "webport": 10001, "filehost": "61.155.85.77", "code": "05130043", "tcphost": "61.155.85.77", "fileport": 10004, "id": "6f8b7e3d-9040-4a9b-b910-9364a918054e", "ctel": "15151000001", "webhost": "61.155.85.77", "server": "宋卫南", "mac": "56:E8:F6:23:EF", "timeout": "2017-09-12", "tcpport": 10003, "name": "江苏中威科技"},
        {"contact": "杨燕龙", "webport": 10001, "filehost": "61.155.85.77", "code": "05130044", "tcphost": "61.155.85.77", "fileport": 10004, "id": "6f8b7e3d-9040-4a9b-b910-9364a918054e", "ctel": "15151000001", "webhost": "61.155.85.77", "server": "宋卫南", "mac": "56:E8:F6:23:EF", "timeout": "2017-09-12", "tcpport": 10003, "name": "江苏中威科技"},
        {"contact": "杨燕龙", "webport": 10001, "filehost": "61.155.85.77", "code": "05130045", "tcphost": "61.155.85.77", "fileport": 10004, "id": "6f8b7e3d-9040-4a9b-b910-9364a918054e", "ctel": "15151000001", "webhost": "61.155.85.77", "server": "宋卫南", "mac": "56:E8:F6:23:EF", "timeout": "2017-09-12", "tcpport": 10003, "name": "江苏中威科技"},
        {"contact": "杨燕龙", "webport": 10001, "filehost": "61.155.85.77", "code": "05130046", "tcphost": "61.155.85.77", "fileport": 10004, "id": "6f8b7e3d-9040-4a9b-b910-9364a918054e", "ctel": "15151000001", "webhost": "61.155.85.77", "server": "宋卫南", "mac": "56:E8:F6:23:EF", "timeout": "2017-09-12", "tcpport": 10003, "name": "江苏中威科技"},
        {"contact": "杨燕龙", "webport": 10001, "filehost": "61.155.85.77", "code": "05130047", "tcphost": "61.155.85.77", "fileport": 10004, "id": "6f8b7e3d-9040-4a9b-b910-9364a918054e", "ctel": "15151000001", "webhost": "61.155.85.77", "server": "宋卫南", "mac": "56:E8:F6:23:EF", "timeout": "2017-09-12", "tcpport": 10003, "name": "江苏中威科技"},
        {"contact": "杨燕龙", "webport": 10001, "filehost": "61.155.85.77", "code": "05130048", "tcphost": "61.155.85.77", "fileport": 10004, "id": "6f8b7e3d-9040-4a9b-b910-9364a918054e", "ctel": "15151000001", "webhost": "61.155.85.77", "server": "宋卫南", "mac": "56:E8:F6:23:EF", "timeout": "2017-09-12", "tcpport": 10003, "name": "江苏中威科技"},
        {"contact": "杨燕龙", "webport": 10001, "filehost": "61.155.85.77", "code": "05130049", "tcphost": "61.155.85.77", "fileport": 10004, "id": "6f8b7e3d-9040-4a9b-b910-9364a918054e", "ctel": "15151000001", "webhost": "61.155.85.77", "server": "宋卫南", "mac": "56:E8:F6:23:EF", "timeout": "2017-09-12", "tcpport": 10003, "name": "江苏中威科技"},
        {"contact": "杨燕龙", "webport": 10001, "filehost": "61.155.85.77", "code": "05130050", "tcphost": "61.155.85.77", "fileport": 10004, "id": "6f8b7e3d-9040-4a9b-b910-9364a918054e", "ctel": "15151000001", "webhost": "61.155.85.77", "server": "宋卫南", "mac": "56:E8:F6:23:EF", "timeout": "2017-09-12", "tcpport": 10003, "name": "江苏中威科技"},
        {"contact": "杨燕龙", "webport": 10001, "filehost": "61.155.85.77", "code": "05130051", "tcphost": "61.155.85.77", "fileport": 10004, "id": "6f8b7e3d-9040-4a9b-b910-9364a918054e", "ctel": "15151000001", "webhost": "61.155.85.77", "server": "宋卫南", "mac": "56:E8:F6:23:EF", "timeout": "2017-09-12", "tcpport": 10003, "name": "江苏中威科技"},
        {"contact": "杨燕龙", "webport": 10001, "filehost": "61.155.85.77", "code": "05130052", "tcphost": "61.155.85.77", "fileport": 10004, "id": "6f8b7e3d-9040-4a9b-b910-9364a918054e", "ctel": "15151000001", "webhost": "61.155.85.77", "server": "宋卫南", "mac": "56:E8:F6:23:EF", "timeout": "2017-09-12", "tcpport": 10003, "name": "江苏中威科技"},
        {"contact": "杨燕龙", "webport": 10001, "filehost": "61.155.85.77", "code": "05130053", "tcphost": "61.155.85.77", "fileport": 10004, "id": "6f8b7e3d-9040-4a9b-b910-9364a918054e", "ctel": "15151000001", "webhost": "61.155.85.77", "server": "宋卫南", "mac": "56:E8:F6:23:EF", "timeout": "2017-09-12", "tcpport": 10003, "name": "江苏中威科技"},
        {"contact": "杨燕龙", "webport": 10001, "filehost": "61.155.85.77", "code": "05130054", "tcphost": "61.155.85.77", "fileport": 10004, "id": "6f8b7e3d-9040-4a9b-b910-9364a918054e", "ctel": "15151000001", "webhost": "61.155.85.77", "server": "宋卫南", "mac": "56:E8:F6:23:EF", "timeout": "2017-09-12", "tcpport": 10003, "name": "江苏中威科技"},
        {"contact": "杨燕龙", "webport": 10001, "filehost": "61.155.85.77", "code": "05130055", "tcphost": "61.155.85.77", "fileport": 10004, "id": "6f8b7e3d-9040-4a9b-b910-9364a918054e", "ctel": "15151000001", "webhost": "61.155.85.77", "server": "宋卫南", "mac": "56:E8:F6:23:EF", "timeout": "2017-09-12", "tcpport": 10003, "name": "江苏中威科技"},
        {"contact": "杨燕龙", "webport": 10001, "filehost": "61.155.85.77", "code": "05130056", "tcphost": "61.155.85.77", "fileport": 10004, "id": "6f8b7e3d-9040-4a9b-b910-9364a918054e", "ctel": "15151000001", "webhost": "61.155.85.77", "server": "宋卫南", "mac": "56:E8:F6:23:EF", "timeout": "2017-09-12", "tcpport": 10003, "name": "江苏中威科技"},
        {"contact": "杨燕龙", "webport": 10001, "filehost": "61.155.85.77", "code": "05130057", "tcphost": "61.155.85.77", "fileport": 10004, "id": "6f8b7e3d-9040-4a9b-b910-9364a918054e", "ctel": "15151000001", "webhost": "61.155.85.77", "server": "宋卫南", "mac": "56:E8:F6:23:EF", "timeout": "2017-09-12", "tcpport": 10003, "name": "江苏中威科技"},
        {"contact": "杨燕龙", "webport": 10001, "filehost": "61.155.85.77", "code": "05130058", "tcphost": "61.155.85.77", "fileport": 10004, "id": "6f8b7e3d-9040-4a9b-b910-9364a918054e", "ctel": "15151000001", "webhost": "61.155.85.77", "server": "宋卫南", "mac": "56:E8:F6:23:EF", "timeout": "2017-09-12", "tcpport": 10003, "name": "江苏中威科技"},
        {"contact": "杨燕龙", "webport": 10001, "filehost": "61.155.85.77", "code": "05130059", "tcphost": "61.155.85.77", "fileport": 10004, "id": "6f8b7e3d-9040-4a9b-b910-9364a918054e", "ctel": "15151000001", "webhost": "61.155.85.77", "server": "宋卫南", "mac": "56:E8:F6:23:EF", "timeout": "2017-09-12", "tcpport": 10003, "name": "江苏中威科技"},
        {"contact": "杨燕龙", "webport": 10001, "filehost": "61.155.85.77", "code": "05130060", "tcphost": "61.155.85.77", "fileport": 10004, "id": "6f8b7e3d-9040-4a9b-b910-9364a918054e", "ctel": "15151000001", "webhost": "61.155.85.77", "server": "宋卫南", "mac": "56:E8:F6:23:EF", "timeout": "2017-09-12", "tcpport": 10003, "name": "江苏中威科技"},
        {"contact": "杨燕龙", "webport": 10001, "filehost": "61.155.85.77", "code": "05130061", "tcphost": "61.155.85.77", "fileport": 10004, "id": "6f8b7e3d-9040-4a9b-b910-9364a918054e", "ctel": "15151000001", "webhost": "61.155.85.77", "server": "宋卫南", "mac": "56:E8:F6:23:EF", "timeout": "2017-09-12", "tcpport": 10003, "name": "江苏中威科技"},
        {"contact": "杨燕龙", "webport": 10001, "filehost": "61.155.85.77", "code": "05130062", "tcphost": "61.155.85.77", "fileport": 10004, "id": "6f8b7e3d-9040-4a9b-b910-9364a918054e", "ctel": "15151000001", "webhost": "61.155.85.77", "server": "宋卫南", "mac": "56:E8:F6:23:EF", "timeout": "2017-09-12", "tcpport": 10003, "name": "江苏中威科技"}];

    // return (dispatch)=>{
    //     dispatch(actionHelper.createPayloadAction(ActionTypes.user_list_update, userList));
    //     cb();
    // };
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