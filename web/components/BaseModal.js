/**
 * Created by dandan.wu on 16/9/21.
 */
import React,{Component,createClass} from 'react';

const Modal = React.createClass({
    render(){
        return (
            <div className="base-modal-container">
                {this.props.children}
            </div>
        )
    }
});

export default Modal;


// export default class BaseModal extends Component{
//     constructor(){
//         super()
//     }
//     render(){
//         return(
//             <div className="base-modal-container">
//                 {this.props.children}
//             </div>
//         )
//     }
// }