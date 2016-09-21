/**
 * Created by dandan.wu on 16/9/13.
 */
import React,{Component,PropTypes} from 'react';
import {connect} from 'react-redux';
import UserList from './userList/index';

@connect(
    state=>({
        list: state.userList.list
    })
)
class App extends Component {
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