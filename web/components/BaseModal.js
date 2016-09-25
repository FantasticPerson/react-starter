/**
 * Created by dandan.wu on 16/9/21.
 */
import React,{Component,createClass} from 'react';

const Modal = React.createClass({
    render(){
        return (
            <div className="tr-base-modal-container">
                <div className="tr-modal-background"></div>
                {this.props.children}
            </div>
        )
    }
});

export default Modal;