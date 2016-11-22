/**
 * Created by dandan.wu on 16/9/13.
 */
import indexApp from '../containers/index'
import demoPage from './demoPage'

const index = {
    path:'/',
    component:indexApp,
    onEnter:(nextState,replace,cb)=>{
        cb();
    },
    childRoutes:[
        demoPage
    ]
};

export default index;