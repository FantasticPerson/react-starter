/**
 * Created by dandan.wu on 16/9/21.
 */
import React,{Component,PropTypes} from 'react';

export default class UserItem extends Component{
    constructor(){
        super();
    }

    render(){
        const {name,code,contact,ctel,server,tcphost,tcpport,webhost,webport,filehost,fileport,duedate} = this.props;
        return (
            <tr>
                <td style={{textAlign: "center"}}>
                    <input type="checkbox" name="mailbox_list_ids" id="cbf1db0f-647a-421c-a3a4-44b1d2d03ed8" value="cbf1db0f-647a-421c-a3a4-44b1d2d03ed8" />
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

