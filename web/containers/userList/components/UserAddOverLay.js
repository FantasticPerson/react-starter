/**
 * Created by dandan.wu on 16/9/22.
 */
import React,{Component} from 'react'
import BaseModal from '../../../components/BaseModal'
import {removeOverLayByName,showLoading,removeLoading} from '../../../actions/view'
import {postNewUser} from '../../../actions/userList'
import {AddDivAndInputClassNames} from '../constants'
import * as overLayNames from '../../../constants/OverLayNames'
import {getUserList} from '../../../actions/userList'

export default class UserAddOverLay extends Component{
    constructor() {
        super();
        this.result = {};
    }

    render(){
        const trs = AddDivAndInputClassNames.map((item, index)=>{
            return (
                <tr className="user-add-input-item" key={index}>
                    <td className='user-add-input-name-td'>{item[2]}</td>
                    <td className="user-add-input-text-td">
                        <input className={item[1] + ' user-add-input-common'} onChange={(e)=>{this.onInputChange(e.target.value,item[1])}}/>
                        <span className="nessenery-code">*</span>
                    </td>
                </tr>
            )
        });
        return(
            <BaseModal>
                <div className="user-add-container">
                    <div className="aui_title">{'添加客户信息'}</div>
                    <fieldset className="user-add-over-lay-field-set">
                        <legend className="legend">{'客户信息'}</legend>
                        <table className="contentTable">
                            <tbody>
                            {trs}
                            </tbody>
                        </table>
                    </fieldset>
                    <div className="user-add-btn-container">
                        <button className="tr-common-button-blue" onClick={()=>{this.onAddConfirm()}}>{'Confirm'}</button>
                        <button className="tr-common-button-gray" onClick={()=>{this.onAddCancel()}}>{'cancel'}</button>
                    </div>
                </div>
            </BaseModal>
        )

    }

    onInputChange(value,target){
        let isValueValid = value && value.length > 0;
        let realName = target.substring(15);
        this.result[realName] = value;
        let resultArr = this.result['results'];
        if(isValueValid) {
            if (resultArr && resultArr.indexOf(realName) < 0) {
                resultArr.push(realName);
            } else if (!resultArr) {
                resultArr = [realName];
            }
        } else {
            if(resultArr && resultArr.indexOf(realName) >= 0){
                resultArr.splice(resultArr.indexOf(realName),1);
            }
        }
        this.result['results'] = resultArr;
    }

    onAddConfirm(){
        if(this.result['results'] && this.result['results'].length == 12){
            let results = this.result['results'];
            let data = results[0] + '=' + this.result[results[0]];
            for(var i = 1;i < results.length;i++){
                data = data + '&' + results[i] + '=' + this.result[results[i]];
            }
            this.props.dispatch(showLoading('正在添加数据,请稍后...'));
            this.props.dispatch(postNewUser(data,this.onAddNewUserCb.bind(this)));
        } else {
            alert('信息没有填写完整');
        }
    }

    onAddNewUserCb(data){
        this.props.dispatch(removeLoading());
        this.props.dispatch(removeOverLayByName(overLayNames.USER_ADD_OVER_LAY));
        this.props.dispatch(getUserList());
    }

    onAddCancel(){
        this.props.dispatch(removeOverLayByName(overLayNames.USER_ADD_OVER_LAY));
    }
}