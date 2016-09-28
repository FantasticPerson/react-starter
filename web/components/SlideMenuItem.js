/**
 * Created by dandan.wu on 16/9/28.
 */
import React,{Component,PropTypes,createClass} from 'react';

export default class SlideMenuItem extends Component{
    constructor(){
        super();
    }

    render(){
        const {className,onClick} = this.props;
        return(
            <div className={className} onClick={()=>{onClick()}}></div>
        )
    }
}