/**
 * Created by dandan.wu on 16/9/13.
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';
import UserAddOverLay from '../containers/userList/components/UserAddOverLay'
import * as overLayNames from '../constants/OverLayNames';

class App extends Component {
    renderOverLay(){

        return this.props.overLayList.map((name,index)=>{
            let cp = overLayNames.overLayMap[name];
            if(cp){
                return React.createElement(cp,{key:index})
            } else {
                console.error('the overLay name ' + name + ' may be not defines');
            }
            return React.createElement(UserAddOverLay,{key:index})
        });
    }
    render(){
        return (
            <div id="react-app">
                {this.renderOverLay()}
                {this.props.children}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        overLayList : state.view.overLayList
    }
}

export default connect(mapStateToProps)(App)