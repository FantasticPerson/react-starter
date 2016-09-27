/**
 * Created by dandan.wu on 16/9/27.
 */
import React,{Component,createClass} from 'react';

export default class MultiList extends Component{
    constructor(){
        super();
        this.state = {cIndex:0};
    }

    renderFooter(){
        const {data} = this.props;
        let length = Math.ceil(data/20);
        let tabs = [];
        for(let i = 0;i<length;i++){
            let isCurrent = (i == this.state.cIndex);
            let className = "tr-multi-list-tab" + (isCurrent ? " tr-multi-list-curt-tab" : "")
            tabs.push(
                <div className={className} onClick={()=>{this.onTabClick(i)}}>{i}</div>
            )
        }
        return (
            <div>
                <div className="tr-multi-list-pre-tab" onClick={()=>{this.onPreClick()}}>{'上一页'}</div>
                <div className="tr-multi-list-tab-container">{tabs}</div>
                <div className="tr-multi-list-next-tab" onClick={()=>{this.onNextClick()}}>{'下一页'}</div>
            </div>
        )
    }

    renderContent(){
        const {data,element} = this.props;
        const {cIndex} = this.state;
        let list = data.slice(cIndex * 20,(cIndex+1)*20);


        
    }

    onTabClick(i){
        this.setState({cIndex:i});
    }

    onPreClick(){
        let index = this.state.cIndex - 1;
        if(index >= 0){
            this.setState({cIndex:index})
        }
    }

    onNextClick(){
        let index = this.state.cIndex + 1;
        const {data} = this.props;
        let length = Math.ceil(data/20);
        if(index <= length-1){
            this.setState({cIndex:index})
        }
    }
}