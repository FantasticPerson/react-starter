/**
 * Created by dandan.wu on 16/9/13.
 */
import index2 from '../containers/index'

const index = {
    path:'/',
    component:index2,
    onEnter:(nextState,replace,cb)=>{
        cb();
    }
};

export default index;