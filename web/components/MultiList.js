/**
 * Created by dandan.wu on 16/9/27.
 */
import React,{Component,createClass} from 'react';

export default class MultiList extends Component{
    constructor(){
        super();
        let height = window.innerHeight;
        this.state = {cIndex:0,checked:false,height:height-190};
        this.selectedItemsData = [];
    }

    // getInitialState(){
    //     return {windowWidth: window.innerWidth};
    // }

    handleResize(){
        let height = window.innerHeight;
        this.setState({height:height-190});
        console.log(height);
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleResize.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }

    onTotalChange(){
        let list = this.getCurrentList();
        const {totalCB} = this.refs;
        let checked = totalCB.checked;
        this.setState({checked:checked});
        if(totalCB.checked){
            this.selectedItemsData = list;
        } else {
            this.selectedItemsData = [];
        }
        for(var j=0;j<list.length;j++) {
            let item = this.refs['item' + j];
            if (item) {
                item.setChecked(checked);
            }
        }
    }

    onTabClick(i){
        this.setState({cIndex:i});
    }

    getSelectedItems(){
        return this.selectedItemsData;
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

    onChange(){

    }

    onItemChange(data){
        let list = this.getCurrentList();
        let selected = data ? this.selectedItemsData.find(function(item){
            return item.code == data.code;
        }) : null;
        if(data && selected) {
            this.selectedItemsData.splice(this.selectedItemsData.indexOf(selected),1);
        } else if(data && !selected) {
            this.selectedItemsData.push(data);
        }
        for(var j=0;j<list.length;j++){
            let item = this.refs['item'+j];
            if(item){
                let data = item.getData();
                if(data){
                    let sItem = this.selectedItemsData.find(function(item){return data.code == item.code});
                    item.setChecked(sItem ? true : false);
                }
            }
        }
        let isChecked = this.selectedItemsData.length == list.length;
        this.setState({checked:isChecked});
    }

    renderFooter(){
        const {data} = this.props;
        let length = Math.ceil(data.length/20);
        if(length <= 1) {
            return;
        }
        let tabs = [];
        for(let i = 0;i<length;i++){
            let isCurrent = (i == this.state.cIndex);
            let className = "tr-multi-list-tab" + (isCurrent ? " tr-multi-list-curt-tab" : "");
            tabs.push(
                <div className={className} onClick={()=>{this.onTabClick(i)}}>{i}</div>
            )
        }
        return (
            <div className="tr-multi-list-footer-container">
                <div className="tr-multi-list-pre-tab" onClick={()=>{this.onPreClick()}}>{'上一页'}</div>
                <div className="tr-multi-list-tab-container">{tabs}</div>
                <div className="tr-multi-list-next-tab" onClick={()=>{this.onNextClick()}}>{'下一页'}</div>
                <div className="tr-multi-list-msg">{'共'+length+'页/'+data.length+'条纪录'}</div>
            </div>
        )
    }

    getCurrentList(){
        const {data} = this.props;
        const {cIndex} = this.state;
        return data.slice(cIndex*20,(cIndex+1)*20);
    }

    renderContent(){
        const {element,headerProperty} = this.props;
        let list = this.getCurrentList();

        const bodyContent = list.map((item,index)=>{
            return React.createElement(element,{ref:'item'+index,data:item,key:index,onChange:this.onItemChange.bind(this)})
        });
        const headers = headerProperty[1].map((item,index)=>{
            return (
                <th style={item[1]} key={index}>{item[0]}</th>
            )
        });
        return (
            <table className="table site_tb">
                <thead>
                    <tr >
                        <th style={{width:"30px"}}>
                            <input ref="totalCB" type="checkbox" id="mailbox_list_allCheck" style={{verticalAlign: "middle"}} checked={this.state.checked} onChange={()=>{this.onTotalChange()}}/>
                        </th>
                        {headers}
                    </tr>
                </thead>
                <tbody>
                    {bodyContent}
                </tbody>
            </table>
        );
    }
    render(){
        const {width} = this.props;
        let tWidth = width || '100%';
        return(
            <div style={{width:tWidth}}>
                <div className="tr-multi-list-scroll-container" style={{height:this.state.height+'px'}}>
                    {this.renderContent()}
                </div>
                {this.renderFooter()}
            </div>
        )
    }
}