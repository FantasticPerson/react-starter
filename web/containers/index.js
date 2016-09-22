/**
 * Created by dandan.wu on 16/9/13.
 */
import React,{Component,PropTypes} from 'react';
import {connect} from 'react-redux';
import UserList from './userList/index';
// import {Overlay} from 'react-overlays';
// import UserAddOverLay from '../containers/userList/components/UserAddOverLay'

@connect(
    state=>({
        list: state.userList.list,
    })
)
// let overLayMap = {
//     '1': '1',
//     '2': '2'
// }
class App extends Component {

    renderOverLay(){
        const overLayArr = ['1','2']
        overLayArr.map((name,index)=>{

        });


        // <Modal>
        //
        // </Modal>
    }
    render(){
        return (
            <div id="react-app">
                {this.props.children}

            </div>
        )
    }
}

export default {
    App,
    UserList
}