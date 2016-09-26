/**
 * Created by dandan.wu on 16/9/26.
 */
import React,{Component} from 'react'
import BaseModal from '../../../components/BaseModal'
import {ModifyDivAndInputClassNames} from '../constants'

export default class UserModifyOverLay extends Component{
    constructor(){
        super();
        this.result = {};
    }

    onInputChange(){

    }

    render(){
        // const {data} = new object({"contact": "杨燕龙", "webport": 10001, "filehost": "61.155.85.77", "code": "0513001", "tcphost": "61.155.85.77", "fileport": 10004, "id": "6f8b7e3d-9040-4a9b-b910-9364a918054e", "ctel": "15151000001", "webhost": "61.155.85.77", "server": "宋卫南", "mac": "56:E8:F6:23:EF", "timeout": "2017-09-12", "tcpport": 10003, "name": "江苏中威科技"});
        // this.result = data;
        // console.log(data['name']);
        const trs = ModifyDivAndInputClassNames.map((item,index)=>{
            return(
                <tr className="user-modify-input-item" key={index}>
                    <td className='user-modify-input-name-td'>{item[2]}</td>
                    <td className="user-modify-input-text-td">
                        <input className={item[1] + ' user-add-input-common'} defaultValue={'haha'} onChange={(e)=>{this.onInputChange(e.target.value,item[1])}}/>
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
                        <button className="tr-common-button-blue" onClick={()=>{this.onAddConfirm()}}>{'Confirm'}</button>
                        <button className="tr-common-button-gray" onClick={()=>{this.onAddCancel()}}>{'cancel'}</button>
                    </div>
                </div>
            </BaseModal>
        )
    }
}