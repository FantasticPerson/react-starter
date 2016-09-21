/**
 * Created by dandan.wu on 16/9/13.
 */
import Pages from '../containers/index'
import User from './userList'

const index = {
    path:'/',
    component:Pages.App,
    onEnter:(nextState,replace,cb)=>{
        cb();
    },
    childRoutes:[
        User
    ]
};

export default index;