/**
 * Created by dandan.wu on 16/9/22.
 */
import React,{Component} from 'react'
import BaseModal from '../../../components/BaseModal'
import {removeUserAddOverLay} from '../../../actions/view'
import {fetch_post} from '../../../utils/mFetch'

export default class UserAddOverLay extends Component{
    constructor() {
        super();
        this.result = {};
    }

    render(){
        let divAndInputClassNames = [['user-add-name','user-add-input-name','名称:'],['user-add-code','user-add-input-code','客户号:'],
            ['user-add-contact','user-add-input-contact','客户联系人:'], ['user-add-ctel','user-add-input-ctel','联系方式:'],
            ['user-add-service','user-add-input-service','服务人员:'], ['user-add-tcphost','user-add-input-tcphost','tcp地址:'],
            ['user-add-tcpport','user-add-input-tcpport','tcp端口:'],['user-add-webhost','user-add-input-webhost','web地址:'],
            ['user-add-webport','user-add-input-webport','web端口:'], ['user-add-filehost','user-add-input-filehost','file地址:'],
            ['user-add-fileport','user-add-input-fileport','file端口:'],['user-add-duedate','user-add-input-timeout','LIC到期时间:']];

        const trs = divAndInputClassNames.map((item,index)=>{
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
        let realName = target.substring(15);
        this.result[realName] = value;
        let resultArr = this.result['results'];
        if(resultArr && resultArr.indexOf(realName) < 0){
            resultArr.push(realName);
        } else if(!resultArr){
            resultArr = [realName];
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
            console.log(data);
            fetch_post('customer/add');
        } else {
            alert('信息没有填写完整');
        }
        // this.props.dispatch(removeUserAddOverLay());

    }

    onAddCancel(){
        this.props.dispatch(removeUserAddOverLay());
    }
}