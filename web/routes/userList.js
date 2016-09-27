/**
 * Created by dandan.wu on 16/9/21.
 */
import User from '../containers/userList/index'

const user = {
    path: 'user',
    component: User,
    onEnter: (nextState, replace, cb) => {
        cb();
    },
    onLeave: ()=> {
        console.log("user leave");
    }
};

export default user;