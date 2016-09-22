/**
 * Created by dandan.wu on 16/9/13.
 */
import indexApp from '../containers/index'
import User from './userList'

const index = {
    path:'/',
    component:indexApp,
    onEnter:(nextState,replace,cb)=>{
        cb();
    },
    childRoutes:[
        User
    ]
};

export default index;