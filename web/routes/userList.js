/**
 * Created by dandan.wu on 16/9/21.
 */
import Pages from '../containers/index'

const user = {
    path: 'user',
    component: Pages.UserList,
    onEnter: (nextState, replace, cb) => {
        cb();
    },
    onLeave: ()=> {
        console.log("user leave");
    }
};

export default user;