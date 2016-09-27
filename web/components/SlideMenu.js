/**
 * Created by dandan.wu on 16/9/27.
 */
import React,{Component,createClass} from 'react';

export default class SlideMenu extends Component{
    constructor(){
        super();
    }

    renderMenuList(){
        const {list} = this.props;
        let lists = list.map((item,index)=>{

        });
    }

    render(){
        return(
            <div>
                <div className="up-arrow"></div>
                <div className="down-arrow"></div>
            </div>
        )

    }
}