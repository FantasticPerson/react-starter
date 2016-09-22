/**
 * Created by dandan.wu on 16/9/21.
 */
import React,{Component,PropTypes} from 'react';
import {connect} from 'react-redux';
import UserItem from './components/UserItem';
import * as UserListActions from '../../actions/userList';
import * as ViewState from '../../constants/view';
import {fetch_post} from '../../utils/mFetch';
import {showUserAddOverLay,removeUserAddOverLay} from '../../actions/view';

class UserList extends Component{
    constructor(){
        super();
        this.state= {view:ViewState.view_loading,showAdd:false};
    }

    componentDidMount(){
        this.props.dispatch(UserListActions.getUserList(this.getUserListCb.bind(this)));
    }

    getUserListCb(){
        this.setState({view:ViewState.view_ready})
    }

    onAddClickHandler(){
        this.setState({showAdd:true});
        this.props.dispatch(showUserAddOverLay());

        console.log('on add click');
    }

    onModifyClickHandler(){
        console.log('on modify click');
    }

    onDeleteClickHandler(){
        console.log('on delete click');
    }

    onInputChange(e,target){
        console.log(e,target);
    }

    onAddConfirm(){
        this.setState({showAdd:false});
        this.props.dispatch(removeUserAddOverLay());
        fetch_post('customer/add');
    }

    onAddCancel(){
        this.props.dispatch(removeUserAddOverLay());
        this.setState({showAdd:false})
    }

    render(){
        const {view} = this.state;
        if(view === ViewState.view_ready) {
            const {list} = this.props;
            const userList = list.map((item, index)=> {
                const {name, code, contact, ctel, server, tcphost, tcpport, webhost, webport, filehost, fileport, timeout} = item;
                return <UserItem key={index} name={name} code={code} contact={contact} ctel={ctel}
                                 server={server} tcphost={tcphost} tcpport={tcpport} webhost={webhost}
                                 webport={webport} filehost={filehost} fileport={fileport} duedate={timeout}/>;
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
                                    <input type="checkbox" id="mailbox_list_allCheck" style={{verticalAlign: "middle"}} />
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
                    <div onClick={(e)=>{this.props.dispatch(UserListActions.change())}}>click here</div>
                </div>
            )
        }
        return (
            <div>loading</div>
        )
    }
}


function mapStateToProps(state) {
    return {
        list: state.userList.list
    }
}

export default connect(mapStateToProps)(UserList);