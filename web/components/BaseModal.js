/**
 * Created by dandan.wu on 16/9/21.
 */
import React,{Component} from 'react';

export default class BaseModal extends Component{
    constructor(){
        super()
    }
    render(){
        return(
            <div className="base-modal-container">
                {this.props.children}
            </div>
        )
    }
}