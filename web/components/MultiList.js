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

    handleResize(){
        let height = window.innerHeight;
        this.setState({height:height-190});
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
        let index = this.state.cIndex;
        if(i == index){
            return;
        }
        this.setState({cIndex:i});
        this.selectedItemsData = [];
        this.setSelect();

    }

    getSelectedItems(){
        return this.selectedItemsData;
    }

    onPreClick(){
        let index = this.state.cIndex - 1;
        if(index >= 0){
            this.setState({cIndex:index});
            this.selectedItemsData = [];
            this.setSelect();
        }
    }

    onNextClick(){
        let index = this.state.cIndex + 1;
        const {data} = this.props;
        let length = Math.ceil(data.length/20);
        if(index <= length-1){
            this.setState({cIndex:index});
            this.selectedItemsData = [];
            this.setSelect();
        }
    }

    setSelect(){
        let list = this.getCurrentList();
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
        let isChecked = list.length > 0 && (this.selectedItemsData.length == list.length);
        this.setState({checked:isChecked});
    }

    onItemChange(data){
        let selected = data ? this.selectedItemsData.find(function(item){
            return item.code == data.code;
        }) : null;
        if(data && selected) {
            this.selectedItemsData.splice(this.selectedItemsData.indexOf(selected),1);
        } else if(data && !selected) {
            this.selectedItemsData.push(data);
        }
        this.setSelect();
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
                <div key={i} className={className} onClick={()=>{this.onTabClick(i)}}>{i}</div>
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
        // let length = Math.ceil(data.length/20);
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
        setTimeout(function(){
            const {data} = this.props;
            let length = Math.ceil(data.length/20);
            let cIndex = this.state.cIndex;
            if(cIndex+1 > length){
                this.setState({cIndex:cIndex-1});
            }
            let list = this.getCurrentList();
            if(this.selectedItemsData.length > 0){
                let arr = [];
                for(var i = 0 ; i < this.selectedItemsData.length;i++) {
                    let item = this.selectedItemsData[i];
                    let findItem = list.find(function(item2){return item.code == item2.code});
                    if(findItem){
                        arr.push(item);
                    }
                }
                this.selectedItemsData = arr;
            }
            this.setSelect();
        }.bind(this),20);
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