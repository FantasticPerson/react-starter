/**
 * Created by dandan.wu on 16/9/21.
 */
import React,{Component,PropTypes} from 'react';
import {connect} from 'react-redux';
import UserItem from './components/UserItem';
import * as UserListActions from '../../actions/userList';
import * as ViewState from '../../constants/viewState';
import {fetch_post} from '../../utils/mFetch';
// import {Modal} from 'react-overlays'

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

        console.log('on add click');
    }

    onModifyClickHandler(){
        console.log('on modify click');
    }

    onDeleteClickHandler(){
        console.log('on delete click');
    }

    renderAdd(){
        if(this.state.showAdd){
            let divAndInputClassNames = [['user-add-name','user-add-input-name','名称'],['user-add-code','user-add-input-code','客户号'],
                                            ['user-add-contact','user-add-input-contact','客户联系人'], ['user-add-ctel','user-add-input-ctel','联系方式'],
                                            ['user-add-service','user-add-input-service','服务人员'], ['user-add-tcphost','user-add-input-tcphost','tcp地址'],
                                            ['user-add-tcpport','user-add-input-tcpport','tcp端口'],['user-add-webhost','user-add-input-webhost','web地址'],
                                            ['user-add-webport','user-add-input-webport','web端口'], ['user-add-filehost','user-add-input-filehost','file地址'],
                                            ['user-add-fileport','user-add-input-fileport','file端口'],['user-add-duedate','user-add-input-duedate','LIC到期时间']];
            var cGroup = [];
            while (divAndInputClassNames.length) {cGroup.push(divAndInputClassNames.splice(0, 2))}
            const trs =  cGroup.map((item,index)=>{
                const divs = item.map((item2,index2)=>{
                    let style2 = index2 > 0 ? {marginLeft:'10px'} : {};
                    return (
                        <div className="user-add-input-item" key={index2} style={style2}>
                            <div className={item2[0]}>{item2[2]}</div>
                            <input className={item2[1] + ' user-add-input-common'} onChange={(e)=>{this.onInputChange(e.target.value,item2[1])}}/>
                        </div>
                    )
                });
                return (<tr className="user-add-input-tr-item" key={index}>
                    {divs}
                </tr>);
            });
            return(
                <div>
                    <table>
                        <tbody>
                            {trs}
                        </tbody>
                    </table>
                    <div className="user-add-btn-container">
                        <button onClick={()=>{this.onAddConfirm()}}>{'Confirm'}</button>
                        <button onClick={()=>{this.onAddCancel()}}>{'cancel'}</button>
                    </div>
                </div>
            )
        }
    }

    onInputChange(e,target){
        console.log(e,target);
    }

    onAddConfirm(){
        this.setState({showAdd:false});
        fetch_post('customer/add');
    }

    onAddCancel(){
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
                    {this.renderAdd()}
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