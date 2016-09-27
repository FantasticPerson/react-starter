/**
 * Created by dandan.wu on 16/9/21.
 */
import React,{Component,PropTypes} from 'react';
import {connect} from 'react-redux';
import UserItem from './components/UserItem';
import {getUserList,postDeleteUser} from '../../actions/userList';
import * as ViewState from '../../constants/view';
import {fetch_post} from '../../utils/mFetch';
import {showOverLayByName,removeOverLayByName,showLoading,removeLoading} from '../../actions/view';
import * as overLayNames from '../../constants/OverLayNames'

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
        if(this.selectedItemsData.length > 1 || this.selectedItemsData.length <= 0){
            alert('请选择一个进行修改');
        } else {
            let item = this.selectedItemsData[0];
            this.props.dispatch(showOverLayByName(overLayNames.USER_MODIFY_OVER_LAY,item))
        }
    }

    onDeleteClickHandler(){
        this.props.dispatch(showLoading('正在删除数据,请稍后...'));
        if(this.selectedItemsData.length > 1 || this.selectedItemsData.length <= 0){
            alert('请选择一个进行删除');
        } else {
            let item = this.selectedItemsData[0];
            this.props.dispatch(postDeleteUser('id='+item.id,this.onDeleteCb.bind(this)))
        }
    }

    onDeleteCb(data){
        this.props.dispatch(removeLoading());
        console.log(data);
        this.props.dispatch(getUserList());
    }

    onCheckedChange(data){
        const {list} = this.props;
        let selected = data ? this.selectedItemsData.find(function(item){
            return item.code == data.code;
        }) : null;
        if(data && selected) {
            this.selectedItemsData.splice(this.selectedItemsData.indexOf(selected),1);
        } else if(data && !selected) {
            this.selectedItemsData.push(data);
        }
        for(var j=0;j<list.length;j++){
            let item = this.refs['userItem'+j];
            if(item){
                let data = item.getData();
                if(data){
                    let sItem = this.selectedItemsData.find(function(item){return data.code == item.code});
                    item.setChecked(sItem ? true : false);
                }
            }
        }
        let isChecked = this.selectedItemsData.length == list.length;
        this.setState({checked:isChecked});
    }

    onTotalChange(){
        const {list} = this.props;
        const {totalCB} = this.refs;
        let checked = totalCB.checked;
        this.setState({checked:checked});
        if(totalCB.checked){
            this.selectedItemsData = list;
        } else {
            this.selectedItemsData = [];
        }
        for(var j=0;j<list.length;j++) {
            let item = this.refs['userItem' + j];
            if (item) {
                item.setChecked(checked);
            }
        }
    }

    render(){
        const {view} = this.state;
        if(view === ViewState.view_ready) {
            const {list} = this.props;
            setTimeout(function(){
                if(this.selectedItemsData.length > 0){
                    let arr = [];
                    for(var i = 0 ; i < this.selectedItemsData.length;i++) {
                        let item = this.selectedItemsData[i];
                        let findItem = list.find(function(item2){return item.code == item2.code});
                        if(findItem){
                            arr.push(item);
                        }
                    }
                    this.selectedItemsData = arr;
                }
                for(var j=0;j<list.length;j++){
                    let item = this.refs['userItem'+j];
                    if(item){
                        let data = item.getData();
                        if(data){
                            let sItem = this.selectedItemsData.find(function(item){return data.code == item.code});
                            item.setChecked(sItem ? true : false);
                        }
                    }
                }
            }.bind(this),20);
            const userList = list.map((item, index)=> {
                return <UserItem key={index} selectedData={this.state.selectedItemsData} data = {item} ref={"userItem"+index} onChange={this.onCheckedChange.bind(this)}/>;
            });

            return (
                <div className="user-list-container" style={{width:'1100px'}}>
                    <div className="user-list-toolbar">
                        <div className="user-list-icon-opt user-list-add" onClick={()=>{this.onAddClickHandler()}}></div>
                        <div className="user-list-icon-opt user-list-modify" onClick={()=>{this.onModifyClickHandler()}}></div>
                        <div className="user-list-icon-opt user-list-report" onClick={()=>{this.onDeleteClickHandler()}}></div>
                    </div>
                    <table className="table site_tb">
                        <thead>
                            <tr >
                                <th style={{width:"30px"}}>
                                    <input ref="totalCB" type="checkbox" id="mailbox_list_allCheck" style={{verticalAlign: "middle"}} checked={this.state.checked} onChange={()=>{this.onTotalChange()}}/>
                                </th>
                                <th style={{width:"110px"}}>{'名称'}</th>
                                <th style={{width:"90px"}}>{'客户号'}</th>
                                <th style={{width:"90px"}}>{'客户联系人'}</th>
                                <th style={{width:"150px"}}>{'联系方式'}</th>
                                <th style={{width:"80px"}}>{'服务人员'}</th>
                                <th style={{width:"150px"}}>{'TCP地址及端口'}</th>
                                <th style={{width:"150px"}}>{'WEB地址及端口'}</th>
                                <th style={{width:"150px"}}>{'FILE地址及端口'}</th>
                                <th style={{width:"100px"}}>{'LIC到期时间'}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userList}
                        </tbody>
                    </table>
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