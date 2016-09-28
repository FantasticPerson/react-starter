/**
 * Created by dandan.wu on 16/9/21.
 */
import React,{Component,PropTypes} from 'react';
import {connect} from 'react-redux';
import UserItem from './components/UserItem';
import {getUserList,postDeleteUser} from '../../actions/userList';
import * as ViewState from '../../constants/view';
import {showOverLayByName,showLoading,removeLoading} from '../../actions/view';
import * as overLayNames from '../../constants/OverLayNames'
import MultiList from '../../components/MultiList'
import {HeadProperties} from './constants'
import SlideMenu from '../../components/SlideMenu'

class UserList extends Component{
    constructor(){
        super();
        this.state= {view:ViewState.view_loading,checked:false};
        this.selectedItemsData = [];
    }

    componentDidMount(){
        this.props.dispatch(showLoading('正在获取数据,请稍后...'));
        this.props.dispatch(getUserList(this.getUserListCb.bind(this)));
    }

    getUserListCb(data){
        this.props.dispatch(removeLoading());
        this.setState({view:ViewState.view_ready})
    }

    onAddClickHandler(){
        this.props.dispatch(showOverLayByName(overLayNames.USER_ADD_OVER_LAY));
    }

    onModifyClickHandler(){
        const {multiList} = this.refs;
        let selectedItemsData = multiList.getSelectedItems();
        if(selectedItemsData.length > 1 || selectedItemsData.length <= 0){
            alert('请选择一个进行修改');
        } else {
            let item = selectedItemsData[0];
            this.props.dispatch(showOverLayByName(overLayNames.USER_MODIFY_OVER_LAY,item))
        }
    }

    onDeleteClickHandler(){
        const {multiList} = this.refs;
        let selectedItemsData = multiList.getSelectedItems();
        if(selectedItemsData.length > 1 || selectedItemsData.length <= 0){
            alert('请选择一个进行删除');
        } else {
            this.props.dispatch(showLoading('正在删除数据,请稍后...'));
            let item = selectedItemsData[0];
            this.props.dispatch(postDeleteUser('id='+item.id,this.onDeleteCb.bind(this)))
        }
    }

    onDeleteCb(data){
        this.props.dispatch(removeLoading());
        console.log(data);
        this.props.dispatch(getUserList());
    }

    render(){
        const {view} = this.state;
        if(view === ViewState.view_ready) {
            const {list} = this.props;
            let classNames = ['slide-menu-guide-list'];
            return (
                <div>
                    <div className="user-list-header user-list-head-bg">
                        <div className="user-list-header-logo"></div>
                    </div>
                    <div className="user-list-content-container">
                        <SlideMenu classNames={classNames}/>
                        <div className="user-list-container" style={{width:'900px'}}>
                            <div className="user-list-toolbar">
                                <div className="user-list-icon-opt user-list-add" onClick={()=>{this.onAddClickHandler()}}></div>
                                <div className="user-list-icon-opt user-list-modify" onClick={()=>{this.onModifyClickHandler()}}></div>
                                <div className="user-list-icon-opt user-list-del" onClick={()=>{this.onDeleteClickHandler()}}></div>
                            </div>
                            <MultiList width='900px' ref='multiList' data={list} element={UserItem} headerProperty={HeadProperties}/>
                        </div>
                    </div>
                    <div className="user-list-footer">
                        {'版权所有：江苏中威科技软件系统有限公司   地址：江苏省南通市工农路5号亚太大厦北楼3层  电话：0513-81550880  网址：www.trueway.com.cn'}
                    </div>
                </div>
            )
        }
        return (<div></div>)
    }
}


function mapStateToProps(state) {
    return {
        list: state.userList.list
    }
}

export default connect(mapStateToProps)(UserList);