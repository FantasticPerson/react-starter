/**
 * Created by dandan.wu on 16/9/13.
 */
import indexApp from '../containers/index'
import demoPage from './demoPage'
import formPage from './formPage'

const index = {
    path:'/',
    component:indexApp,
    onEnter:(nextState,replace,cb)=>{
        cb();
    },
    childRoutes:[
        demoPage,
        formPage
    ]
};

export default index;