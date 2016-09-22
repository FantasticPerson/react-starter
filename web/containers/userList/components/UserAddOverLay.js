/**
 * Created by dandan.wu on 16/9/22.
 */
import React,{Component} from 'react'
import BaseModal from '../../../components/BaseModal'

export default class UserAddOverLay extends Component{
    constructor(){
        super();
    }
    render(){
        let divAndInputClassNames = [['user-add-name','user-add-input-name','名称'],['user-add-code','user-add-input-code','客户号'],
            ['user-add-contact','user-add-input-contact','客户联系人'], ['user-add-ctel','user-add-input-ctel','联系方式'],
            ['user-add-service','user-add-input-service','服务人员'], ['user-add-tcphost','user-add-input-tcphost','tcp地址'],
            ['user-add-tcpport','user-add-input-tcpport','tcp端口'],['user-add-webhost','user-add-input-webhost','web地址'],
            ['user-add-webport','user-add-input-webport','web端口'], ['user-add-filehost','user-add-input-filehost','file地址'],
            ['user-add-fileport','user-add-input-fileport','file端口'],['user-add-duedate','user-add-input-duedate','LIC到期时间']];
        let cGroup = [];
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
            <BaseModal>
                <div className="user-add-container">
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
            </BaseModal>
        )
    }
}