/**
 * Created by dandan.wu on 16/9/13.
 */
import index from '../containers/index'

const index = {
    path:'/',
    component:index,
    onEnter:(nextState,replace,cb)=>{
        cb();
    }
};

export default index;