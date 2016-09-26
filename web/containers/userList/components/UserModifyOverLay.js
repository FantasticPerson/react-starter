/**
 * Created by dandan.wu on 16/9/26.
 */
import React,{Component} from 'react'
import BaseModal from '../../../components/BaseModal'
import {ModifyDivAndInputClassNames} from '../constants'
import {postUpdateUser} from  '../../../actions/userList'
import {removeOverLayByName} from '../../../actions/view'
import * as overLayNames from '../../../constants/OverLayNames'
import {getUserList} from '../../../actions/userList'

export default class UserModifyOverLay extends Component{
    constructor(){
        super();
        this.result = {};
    }

    onInputChange(value,target){
        let isValueValid = value && value.length > 0;
        let realName = target.substring(18);
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

    onModifyConfirm(){
        if(this.result['results'] && this.result['results'].length == 12){
            const {data} = this.props;
            let results = this.result['results'];
            let data1 = results[0] + '=' + this.result[results[0]];
            for(var i = 1;i < results.length;i++){
                data1 = data1 + '&' + results[i] + '=' + this.result[results[i]];
            }
            data1 = data1 + '&' + 'id='+data.id;
            this.props.dispatch(postUpdateUser(data1,this.onModifyConfirmCb.bind(this)));
        } else {
            alert('信息没有填写完整');
        }
    }

    onModifyConfirmCb(data){
        this.props.dispatch(removeOverLayByName(overLayNames.USER_MODIFY_OVER_LAY));
        this.props.dispatch(getUserList());
        console.log(data);
    }

    onModifyCancel(){
        this.props.dispatch(removeOverLayByName(overLayNames.USER_MODIFY_OVER_LAY));
    }

    render(){
        const {data} = this.props;
        this.result = data;
        this.result.results = [];
        const trs = ModifyDivAndInputClassNames.map((item,index)=>{
            this.result.results.push(item[1].substring(18));
            return(
                <tr className="user-modify-input-item" key={index}>
                    <td className='user-modify-input-name-td'>{item[2]}</td>
                    <td className="user-modify-input-text-td">
                        <input className={item[1] + ' user-add-input-common'} defaultValue={data[item[1].substring(18)]} onChange={(e)=>{this.onInputChange(e.target.value,item[1])}}/>
                    </td>
                </tr>
            )
        });
        return (
            <BaseModal>
                <div className="user-add-container">
                    <div className="aui_title">{'修改客户信息'}</div>
                    <fieldset className="user-add-over-lay-field-set">
                        <legend className="legend">{'客户信息'}</legend>
                        <table className="contentTable">
                            <tbody>
                            {trs}
                            </tbody>
                        </table>
                    </fieldset>
                    <div className="user-add-btn-container">
                        <button className="tr-common-button-blue" onClick={()=>{this.onModifyConfirm()}}>{'Confirm'}</button>
                        <button className="tr-common-button-gray" onClick={()=>{this.onModifyCancel()}}>{'cancel'}</button>
                    </div>
                </div>
            </BaseModal>
        )
    }
}