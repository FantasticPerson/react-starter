/**
 * Created by dandan.wu on 16/9/21.
 */
import React,{Component,PropTypes} from 'react';

export default class UserItem extends Component{
    constructor(){
        super();
        this.state = {checked:false};
    }

    onCheckChange(){
        const {data} = this.props;
        const {itemRef} = this.refs;
        if(itemRef) {
            this.props.onChange(data,itemRef.checked);
        }
    }

    setChecked(bool){
        const {itemRef} = this.refs;
        if(itemRef){
            this.setState({checked:bool});
        }
    }

    getData(){
        return this.props.data;
    }

    render(){
        const {data} = this.props;
        const {name,code,contact,ctel,server,tcphost,tcpport,webhost,webport,filehost,fileport,duedate} = data;
        return (
            <tr>
                <td style={{textAlign: "center"}}>
                    <input ref='itemRef' type="checkbox" name="mailbox_list_ids" id="cbf1db0f-647a-421c-a3a4-44b1d2d03ed8" value="cbf1db0f-647a-421c-a3a4-44b1d2d03ed8" checked={this.state.checked} onChange={(e)=>{this.onCheckChange()}}/>
                </td>
                <td style={{textAlign: "center"}}>{name}</td>
                <td style={{textAlign: "center"}}>{code}</td>
                <td style={{textAlign: "center"}}>{contact}</td>
                <td style={{textAlign: "center"}}>{ctel}</td>
                <td style={{textAlign: "center"}}>{server}</td>
                <td style={{textAlign: "center"}}>{tcphost+" "+tcpport}</td>
                <td style={{textAlign: "center"}}>{webhost+" "+webport}</td>
                <td style={{textAlign: "center"}}>{filehost+" "+fileport}</td>
                <td style={{textAlign: "center"}}>{duedate}</td>

            </tr>
        )
    }
}

UserItem.propTypes = {
    name:React.PropTypes.string,
    code:React.PropTypes.string,
    contact:React.PropTypes.string,
    ctel:React.PropTypes.string,
    server:React.PropTypes.string,
    tcphost:React.PropTypes.string,
    tcpport:React.PropTypes.number,
    webhost:React.PropTypes.string,
    webport:React.PropTypes.number,
    filehost:React.PropTypes.string,
    fileport:React.PropTypes.number,
    duedate:React.PropTypes.string
};

